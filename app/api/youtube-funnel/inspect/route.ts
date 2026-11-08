import { NextRequest, NextResponse } from "next/server";
import { inspectYouTubeChannel } from "@/lib/youtube-server";
import { rateLimited } from "@/lib/leads";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip, 20, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many checks. Please wait a few minutes." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { channelUrl } = body as { channelUrl?: string };

    if (!channelUrl || typeof channelUrl !== "string") {
      return NextResponse.json({ error: "Please enter your YouTube channel link or @handle." }, { status: 400 });
    }

    const result = await inspectYouTubeChannel(channelUrl);
    if (!result.ok) {
      return NextResponse.json({ error: result.error, code: result.code }, { status: 400 });
    }

    return NextResponse.json({ ok: true, channel: result.channel });
  } catch (err) {
    console.error("[api/youtube-funnel/inspect] Error:", err);
    return NextResponse.json({ error: "Failed to inspect channel. Please try again." }, { status: 500 });
  }
}
