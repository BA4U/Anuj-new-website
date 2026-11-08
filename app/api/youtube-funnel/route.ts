import { NextRequest, NextResponse } from "next/server";
import { parseChannelUrl, EMAIL_RE } from "@/lib/youtube";
import { inspectYouTubeChannel, YouTubeChannelData } from "@/lib/youtube-server";
import {
  escapeHtml,
  emailConfigured,
  sendEmail,
  notifyAdmin,
  logLead,
  geminiJson,
  rateLimited,
} from "@/lib/leads";

export const maxDuration = 60;

interface PlanDay {
  day: number;
  type: string;
  pillar: string;
  fix: string;
  title_ideas: string[];
  thumbnail_direction: string;
  why: string;
  metric_to_watch: string;
}

interface StrategyResponse {
  auditSummary: string;
  plan: PlanDay[];
}

function buildPrompt(channel: YouTubeChannelData, channelUrl: string) {
  const recentTitlesFormatted =
    channel.recentVideos.length > 0
      ? channel.recentVideos
          .slice(0, 8)
          .map((v, i) => `${i + 1}. "${v.title}" (${v.published?.slice(0, 10)})`)
          .join("\n")
      : "No public recent uploads found in RSS feed.";

  return `You are Anuj Mishra, an expert YouTube growth partner and retention strategist.
Perform a genuine, custom 30-day YouTube growth plan and audit for this specific creator.

CHANNEL METADATA AUDITED:
- Channel Name: ${channel.name}
- Channel Handle: ${channel.handle}
- Channel URL: ${channelUrl}
- Channel Bio / About: ${channel.description || "No bio provided."}
- Detected Topics: ${channel.detectedTopics.join(", ") || "General"}
- Real Recent Uploads (${channel.recentVideos.length} scanned):
${recentTitlesFormatted}
- Packaging Observations: ${channel.packagingNotes.join("; ")}

CRITICAL VALUE RULES:
1. Ground the advice in their ACTUAL niche and recent video titles. Do NOT produce generic, boilerplate creator tips.
2. Critique what works and what's missing in their actual packaging (e.g. title curiosity, topic selection, mobile truncation).
3. Every single day of the 30-day plan must be a concrete, bespoke action tailored to their subject matter.
4. Provide original title ideas and thumbnail concepts specifically designed for this channel's audience.
5. Return ONLY a valid JSON object matching this schema, no markdown or extra commentary:

{
  "auditSummary": "2-3 sentences critiquing their current upload packaging, what specific content angle is under-exploited in their niche, and their primary growth lever.",
  "plan": [
    {
      "day": 1,
      "type": "Hook Fix | Thumbnail + Title | New Video | Shorts | Community | Audit",
      "pillar": "Retention | Packaging | Discovery | Audience | Consistency",
      "fix": "Actionable 1-2 sentence instruction specifically relevant to their channel's themes",
      "title_ideas": ["Specific title 1 tailored to their niche", "Specific title 2 tailored to their niche"],
      "thumbnail_direction": "Concrete visual layout, subject framing, and 3-word overlay text",
      "why": "1-2 sentences on how this moves average view duration or click-through rate",
      "metric_to_watch": "Specific metric e.g. CTR, Average percentage viewed, First 30s retention"
    }
  ]
}

Ensure the "plan" array contains exactly 30 unique, progressively structured days.`;
}

