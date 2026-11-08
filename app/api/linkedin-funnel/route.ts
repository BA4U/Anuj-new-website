import { NextRequest, NextResponse } from "next/server";
import { enqueueNurture } from "@/lib/nurture";
import { parseLinkedInUrl } from "@/lib/linkedin";
import { inspectLinkedInProfile, LinkedInProfileData } from "@/lib/linkedin-server";
import {
  GEMINI_MODEL,
  emailConfigured,
  sendEmail as sendLeadEmail,
  notifyAdmin,
  logLead,
  escapeHtml,
  rateLimited,
} from "@/lib/leads";

export const maxDuration = 60;

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ContentDay {
  day: number;
  type: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  image_prompt: string;
  video_concept: string;
  why_this_works: string;
  best_time_to_post: string;
  content_pillar: string;
}

interface RequestBody {
  linkedinUrl: string;
  email: string;
  niche?: string;
  goal?: string;
}

// ─── AI: Gemini Content Generation ───────────────────────────────────────────
async function generateContent(body: RequestBody, profile: LinkedInProfileData): Promise<ContentDay[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("AI_UNAVAILABLE");
  }

  const prompt = `You are Anuj Mishra, an expert LinkedIn ghostwriter and B2B growth strategist.
Create a bespoke 30-day LinkedIn content calendar for:

CREATOR / LEADER PROFILE AUDITED:
- Name: ${profile.name}
- Professional Headline / Role: ${profile.headline}
- Profile URL: ${profile.url}
- Bio / Context: ${profile.bio || "B2B leader / domain specialist"}
- Detected Industry & Niche: ${body.niche && body.niche !== "auto" ? body.niche : profile.detectedIndustry}
- Primary Objective: ${body.goal && body.goal !== "auto" ? body.goal : "Authority, inbound leads, and industry thought leadership"}

CRITICAL RULES:
1. Speak in ${profile.name}'s authentic voice, matching their exact seniority and subject matter expertise.
2. DO NOT write generic "7 productivity habits" or generic motivational quotes.
3. Every hook must be an irresistible first line that stops the professional scroll (max 15 words).
4. Full post bodies must be 150-300 words, LinkedIn-optimized, using clean line breaks and high-substance insights.
5. Generate exactly 30 content days.

Return ONLY a valid JSON array with no markdown, no explanation, no code fences:
[
  {
    "day": 1,
    "type": "Text Post | Carousel | Short Video | Poll | Document Post",
    "hook": "Irresistible opening line tailored to their industry",
    "body": "Full post body (150-300 words, high substance, clean formatting)",
    "cta": "Clear call to action",
    "hashtags": ["#Tag1","#Tag2","#Tag3","#Tag4","#Tag5"],
    "image_prompt": "Specific visual prompt for Midjourney/DALL-E/Canva AI matching their topic",
    "video_concept": "30-60 sec smartphone video script with hook, 3 points, closing CTA",
    "why_this_works": "Strategic rationale referencing LinkedIn algorithm or buyer psychology (2-3 sentences)",
    "best_time_to_post": "Tuesday · 8-9 AM",
    "content_pillar": "Authority | Storytelling | Education | Engagement"
  }
]`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", errorText);
    throw new Error("AI_UNAVAILABLE");
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

  try {
    const parsed = JSON.parse(text);
    const arr = Array.isArray(parsed) ? parsed : parsed.content_plan || [];
    if (arr.length === 0) throw new Error("Empty AI response");
    return arr;
  } catch {
    console.error("Failed to parse Gemini response");
    throw new Error("AI_UNAVAILABLE");
  }
}

