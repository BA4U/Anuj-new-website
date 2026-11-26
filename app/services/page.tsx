"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";

type CategoryKey = "all" | "video" | "demo" | "linkedin" | "ads";

type Service = {
  id: string;
  category: CategoryKey;
  title: string;
  badge?: string;
  oneLiner: string;
  visualImg: string;
  visualBadge: string;
  visualMetric?: string;
  deliverables: { icon: string; text: string }[];
  idealFor: string;
  price: string;
  proofLink: { text: string; href: string };
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    id: "content-engine",
    category: "video",
    title: "YouTube Growth Engine",
    badge: "Flagship Retainer",
    oneLiner: "Your complete turnkey YouTube operation: high-retention editing, CTR-focused packaging, and viral Shorts repurposing.",
    visualImg: "/brand/youtube-growth-engine.jpg",
    visualBadge: "13.0% Peak CTR",
    visualMetric: "4–8 Long-Form + 16 Shorts / mo",
    deliverables: [
      { icon: "schedule", text: "3–5 Day predictable turnaround" },
      { icon: "brush", text: "Custom thumbnails with A/B variants" },
      { icon: "smartphone", text: "Platform-native 9:16 Shorts & Reels" },
      { icon: "forum", text: "Direct 1-on-1 Slack & WhatsApp access" },
    ],
    idealFor: "Founders, creators & coaches who want consistent watch time without 20+ editing hours.",
    price: "From $3,200 / month",
    proofLink: { text: "Watch Long-Form Edits", href: "/work/long-form" },
    featured: true,
  },
  {
    id: "demo-launch-videos",
    category: "demo",
    title: "Demo & Product Launch Videos",
    badge: "SaaS & Feature Launches",
    oneLiner: "Sleek UI walkthroughs, feature demos, and product launch films engineered to drive user signups and demo bookings.",
    visualImg: "/brand/saas-demo-showcase.jpg",
    visualBadge: "Product Hunt & Hero Ready",
    visualMetric: "16:9 Web + 9:16 Mobile Cuts",
    deliverables: [
      { icon: "animation", text: "Dynamic UI zoom physics & mockups" },
      { icon: "timer", text: "5-Second friction-free hook formula" },
      { icon: "volume_up", text: "Tactile UI sound design & audio mixing" },
      { icon: "aspect_ratio", text: "Multi-platform cuts (16:9, 9:16, 1:1)" },
    ],
    idealFor: "SaaS founders and product teams preparing for a major launch, feature release, or VSL update.",
    price: "Project-based or in Scale tier",
    proofLink: { text: "Explore Live SaaS Demos", href: "/work/demo-videos" },
  },
  {
    id: "linkedin-funnel-system",
    category: "linkedin",
    title: "LinkedIn Authority & Inbound Funnel",
    badge: "B2B Executive Inbound",
    oneLiner: "Repurposing your video insights and founder expertise into high-impact thought leadership that attracts B2B pipeline.",
    visualImg: "/brand/b2b-linkedin-funnel.jpg",
    visualBadge: "+$50K Inbound Pipeline",
    visualMetric: "12–16 Executive Posts & PDFs / mo",
    deliverables: [
      { icon: "badge", text: "Complete profile & headline optimization" },
      { icon: "auto_stories", text: "High-retention carousels & text posts" },
      { icon: "filter_alt", text: "Lead magnet funnels & engagement playbooks" },
      { icon: "insights", text: "Monthly connection & lead report" },
    ],
    idealFor: "B2B consultants, CEOs, and advisors who want inbound leads without daily writing.",
    price: "Monthly retainer or growth add-on",
    proofLink: { text: "Test Free LinkedIn Funnel Tool", href: "/linkedin-funnel" },
  },
  {
    id: "targeted-ads-growth",
    category: "ads",
    title: "Targeted YouTube Ads & Amplification",
    badge: "Paid Acquisition Engine",
    oneLiner: "Putting your highest-converting video content in front of high-intent buyers with targeted YouTube In-Feed and Google Ads.",
    visualImg: "/proof/google-ads-growth.png",
    visualBadge: "$0.23 Average CPC",
    visualMetric: "Guaranteed Targeted Pipeline",
    deliverables: [
      { icon: "ads_click", text: "YouTube In-Feed & Discovery setup" },
      { icon: "movie_filter", text: "Ad creative scripting & hook edits" },
      { icon: "target", text: "Competitor channel & keyword targeting" },
      { icon: "analytics", text: "Weekly CPA & view-rate reporting" },
    ],
    idealFor: "Businesses ready to scale beyond organic reach and turn video views into booked calls.",
    price: "Monthly ad management + retainer",
    proofLink: { text: "Calculate Your Paid Ad ROI", href: "/ad-roi-calculator" },
  },
  {
    id: "content-production-system",
    category: "video",
    title: "Production System & SOPs",
    badge: "Internal Team Scale",
    oneLiner: "A complete, institutional video production machine for your internal team: templates, hook frameworks, and editor SOPs.",
    visualImg: "/brand/production-system-sops.jpg",
    visualBadge: "Descript + DaVinci SOPs",
    visualMetric: "Institutional Consistency",
    deliverables: [
      { icon: "alt_route", text: "Workflow audit & bottleneck removal" },
      { icon: "view_quilt", text: "Custom intro, CTA & motion templates" },
      { icon: "school", text: "Editor review frameworks & QA SOPs" },
      { icon: "library_books", text: "Shared sound kit & brand asset vault" },
    ],
    idealFor: "Agencies and internal media teams that want to scale video output without quality loss.",
    price: "One-time build or quarterly advisory",
    proofLink: { text: "Read Tim Cakir Case Study", href: "/work/case-studies" },
  },
];