function planEmailHtml(channel: YouTubeChannelData, channelUrl: string, auditSummary: string, plan: PlanDay[]) {
  const rows = plan
    .map(
      (d) => `
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:14px;">
      <div style="font-size:12px;font-weight:600;color:#6b7280;margin-bottom:6px;">Day ${escapeHtml(String(d.day))} · ${escapeHtml(d.type)} · ${escapeHtml(d.pillar)}</div>
      <div style="font-size:15px;font-weight:700;color:#111827;line-height:1.5;margin-bottom:10px;">${escapeHtml(d.fix)}</div>
      <div style="font-size:13px;color:#374151;margin-bottom:6px;"><b>Title ideas:</b> ${(d.title_ideas || []).map((t) => escapeHtml(t)).join(" &nbsp;|&nbsp; ")}</div>
      <div style="font-size:13px;color:#374151;margin-bottom:6px;"><b>Thumbnail direction:</b> ${escapeHtml(d.thumbnail_direction)}</div>
      <div style="font-size:13px;color:#4936e6;margin-bottom:6px;"><b>Why this works:</b> ${escapeHtml(d.why)}</div>
      <div style="font-size:12px;color:#6b7280;"><b>Key metric:</b> ${escapeHtml(d.metric_to_watch)}</div>
    </div>`
    )
    .join("");

  const avatarSnippet = channel.avatar
    ? `<img src="${escapeHtml(channel.avatar)}" alt="${escapeHtml(channel.name)}" style="width:64px;height:64px;border-radius:50%;border:2px solid #fff;margin-bottom:12px;display:inline-block;" />`
    : "";

  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:40px 24px;text-align:center;color:#fff;">
    ${avatarSnippet}
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;">Custom 30-Day Growth Plan</h1>
    <p style="margin:0;font-size:14px;color:#9ca3af;">Audited for <b>${escapeHtml(channel.name)}</b> (${escapeHtml(channel.handle)})</p>
  </div>
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    ${
      auditSummary
        ? `<div style="background:#fff;border-left:4px solid #4936e6;border-radius:12px;padding:18px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#4936e6;text-transform:uppercase;letter-spacing:1px;">Channel Audit Findings</p>
        <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.6;">${escapeHtml(auditSummary)}</p>
      </div>`
        : ""
    }
    <p style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:20px;">
      I personally reviewed your channel layout and recent upload topics. Here is your structured 30-day roadmap. If you want me to analyze your private retention graphs, reply to this email with a screenshot of your last 90 days from YouTube Studio.
    </p>
    ${rows}
    <div style="background:#fff;border-radius:14px;padding:20px;margin-top:24px;text-align:center;border:1px solid #e5e7eb;">
      <p style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px;">Want me to manage or edit your channel full-time?</p>
      <p style="font-size:13px;color:#6b7280;margin:0 0 14px;">I partner 1-on-1 with selected creators to scale retention, packaging, and views.</p>
      <a href="https://anuj4u.in/contact" style="display:inline-block;background:#4936e6;color:#fff;text-decoration:none;font-weight:600;font-size:13px;padding:10px 20px;border-radius:8px;">Schedule Strategy Call</a>
    </div>
    <p style="font-size:13px;color:#6b7280;margin-top:24px;text-align:center;">Anuj Mishra · Solo Growth Partner · <a href="mailto:contact@anuj4u.in" style="color:#4936e6;">contact@anuj4u.in</a></p>
  </div></body></html>`;
}

function reviewEmailHtml(channel: YouTubeChannelData, channelUrl: string) {
  return `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:#111827;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;">
  <h2 style="color:#4936e6;margin-bottom:12px;">Auditing Your Channel: ${escapeHtml(channel.name)} ✅</h2>
  <p>Thanks for sharing your channel! I received <b>${escapeHtml(channel.name)}</b> (${escapeHtml(channelUrl)}).</p>
  <p>I'm reviewing your recent uploads and will send your full 30-day strategy within 24 hours.</p>
  <p>If you'd like even sharper retention advice, reply with a screenshot of your last 90 days from YouTube Studio.</p>
  <p style="margin-top:24px;">Best regards,<br/><b>Anuj Mishra</b><br/><a href="mailto:contact@anuj4u.in" style="color:#4936e6;">contact@anuj4u.in</a></p></body></html>`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip, 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please try again in an hour." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { channelUrl: rawUrl, email: rawEmail, website } = body as Record<string, string>;

    // Honeypot check
    if (website) return NextResponse.json({ ok: true, mode: "review" });

    const parsed = parseChannelUrl(rawUrl);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const email = (rawEmail || "").trim();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // 1) Real YouTube Channel Inspection & Verification
    const inspection = await inspectYouTubeChannel(parsed.url);
    if (!inspection.ok) {
      return NextResponse.json({ error: inspection.error }, { status: 400 });
    }
    const channel = inspection.channel;

    // 2) Generate tailored plan via Gemini with actual channel context
    const aiResponse = await geminiJson<StrategyResponse | PlanDay[]>(buildPrompt(channel, parsed.url));
    let plan: PlanDay[] = [];
    let auditSummary = "";

    if (Array.isArray(aiResponse)) {
      plan = aiResponse;
    } else if (aiResponse && typeof aiResponse === "object") {
      plan = Array.isArray(aiResponse.plan) ? aiResponse.plan : [];
      auditSummary = typeof aiResponse.auditSummary === "string" ? aiResponse.auditSummary : "";
    }

    const hasPlan = Array.isArray(plan) && plan.length >= 7;

    // 3) Log verified lead with real channel details
    const sheetOk = await logLead({
      source: "youtube-funnel",
      email,
      channelUrl: parsed.url,
      channelName: channel.name,
      channelHandle: channel.handle,
      recentUploadCount: channel.recentVideos.length,
      topics: channel.detectedTopics.join(", "),
      status: hasPlan ? "plan-generated" : "needs-manual-review",
    });

    if (!emailConfigured()) {
      if (sheetOk) return NextResponse.json({ ok: true, mode: "review", channel });
      console.error("[youtube-funnel] No RESEND_API_KEY and no GOOGLE_SHEETS_WEBHOOK_URL, lead NOT captured:", email, parsed.url);
      return NextResponse.json(
        { error: "Our email service is currently unavailable. Please email contact@anuj4u.in directly with your channel link." },
        { status: 503 }
      );
    }

    // 4) Notify Anuj of real verified lead
    await notifyAdmin(
      `New YouTube Audit Lead: ${channel.name} (${channel.handle})`,
      `<p><b>Email:</b> ${escapeHtml(email)}</p>
       <p><b>Channel:</b> <a href="${escapeHtml(parsed.url)}">${escapeHtml(channel.name)}</a> (${escapeHtml(channel.handle)})</p>
       <p><b>Recent Uploads Scanned:</b> ${channel.recentVideos.length}</p>
       <p><b>Detected Topics:</b> ${escapeHtml(channel.detectedTopics.join(", "))}</p>
       ${auditSummary ? `<p><b>Audit:</b> ${escapeHtml(auditSummary)}</p>` : ""}
       <p><b>Plan Generated:</b> ${hasPlan ? "Yes (30 days sent)" : "Needs manual follow up"}</p>`
    );

    // 5) Send customized email to the creator
    try {
      await sendEmail({
        to: [email],
        subject: hasPlan
          ? `Your 30-Day YouTube Growth Plan for ${channel.name}`
          : `Auditing ${channel.name}: Your YouTube Plan is Coming`,
        html: hasPlan
          ? planEmailHtml(channel, parsed.url, auditSummary, plan)
          : reviewEmailHtml(channel, parsed.url),
      });
    } catch (e) {
      console.error("[youtube-funnel] lead email failed:", e);
      return NextResponse.json(
        { error: "We could not deliver the email. Please check your email address or write to contact@anuj4u.in." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      mode: hasPlan ? "plan" : "review",
      channel: {
        name: channel.name,
        handle: channel.handle,
        avatar: channel.avatar,
        detectedTopics: channel.detectedTopics,
        recentCount: channel.recentVideos.length,
      },
    });
  } catch (err) {
    console.error("[youtube-funnel] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
