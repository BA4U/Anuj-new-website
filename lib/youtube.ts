/**
 * Shared (client + server) YouTube channel URL handling.
 * Accepts the formats people actually paste:
 *   youtube.com/@handle · youtube.com/channel/UC… · youtube.com/c/name · youtube.com/user/name
 * with or without https://, www. or m.  (youtu.be links are VIDEO links, not channels.)
 */
export type ChannelParse =
  | { ok: true; url: string; label: string }
  | { ok: false; error: string };

const CHANNEL_RE =
  /^(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/(@[A-Za-z0-9._-]{3,}|channel\/UC[A-Za-z0-9_-]{10,}|c\/[A-Za-z0-9._-]+|user\/[A-Za-z0-9._-]+)(?:[/?#].*)?$/i;

export function parseChannelUrl(input: string): ChannelParse {
  let raw = (input || "").trim();
  if (/^@[A-Za-z0-9._-]{3,}$/.test(raw)) raw = `youtube.com/${raw}`; // bare @handle
  if (!raw) return { ok: false, error: "Please paste your YouTube channel link." };
  const m = raw.match(CHANNEL_RE);
  if (!m) {
    return {
      ok: false,
      error:
        "That doesn't look like a channel link. Use the format youtube.com/@yourchannel (open your channel page and copy the address).",
    };
  }
  const path = m[1];
  return { ok: true, url: `https://www.youtube.com/${path}`, label: path.startsWith("@") ? path : path };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
