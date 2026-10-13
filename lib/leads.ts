/**
 * Server-only helpers shared by the lead-magnet funnels (YouTube + LinkedIn):
 * Resend email, Google-Sheets lead log, Gemini JSON generation, tiny rate limiter.
 * Every env var is optional — callers decide how to degrade honestly.
 */

export const escapeHtml = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

/** Send one email through Resend. Throws with a readable message on failure. */
export async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("EMAIL_NOT_CONFIGURED");
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Anuj Mishra <${from}>`,
      to: opts.to,
      reply_to: opts.replyTo || "contact@anuj4u.in",
      subject: opts.subject,
      html: opts.html,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[resend] error:", data);
    throw new Error(`EMAIL_SEND_FAILED: ${data?.message || data?.name || res.status}`);
  }
  return data?.id ?? null;
}

/** Notify Anuj of a new lead. Never throws. */
export async function notifyAdmin(subject: string, html: string): Promise<void> {
  const admin = process.env.ADMIN_EMAIL;
  if (!admin || !emailConfigured()) return;
  try {
    await sendEmail({ to: [admin], subject, html });
  } catch (e) {
    console.warn("[leads] admin notification failed:", e);
  }
}

/** Append the lead to a Google Sheet via an Apps Script webhook. Returns true if the webhook accepted it. */
export async function logLead(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return false;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString(), ...payload }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    return res.ok;
  } catch (e) {
    console.warn("[leads] sheet log failed:", e);
    return false;
  }
}

/** Ask Gemini for JSON. Returns null (never throws) when no key / model error / bad JSON. */
export async function geminiJson<T>(prompt: string, maxOutputTokens = 8192): Promise<T | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 50000);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens, responseMimeType: "application/json" },
        }),
        signal: ctrl.signal,
      }
    );
    clearTimeout(t);
    if (!res.ok) {
      console.error("[gemini] HTTP", res.status, (await res.text()).slice(0, 300));
      return null;
    }
    const json = await res.json();
    const text: string = json?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
    return JSON.parse(text) as T;
  } catch (e) {
    console.error("[gemini] failed:", e);
    return null;
  }
}

/** Best-effort per-IP limiter (in-memory: resets per serverless instance, still stops casual abuse). */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}
