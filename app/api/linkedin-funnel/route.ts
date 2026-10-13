import { NextRequest, NextResponse } from "next/server";
import { GEMINI_MODEL, emailConfigured, sendEmail as sendLeadEmail, notifyAdmin, logLead, escapeHtml, rateLimited } from "@/lib/leads";

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
async function generateContent(body: RequestBody): Promise<ContentDay[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("AI_UNAVAILABLE");
  }

  const prompt = `You are a world-class LinkedIn growth strategist and copywriter.
Create a highly personalized 30-day LinkedIn content calendar for a professional whose LinkedIn profile is: ${body.linkedinUrl}

Analyze the URL structure to infer their name and industry. Generate exactly 30 content pieces.
Return ONLY a valid JSON array with no markdown, no explanation, no code fences:

[
  {
    "day": 1,
    "type": "Text Post | Carousel | Short Video | Poll | Document Post",
    "hook": "Irresistible opening line that stops the scroll (max 15 words)",
    "body": "Full post body (150-300 words, LinkedIn-optimized, with line breaks, 1-3 emojis)",
    "cta": "Clear call to action",
    "hashtags": ["#Hashtag1","#Hashtag2","#Hashtag3","#Hashtag4","#Hashtag5"],
    "image_prompt": "Detailed AI image prompt for Midjourney/DALL-E/Canva AI",
    "video_concept": "30-60 sec smartphone video script with hook, 3 points, closing CTA",
    "why_this_works": "Strategic rationale referencing LinkedIn algorithm or psychology (2-3 sentences)",
    "best_time_to_post": "Tuesday · 8-9 AM IST",
    "content_pillar": "Authority | Storytelling | Education | Engagement"
  }
]

Rules:
- Distribute: 8 Authority, 8 Storytelling, 8 Education, 6 Engagement posts
- Mix post types: Text Posts, Carousels, Polls, Short Videos, Document Posts
- Every hook must be unique — no repeated patterns
- Posts build progressively over 30 days
- Return ONLY the JSON array`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
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
  linkedinUrl: string,
  content: ContentDay[]
) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    // Hard fail — we don't silently skip. The user should know.
    throw new Error(
      "EMAIL_NOT_CONFIGURED: Add RESEND_API_KEY to your .env.local file. See .env.local.example for instructions."
    );
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const adminBcc = process.env.ADMIN_EMAIL || undefined;

  const emailHtml = buildEmailHtml(toEmail, linkedinUrl, content);

  const payload: Record<string, unknown> = {
    from: `Anuj Mishra <${fromAddress}>`,
    to: [toEmail],
    reply_to: "contact@anuj4u.in",
    subject: "🚀 Your 30-Day LinkedIn Content Calendar is Ready!",
    html: emailHtml,
  };

  // BCC Anuj on every submission so he has a full lead log in his inbox
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

  console.log("✅ Email sent via Resend:", data.id);
  return data;
}

