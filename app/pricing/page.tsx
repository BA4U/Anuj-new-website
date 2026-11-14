import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Pricing & Plans | High-Retention Video & Content Growth",
  description:
    "Predictable, transparent investment for creators, founders, and B2B executives. Turnkey video production, LinkedIn authority, and full-funnel distribution.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing & Plans | Anuj Mishra Growth Studio",
    description: "Transparent pricing for high-retention video production, LinkedIn growth, and paid ads amplification.",
    url: "https://anuj4u.in/pricing",
    type: "website",
  },
};

const TIERS = [
  {
    name: "Growth Engine",
    badge: "Core Retainer",
    desc: "Complete YouTube channel management, retention-engineered long-form production, and viral short-form distribution.",
    price: "$3,200",
    cadence: "/ month",
    idealFor: "Founders, creators, and consultants wanting a reliable inbound engine without hiring an internal production team.",
    features: [
      "4 to 6 Studio Long-Form Videos / month",
      "12 to 16 Platform-Native Shorts & Reels (9:16 optimized)",
      "High-CTR Custom Thumbnails (with A/B title/thumb variants)",
      "Channel & Viewer Retention Drop-off Audit",
      "Title, Hook Scripting & SEO Metadata Optimization",
      "Direct 1-on-1 Slack & WhatsApp Communication with Anuj",
      "2 Rounds of Timestamped Revisions Included",
      "Monthly Growth Analytics & Audience Insights Report",
    ],
    ctaText: "Apply for Growth Engine",
    ctaHref: "/contact?tier=engine",
    featured: false,
  },
  {
    name: "Authority & Omnichannel Scale",
    badge: "Most Popular — Comprehensive",
    desc: "The full-stack content & conversion machine: YouTube channel mastery + executive LinkedIn authority + product launch video.",
    price: "$5,500",
    cadence: "/ month",
    idealFor: "CEOs, SaaS founders, and high-ticket experts scaling their personal brand, organic pipeline, and product awareness.",
    features: [
      "Everything in Growth Engine",
      "Up to 8 to 10 Long-Form Videos / month",
      "20 to 24 Platform-Native Shorts & Reels",
      "1 Dedicated Product Launch / SaaS Demo / VSL Video per quarter",
      "LinkedIn Repurposing: 12-16 Executive Thought Leadership Posts",
      "Paid Ad Creative Cuts (YouTube In-Feed & Meta Ad formats)",
      "Priority 48h Turnaround & Dedicated Calendar Slots",
      "Bi-Weekly 1-on-1 Strategy & Scripting Sessions",
    ],
    ctaText: "Apply for Scale Retainer",
    ctaHref: "/contact?tier=scale",
    featured: true,
  },
  {
    name: "Executive Growth Advisory",
    badge: "Enterprise / Full-Funnel",
    desc: "The end-to-end media powerhouse: organic channel dominance, 3D/motion product launch videos, and paid ad acquisition.",
    price: "$8,000",
    cadence: "/ month",
    idealFor: "Venture-backed SaaS, enterprise founders, and elite creators who want full media market dominance.",
    features: [
      "Full Omnichannel Production: 10 to 14 Long-Form Videos / month",
      "30+ Viral Shorts, Reels & TikToks (multi-angle cuts)",
      "Complete Product Launch Video Suite (SaaS demo, UI motion, teasers)",
      "Targeted YouTube & Meta Paid Ad Campaigns setup and creative testing",
      "Landing Page, VSL & Inbound Funnel Conversion Architecture",
      "VIP Direct 24/7 Slack Access with 24h Turnaround Priority",
      "Unlimited Timestamped Revisions Across All Deliverables",
      "Weekly Pipeline Review, Attribution Tracking & Growth Advisory",
    ],
    ctaText: "Book Executive Advisory",
    ctaHref: "/contact?tier=executive",
    featured: false,
  },
];