const CATEGORIES = [
  { key: "all", label: "All Services" },
  { key: "video", label: "YouTube & Video" },
  { key: "demo", label: "Product Demos" },
  { key: "linkedin", label: "LinkedIn Authority" },
  { key: "ads", label: "Paid Ads & Systems" },
] as const;

const SERVICES_FAQS = [
  {
    q: "How does pricing work?",
    a: "Monthly retainers range between $3,000 to $8,000 per month depending on video cadence, omnichannel repurposing, and whether product launch videos or paid ad amplification are included. All retainers are month-to-month with direct 1-on-1 partner access.",
  },
  {
    q: "Can I switch plans or scale later?",
    a: "Absolutely. Many clients start with the YouTube Growth Engine and add LinkedIn Authority or SaaS Demo videos once their cadence is dialed in. There are no lock-ins, and plans can be adjusted with a simple conversation.",
  },
  {
    q: "What do you need from me to start?",
    a: "Access to your channel, a short brand brief, and your raw footage or screen captures (via Google Drive or Frame.io). I handle the strategy, scripting hooks, editing, packaging, and reporting from there.",
  },
  {
    q: "How fast can we launch our first video?",
    a: "After our kickoff call, most clients receive their first fully edited, packaged video draft inside 3 to 5 business days. Short-form reels and LinkedIn drafts take 24 to 48 hours.",
  },
  {
    q: "Do you offer standalone project scopes?",
    a: "Yes. If you need a single SaaS product launch video, YouTube channel audit, or targeted ad campaign, I will scope it as a standalone sprint rather than an ongoing retainer.",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES;
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-12 xl:px-16 max-w-[1340px] mx-auto relative overflow-hidden min-h-screen">
      {/* Signature Ambient Auroras */}
      <div className="aurora aurora-a w-[580px] h-[580px] -top-32 -left-32 opacity-45 pointer-events-none" />
      <div className="aurora aurora-b w-[520px] h-[520px] top-1/3 -right-36 opacity-35 pointer-events-none" />
      <div className="aurora aurora-a w-[480px] h-[480px] bottom-20 left-10 opacity-30 pointer-events-none" />

      {/* Hero Header */}
      <section className="mb-14 md:mb-16 text-center max-w-3xl mx-auto pt-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase mb-5 border border-primary/20 shadow-sm">
          Visual-First Production
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface mb-5 leading-tight tracking-tight">
          Services built to turn views into <span className="gradient-text">compounding revenue.</span>
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8">
          Turnkey YouTube channel management, high-converting product launch videos, and omnichannel distribution. You record; I handle the editing, packaging, and growth.
        </p>

        {/* Quick-Nav Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-900/[0.04] backdrop-blur-md rounded-full border border-black/[0.06] max-w-fit mx-auto shadow-sm">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key as CategoryKey)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Visual-First Services Grid */}
      <section className="mb-24 space-y-7 relative z-10">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className={`card-glow spotlight rounded-[32px] p-6 sm:p-8 md:p-9 transition-all duration-300 relative border ${
              service.featured
                ? "border-primary/50 shadow-[0_25px_70px_-20px_rgba(73,54,230,0.38)] bg-gradient-to-br from-primary/[0.04] to-transparent"
                : "border-white/70 shadow-[0_15px_40px_-15px_rgba(73,54,230,0.18)]"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-9 items-center">
              {/* Left Column: Rich Visual Asset & Mockup Frame (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-black/10 shadow-lg group/media">
                  <Image
                    src={service.visualImg}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover group-hover/media:scale-105 transition-transform duration-700 opacity-90 group-hover/media:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Top-left chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      {service.visualBadge}
                    </span>
                  </div>

                  {/* Bottom Metric Tag */}
                  {service.visualMetric && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/90 text-neutral-900 backdrop-blur-md shadow-md">
                        {service.visualMetric}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30">
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Super Punchy, Scannable Text & Actions (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {service.badge}
                    </span>
                    <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-5">
                    {service.oneLiner}
                  </p>

                  {/* Visual 4-Pill Deliverable Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-black/[0.05] shadow-xs text-xs sm:text-sm font-medium text-neutral-800"
                      >
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          {item.icon}
                        </span>
                        <span className="truncate">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-on-surface-variant italic mb-6">
                    <span className="font-semibold text-neutral-700">Best For:</span> {service.idealFor}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/[0.06]">
                  <Link
                    href={`/contact?service=${service.id}`}
                    className="btn btn-primary text-xs sm:text-sm px-6 py-2.5 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    Get Started
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>

                  <Link
                    href={service.proofLink.href}
                    className="btn btn-secondary text-xs sm:text-sm px-5 py-2.5 rounded-full font-semibold"
                  >
                    {service.proofLink.text}
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Retainer Pricing Tier Bridge Banner */}
      <section className="mb-24 rounded-[32px] bg-neutral-950 text-white p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3.5 py-1 rounded-full mb-3 inline-block border border-white/10">
              Predictable Retainers
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Transparent investment. High-expert partner access.
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Every retainer gives you direct access to me with zero junior agency handoffs. Month-to-month with no long lock-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-1">Growth Engine</p>
              <p className="text-3xl font-extrabold text-white mb-2">$3,200 <span className="text-xs font-normal text-neutral-400">/ mo</span></p>
              <p className="text-xs text-neutral-300">4–6 long-form videos, 12–16 shorts, custom thumbnails, and channel SEO.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-primary/30 to-purple-600/30 border border-primary/50 p-5 text-center shadow-lg relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-full">
                Most Popular
              </span>
              <p className="text-xs uppercase tracking-wider text-purple-200 font-bold mb-1">Authority &amp; Scale</p>
              <p className="text-3xl font-extrabold text-white mb-2">$5,500 <span className="text-xs font-normal text-neutral-400">/ mo</span></p>
              <p className="text-xs text-neutral-200">Up to 10 videos, 24 shorts, dedicated SaaS demo/launch video, &amp; LinkedIn thought leadership.</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-1">Executive Advisory</p>
              <p className="text-3xl font-extrabold text-white mb-2">$8,000 <span className="text-xs font-normal text-neutral-400">/ mo</span></p>
              <p className="text-xs text-neutral-300">Full media powerhouse: 14 videos, 30+ shorts, 3D motion launch kit, and targeted paid ads.</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-neutral-950 font-bold px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all text-sm shadow-md"
            >
              Compare All Retainer Inclusions
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual 4-Step Process */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Predictable Workflow</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            From raw footage to published asset in 7 days.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Strategy Kickoff (Day 1)",
              desc: "Channel audit, ICP review, retention drop-off diagnosis, and benchmark alignment.",
              icon: "call",
            },
            {
              step: "02",
              title: "Roadmap & Hooks (Days 2–3)",
              desc: "Scripting high-CTR title formulas, hook variations, and custom thumbnail concepts.",
              icon: "description",
            },
            {
              step: "03",
              title: "Pacing & Assembly (Days 4–6)",
              desc: "DaVinci Resolve precision editing: cutting dead air, zoom physics, and sound design.",
              icon: "movie_filter",
            },
            {
              step: "04",
              title: "Ship & Iterate (Weekly)",
              desc: "Timestamped Frame.io review, scheduled uploads, and weekly retention analytics.",
              icon: "rocket_launch",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="card-glow spotlight rounded-2xl p-6 border border-white/60 shadow-sm hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/15">
                  {s.step}
                </span>
                <span className="material-symbols-outlined text-primary text-xl">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-1.5">{s.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Clear Answers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion items={SERVICES_FAQS} />
      </section>

      {/* Final Call to Action */}
      <section className="card-glow spotlight rounded-3xl p-10 md:p-14 text-center max-w-4xl mx-auto relative overflow-hidden border border-primary/30 shadow-[0_30px_70px_-20px_rgba(73,54,230,0.35)]">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-on-surface">Not sure which service fits best?</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Book a free 20-minute call. I will personally review your YouTube channel, raw footage, and
          growth goals, and recommend the highest-impact starting point.
        </p>
        <Link
          href="/contact"
          className="btn btn-glow font-bold px-8 py-3.5 rounded-full shadow-lg inline-flex items-center gap-2"
        >
          Book a strategy call
          <span className="material-symbols-outlined text-base">event</span>
        </Link>
      </section>
    </div>
  );
}
