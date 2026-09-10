import { OgImage } from "@/lib/og";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Videos that hook. Strategy that scales.";
  const subtitle = searchParams.get("subtitle") ?? undefined;

  return OgImage({ title, subtitle }) as unknown as Response;
}