const PRICING_FAQS = [
  {
    q: "Why invest in an ongoing retainer instead of one-off video edits?",
    a: "Algorithms and audiences reward consistency and strategic compounding. A one-off edit gives you a single asset; a growth retainer builds an audience asset, dials in retention data week over week, and turns viewers into high-ticket inbound leads.",
  },
  {
    q: "How fast is turnaround on deliverables?",
    a: "Most long-form video edits land within 3 to 4 business days. Shorts, Reels, and LinkedIn drafts take 24 to 48 hours. Retainer clients receive dedicated calendar slots with predictable delivery days.",
  },
  {
    q: "Can I adjust or cancel my plan?",
    a: "Yes. All retainers are month-to-month with no long-term lock-ins. You can scale your tier up, pause, or adjust deliverables with a simple 14-day notice.",
  },
  {
    q: "What do you need from me to start?",
    a: "Just your raw footage (via Google Drive or Frame.io) and an initial 30-minute kickoff call. I handle everything else: scripting hooks, editing, motion graphics, thumbnails, LinkedIn formatting, and scheduling.",
  },
  {
    q: "Do you offer custom scopes?",
    a: "Yes. If you require specific deliverables (e.g., podcast editing only, ad creative testing batches, or multi-speaker events), book a call and I will tailor an exact scope for your goals.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative pt-10 md:pt-16 pb-20 overflow-hidden">
      {/* Subtle Apple-style background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/[0.04] border border-neutral-900/[0.08] text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600 mb-4">
            Transparent Retainers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface mb-5">
            Predictable investment. <br className="hidden sm:block" />
            <span className="gradient-text">Compounding channel growth.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Work directly with me. Simple, transparent retainers for your YouTube channel and content—with zero junior agency handoffs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-[28px] p-7 md:p-9 flex flex-col justify-between transition-all duration-300 ${
                tier.featured
                  ? "bg-neutral-950 text-white shadow-[0_30px_90px_-20px_rgba(73,54,230,0.45)] ring-2 ring-primary border border-primary/40 lg:-translate-y-2"
                  : "bg-white/80 backdrop-blur-xl border border-black/[0.08] text-on-surface shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] hover:border-black/20"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-purple-500 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {!tier.featured && (
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-neutral-500 mb-2">
                    {tier.badge}
                  </span>
                )}
                <h3 className={`text-2xl font-bold tracking-tight ${tier.featured ? "text-white" : "text-on-surface"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mt-2 leading-relaxed min-h-[42px] ${tier.featured ? "text-neutral-300" : "text-on-surface-variant"}`}>
                  {tier.desc}
                </p>

                {/* Price Display */}
                <div className="mt-6 mb-7 pb-6 border-b border-black/[0.08] dark:border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${tier.featured ? "text-white" : "text-on-surface"}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm font-medium ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}>
                      {tier.cadence}
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}>
                    {tier.idealFor}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <p className={`text-xs font-bold uppercase tracking-wider ${tier.featured ? "text-purple-300" : "text-neutral-500"}`}>
                    What is included:
                  </p>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                          tier.featured ? "text-primary" : "text-primary"
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className={tier.featured ? "text-neutral-200" : "text-neutral-700"}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={tier.ctaHref}
                className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm text-center transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
                  tier.featured
                    ? "bg-primary hover:bg-primary/90 text-white shadow-[0_10px_25px_-5px_rgba(73,54,230,0.6)]"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white"
                }`}
              >
                {tier.ctaText}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="rounded-2xl border border-black/[0.08] bg-neutral-50/80 backdrop-blur-md p-6 sm:p-8 max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
            <div className="pt-2 md:pt-0 md:px-4">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">verified</span>
              <h4 className="font-bold text-sm text-on-surface">No Long Lock-Ins</h4>
              <p className="text-xs text-on-surface-variant mt-1">Month-to-month retainers. Scale or pause anytime with notice.</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-4">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">speed</span>
              <h4 className="font-bold text-sm text-on-surface">Guaranteed Turnaround</h4>
              <p className="text-xs text-on-surface-variant mt-1">Videos delivered in 3-5 days. Priority queue for retainer clients.</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-4">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">published_with_changes</span>
              <h4 className="font-bold text-sm text-on-surface">2 Rounds of Revisions</h4>
              <p className="text-xs text-on-surface-variant mt-1">Timestamped review in Frame.io or Drive until you are thrilled.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface">Frequently Asked Questions</h2>
            <p className="text-on-surface-variant text-sm mt-2">Have a question before getting started? Here are clear answers.</p>
          </div>
          <FAQAccordion items={PRICING_FAQS} />
        </div>
      </div>
    </div>
  );
}