// ─── Storage: Google Sheets via Apps Script Webhook ───────────────────────────
// No npm package needed — just a URL from your Google Apps Script web app.
// See .env.local.example for setup instructions.
async function logToGoogleSheets(
  data: RequestBody,
  emailId: string | null
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return; // Optional — doesn't block email delivery

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        email: data.email,
        linkedinUrl: data.linkedinUrl,
        emailId: emailId || "not_sent",
        status: emailId ? "sent" : "failed",
      }),
    });
    console.log("✅ Logged to Google Sheets");
  } catch (err) {
    // Non-blocking — log failure but don't crash the request
    console.warn("⚠️  Google Sheets logging failed:", err);
  }
}

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(
  email: string,
  linkedinUrl: string,
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
          <div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:4px;">🖼️ Image Prompt (Midjourney / DALL·E / Canva AI)</div>
          <div style="color:#6d28d9;font-size:13px;font-style:italic;">${escapeHtml(String(day.image_prompt ?? ""))}</div>
        </div>

        <div style="background:#eff6ff;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:4px;">🎬 Video Concept (30–60 sec)</div>
          <div style="color:#1e40af;font-size:13px;line-height:1.6;">${escapeHtml(String(day.video_concept ?? ""))}</div>
        </div>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin-bottom:4px;">💡 Why This Will Perform</div>
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
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:40px 24px;text-align:center;">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 20px;margin-bottom:20px;">
      <span style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">LinkedIn Content Engine by Anuj Mishra</span>
    </div>
    <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 12px;line-height:1.2;">🚀 Your 30-Day LinkedIn Content Calendar</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0 0 24px;">Profile: ${escapeHtml(linkedinUrl)}</p>
    <div style="display:inline-flex;gap:24px;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px 24px;">
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Posts</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Image Prompts</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Video Concepts</div></div>
    </div>
  </div>

  <!-- Body -->
  <div style="max-width:680px;margin:0 auto;padding:32px 16px 0;">
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:20px;font-weight:700;margin:0 0 12px;">Hi there! 👋</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Here is your complete <strong>30-day LinkedIn content calendar</strong>, personalized based on your profile at <a href="${escapeHtml(linkedinUrl)}" style="color:#0A66C2;">${escapeHtml(linkedinUrl)}</a>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Each entry includes the full post copy, an AI image generation prompt, a video concept, and the strategic reason why it's built to perform.</p>
      <p style="color:#6b7280;font-size:14px;margin:0;">💡 <strong>Tip:</strong> Use each post as a starting point. Add your own voice, stories, and data to make it genuinely yours.</p>
    </div>

    ${postsHtml}

    <!-- Footer CTA -->
    <div style="background:linear-gradient(135deg,#1c1b1c,#2d1e6e);border-radius:16px;padding:32px;text-align:center;margin:24px 0;">
      <h3 style="color:white;font-size:20px;font-weight:800;margin:0 0 12px;">Want Help Executing This?</h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 24px;line-height:1.6;">I personally help creators and founders build their LinkedIn presence — from strategy to content to growth.</p>
      <a href="https://anuj4u.in/contact" style="display:inline-block;background:#0A66C2;color:white;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">Book a Free Strategy Call →</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Anuj Mishra · contact@anuj4u.in · <a href="https://anuj4u.in" style="color:#6355FF;">anuj4u.in</a></p>
      <p style="margin:0;">You received this because you requested a LinkedIn content plan from anuj4u.in</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    // ── Validate inputs ──
    if (!body.linkedinUrl || !body.email) {
      return NextResponse.json(
        { error: "LinkedIn URL and email are required." },
        { status: 400 }
      );
    }

    if (!/^(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9\-_%.]+(?:[/?#][^\s<>"']*)?$/i.test(body.linkedinUrl.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/your-name)" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in an hour." }, { status: 429 });
    }

    // ── Generate AI content (if AI is unavailable we never email demo posts — Anuj follows up personally) ──
    let content: ContentDay[];
    try {
      content = await generateContent(body);
    } catch (e) {
      if (!(e instanceof Error) || e.message !== "AI_UNAVAILABLE") throw e;
      const sheetOk = await logLead({ source: "linkedin-funnel", email: body.email, linkedinUrl: body.linkedinUrl, status: "needs-manual-review" });
      if (!emailConfigured() && !sheetOk) {
        console.error("[linkedin-funnel] AI + email + sheet all unavailable — lead NOT captured:", body.email, body.linkedinUrl);
        return NextResponse.json(
          { error: "This tool is temporarily unavailable. Please email contact@anuj4u.in and I'll send your plan personally." },
          { status: 503 }
        );
      }
      if (emailConfigured()) {
        await notifyAdmin(
          `New LinkedIn funnel lead — follow up manually`,
          `<p><b>${escapeHtml(body.email)}</b> submitted <b>${escapeHtml(body.linkedinUrl)}</b>. AI generation was unavailable, so no plan was sent.</p>`
        );
        await sendLeadEmail({
          to: [body.email],
          subject: "Got your profile — your plan is coming",
          html: `<p style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6">Thanks! I've received <b>${escapeHtml(body.linkedinUrl)}</b> and will send your personal 30-day LinkedIn plan within 24 hours.<br/><br/>— Anuj Mishra · contact@anuj4u.in</p>`,
        }).catch((err) => console.warn("[linkedin-funnel] review email failed:", err));
      }
      return NextResponse.json({
        success: true,
        mode: "review",
        message: "Got it! I'll email your personal 30-day plan within 24 hours.",
      });
    }
    console.log(`✅ Generated ${content.length} content days for ${body.email}`);

    // ── Send email (hard fail if not configured) ──
    const emailResult = await sendEmail(body.email, body.linkedinUrl, content);
    const emailId = emailResult?.id || null;

    // ── Log to Google Sheets (non-blocking, optional) ──
    logToGoogleSheets(body, emailId).catch(() => {}); // fire-and-forget

    return NextResponse.json({
      success: true,
      mode: "plan",
      message: "Your 30-day content plan is on its way! Check your inbox.",
      daysGenerated: content.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("LinkedIn Funnel API Error:", message);

    // User-friendly error for email configuration issues
    if (message.startsWith("EMAIL_NOT_CONFIGURED:")) {
      return NextResponse.json(
        {
          error:
            "Email service not set up yet. Please contact Anuj directly at contact@anuj4u.in",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
