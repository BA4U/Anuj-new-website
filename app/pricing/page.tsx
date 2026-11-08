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
    name: "Growth Sprint",
    badge: "One-Time Intensive",
    desc: "A surgical overhaul of your channel, packaging, and content strategy to unlock rapid growth.",
    price: "$950",
    cadence: "one-time",
    idealFor: "Creators and founders who want an expert roadmap before scaling production.",
    features: [
      "Full Channel & Studio Analytics Audit",
      "30-Day Content Roadmap & Topic Strategy",
      "10 Proven Hook Frameworks & 5 Thumbnail Concepts",
      "1 Fully Produced Benchmark Video (Edit + Packaging)",
      "2 Viral Shorts/Reels Cut & Formatted",
      "Editor Handoff SOP & Production Guidelines",
    ],
    ctaText: "Book Growth Sprint",
    ctaHref: "/contact?tier=sprint",
    featured: false,
  },
  {
    name: "Content Engine",
    badge: "Most Popular",
    desc: "Your complete video production and social growth operation on a turnkey monthly retainer.",
    price: "$2,800",
    cadence: "/ month",
    idealFor: "CEOs, coaches, and creators who need consistent high-retention content without spending 20+ hours a week.",
    features: [
      "4 to 6 Studio Long-Form Videos / month",
      "12 to 16 Platform-Native Shorts & Reels",
      "Custom High-CTR Thumbnails (with A/B Variants)",
      "LinkedIn Repurposing: 12-16 Thought Leadership Posts",
      "Title, Hook & SEO Metadata Optimization",
      "Direct WhatsApp / Slack Pipeline & Priority Slots",
      "2 Rounds of Timestamped Revisions Included",
      "Monthly Growth & Inbound Lead Report",
    ],
    ctaText: "Apply for Retainer",
    ctaHref: "/contact?tier=engine",
    featured: true,
  },
  {
    name: "Full-Funnel Scale",
    badge: "Enterprise / Bespoke",
    desc: "The complete organic-to-paid acquisition system: high-end production + targeted ads amplification.",
    price: "$5,200",
    cadence: "/ month",
    idealFor: "B2B brands, tech founders, and high-ticket offers ready to scale revenue aggressively.",
    features: [
      "Everything in Content Engine",
      "Up to 8-10 Long-Form Videos & 24+ Shorts",
      "Targeted Paid Ads Strategy (YouTube Ads & Meta Boost)",
      "Ad Creative Scripting, Hook Variations & Testing",
      "Funnel & VSL Optimization for Inbound Leads",
      "Dedicated Creative Lead & 24-48h Rush Turnaround",
      "Unlimited Revisions on All Deliverables",
      "Weekly Pipeline Review & Conversion Tracking",
    ],
    ctaText: "Schedule Scale Call",
    ctaHref: "/contact?tier=scale",
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
    a: "Just your raw footage (via Google Drive or Frame.io) and an initial 30-minute kickoff call. We handle everything else: scripting hooks, editing, motion graphics, thumbnails, LinkedIn formatting, and scheduling.",
  },
  {
    q: "Do you offer custom scopes?",
    a: "Yes. If your team requires specific deliverables (e.g., podcast editing only, ad creative testing batches, or multi-speaker events), book a call and we will tailor an exact scope for your goals.",
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
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface mb-5">
            Predictable investment. <br className="hidden sm:block" />
            <span className="gradient-text">Compounding growth.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Choose the level of partnership that fits your growth stage. High-retention video production, LinkedIn authority, and social media distribution under one roof.
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
