/** Verified work data. Every video ID below is checked on YouTube and format-audited. */

export type Vid = {
  id: string;
  title: string;
  client: string;
  niche?: string;
  tag?: string;
  duration?: string;
  format?: "vertical" | "horizontal";
  isPlaceholder?: boolean;
};

export const LONG_FORM: Vid[] = [
  { id: "mHOLzwe4sMQ", title: "ChatGPT Connectors Explained", client: "Tim Cakir", niche: "Tech & AI", tag: "AI Walkthrough" },
  { id: "bejvX2uUTDo", title: "Gemini 3, AI Studio and Antigravity", client: "Tim Cakir", niche: "Tech & AI", tag: "Developer Tour" },
  { id: "pcfFzxnhwUE", title: "How Smart Excel Users Rename 100s of Files", client: "Victor Chan", niche: "Educational & Tutorials", tag: "Productivity" },
  { id: "SFn5Vf38f8I", title: "How Smart Excel Users Delete Data But Keep Formulas", client: "Victor Chan", niche: "Educational & Tutorials", tag: "Excel Mastery" },
  { id: "y11b_rVHcyg", title: "ChatGPT o1 vs Claude 3.5: Coding Battle", client: "Training Scientists", niche: "Tech & AI", tag: "AI Benchmark" },
  { id: "TZvt_fD8VP4", title: "Transform 2D Irregular Grid Data into Visualizations", client: "Training Scientists", niche: "Educational & Tutorials", tag: "Data Science" },
  { id: "TW3omRuTQA8", title: "Life Changing Secrets to Manifesting Positivity", client: "Harjeet Dhillon", niche: "Podcasts & Interviews", tag: "Mindset & Growth" },
  { id: "WTD8GMUO_4w", title: "The Surprising Truth About Your Giving Habits", client: "Harjeet Dhillon", niche: "Podcasts & Interviews", tag: "Human Psychology" },
  { id: "-SYqXdaZXl8", title: "Dan Koe's Playbook for Financial Freedom", client: "Circle", niche: "Podcasts & Interviews", tag: "Finance & Creator" },
  { id: "izidLZclYZs", title: "From Broke to YouTube Millionaire: Sean Cannell", client: "Circle", niche: "Podcasts & Interviews", tag: "Creator Economy" },
  { id: "-DB8-7eLsTY", title: "Can AI Video Avatars Replace Human Presenters?", client: "Eric Presnall, VideoRep", niche: "Tech & AI", tag: "AI & Media" },
  { id: "68lgEUQDiDQ", title: "Copy My Secret AI Prompt to Rank on YouTube", client: "Eric Presnall, VideoRep", niche: "Tech & AI", tag: "SEO & Growth" },
  { id: "1nT4g9VeJDk", title: "Simply Prime CRM Mobile App Overview", client: "Simply Prime CRM", niche: "Demo & Product Launch", tag: "SaaS App Demo" },
  { id: "pMU8C1H1nHo", title: "Payroll and Commission Structures for Technicians", client: "Simply Prime CRM", niche: "Demo & Product Launch", tag: "Feature Deep-Dive" },
  { id: "aWR04f1eYrw", title: "Big Picture Medicare", client: "Medicare-You", niche: "Educational & Tutorials", tag: "Healthcare Explainer" },
  { id: "ciwbmggLd4Y", title: "New PreChallenge", client: "Medicare-You", niche: "Educational & Tutorials", tag: "Course Intro" },
];

/** Dedicated Product Launch and SaaS Demo Videos */
export const DEMO_LAUNCH_VIDEOS: Vid[] = [
  {
    id: "1nT4g9VeJDk",
    title: "Simply Prime CRM: Mobile App Overview & Live Demo",
    client: "Simply Prime CRM",
    niche: "SaaS Product Demo",
    tag: "Mobile App Walkthrough",
    duration: "4:32",
    format: "horizontal",
  },
  {
    id: "pMU8C1H1nHo",
    title: "Payroll and Commission Automation Workflow",
    client: "Simply Prime CRM",
    niche: "B2B SaaS Feature Demo",
    tag: "Workflow Breakdown",
    duration: "5:18",
    format: "horizontal",
  },
  {
    id: "mHOLzwe4sMQ",
    title: "ChatGPT Connectors: Interactive Live Walkthrough",
    client: "Tim Cakir",
    niche: "AI Tool Demo",
    tag: "Feature Walkthrough",
    duration: "6:14",
    format: "horizontal",
  },
  {
    id: "bejvX2uUTDo",
    title: "Gemini 3, AI Studio & Developer Launch Tour",
    client: "Tim Cakir",
    niche: "Developer Platform Tour",
    tag: "Product Tour",
    duration: "8:05",
    format: "horizontal",
  },
];

