import { parseChannelUrl } from "./youtube";

export interface YouTubeVideoSummary {
  title: string;
  published: string;
  videoId?: string;
  views?: number;
  descriptionLength?: number;
  hasChapters?: boolean;
  hasLinks?: boolean;
  hasHashtags?: boolean;
}

export interface ChannelFactor {
  id: "packaging" | "outliers" | "cadence" | "hygiene" | "niche";
  label: string;
  score: number;
  status: "strong" | "warning" | "critical";
  metric: string;
  insight: string;
}

export interface ChannelMetrics {
  avgTitleLength: number;
  longTitleCount: number;
  questionTitleCount: number;
  numberTitleCount: number;
  curiosityTitleCount: number;
  medianViews: number | null;
  avgViews: number | null;
  outlierRatio: number | null;
  avgDaysBetweenUploads: number | null;
  longestGapDays: number | null;
  uploadsLast30Days: number;
  avgDescriptionLength: number;
  chaptersRate: number;
  linksRate: number;
}

export interface YouTubeChannelData {
  name: string;
  handle: string;
  avatar: string | null;
  description: string;
  channelId: string | null;
  subscriberCount: string | null;
  totalVideos: string | null;
  channelKeywords: string[];
  recentVideos: YouTubeVideoSummary[];
  detectedTopics: string[];
  packagingNotes: string[];
  overallScore: number;
  factors: ChannelFactor[];
  metrics: ChannelMetrics;
  topVideo: { title: string; views: number; published: string } | null;
}

export type ChannelInspectResult =
  | { ok: true; channel: YouTubeChannelData }
  | { ok: false; error: string; code?: "NOT_FOUND" | "INVALID_URL" | "NETWORK_ERROR" };

