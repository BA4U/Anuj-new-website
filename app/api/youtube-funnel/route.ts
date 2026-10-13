import { NextRequest, NextResponse } from "next/server";
import { parseChannelUrl, EMAIL_RE } from "@/lib/youtube";
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

function buildPrompt(channelUrl: string, label: string) {
  return `You are a senior YouTube growth strategist. Build a 30-day YouTube plan for the channel ${channelUrl} (handle/identifier: ${label}).

IMPORTANT HONESTY RULES:
- You cannot see this channel's analytics. Infer the likely niche ONLY from the handle. If the niche is unclear, keep advice niche-agnostic.
- Do NOT invent subscriber counts, view counts, retention numbers or claims about specific videos.
- Phrase each day as a concrete action the creator can do (a video to make or a fix to apply).

Return ONLY a JSON array of exactly 30 objects, no markdown:
[{"day":1,"type":"Hook Fix | Thumbnail + Title | New Video | Shorts | Community | Audit","pillar":"Retention | Packaging | Discovery | Audience | Consistency","fix":"the action in 1-2 sentences","title_ideas":["title option 1","title option 2"],"thumbnail_direction":"one sentence","why":"1-2 sentences on why this moves watch time or CTR","metric_to_watch":"one metric e.g. CTR, average view duration, impressions"}]

Mix the pillars across the month and make the plan build progressively. Every hook/title must be unique.`;
}

function planEmailHtml(channelUrl: string, plan: PlanDay[]) {
  const rows = plan
    .map(
      (d) => `
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:14px;">
      <div style="font-size:12px;color:#6b7280;margin-bottom:6px;">Day ${escapeHtml(String(d.day))} · ${escapeHtml(d.type)} · ${escapeHtml(d.pillar)}</div>
      <div style="font-size:15px;font-weight:700;color:#111827;line-height:1.5;margin-bottom:10px;">${escapeHtml(d.fix)}</div>
      <div style="font-size:13px;color:#374151;margin-bottom:6px;"><b>Title ideas:</b> ${(d.title_ideas || []).map((t) => escapeHtml(t)).join(" &nbsp;|&nbsp; ")}</div>
      <div style="font-size:13px;color:#374151;margin-bottom:6px;"><b>Thumbnail:</b> ${escapeHtml(d.thumbnail_direction)}</div>
      <div style="font-size:13px;color:#4936e6;margin-bottom:6px;"><b>Why:</b> ${escapeHtml(d.why)}</div>
      <div style="font-size:12px;color:#6b7280;">Watch: ${escapeHtml(d.metric_to_watch)}</div>
    </div>`
    )
    .join("");
  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#4936e6,#8b5cf6);padding:36px 24px;text-align:center;color:#fff;">
    <h1 style="margin:0 0 8px;font-size:26px;">Your 30-day YouTube plan</h1>
    <p style="margin:0;font-size:13px;opacity:.85;">${escapeHtml(channelUrl)}</p>
  </div>
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <p style="font-size:14px;color:#374151;line-height:1.6;">This plan is built from best practice for your likely niche — I haven't seen your private analytics yet. Reply to this email with a screenshot of your last 90 days in YouTube Studio and I'll tell you which three days matter most for <i>your</i> channel.</p>
    ${rows}
    <p style="font-size:13px;color:#6b7280;margin-top:24px;">— Anuj Mishra · <a href="mailto:contact@anuj4u.in">contact@anuj4u.in</a></p>
  </div></body></html>`;
}

function reviewEmailHtml(channelUrl: string) {
  return `<!DOCTYPE html><html><body style="font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#111827;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;">
  <h2 style="color:#4936e6;">Got your channel ✅</h2>
  <p>Thanks — I've received <b>${escapeHtml(channelUrl)}</b>.</p>
  <p>I'll review it personally and send your 30-day plan within 24 hours. If you want it sharper, reply with a screenshot of your last 90 days from YouTube Studio.</p>
  <p>— Anuj Mishra<br/><a href="mailto:contact@anuj4u.in">contact@anuj4u.in</a></p></body></html>`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in an hour." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { channelUrl: rawUrl, email: rawEmail, website } = body as Record<string, string>;

    // Honeypot — real users never fill this hidden field
    if (website) return NextResponse.json({ ok: true, mode: "review" });

    const parsed = parseChannelUrl(rawUrl);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const email = (rawEmail || "").trim();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // 1) Generate the plan (null when AI isn't configured / fails)
    const raw = await geminiJson<PlanDay[] | { plan: PlanDay[] }>(buildPrompt(parsed.url, parsed.label));
    const plan = Array.isArray(raw) ? raw : raw?.plan;
    const hasPlan = Array.isArray(plan) && plan.length >= 7;

    // 2) Always record the lead somewhere durable
    const sheetOk = await logLead({
      source: "youtube-funnel",
      email,
      channelUrl: parsed.url,
      status: hasPlan ? "plan-generated" : "needs-manual-review",
    });

    if (!emailConfigured()) {
      if (sheetOk) return NextResponse.json({ ok: true, mode: "review" });
      console.error("[youtube-funnel] No RESEND_API_KEY and no GOOGLE_SHEETS_WEBHOOK_URL — lead NOT captured:", email, parsed.url);
      return NextResponse.json(
        { error: "Our email service isn't set up yet. Please email contact@anuj4u.in with your channel link and I'll send your plan personally." },
        { status: 503 }
      );
    }

    // 3) Tell Anuj, then email the lead
    await notifyAdmin(
      `New YouTube funnel lead — ${parsed.label}`,
      `<p><b>${escapeHtml(email)}</b> submitted <a href="${escapeHtml(parsed.url)}">${escapeHtml(parsed.url)}</a></p><p>Plan auto-generated: <b>${hasPlan ? "yes" : "NO — follow up manually"}</b></p>`
    );

    try {
      await sendEmail({
        to: [email],
        subject: hasPlan ? "Your 30-day YouTube plan is ready" : "Got your channel — your plan is coming",
        html: hasPlan ? planEmailHtml(parsed.url, plan as PlanDay[]) : reviewEmailHtml(parsed.url),
      });
    } catch (e) {
      console.error("[youtube-funnel] lead email failed:", e);
      return NextResponse.json(
        { error: "We couldn't send the email right now. Please try again, or email contact@anuj4u.in." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: hasPlan ? "plan" : "review" });
  } catch (err) {
    console.error("[youtube-funnel] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
