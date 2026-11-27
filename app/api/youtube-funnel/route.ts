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
  whatsWorking?: string[];
  problemsFound?: string[];
  auditSummary: string;
  plan: PlanDay[];
}

function buildPrompt(channel: YouTubeChannelData, channelUrl: string) {
  const recentTitlesFormatted =
    channel.recentVideos.length > 0
      ? channel.recentVideos
          .slice(0, 10)
          .map(
            (v, i) =>
              `${i + 1}. "${v.title}" (${v.published?.slice(0, 10)}${
                typeof v.views === "number" ? ` · ${v.views.toLocaleString()} views` : ""
              })`
          )
          .join("\n")
      : "No public recent uploads found in RSS feed.";

  const factorLines = channel.factors
    .map((f) => `- ${f.label}: ${f.score}/100 (${f.metric}) — ${f.insight}`)
    .join("\n");

  return `You are Anuj Mishra, an expert YouTube growth partner, thumbnail/packaging strategist, and retention editor.
Perform an HONEST, grounded, custom 30-day YouTube growth audit and plan for this specific creator.

CHANNEL METADATA AUDITED:
- Channel Name: ${channel.name}
- Channel Handle: ${channel.handle}
- Channel URL: ${channelUrl}
- Subscribers: ${channel.subscriberCount || "Unknown"} · Total Videos: ${channel.totalVideos || "Unknown"}
- Overall Channel Health Score: ${channel.overallScore}/100
- Channel Bio / About: ${channel.description || "No bio provided."}
- Detected Topics: ${channel.detectedTopics.join(", ") || "General"}
- Top Outlier Video: ${channel.topVideo ? `"${channel.topVideo.title}" (${channel.topVideo.views.toLocaleString()} views)` : "N/A"}

MULTI-FACTOR DIAGNOSTICS:
${factorLines}

RECENT UPLOADS (${channel.recentVideos.length} scanned):
${recentTitlesFormatted}

CRITICAL VALUE & HONESTY RULES:
1. BE HONEST AND NICHE-AWARE: If something is genuinely strong for their niche (e.g., consistent cadence, punchy title length, strong outlier format, good CTA links), explicitly appreciate and credit it in "whatsWorking". Do NOT invent fake flaws.
2. PINPOINT REAL PROBLEMS: In "problemsFound", call out the real bottlenecks holding back clicks and watch time — specifically across:
   - Titles (e.g., mobile truncation, missing curiosity gap/open loop, overly descriptive phrasing)
   - Thumbnails & visual packaging (contrast, focal point, text-to-title complementarity — and note where professional thumbnail design can lift CTR)
   - Intros & first 30 seconds (slow warmups/preambles vs immediate payoff & curiosity tension)
   - Cadence, chapters, or topic positioning gaps
3. Ground every day of the 30-day plan in their ACTUAL niche, recent video titles, view outliers, and weakest factor scores.
4. Provide original title ideas and concrete thumbnail directions specifically designed for this channel's audience.
5. Return ONLY a valid JSON object matching this schema, no markdown or extra commentary:

{
  "whatsWorking": [
    "Specific strength observed from their real channel/niche/metrics",
    "Another genuine strength worth doubling down on"
  ],
  "problemsFound": [
    "Specific title/thumbnail/intro/retention problem observed from their channel data",
    "Another concrete bottleneck and how fixing it (or delegating thumbnail design / retention editing) unlocks growth"
  ],
  "auditSummary": "2-3 sentences summarizing the honest verdict: what they are doing right for their niche, the #1 packaging/intro/retention bottleneck, and their highest-leverage growth move.",
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

function planEmailHtml(
  channel: YouTubeChannelData,
  channelUrl: string,
  auditSummary: string,
  plan: PlanDay[],
  whatsWorking: string[] = [],
  problemsFound: string[] = []
) {
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

  const strengthsHtml =
    whatsWorking.length > 0
      ? `<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:16px;margin-bottom:14px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:1px;">What's Already Working Well</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#065f46;line-height:1.6;">
            ${whatsWorking.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}
          </ul>
        </div>`
      : "";

  const problemsHtml =
    problemsFound.length > 0
      ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:1px;">Key Bottlenecks Found (Titles, Thumbnails &amp; Intros)</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#7f1d1d;line-height:1.6;">
            ${problemsFound.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
          </ul>
        </div>`
      : "";

  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:40px 24px;text-align:center;color:#fff;">
    ${avatarSnippet}
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;">Custom 30-Day Growth Plan</h1>
    <p style="margin:0;font-size:14px;color:#9ca3af;">Audited for <b>${escapeHtml(channel.name)}</b> (${escapeHtml(channel.handle)}) · Score: ${channel.overallScore}/100</p>
  </div>
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    ${
      auditSummary
        ? `<div style="background:#fff;border-left:4px solid #4936e6;border-radius:12px;padding:18px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#4936e6;text-transform:uppercase;letter-spacing:1px;">Channel Audit Verdict</p>
        <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.6;">${escapeHtml(auditSummary)}</p>
      </div>`
        : ""
    }
    ${strengthsHtml}
    ${problemsHtml}
    <p style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:20px;">
      I reviewed your channel layout, title/thumbnail packaging, intro pacing opportunities, and recent upload performance. Here is your structured 30-day roadmap. Want a deeper, personalized walkthrough of your channel or help with thumbnail design and retention editing? <a href="https://anuj4u.in/contact" style="color:#4936e6;font-weight:600;">Book a 1-on-1 call with Anuj</a>.
    </p>
    ${rows}
    <div style="background:#fff;border-radius:14px;padding:20px;margin-top:24px;text-align:center;border:1px solid #e5e7eb;">
      <p style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px;">Want me to design your thumbnails or manage your channel?</p>
      <p style="font-size:13px;color:#6b7280;margin:0 0 14px;">I partner 1-on-1 with selected creators to scale CTR, retention, and views.</p>
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
  <p>Want a more personalized breakdown of your titles, thumbnails, and video intros? <a href="https://anuj4u.in/contact" style="color:#4936e6;font-weight:600;">Book a 1-on-1 call with Anuj</a>.</p>
  <p style="margin:20px 0;">
    <a href="https://anuj4u.in/contact" style="display:inline-block;background:#4936e6;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;">Book a Call with Anuj</a>
  </p>
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
    let whatsWorking: string[] = [];
    let problemsFound: string[] = [];

    if (Array.isArray(aiResponse)) {
      plan = aiResponse;
    } else if (aiResponse && typeof aiResponse === "object") {
      plan = Array.isArray(aiResponse.plan) ? aiResponse.plan : [];
      auditSummary = typeof aiResponse.auditSummary === "string" ? aiResponse.auditSummary : "";
      whatsWorking = Array.isArray(aiResponse.whatsWorking) ? aiResponse.whatsWorking : [];
      problemsFound = Array.isArray(aiResponse.problemsFound) ? aiResponse.problemsFound : [];
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
          ? planEmailHtml(channel, parsed.url, auditSummary, plan, whatsWorking, problemsFound)
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
