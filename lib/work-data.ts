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

export const SHORT_FORM: Vid[] = [
  { id: "jDxfq48mOjc", title: "Food & Drink Shows UK at NEC", client: "Lucy Wager" },
  { id: "dD3jLdx2k7A", title: "I Tried ChatGPT for Image Creation", client: "Tim Cakir" },
  { id: "TJR9l12hN0I", title: "Battle of the AI Titans", client: "Tim Cakir" },
  { id: "klcoy936_mo", title: "How I Use Notion as My Second Brain Daily", client: "Tim Cakir" },
  { id: "PYfcIJ3TzIk", title: "Giving Selflessly", client: "Harjeet Dhillon" },
  { id: "gY95ZAAYypg", title: "Family vs. Pro: Who Should You Choose?", client: "Bayswater Wealth Management" },
  { id: "ZWLiTlvN1sQ", title: "Comparing US vs. India Real Estate", client: "Indian Community" },
  { id: "Bp1p4Nqb0CA", title: "Why Brands Sell Stories, Not Products", client: "Eric Presnall, VideoRep" },
  { id: "BPTOzdksbEs", title: "You Don't Need Thousands of Dollars to Start Content Creation", client: "Eric Presnall, VideoRep" },
  { id: "uztrtGDjZxE", title: "Humans Build Trust. AI Scales", client: "Eric Presnall, VideoRep" },
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
    videoId: "mHOLzwe4sMQ",
    did: ["Long-form editing", "Shorts", "Thumbnails", "Channel growth and paid reach"],
    quote: "One channel across twelve months: editing, packaging and a YouTube Ads test, tracked in YouTube Studio.",
    metrics: [
      { value: "223K", label: "views in 365 days" },
      { value: "6.9K", label: "new subscribers" },
      { value: "13.0%", label: "thumbnail click rate on Connectors Explained" },
      { value: "47.4K", label: "views on that video" },
      { value: "+63%", label: "views, last 90 days vs previous" },
      { value: "$0.23", label: "average CPC on a $600 test campaign" },
    ],
  },
  {
    client: "Victor Chan",
    role: "YouTuber and founder, Launch Excel",
    videoId: "pcfFzxnhwUE",
    did: ["Long-form YouTube edits", "Sales-page VSLs", "Shorts"],
    quote: "Fast, reliable communication on WhatsApp, and videos that look more professional than ever.",
  },
  {
    client: "Harjeet Dhillon",
    role: "Canadian actress and author",
    videoId: "TW3omRuTQA8",
    did: ["Podcast editing", "Thumbnails", "Descriptions", "Software guidance"],
    quote: "Anuj has been monumental in creating my podcast.",
  },
  {
    client: "Dr. Maurice Maurer",
    role: "Computational physics, Training Scientists",
    videoId: "y11b_rVHcyg",
    did: ["Video editing", "Graphic design", "Thumbnails"],
    quote: "He always responds very quickly and produces great results.",
  },
  {
    client: "Blake Reddy",
    role: "Private client wealth adviser",
    did: ["Podcast video layouts"],
    quote: "Layouts that look great, work perfectly and save me so much time.",
  },
];
