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
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://anuj4u.in/contact?service=content-engine";
  const weakestFactorLabel =
    [...channel.factors].sort((a, b) => a.score - b.score)[0]?.label || "Title & Packaging CTR";
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
      I reviewed your channel layout, title/thumbnail packaging, intro pacing opportunities, and recent upload performance. Here is your structured 30-day roadmap. Want me to walk through your channel 1-on-1 and show you how we'd redesign your thumbnails and first-30-second hooks? <a href="${escapeHtml(bookingUrl)}" style="color:#4936e6;font-weight:600;">Book a free 15-min Channel Teardown with Anuj →</a>
    </p>
    ${rows}
    <div style="background:linear-gradient(135deg,#111827,#1f2937);border-radius:16px;padding:26px;margin-top:24px;text-align:center;color:#fff;">
      <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a5b4fc;margin:0 0 6px;">1-on-1 Channel Teardown</p>
      <p style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Want us to fix your thumbnails, titles &amp; retention for you?</p>
      <p style="font-size:13px;color:#d1d5db;margin:0 0 18px;line-height:1.6;">I partner 1-on-1 with selected creators to handle packaging, thumbnail design, and retention editing. Grab a 15-minute slot on my calendar and we&apos;ll map out your next 4 videos together.</p>
      <a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:#4936e6;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:10px;">Book Your Free 15-Min Strategy Call →</a>
    </div>
    <p style="font-size:13px;color:#374151;margin-top:18px;line-height:1.6;">
      <b>P.S.</b> Even fixing just your #1 bottleneck (${escapeHtml(weakestFactorLabel)}) on your next 3 uploads can noticeably lift browse CTR. If you want my eyes on your next title &amp; thumbnail before you hit publish, <a href="${escapeHtml(bookingUrl)}" style="color:#4936e6;font-weight:600;">grab a time on my calendar here</a>.
    </p>
    <p style="font-size:13px;color:#6b7280;margin-top:20px;text-align:center;">Anuj Mishra · Solo Growth Partner · <a href="mailto:contact@anuj4u.in" style="color:#4936e6;">contact@anuj4u.in</a></p>
  </div></body></html>`;
}

interface TitleIdea {
  original: string;
  suggestion: string;
  why: string;
}

function buildTitleSuggestions(channel: YouTubeChannelData): TitleIdea[] {
  const videos = channel.recentVideos.slice(0, 6);
  const ideas: TitleIdea[] = [];
  const niche = channel.detectedTopics[0] && channel.detectedTopics[0] !== "General Content"
    ? channel.detectedTopics[0]
    : "your niche";

  for (const v of videos) {
    if (ideas.length >= 2) break;
    const t = v.title.trim();
    if (!t) continue;

    if (t.length > 56) {
      const shortened = t.split(/[:|\-–—]/)[0].trim();
      const base = shortened.length >= 18 && shortened.length <= 46 ? shortened : t.slice(0, 44).trim();
      ideas.push({
        original: t,
        suggestion: `${base} (What Actually Happened)`,
        why: `Your original is ${t.length} chars and gets cut off on mobile browse feeds. Trimming under 52 chars + adding an open loop preserves the core payoff.`,
      });
    } else if (!t.includes("?") && !/\b(why|how|secret|truth|mistake|never|stop|tested|worth|actually|vs)\b/i.test(t)) {
      const isFirstPerson = /^(I'm|I |My |We )/i.test(t);
      const hasColon = t.includes(":");
      const suggestion = isFirstPerson
        ? `${t} (What Nobody Tells You)`
        : hasColon
        ? `${t.split(":")[0].trim()}: What Actually Matters`
        : `Why ${t} Matters More Than You Think`;
      ideas.push({
        original: t,
        suggestion,
        why: "The current title is clear and mobile-safe, which is great—testing a curiosity/stakes angle like this gives casual browse viewers a stronger reason to click.",
      });
    }
  }

  if (ideas.length === 0 && videos[0]) {
    ideas.push({
      original: videos[0].title,
      suggestion: `The Honest Truth About ${videos[0].title.slice(0, 36).trim()}…`,
      why: "Your recent titles already have solid punchy length for mobile. If you want to push CTR further, try A/B testing a direct, opinionated hook against your usual framing.",
    });
  }

  return ideas;
}

function reviewEmailHtml(channel: YouTubeChannelData, channelUrl: string) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://anuj4u.in/contact?service=content-engine";
  const sortedFactors = [...channel.factors].sort((a, b) => a.score - b.score);
  const weakest = sortedFactors[0];
  const strongFactors = channel.factors.filter((f) => f.score >= 75);
  const titleIdeas = buildTitleSuggestions(channel);
  const nicheLabel = channel.detectedTopics.slice(0, 2).join(" & ") || "your niche";

  const factorRows = channel.factors
    .map((f) => {
      const badgeBg = f.status === "strong" ? "#ecfdf5" : f.status === "warning" ? "#fffbeb" : "#fef2f2";
      const badgeText = f.status === "strong" ? "#047857" : f.status === "warning" ? "#b45309" : "#b91c1c";
      return `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <b style="font-size:13px;color:#111827;">${escapeHtml(f.label)}</b>
          <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:${badgeBg};color:${badgeText};">${f.score}/100</span>
        </div>
        <div style="font-size:11px;color:#6b7280;font-family:monospace;margin-bottom:4px;">${escapeHtml(f.metric)}</div>
        <div style="font-size:13px;color:#374151;line-height:1.5;">${escapeHtml(f.insight)}</div>
      </div>`;
    })
    .join("");

  const titleIdeasHtml =
    titleIdeas.length > 0
      ? `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:18px;margin:18px 0;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#4936e6;text-transform:uppercase;letter-spacing:0.8px;">Title Ideas You Can Try Next</p>
          ${titleIdeas
            .map(
              (idea) => `<div style="padding:10px 0;border-top:1px solid #f3f4f6;">
                <p style="margin:0 0 4px;font-size:12px;color:#6b7280;"><b>Current:</b> &ldquo;${escapeHtml(idea.original)}&rdquo;</p>
                <p style="margin:0 0 4px;font-size:13px;color:#111827;"><b>Try Instead:</b> <span style="color:#4936e6;font-weight:700;">&ldquo;${escapeHtml(idea.suggestion)}&rdquo;</span></p>
                <p style="margin:0;font-size:12px;color:#4b5563;line-height:1.5;">${escapeHtml(idea.why)}</p>
              </div>`
            )
            .join("")}
        </div>`
      : "";

  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:#111827;">
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:34px 24px;text-align:center;color:#fff;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a5b4fc;">Honest Channel Audit</p>
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;">${escapeHtml(channel.name)} (${escapeHtml(channel.handle)})</h1>
    <p style="margin:0;font-size:14px;color:#d1d5db;">Overall Channel Score: <b>${channel.overallScore}/100</b>${channel.subscriberCount ? ` · ${escapeHtml(channel.subscriberCount)}` : ""}</p>
  </div>
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <p style="font-size:14px;color:#374151;line-height:1.65;margin-top:0;">
      Hey! I ran an honest, multi-factor audit on <b>${escapeHtml(channel.name)}</b> (<a href="${escapeHtml(channelUrl)}" style="color:#4936e6;">${escapeHtml(channel.handle)}</a>) across ${channel.recentVideos.length} recent uploads in <b>${escapeHtml(nicheLabel)}</b>. Here is what&apos;s genuinely working, where you&apos;re leaving views on the table, and a few concrete tweaks you can try on your next upload:
    </p>
    ${
      strongFactors.length > 0
        ? `<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:15px 16px;margin-bottom:12px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.6px;">What's Already Working Well (Keep Doing This)</p>
            <ul style="margin:0;padding-left:18px;font-size:13px;color:#065f46;line-height:1.6;">
              ${strongFactors.map((f) => `<li><b>${escapeHtml(f.label)} (${f.score}/100):</b> ${escapeHtml(f.insight)}</li>`).join("")}
            </ul>
          </div>`
        : ""
    }
    ${
      weakest
        ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:15px 16px;margin-bottom:16px;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:0.6px;">#1 Opportunity to Unlock More Views (${weakest.score}/100)</p>
            <p style="margin:0;font-size:13px;color:#7f1d1d;line-height:1.55;"><b>${escapeHtml(weakest.label)}:</b> ${escapeHtml(weakest.insight)}</p>
          </div>`
        : ""
    }
    ${titleIdeasHtml}
    <div style="background:#fff;border-left:4px solid #4936e6;border-radius:12px;padding:14px 16px;margin-bottom:18px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#4936e6;text-transform:uppercase;letter-spacing:0.6px;">Quick Intro &amp; Retention Tip</p>
      <p style="margin:0;font-size:13px;color:#374151;line-height:1.55;">On your next video, skip any channel greeting or setup preamble—open in the first 8 seconds by confirming the exact promise of your title/thumbnail, then introduce one curiosity loop before the 30-second mark.</p>
    </div>
    ${factorRows}
    <div style="background:linear-gradient(135deg,#111827,#1f2937);border-radius:16px;padding:24px;margin-top:20px;text-align:center;color:#fff;">
      <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a5b4fc;margin:0 0 6px;">Personalized Walkthrough</p>
      <h2 style="font-size:18px;font-weight:700;margin:0 0 8px;color:#fff;">Want a custom teardown of your titles, thumbnails &amp; intros?</h2>
      <p style="font-size:13px;color:#d1d5db;margin:0 0 18px;line-height:1.6;">Book a free 15-minute call with me. We&apos;ll review your packaging live and map out the exact thumbnail &amp; hook changes to scale your next uploads.</p>
      <a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:#4936e6;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:10px;">Book a 1-on-1 Call with Anuj →</a>
    </div>
    <p style="font-size:13px;color:#374151;margin-top:18px;line-height:1.6;">
      <b>P.S.</b> If you&apos;d like us to handle your thumbnail design, title packaging, or retention editing so you can focus purely on filming, <a href="${escapeHtml(bookingUrl)}" style="color:#4936e6;font-weight:600;">grab a quick slot on my calendar here</a>.
    </p>
    <p style="margin-top:20px;font-size:13px;color:#6b7280;text-align:center;">Anuj Mishra · Solo Growth Partner · <a href="mailto:contact@anuj4u.in" style="color:#4936e6;">contact@anuj4u.in</a></p>
  </div></body></html>`;
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
