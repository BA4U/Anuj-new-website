import { NextRequest, NextResponse } from "next/server";
import { inspectLinkedInProfile } from "@/lib/linkedin-server";
import { rateLimited } from "@/lib/leads";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip, 20, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many checks. Please wait a few minutes." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { linkedinUrl } = body as { linkedinUrl?: string };

    if (!linkedinUrl || typeof linkedinUrl !== "string") {
      return NextResponse.json({ error: "Please enter your LinkedIn profile URL." }, { status: 400 });
    }

    const result = await inspectLinkedInProfile(linkedinUrl);
    if (!result.ok) {
      return NextResponse.json({ error: result.error, code: result.code }, { status: 400 });
    }

    return NextResponse.json({ ok: true, profile: result.profile });
  } catch (err) {
    console.error("[api/linkedin-funnel/inspect] Error:", err);
    return NextResponse.json({ error: "Failed to inspect profile. Please try again." }, { status: 500 });
  }
}
