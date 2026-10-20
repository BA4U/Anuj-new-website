/** Verified work data. Every video ID below is taken from anuj4u.in and checked on YouTube. */

export type Vid = { id: string; title: string; client: string };

export const LONG_FORM: Vid[] = [
  { id: "mHOLzwe4sMQ", title: "ChatGPT Connectors Explained", client: "Tim Cakir" },
  { id: "bejvX2uUTDo", title: "Gemini 3, AI Studio and Antigravity", client: "Tim Cakir" },
  { id: "pcfFzxnhwUE", title: "How Smart Excel Users Rename 100s of Files", client: "Victor Chan" },
  { id: "SFn5Vf38f8I", title: "How Smart Excel Users Delete Data But Keep Formulas", client: "Victor Chan" },
  { id: "y11b_rVHcyg", title: "ChatGPT o1 vs Claude 3.5: Coding Battle", client: "Training Scientists" },
  { id: "TZvt_fD8VP4", title: "Transform 2D Irregular Grid Data into Visualizations", client: "Training Scientists" },
  { id: "TW3omRuTQA8", title: "Life Changing Secrets to Manifesting Positivity", client: "Harjeet Dhillon" },
  { id: "WTD8GMUO_4w", title: "The Surprising Truth About Your Giving Habits", client: "Harjeet Dhillon" },
  { id: "-SYqXdaZXl8", title: "Dan Koe's Playbook for Financial Freedom", client: "Circle" },
  { id: "izidLZclYZs", title: "From Broke to YouTube Millionaire: Sean Cannell", client: "Circle" },
  { id: "-DB8-7eLsTY", title: "Can AI Video Avatars Replace Human Presenters?", client: "Eric Presnall, VideoRep" },
  { id: "68lgEUQDiDQ", title: "Copy My Secret AI Prompt to Rank on YouTube", client: "Eric Presnall, VideoRep" },
  { id: "aWR04f1eYrw", title: "Big Picture Medicare", client: "Medicare-You" },
  { id: "ciwbmggLd4Y", title: "New PreChallenge", client: "Medicare-You" },
  { id: "1nT4g9VeJDk", title: "Mobile App Overview", client: "Simply Prime CRM" },
  { id: "pMU8C1H1nHo", title: "Payroll and Commission Structures for Technicians", client: "Simply Prime CRM" },
];

/** Long-form videos grouped by the type of content, podcast first. Videos come from LONG_FORM above. */
export const CONTENT_TYPES: { key: string; title: string; blurb: string; ids: string[] }[] = [
  {
    key: "podcast",
    title: "Podcast videos",
    blurb: "Full episodes and interviews, including Circle podcast episodes, with clean audio, layouts and chapters.",
    ids: ["-SYqXdaZXl8", "izidLZclYZs", "TW3omRuTQA8", "WTD8GMUO_4w"],
  },
  {
    key: "educational",
    title: "Educational YouTube videos",
    blurb: "Tutorials and how-to videos paced for retention, with on-screen graphics that keep viewers watching.",
    ids: ["pcfFzxnhwUE", "SFn5Vf38f8I", "y11b_rVHcyg", "TZvt_fD8VP4"],
  },
  {
    key: "tech",
    title: "Tech and AI videos",
    blurb: "Fast-moving AI and software videos where clarity, screen recordings and thumbnails decide the click.",
    ids: ["mHOLzwe4sMQ", "bejvX2uUTDo", "-DB8-7eLsTY", "68lgEUQDiDQ"],
  },
  {
    key: "explainer",
    title: "Explainer and product videos",
    blurb: "Walkthroughs and explainers that show how a product or service works and help a business win customers.",
    ids: ["1nT4g9VeJDk", "pMU8C1H1nHo", "aWR04f1eYrw", "ciwbmggLd4Y"],
  },
];

/** Ordered to lead with the strongest work: Eric Presnall's shorts alternate with the
 * Rationale Hub channel's own shorts up front, then the rest, with no two videos
 * from the same client back to back. */
export const SHORT_FORM: Vid[] = [
  { id: "Bp1p4Nqb0CA", title: "Why Brands Sell Stories, Not Products", client: "Eric Presnall, VideoRep" },
  { id: "KVehhWioXcQ", title: "5 ChatGPT Settings You Should Change Right Now", client: "Rationale Hub" },
  { id: "BPTOzdksbEs", title: "You Don't Need Thousands of Dollars to Start Content Creation", client: "Eric Presnall, VideoRep" },
  { id: "7LUG9W9BWXk", title: "The Free AI Tool That Outperforms Big Tech", client: "Rationale Hub" },
  { id: "uztrtGDjZxE", title: "Humans Build Trust. AI Scales", client: "Eric Presnall, VideoRep" },
  { id: "dD3jLdx2k7A", title: "I Tried ChatGPT for Image Creation", client: "Tim Cakir" },
  { id: "jDxfq48mOjc", title: "Food & Drink Shows UK at NEC", client: "Lucy Wager" },
  { id: "TJR9l12hN0I", title: "Battle of the AI Titans", client: "Tim Cakir" },
  { id: "PYfcIJ3TzIk", title: "Giving Selflessly", client: "Harjeet Dhillon" },
  { id: "klcoy936_mo", title: "How I Use Notion as My Second Brain Daily", client: "Tim Cakir" },
  { id: "gY95ZAAYypg", title: "Family vs. Pro: Who Should You Choose?", client: "Bayswater Wealth Management" },
  { id: "ZWLiTlvN1sQ", title: "Comparing US vs. India Real Estate", client: "Indian Community" },
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
