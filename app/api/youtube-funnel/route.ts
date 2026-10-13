import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channelUrl, email, niche, goal } = body;

    if (!channelUrl || !email) {
      return NextResponse.json(
        { error: "channelUrl and email are required" },
        { status: 400 }
      );
    }

    // Placeholder responder — mirrors the LinkedIn funnel route shape.
    // Replace with real ingestion (SendGrid / Resend / your email worker) when ready.
    console.log(
      "[youtube-funnel] queued:",
      JSON.stringify({ channelUrl, email, niche, goal }, null, 2)
    );

    return NextResponse.json(
      { ok: true, deliveredTo: email },
      { status: 200 }
    );
  } catch (err) {
    console.error("[youtube-funnel] error:", err);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
