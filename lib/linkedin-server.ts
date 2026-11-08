import { parseLinkedInUrl, LinkedInParsed } from "./linkedin";

export interface LinkedInProfileData {
  name: string;
  headline: string;
  slug: string;
  url: string;
  avatar: string | null;
  bio: string;
  detectedIndustry: string;
  type: "in" | "company";
}

export type LinkedInInspectResult =
  | { ok: true; profile: LinkedInProfileData }
  | { ok: false; error: string; code?: "INVALID_URL" | "NOT_FOUND" | "NETWORK_ERROR" };

function cleanText(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Server-side LinkedIn profile inspector.
 * Validates the profile address and extracts public title/headline when available.
 */
export async function inspectLinkedInProfile(input: string): Promise<LinkedInInspectResult> {
  const parsed = parseLinkedInUrl(input);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error, code: "INVALID_URL" };
  }

  let name = parsed.displayName;
  let headline = parsed.type === "company" ? "Organization / Company" : "Professional & Creator";
  let bio = "";
  let avatar: string | null = null;
  let detectedIndustry = "Business & Technology";

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 8000);

    const res = await fetch(parsed.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    if (res.status === 404) {
      return {
        ok: false,
        error: `Could not find a LinkedIn profile for "${parsed.slug}". Please verify your profile link.`,
        code: "NOT_FOUND",
      };
    }

    if (res.ok) {
      const html = await res.text();

      // Check if page explicitly says not found
      if (
        html.includes("Page not found") ||
        html.includes("This profile was not found") ||
        html.includes("<title>LinkedIn: Log In or Sign Up</title>")
      ) {
        // Continue with parsed slug if valid, but avoid 404s
      }

      const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
      const ogDescMatch = html.match(/<meta property="og:description" content="([^"]+)">/i);
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)">/i);

      if (ogTitleMatch?.[1]) {
        const fullTitle = cleanText(ogTitleMatch[1]);
        // e.g. "Bill Gates - Chair, Gates Foundation | LinkedIn"
        const withoutBrand = fullTitle.replace(/\s*\|\s*LinkedIn\s*$/i, "");
        const parts = withoutBrand.split(/\s*[-–—]\s*/);
        if (parts.length >= 2) {
          name = parts[0].trim();
          headline = parts.slice(1).join(" - ").trim();
        } else if (parts.length === 1 && parts[0]) {
          name = parts[0].trim();
        }
      }

      if (ogDescMatch?.[1]) {
        bio = cleanText(ogDescMatch[1]);
      }

      if (ogImageMatch?.[1] && !ogImageMatch[1].includes("static.licdn.com/aero-v1/sc/h/")) {
        avatar = ogImageMatch[1];
      }

      // Infer industry from headline and bio
      const corpus = `${headline} ${bio}`.toLowerCase();
      if (/b2b|saas|founder|ceo|executive|venture|investor/i.test(corpus)) {
        detectedIndustry = "Founders & B2B Leadership";
      } else if (/marketing|growth|content|copywriting|seo/i.test(corpus)) {
        detectedIndustry = "Marketing & Brand Growth";
      } else if (/software|engineer|ai|tech|developer|product/i.test(corpus)) {
        detectedIndustry = "Software, AI & Tech";
      } else if (/sales|revenue|consultant|coach/i.test(corpus)) {
        detectedIndustry = "Sales & Consulting";
      }
    }
  } catch (err) {
    console.warn("[linkedin-server] public fetch failed or timed out:", err);
  }

  return {
    ok: true,
    profile: {
      name,
      headline,
      slug: parsed.slug,
      url: parsed.url,
      avatar,
      bio,
      detectedIndustry,
      type: parsed.type,
    },
  };
}
