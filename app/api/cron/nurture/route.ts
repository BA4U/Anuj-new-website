import { NextRequest, NextResponse } from "next/server";
import { processDueNurture } from "@/lib/nurture";

// Always run fresh — this is a scheduled job, never cache it.
export const dynamic = "force-dynamic";

/**
 * Processes due nurture emails. Triggered by the Vercel Cron schedule defined in
 * vercel.json. Vercel automatically sends `Authorization: Bearer <CRON_SECRET>`.
 * When CRON_SECRET is unset (local/dev) the route is left open.
 */
async function run(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await processDueNurture();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Nurture cron failed:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return run(req);
}

export async function POST(req: NextRequest) {
  return run(req);
}
