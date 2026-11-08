import { parseChannelUrl } from "./youtube";

export interface YouTubeVideoSummary {
  title: string;
  published: string;
}

export interface YouTubeChannelData {
  name: string;
  handle: string;
  avatar: string | null;
  description: string;
  channelId: string | null;
  recentVideos: YouTubeVideoSummary[];
  detectedTopics: string[];
  packagingNotes: string[];
}

export type ChannelInspectResult =
  | { ok: true; channel: YouTubeChannelData }
  | { ok: false; error: string; code?: "NOT_FOUND" | "INVALID_URL" | "NETWORK_ERROR" };

/** Clean XML entities like &amp;, &quot;, &#39;, &lt;, &gt; */
function cleanXml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Real-time YouTube channel inspector.
 * Fetches public channel metadata and recent uploads without requiring an API key.
 * Verifies if the channel exists, extracts real titles, avatar, and channel bio.
 */
export async function inspectYouTubeChannel(input: string): Promise<ChannelInspectResult> {
  const parsed = parseChannelUrl(input);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error, code: "INVALID_URL" };
  }

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 12000);

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
        error: `Could not find a YouTube channel at "${parsed.label}". Please check the handle and try again.`,
        code: "NOT_FOUND",
      };
    }

    const html = await res.text();

    // Check for YouTube's unavailable / not found signals
    if (
      html.includes("This page isn't available") ||
      html.includes("<title>404 Not Found</title>") ||
      html.includes("The channel does not exist")
    ) {
      return {
        ok: false,
        error: `The channel "${parsed.label}" does not exist or has been removed. Please verify your channel address.`,
        code: "NOT_FOUND",
      };
    }

    // Extract OpenGraph tags
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)">/i);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)">/i);

    // Extract channelId for RSS feed access
    const channelIdMatch =
      html.match(/"browse_id","value":"(UC[A-Za-z0-9_-]+)"/) ||
      html.match(/<meta itemprop="identifier" content="(UC[A-Za-z0-9_-]+)">/) ||
      html.match(/"channelId":"(UC[A-Za-z0-9_-]+)"/);

    const channelName = cleanXml(titleMatch ? titleMatch[1] : parsed.label);
    const description = cleanXml(descMatch ? descMatch[1] : "");
    const avatar = imageMatch ? imageMatch[1] : null;
    const channelId = channelIdMatch ? channelIdMatch[1] : null;

    let recentVideos: YouTubeVideoSummary[] = [];

    // Fetch official public RSS feed for latest 15 uploads
    if (channelId) {
      try {
        const rssCtrl = new AbortController();
        const rssTimeout = setTimeout(() => rssCtrl.abort(), 6000);
        const rssRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
          signal: rssCtrl.signal,
        });
        clearTimeout(rssTimeout);

        if (rssRes.ok) {
          const xml = await rssRes.text();
          const regex = /<entry>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<published>(.*?)<\/published>[\s\S]*?<\/entry>/g;
          const entries: YouTubeVideoSummary[] = [];
          let m: RegExpExecArray | null;
          while ((m = regex.exec(xml)) !== null && entries.length < 10) {
            entries.push({
              title: cleanXml(m[1]),
              published: m[2],
            });
          }
          recentVideos = entries;
        }
      } catch (rssErr) {
        console.warn("[youtube-server] RSS fetch failed, falling back to page meta:", rssErr);
      }
    }

    // Extract common keywords / topics from recent video titles + description
    const textCorpus = [description, ...recentVideos.map((v) => v.title)].join(" ").toLowerCase();
    const topicKeywords = [
      "tech",
      "coding",
      "software",
      "ai",
      "productivity",
      "business",
      "finance",
      "crypto",
      "fitness",
      "health",
      "gaming",
      "marketing",
      "creator",
      "design",
      "education",
      "science",
      "podcast",
      "vlog",
      "review",
      "tutorial",
      "animation",
      "music",
      "real estate",
      "ecommerce",
    ];

    const detectedTopics = topicKeywords.filter((k) => {
      const reg = new RegExp(`\\b${k}\\b`, "i");
      return reg.test(textCorpus);
    });

    if (detectedTopics.length === 0 && channelName) {
      detectedTopics.push("General Content");
    }

    // Generate packaging notes from real recent uploads
    const packagingNotes: string[] = [];
    if (recentVideos.length > 0) {
      const avgLength =
        recentVideos.reduce((acc, v) => acc + v.title.length, 0) / recentVideos.length;
      if (avgLength > 65) {
        packagingNotes.push("Video titles lean long (>65 chars); shortening to 45–55 chars will improve mobile click-through.");
      } else {
        packagingNotes.push("Title length is punchy and fits mobile feeds without getting truncated.");
      }

      const hasQuestions = recentVideos.some((v) => v.title.includes("?"));
      if (!hasQuestions) {
        packagingNotes.push("None of your recent uploads use curiosity questions or open loops in the packaging.");
      }

      const hasNumbers = recentVideos.some((v) => /\d+/.test(v.title));
      if (hasNumbers) {
        packagingNotes.push("Good use of specificity and numbers in recent uploads to anchor viewer expectations.");
      }
    } else {
      packagingNotes.push("No recent uploads found; plan focuses on high-leverage launch topics and packaging fundamentals.");
    }

    return {
      ok: true,
      channel: {
        name: channelName,
        handle: parsed.label,
        avatar,
        description,
        channelId,
        recentVideos,
        detectedTopics: detectedTopics.slice(0, 5),
        packagingNotes,
      },
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    console.error("[youtube-server] inspectYouTubeChannel error:", errorMsg);
    return {
      ok: false,
      error: "Unable to inspect channel right now. Please verify your connection or try again shortly.",
      code: "NETWORK_ERROR",
    };
  }
}
