/**
 * Shared (client + server) LinkedIn URL parser and validator.
 * Accepts:
 *   linkedin.com/in/username
 *   linkedin.com/company/companyname
 * with or without https://, www., or trailing slashes.
 */

export interface LinkedInParsed {
  ok: true;
  url: string;
  slug: string;
  type: "in" | "company";
  displayName: string;
}

export interface LinkedInParseError {
  ok: false;
  error: string;
}

export type LinkedInParseResult = LinkedInParsed | LinkedInParseError;

const LINKEDIN_RE =
  /^(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/(in|company)\/([A-Za-z0-9_-]{3,100})(?:\/.*)?$/i;

/** Format slug like "satya-nadella" -> "Satya Nadella" */
function slugToDisplayName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function parseLinkedInUrl(input: string): LinkedInParseResult {
  let raw = (input || "").trim();

  // If user pasted just "in/username" or "/in/username"
  if (/^\/?in\/[A-Za-z0-9_-]{3,100}/i.test(raw)) {
    raw = `https://www.linkedin.com/${raw.replace(/^\//, "")}`;
  }

  if (!raw) {
    return { ok: false, error: "Please enter your LinkedIn profile link." };
  }

  const match = raw.match(LINKEDIN_RE);
  if (!match) {
    return {
      ok: false,
      error:
        "Please enter a valid LinkedIn URL, e.g. linkedin.com/in/your-name (open your profile and copy the browser URL).",
    };
  }

  const type = match[1].toLowerCase() as "in" | "company";
  const slug = match[2];

  // Prevent generic placeholder words like "your-name", "username", "profile", "sample"
  const banned = ["your-name", "username", "profile", "sample", "example", "my-profile"];
  if (banned.includes(slug.toLowerCase())) {
    return {
      ok: false,
      error: "Please enter your real LinkedIn profile URL, not the placeholder text.",
    };
  }

  return {
    ok: true,
    url: `https://www.linkedin.com/${type}/${slug}`,
    slug,
    type,
    displayName: slugToDisplayName(slug),
  };
}