/** Long-form videos grouped by category and niche */
export const CONTENT_TYPES: { key: string; title: string; blurb: string; ids: string[] }[] = [
  {
    key: "podcast",
    title: "Podcast & Interview Videos",
    blurb: "Full studio episodes, remote multi-cam interviews, and creator dialogues with crisp audio, custom lower thirds, and chapter bookmarks.",
    ids: ["-SYqXdaZXl8", "izidLZclYZs", "TW3omRuTQA8", "WTD8GMUO_4w"],
  },
  {
    key: "demo-launch",
    title: "Demo & Product Launch Videos",
    blurb: "SaaS walkthroughs, interactive feature demos, and product launch assets engineered to turn viewers into active users and paid subscribers.",
    ids: ["1nT4g9VeJDk", "pMU8C1H1nHo", "mHOLzwe4sMQ", "bejvX2uUTDo"],
  },
  {
    key: "tech",
    title: "Tech & AI Product Breakdowns",
    blurb: "Fast-moving AI software breakdowns, workflow tutorials, and coding benchmarks where visual clarity and snappy pacing decide retention.",
    ids: ["mHOLzwe4sMQ", "bejvX2uUTDo", "y11b_rVHcyg", "-DB8-7eLsTY", "68lgEUQDiDQ"],
  },
  {
    key: "educational",
    title: "Educational & High-Retention Tutorials",
    blurb: "Step-by-step masterclasses and how-to guides packed with custom animations, zoom dynamics, and on-screen graphics that keep watch time high.",
    ids: ["pcfFzxnhwUE", "SFn5Vf38f8I", "TZvt_fD8VP4", "aWR04f1eYrw", "ciwbmggLd4Y"],
  },
];

/**
 * Verified vertical Shorts and Reels (9:16 aspect ratio).
 * Formatted and tagged by niche for instant filtering.
 */
export const SHORT_FORM: Vid[] = [
  { id: "Bp1p4Nqb0CA", title: "Why Brands Sell Stories, Not Products", client: "Eric Presnall, VideoRep", niche: "Branding & Strategy", tag: "Brand Storytelling", format: "vertical" },
  { id: "KVehhWioXcQ", title: "5 ChatGPT Settings You Should Change Right Now", client: "Rationale Hub", niche: "Tech & AI", tag: "AI Hacks", format: "vertical" },
  { id: "BPTOzdksbEs", title: "You Don't Need Thousands of Dollars to Start Content Creation", client: "Eric Presnall, VideoRep", niche: "Creators & Media", tag: "Creator Economy", format: "vertical" },
  { id: "7LUG9W9BWXk", title: "The Free AI Tool That Outperforms Big Tech", client: "Rationale Hub", niche: "Tech & AI", tag: "AI Productivity", format: "vertical" },
  { id: "uztrtGDjZxE", title: "Humans Build Trust. AI Scales", client: "Eric Presnall, VideoRep", niche: "Branding & Strategy", tag: "Founders & Trust", format: "vertical" },
  { id: "dD3jLdx2k7A", title: "I Tried ChatGPT for Image Creation", client: "Tim Cakir", niche: "Tech & AI", tag: "Generative AI", format: "vertical" },
  { id: "jDxfq48mOjc", title: "Food & Drink Shows UK at NEC", client: "Lucy Wager", niche: "Lifestyle & Events", tag: "Event Highlights", format: "vertical" },
  { id: "TJR9l12hN0I", title: "Battle of the AI Titans", client: "Tim Cakir", niche: "Tech & AI", tag: "AI Comparison", format: "vertical" },
  { id: "PYfcIJ3TzIk", title: "Giving Selflessly", client: "Harjeet Dhillon", niche: "Mindset & Growth", tag: "Life Philosophy", format: "vertical" },
  { id: "klcoy936_mo", title: "How I Use Notion as My Second Brain Daily", client: "Tim Cakir", niche: "Productivity & SaaS", tag: "SaaS Workflow", format: "vertical" },
  { id: "gY95ZAAYypg", title: "Family vs. Pro: Who Should You Choose?", client: "Bayswater Wealth Management", niche: "Finance & Wealth", tag: "Wealth Advisory", format: "vertical" },
  { id: "ZWLiTlvN1sQ", title: "Comparing US vs. India Real Estate", client: "Indian Community", niche: "Finance & Wealth", tag: "Real Estate & ROI", format: "vertical" },
];