/** Clean XML/HTML entities */
function cleanXml(str: string): string {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function clampScore(n: number): number {
  return Math.max(15, Math.min(98, Math.round(n)));
}

function statusFromScore(score: number): "strong" | "warning" | "critical" {
  if (score >= 75) return "strong";
  if (score >= 52) return "warning";
  return "critical";
}

function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

/**
 * Real-time multi-factor YouTube channel inspector.
 * Fetches public channel metadata, subscriber/video counts, and recent uploads (including views & descriptions)
 * from YouTube's public page and official RSS feed without requiring an API key.
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
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

    // OpenGraph & meta extraction
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)">/i);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)">/i);
    const keywordsMetaMatch = html.match(/<meta name="keywords" content="([^"]+)">/i);

    // Channel ID extraction
    const channelIdMatch =
      html.match(/"browse_id","value":"(UC[A-Za-z0-9_-]+)"/) ||
      html.match(/<meta itemprop="identifier" content="(UC[A-Za-z0-9_-]+)">/) ||
      html.match(/"channelId":"(UC[A-Za-z0-9_-]+)"/);

    // Subscriber & video counts from ytInitialData
    const subMatch =
      html.match(/"subscriberCountText":\{"[^"]*":[^}]*"simpleText":"([^"]+)"/) ||
      html.match(/"content":"([0-9.,]+[KMB]?\s+subscribers?)"/i);
    const vidCountMatch =
      html.match(/"videosCountText":\{"runs":\[\{"text":"([^"]+)"/) ||
      html.match(/"content":"([0-9.,]+[KMB]?\s+videos?)"/i);

    const channelName = cleanXml(titleMatch ? titleMatch[1] : parsed.label);
    const description = cleanXml(descMatch ? descMatch[1] : "");
    const avatar = imageMatch ? imageMatch[1] : null;
    const channelId = channelIdMatch ? channelIdMatch[1] : null;
    const subscriberCount = subMatch ? cleanXml(subMatch[1]) : null;
    const totalVideos = vidCountMatch ? cleanXml(vidCountMatch[1]).replace(/\s+videos?$/i, " videos") : null;
    const channelKeywords = keywordsMetaMatch
      ? cleanXml(keywordsMetaMatch[1])
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
          .slice(0, 12)
      : [];

    let recentVideos: YouTubeVideoSummary[] = [];

    // Fetch official public RSS feed for latest 15 uploads (includes views & descriptions)
    if (channelId) {
      try {
        const rssCtrl = new AbortController();
        const rssTimeout = setTimeout(() => rssCtrl.abort(), 7000);
        const rssRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
          signal: rssCtrl.signal,
        });
        clearTimeout(rssTimeout);

        if (rssRes.ok) {
          const xml = await rssRes.text();
          const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
          const entries: YouTubeVideoSummary[] = [];
          let m: RegExpExecArray | null;
          while ((m = entryRegex.exec(xml)) !== null && entries.length < 15) {
            const block = m[1];
            const t = block.match(/<title>([\s\S]*?)<\/title>/);
            const p = block.match(/<published>([\s\S]*?)<\/published>/);
            const vid = block.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
            const viewsM = block.match(/<media:statistics[^>]*views="(\d+)"/);
            const descM = block.match(/<media:description>([\s\S]*?)<\/media:description>/);

            if (t && p) {
              const videoDesc = descM ? cleanXml(descM[1]) : "";
              entries.push({
                title: cleanXml(t[1]),
                published: cleanXml(p[1]),
                videoId: vid ? cleanXml(vid[1]) : undefined,
                views: viewsM ? Number(viewsM[1]) : undefined,
                descriptionLength: videoDesc.length,
                hasChapters: /\b\d{1,2}:\d{2}\b/.test(videoDesc),
                hasLinks: /https?:\/\//i.test(videoDesc),
                hasHashtags: /#[A-Za-z0-9_]+/.test(videoDesc),
              });
            }
          }
          recentVideos = entries;
        }
      } catch (rssErr) {
        console.warn("[youtube-server] RSS fetch failed, falling back to page meta:", rssErr);
      }
    }

    // Topic detection
    const textCorpus = [description, ...channelKeywords, ...recentVideos.map((v) => v.title)].join(" ").toLowerCase();
    const topicKeywords = [
      "tech",
      "coding",
      "software",
      "ai",
      "productivity",
      "business",
      "finance",
      "investing",
      "crypto",
      "fitness",
      "health",
      "gaming",
      "marketing",
      "creator",
      "youtube",
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
      "saas",
      "startup",
      "photography",
      "filmmaking",
      "cooking",
      "travel",
      "cars",
      "psychology",
    ];

    const detectedTopics = topicKeywords.filter((k) => new RegExp(`\\b${k}\\b`, "i").test(textCorpus));
    if (detectedTopics.length === 0 && channelKeywords.length > 0) {
      detectedTopics.push(...channelKeywords.slice(0, 3));
    }
    if (detectedTopics.length === 0 && channelName) {
      detectedTopics.push("General Content");
    }

    // ─── Multi-Factor Quantitative Analysis ──────────────────────────────────
    const count = recentVideos.length;
    const avgTitleLength = count
      ? Math.round(recentVideos.reduce((acc, v) => acc + v.title.length, 0) / count)
      : 0;
    const longTitleCount = recentVideos.filter((v) => v.title.length > 58).length;
    const questionTitleCount = recentVideos.filter((v) => v.title.includes("?")).length;
    const numberTitleCount = recentVideos.filter((v) => /\d+/.test(v.title)).length;
    const curiosityRe =
      /\b(why|how|secret|truth|mistake|never|stop|tested|worth|actually|weird|changed|broken|best|worst|vs)\b/i;
    const curiosityTitleCount = recentVideos.filter(
      (v) => curiosityRe.test(v.title) || /[\[(].*[\])]/.test(v.title)
    ).length;

    // View performance & outlier analysis
    const viewNums = recentVideos.map((v) => v.views).filter((n): n is number => typeof n === "number" && n >= 0);
    let medianViews: number | null = null;
    let avgViews: number | null = null;
    let outlierRatio: number | null = null;
    let topVideo: { title: string; views: number; published: string } | null = null;

    if (viewNums.length >= 3) {
      const sorted = [...viewNums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      medianViews = sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
      avgViews = Math.round(viewNums.reduce((a, b) => a + b, 0) / viewNums.length);
      const maxV = sorted[sorted.length - 1];
      outlierRatio = medianViews > 0 ? Number((maxV / medianViews).toFixed(1)) : null;

      const best = recentVideos.reduce((bestSoFar, curr) =>
        (curr.views ?? -1) > (bestSoFar.views ?? -1) ? curr : bestSoFar
      );
      if (typeof best.views === "number") {
        topVideo = { title: best.title, views: best.views, published: best.published };
      }
    }

    // Upload cadence & consistency
    let avgDaysBetweenUploads: number | null = null;
    let longestGapDays: number | null = null;
    const nowMs = Date.now();
    const uploadsLast30Days = recentVideos.filter((v) => {
      const t = Date.parse(v.published);
      return !Number.isNaN(t) && nowMs - t <= 30 * 24 * 60 * 60 * 1000;
    }).length;

    if (count >= 2) {
      const timestamps = recentVideos
        .map((v) => Date.parse(v.published))
        .filter((t) => !Number.isNaN(t))
        .sort((a, b) => b - a);
      if (timestamps.length >= 2) {
        const gaps: number[] = [];
        for (let i = 0; i < timestamps.length - 1; i++) {
          gaps.push((timestamps[i] - timestamps[i + 1]) / (1000 * 60 * 60 * 24));
        }
        avgDaysBetweenUploads = Number((gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(1));
        longestGapDays = Number(Math.max(...gaps).toFixed(1));
      }
    }

    // Description & funnel hygiene
    const avgDescriptionLength = count
      ? Math.round(recentVideos.reduce((acc, v) => acc + (v.descriptionLength ?? 0), 0) / count)
      : 0;
    const chaptersRate = count
      ? Math.round((recentVideos.filter((v) => v.hasChapters).length / count) * 100)
      : 0;
    const linksRate = count
      ? Math.round((recentVideos.filter((v) => v.hasLinks).length / count) * 100)
      : 0;

    // ─── Factor Scoring & Insights ───────────────────────────────────────────
    // 1. Packaging & CTR
    let pkgScore = 62;
    if (count > 0) {
      if (avgTitleLength >= 35 && avgTitleLength <= 56) pkgScore += 14;
      else if (avgTitleLength > 65) pkgScore -= 16;
      if (curiosityTitleCount / count >= 0.4) pkgScore += 12;
      else if (curiosityTitleCount === 0) pkgScore -= 12;
      if (numberTitleCount > 0) pkgScore += 6;
      if (questionTitleCount > 0) pkgScore += 6;
    } else {
      pkgScore = 40;
    }
    pkgScore = clampScore(pkgScore);

    // 2. Outlier & View Velocity
    let outScore = 58;
    if (outlierRatio !== null) {
      if (outlierRatio >= 3.0) outScore = 88;
      else if (outlierRatio >= 1.8) outScore = 76;
      else if (outlierRatio >= 1.3) outScore = 64;
      else outScore = 48; // Flat views = no breakout packaging yet
    } else if (count === 0) {
      outScore = 35;
    }
    outScore = clampScore(outScore);

    // 3. Upload Cadence
    let cadScore = 55;
    if (avgDaysBetweenUploads !== null) {
      if (avgDaysBetweenUploads <= 4) cadScore = 92;
      else if (avgDaysBetweenUploads <= 8) cadScore = 82;
      else if (avgDaysBetweenUploads <= 15) cadScore = 65;
      else cadScore = 42;
      if (longestGapDays !== null && longestGapDays > 30) cadScore -= 12;
    } else if (count === 0) {
      cadScore = 30;
    }
    cadScore = clampScore(cadScore);

    // 4. Description & Funnel Hygiene
    let hygScore = 48;
    if (count > 0) {
      if (avgDescriptionLength >= 400) hygScore += 18;
      else if (avgDescriptionLength >= 150) hygScore += 10;
      else hygScore -= 8;
      if (chaptersRate >= 40) hygScore += 16;
      else if (chaptersRate > 0) hygScore += 8;
      if (linksRate >= 60) hygScore += 12;
    }
    hygScore = clampScore(hygScore);

    // 5. Niche & Positioning Clarity
    let nicheScore = 55;
    if (description.length >= 80) nicheScore += 14;
    if (detectedTopics.length >= 2 && detectedTopics[0] !== "General Content") nicheScore += 16;
    if (channelKeywords.length >= 3) nicheScore += 10;
    nicheScore = clampScore(nicheScore);

    const factors: ChannelFactor[] = [
      {
        id: "packaging",
        label: "Title & Packaging CTR",
        score: pkgScore,
        status: statusFromScore(pkgScore),
        metric: count ? `Avg ${avgTitleLength} chars · ${curiosityTitleCount}/${count} curiosity hooks` : "No uploads",
        insight:
          longTitleCount > Math.ceil(count / 2)
            ? `${longTitleCount} of ${count} recent titles exceed 58 chars and truncate on mobile browse feeds.`
            : curiosityTitleCount === 0
            ? "Recent titles are descriptive rather than curiosity-driven; adding open loops can lift browse CTR."
            : "Title length fits mobile feeds well and uses strong curiosity/specificity hooks.",
      },
      {
        id: "outliers",
        label: "View Velocity & Outliers",
        score: outScore,
        status: statusFromScore(outScore),
        metric:
          medianViews !== null && outlierRatio !== null
            ? `Median ${formatCompactNumber(medianViews)} views · ${outlierRatio}x top outlier`
            : "Public view data limited",
        insight:
          topVideo && outlierRatio !== null
            ? outlierRatio >= 2
              ? `"${topVideo.title.slice(0, 48)}..." outperformed your median by ${outlierRatio}x — double down on this format.`
              : `Views are tightly clustered around ${formatCompactNumber(medianViews ?? 0)} — testing bolder topic angles can trigger a breakout.`
            : "Upload more public videos to establish a clear median-vs-outlier benchmark.",
      },
      {
        id: "cadence",
        label: "Upload Cadence & Consistency",
        score: cadScore,
        status: statusFromScore(cadScore),
        metric:
          avgDaysBetweenUploads !== null
            ? `Every ${avgDaysBetweenUploads} days · ${uploadsLast30Days} in last 30d`
            : "Cadence unavailable",
        insight:
          avgDaysBetweenUploads !== null
            ? avgDaysBetweenUploads <= 7.5
              ? `Consistent publishing rhythm (${uploadsLast30Days} uploads in 30 days) keeps returning-viewer signals warm.`
              : `Averaging ${avgDaysBetweenUploads} days between uploads (longest gap: ${longestGapDays}d) slows algorithmic momentum.`
            : "Establish a predictable weekly upload cadence so subscribers build a viewing habit.",
      },
      {
        id: "hygiene",
        label: "Description, Chapters & Funnel",
        score: hygScore,
        status: statusFromScore(hygScore),
        metric: count ? `${chaptersRate}% chapters · ${linksRate}% links/CTAs` : "No uploads",
        insight:
          chaptersRate < 30
            ? linksRate >= 60
              ? `Strong outbound links/CTAs (${linksRate}% of uploads), though only ${chaptersRate}% include timestamps/chapters for Google key-moments.`
              : `Only ${chaptersRate}% of scanned videos include timestamps/chapters, missing Google search key-moments & retention boosts.`
            : `Strong metadata hygiene (${chaptersRate}% with chapters, ${linksRate}% with outbound CTAs/links).`,
      },
      {
        id: "niche",
        label: "Niche & Positioning Clarity",
        score: nicheScore,
        status: statusFromScore(nicheScore),
        metric: detectedTopics.slice(0, 3).map((t) => `#${t}`).join(" "),
        insight:
          description.length < 60
            ? "Channel bio is thin; clarifying your core viewer promise in the first 2 lines improves subscribe conversion."
            : `Clear positioning around ${detectedTopics.slice(0, 3).join(", ")} gives YouTube strong audience-matching signals.`,
      },
    ];

    const overallScore = Math.round(
      pkgScore * 0.28 + outScore * 0.24 + cadScore * 0.2 + hygScore * 0.14 + nicheScore * 0.14
    );

    const packagingNotes = factors.map((f) => `${f.label} (${f.score}/100): ${f.insight}`);

    return {
      ok: true,
      channel: {
        name: channelName,
        handle: parsed.label,
        avatar,
        description,
        channelId,
        subscriberCount,
        totalVideos,
        channelKeywords,
        recentVideos,
        detectedTopics: detectedTopics.slice(0, 6),
        packagingNotes,
        overallScore,
        factors,
        metrics: {
          avgTitleLength,
          longTitleCount,
          questionTitleCount,
          numberTitleCount,
          curiosityTitleCount,
          medianViews,
          avgViews,
          outlierRatio,
          avgDaysBetweenUploads,
          longestGapDays,
          uploadsLast30Days,
          avgDescriptionLength,
          chaptersRate,
          linksRate,
        },
        topVideo,
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