// ─── Email: Send via Resend ───────────────────────────────────────────────────
async function sendEmail(
  toEmail: string,
  profile: LinkedInProfileData,
  content: ContentDay[]
) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const adminBcc = process.env.ADMIN_EMAIL || undefined;

  const emailHtml = buildEmailHtml(toEmail, profile, content);

  const payload: Record<string, unknown> = {
    from: `Anuj Mishra <${fromAddress}>`,
    to: [toEmail],
    reply_to: "contact@anuj4u.in",
    subject: `🚀 Your 30-Day LinkedIn Content Calendar (${profile.name})`,
    html: emailHtml,
  };

  if (adminBcc && adminBcc !== toEmail) {
    payload.bcc = [adminBcc];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Resend API error:", data);
    const resendMsg = data?.message || data?.name || "Unknown error";
    throw new Error(`Failed to send email: ${resendMsg}`);
  }

  return data;
}

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(
  email: string,
  profile: LinkedInProfileData,
  content: ContentDay[]
): string {
  const pillarColors: Record<string, string> = {
    Authority: "#6355FF",
    Storytelling: "#e11d48",
    Education: "#0284c7",
    Engagement: "#059669",
  };

  const postsHtml = content
    .map((day) => {
      const color = pillarColors[day.content_pillar] || "#6355FF";
      return `
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="background:${color};color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;min-width:36px;text-align:center;line-height:36px;">
              ${escapeHtml(String(day.day ?? ""))}
            </div>
            <div>
              <div style="font-weight:700;color:#111827;font-size:15px;">Day ${escapeHtml(String(day.day ?? ""))}</div>
              <div style="color:#6b7280;font-size:12px;">${escapeHtml(String(day.best_time_to_post ?? ""))}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span style="background:${color}20;color:${color};border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;">${escapeHtml(String(day.type ?? ""))}</span>
            <span style="background:#f3f4f6;color:#374151;border-radius:20px;padding:4px 12px;font-size:11px;font-weight:600;">${escapeHtml(String(day.content_pillar ?? ""))}</span>
          </div>
        </div>

        <div style="background:#f9fafb;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:16px;margin-bottom:16px;">
          <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Opening Hook</div>
          <div style="font-weight:700;color:#111827;font-size:15px;line-height:1.5;">"${escapeHtml(String(day.hook ?? ""))}"</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Full Post Copy</div>
          <div style="color:#374151;font-size:14px;line-height:1.7;white-space:pre-line;">${escapeHtml(String(day.body ?? ""))}</div>
        </div>

        <div style="background:#ecfdf5;border-radius:8px;padding:12px 16px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#065f46;text-transform:uppercase;margin-bottom:4px;">Call to Action</div>
          <div style="color:#047857;font-size:13px;font-weight:600;">${escapeHtml(String(day.cta ?? ""))}</div>
        </div>

        <div style="margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;margin-bottom:6px;">Hashtags</div>
          <div style="color:#0A66C2;font-size:12px;font-weight:600;">${(Array.isArray(day.hashtags) ? day.hashtags : []).map((h) => escapeHtml(String(h))).join("  ")}</div>
        </div>

        <div style="background:#faf5ff;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:4px;">🖼️ Image Concept</div>
          <div style="color:#6d28d9;font-size:13px;font-style:italic;">${escapeHtml(String(day.image_prompt ?? ""))}</div>
        </div>

        <div style="background:#eff6ff;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:4px;">🎬 Video Script Outline</div>
          <div style="color:#1e40af;font-size:13px;line-height:1.6;">${escapeHtml(String(day.video_concept ?? ""))}</div>
        </div>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin-bottom:4px;">💡 Strategy &amp; Psychology</div>
          <div style="color:#15803d;font-size:13px;line-height:1.6;">${escapeHtml(String(day.why_this_works ?? ""))}</div>
        </div>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 30-Day LinkedIn Content Calendar</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:40px 24px;text-align:center;">
    <h1 style="color:white;font-size:26px;font-weight:800;margin:0 0 8px;line-height:1.2;">🚀 30-Day LinkedIn Content Roadmap</h1>
    <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0 0 4px;">Tailored for <b>${escapeHtml(profile.name)}</b></p>
    <p style="color:rgba(255,255,255,0.75);font-size:12px;margin:0;">${escapeHtml(profile.headline)}</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:32px 16px 0;">
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:18px;font-weight:700;margin:0 0 10px;">Hi ${escapeHtml(profile.name)}! 👋</h2>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 12px;">Here is your structured <strong>30-day LinkedIn thought-leadership calendar</strong>, built specifically for your domain in <b>${escapeHtml(profile.detectedIndustry)}</b>.</p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0;">Each post includes a tested hook, full post body, hashtags, image/video concepts, and the strategic angle.</p>
    </div>

    ${postsHtml}

    <div style="background:#111827;border-radius:16px;padding:32px;text-align:center;margin:24px 0;color:#fff;">
      <h3 style="font-size:18px;font-weight:700;margin:0 0 8px;">Want Me to Run Your LinkedIn Growth?</h3>
      <p style="color:#9ca3af;font-size:13px;margin:0 0 20px;line-height:1.6;">I partner directly with founders and specialists to ghostwrite high-engagement content and scale personal brands.</p>
      <a href="https://anuj4u.in/contact" style="display:inline-block;background:#0A66C2;color:white;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;">Schedule Strategy Chat</a>
    </div>

    <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Anuj Mishra · <a href="mailto:contact@anuj4u.in" style="color:#0A66C2;">contact@anuj4u.in</a> · <a href="https://anuj4u.in" style="color:#0A66C2;">anuj4u.in</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.linkedinUrl || !body.email) {
      return NextResponse.json(
        { error: "LinkedIn URL and email are required." },
        { status: 400 }
      );
    }

    const email = body.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 1) Verify and inspect LinkedIn Profile
    const inspection = await inspectLinkedInProfile(body.linkedinUrl);
    if (!inspection.ok) {
      return NextResponse.json(
        { error: inspection.error },
        { status: 400 }
      );
    }
    const profile = inspection.profile;

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip, 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please try again in an hour." }, { status: 429 });
    }

    // 2) Generate AI content tailored to this real profile
    let content: ContentDay[];
    try {
      content = await generateContent(body, profile);
    } catch (e) {
      if (!(e instanceof Error) || e.message !== "AI_UNAVAILABLE") throw e;
      const sheetOk = await logLead({
        source: "linkedin-funnel",
        email,
        linkedinUrl: profile.url,
        name: profile.name,
        headline: profile.headline,
        status: "needs-manual-review",
      });

      if (!emailConfigured() && !sheetOk) {
        return NextResponse.json(
          { error: "This tool is temporarily unavailable. Please email contact@anuj4u.in directly." },
          { status: 503 }
        );
      }

      if (emailConfigured()) {
        await notifyAdmin(
          `New LinkedIn Audit Lead: ${profile.name}`,
          `<p><b>Email:</b> ${escapeHtml(email)}</p>
           <p><b>Profile:</b> <a href="${escapeHtml(profile.url)}">${escapeHtml(profile.name)}</a></p>
           <p><b>Headline:</b> ${escapeHtml(profile.headline)}</p>
           <p>AI generation unavailable, please follow up manually.</p>`
        );
        await sendLeadEmail({
          to: [email],
          subject: `Got your profile (${profile.name}), your plan is coming`,
          html: `<p style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;line-height:1.6">
            Hi ${escapeHtml(profile.name)},<br/><br/>
            I received your profile link (<a href="${escapeHtml(profile.url)}">${escapeHtml(profile.url)}</a>). I'm personally putting together your 30-day LinkedIn content plan and will email it within 24 hours.<br/><br/>
            Best regards,<br/>
            <b>Anuj Mishra</b><br/>
            <a href="mailto:contact@anuj4u.in">contact@anuj4u.in</a>
          </p>`,
        }).catch((err) => console.warn("[linkedin-funnel] review email failed:", err));
      }

      return NextResponse.json({
        success: true,
        mode: "review",
        message: "I'll review your profile personally and email your 30-day plan within 24 hours.",
        profile,
      });
    }

    // 3) Send personalized email to user
    await sendEmail(email, profile, content);

    // 4) Log to Sheets
    await logLead({
      source: "linkedin-funnel",
      email,
      linkedinUrl: profile.url,
      name: profile.name,
      headline: profile.headline,
      industry: profile.detectedIndustry,
      status: "plan-generated",
    });

    // 5) Notify Admin
    await notifyAdmin(
      `New LinkedIn Lead: ${profile.name} (${profile.detectedIndustry})`,
      `<p><b>Email:</b> ${escapeHtml(email)}</p>
       <p><b>Name:</b> ${escapeHtml(profile.name)}</p>
       <p><b>Headline:</b> ${escapeHtml(profile.headline)}</p>
       <p><b>Profile:</b> <a href="${escapeHtml(profile.url)}">${escapeHtml(profile.url)}</a></p>`
    );

    // 6) Nurture sequence
    enqueueNurture(email, profile.url).catch((err) =>
      console.warn("Nurture enqueue skipped:", err)
    );

    return NextResponse.json({
      success: true,
      mode: "plan",
      message: "Your 30-day content plan is on its way! Check your inbox.",
      daysGenerated: content.length,
      profile,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("LinkedIn Funnel API Error:", message);

    if (message.startsWith("EMAIL_NOT_CONFIGURED")) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact Anuj at contact@anuj4u.in" },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