export const THUMBNAILS: { slug: string; title: string; client: string }[] = [
  { slug: "chatgpt-connectors-explained", title: "ChatGPT Connectors Explained", client: "Tim Cakir" },
  { slug: "use-case-of-gemini-canvas", title: "Use Case of Gemini Canvas", client: "Tim Cakir" },
  { slug: "chatgpt-memory", title: "ChatGPT Memory", client: "Tim Cakir" },
  { slug: "top-5-gpts-worth-50k", title: "Top 5 GPTs Worth $50K", client: "Tim Cakir" },
  { slug: "best-ai-agent-chrome-extension", title: "Best AI Agent Chrome Extension", client: "Tim Cakir" },
  { slug: "claude-zapier-automate-everything", title: "Claude + Zapier: Automate Everything", client: "Tim Cakir" },
  { slug: "custom-gpt-without-coding", title: "Custom GPT Without Coding", client: "Tim Cakir" },
  { slug: "openai-browser-should-you-switch", title: "OpenAI Browser: Should You Switch?", client: "Tim Cakir" },
  { slug: "firebase-studio-tutorial", title: "Firebase Studio Tutorial", client: "Tim Cakir" },
  { slug: "chatgpt-o1-vs-claude-coding-battle", title: "ChatGPT o1 vs Claude 3.5", client: "Training Scientists" },
  { slug: "interpolate-irregular-grid-data", title: "Interpolate Irregular Grid Data", client: "Training Scientists" },
  { slug: "mothers-day-ai-and-humanity", title: "Mother's Day: AI and Humanity", client: "Harjeet Dhillon" },
  { slug: "the-gift-trap", title: "The Gift Trap", client: "Podcast" },
  { slug: "big-dreams-feel-like-a-burden", title: "Big Dreams Feel Like a Burden?", client: "Charlsey Childers" },
  { slug: "ife-2025", title: "IFE 2025", client: "Lucy Wager" },
  { slug: "medicare-plans-made-simple", title: "Medicare Plans Made Simple", client: "Paul Stallan" },
  { slug: "250k-ai-system", title: "The $250K AI System", client: "Creator" },
  { slug: "python-ide-comparison", title: "Python IDE Comparison 2026", client: "Creator" },
  { slug: "mastering-google-workspace-flows", title: "Mastering Google Workspace Flows", client: "Creator" },
  { slug: "where-is-my-money-anaconda", title: "Where Is My Money?", client: "Creator" },
  { slug: "building-a-regenerative-future", title: "Building a Regenerative Future", client: "Podcast" },
  { slug: "advice-for-cios", title: "Advice for CIOs", client: "Podcast" },
  { slug: "ayurveda-in-america", title: "Ayurveda in America", client: "Podcast" },
  { slug: "from-tech-to-trees", title: "From Tech to Trees", client: "Podcast" },
  { slug: "moringa-benefits", title: "Moringa Benefits", client: "Podcast" },
];

export type CaseStudy = {
  client: string;
  role: string;
  videoId?: string;
  did: string[];
  quote: string;
  metrics?: { value: string; label: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Tim Cakir",
    role: "AI and tech YouTube channel",
    did: ["Long-form editing", "Shorts", "Thumbnails and titles", "Channel growth and paid reach"],
    quote: "I edited and packaged his videos for twelve months. One YouTube client was worth $50,000 to him directly.",
    metrics: [
      { value: "$50K", label: "client won directly from YouTube" },
      { value: "12.3K", label: "subscribers when I handed over the channel" },
      { value: "223K", label: "views in 365 days" },
      { value: "13–15%", label: "thumbnail click-through rate on key videos" },
      { value: "+63%", label: "views, last 90 days vs the 90 before" },
      { value: "6.9K", label: "new subscribers in 365 days" },
    ],
  },
];
