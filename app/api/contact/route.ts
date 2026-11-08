import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendFunnelEmail, logToSheets, forwardToFormWebhook, isEmailConfigured } from "@/lib/funnel";
import { db } from "@/lib/firebase";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();

    // ── Validate inputs ──
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── 1. Save to Firebase Firestore (non-blocking fallback) ──
    let firestoreId: string | null = null;
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: body.name,
        email: body.email,
        subject: body.subject || "General Inquiry",
        message: body.message,
        createdAt: serverTimestamp(),
      });
      firestoreId = docRef.id;
    } catch (err) {
      console.warn("Firestore save skipped/failed (continuing with email/webhook):", err);
    }

    // ── 2. Log to Google Sheets (non-blocking) ──
    await logToSheets({
      funnel: "contact-form",
      source: "website-contact",
      name: body.name,
      email: body.email,
      subject: body.subject || "General Inquiry",
      message: body.message,
    });

    // ── 3. Forward to external form webhook (Freeform / Formspree) if configured ──
    const webhookForwarded = await forwardToFormWebhook({
      name: body.name,
      email: body.email,
      subject: body.subject || "General Inquiry",
      message: body.message,
    });

    // ── 4. Send email notification to Admin (Resend) ──
    const emailHtml = buildContactEmailHtml(body);
    const adminEmail = process.env.ADMIN_EMAIL || "contact@anuj4u.in";
    let emailSent = false;
    let emailErrorMessage = "";

    try {
      await sendFunnelEmail({
        to: adminEmail,
        replyTo: body.email,
        subject: `New Inquiry from ${body.name}: ${body.subject || "General Inquiry"}`,
        html: emailHtml,
      });
      emailSent = true;
    } catch (err: unknown) {
      emailErrorMessage = err instanceof Error ? err.message : "Unknown email error";
      console.error("Resend notification error:", emailErrorMessage);
    }

    // ── 5. Send automated confirmation receipt to the lead ──
    if (emailSent) {
      try {
        await sendFunnelEmail({
          to: body.email,
          replyTo: adminEmail,
          subject: `Received: Your inquiry with Anuj Mishra`,
          html: buildConfirmationEmailHtml(body),
        });
      } catch (confirmErr) {
        console.warn("Client auto-confirmation skipped:", confirmErr);
      }
    }

    // If neither Resend nor Webhook succeeded and email was not configured, alert user gracefully
    if (!emailSent && !webhookForwarded && !firestoreId) {
      if (emailErrorMessage.startsWith("EMAIL_NOT_CONFIGURED:")) {
        return NextResponse.json(
          {
            error:
              "Email service not configured yet. Please email Anuj directly at contact@anuj4u.in",
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          error:
            "Could not deliver message right now. Please email directly at contact@anuj4u.in",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent. Anuj will get back to you shortly.",
      firestoreId: firestoreId || undefined,
      emailSent,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildConfirmationEmailHtml(body: ContactRequestBody): string {
  const subject = body.subject || "General Inquiry";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:580px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
    <div style="background:linear-gradient(135deg,#4936e6,#8b5cf6);padding:28px 24px;text-align:center;color:#ffffff;">
      <h1 style="margin:0;font-size:22px;font-weight:700;">We received your message</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Anuj Mishra · Growth Studio</p>
    </div>
    <div style="padding:28px 24px;line-height:1.6;font-size:15px;">
      <p style="margin:0 0 16px;">Hi <b>${body.name}</b>,</p>
      <p style="margin:0 0 16px;">Thanks for reaching out regarding <b>${subject}</b>. I've received your inquiry and will personally review it and get back to you within 24 to 48 hours.</p>
      <div style="background:#f1f5f9;border-left:4px solid #4936e6;padding:14px 16px;border-radius:6px;margin:20px 0;font-size:14px;color:#475569;">
        <i>&ldquo;${body.message}&rdquo;</i>
      </div>
      <p style="margin:0 0 20px;">In the meantime, feel free to check out some of our recent channel case studies and breakdown guides:</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://anuj4u.in/work" style="display:inline-block;background:#4936e6;color:#ffffff;font-weight:600;padding:12px 28px;border-radius:9999px;text-decoration:none;font-size:14px;">Explore Recent Work & Case Studies →</a>
      </div>
      <p style="margin:24px 0 0;font-size:14px;color:#64748b;">Best regards,<br><b style="color:#1e293b;">Anuj Mishra</b><br>Founder & Growth Strategist</p>
    </div>
    <div style="border-top:1px solid #e2e8f0;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;background:#fafafa;">
      <p style="margin:0;">Anuj Mishra · contact@anuj4u.in · <a href="https://anuj4u.in" style="color:#4936e6;text-decoration:none;">anuj4u.in</a></p>
    </div>
  </div>
</body>
</html>`;
}

function buildContactEmailHtml(body: ContactRequestBody): string {
  const subject = body.subject || "General Inquiry";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:32px 24px;text-align:center;">
    <h1 style="color:white;font-size:24px;font-weight:800;margin:0;">📬 New Contact Submission</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:13px;margin:8px 0 0;">via anuj4u.in</p>
  </div>

  <!-- Body -->
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">

    <!-- Sender Info -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:18px;font-weight:700;margin:0 0 16px;">Sender Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;width:120px;">Name</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${body.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;">Email</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;"><a href="mailto:${body.email}" style="color:#0A66C2;">${body.email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;">Subject</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${subject}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:18px;font-weight:700;margin:0 0 16px;">Message</h2>
      <div style="color:#374151;font-size:14px;line-height:1.7;white-space:pre-line;">${body.message}</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:24px;">
      <a href="mailto:${body.email}" style="display:inline-block;background:#0A66C2;color:white;font-weight:700;padding:12px 28px;border-radius:12px;text-decoration:none;font-size:14px;">Reply to ${body.name} →</a>
    </div>

  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
    <p style="margin:0;">Anuj Mishra · contact@anuj4u.in · <a href="https://anuj4u.in" style="color:#6355FF;">anuj4u.in</a></p>
  </div>
</body>
</html>`;
}