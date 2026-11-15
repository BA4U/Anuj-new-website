import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "YouTube & Video Production Growth Services | Anuj Mishra",
  description:
    "High-retention YouTube channel management, SaaS demo videos, LinkedIn inbound authority, and targeted ad amplification for founders and creators.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "YouTube & Video Production Growth Services | Anuj Mishra",
    description:
      "High-retention YouTube channel management, SaaS product demo videos, and omnichannel content distribution.",
    url: "https://anuj4u.in/services",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Anuj Mishra - Video Growth Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube & Video Production Growth Services | Anuj Mishra",
    description:
      "High-retention YouTube channel management, SaaS product demo videos, and omnichannel content distribution.",
    images: ["/api/og"],
  },
};

type Service = {
  id: string;
  title: string;
  pitch: string;
  deliverables: string[];
  idealFor: string;
  icon: string;
  price: string;
  proofLink?: { text: string; href: string };
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "content-engine",
    title: "YouTube Growth Engine (Flagship)",
    pitch:
      "Full turnkey YouTube operation engineered for viewer retention, algorithmic watch time, and revenue. End-to-end scripting frameworks, high-retention video editing, click-worthy packaging, and Shorts repurposing.",
    deliverables: [
      "4 to 8 high-retention long-form videos edited per month",
      "12 to 16 viral Shorts and Reels cut with dynamic 9:16 pacing",
      "High-CTR thumbnail packaging (with A/B testing concepts)",
      "Channel audit, content calendar, and 90-day growth strategy",
      "SEO titles, timestamps, descriptions, and scheduling",
      "Weekly analytics review and retention drop-off diagnostics",
    ],
    idealFor:
      "Creators, founders, coaches, and authors who want YouTube to be their primary inbound revenue engine.",
    icon: "rocket_launch",
    price: "From $3,200 / month",
    proofLink: { text: "Watch Long-Form Edits", href: "/work/long-form" },
    featured: true,
  },
  {
    id: "demo-launch-videos",
    title: "Demo & Product Launch Videos",
    pitch:
      "High-converting SaaS walkthroughs, product launch videos, and interactive feature tours. Designed with sleek motion graphics, UI zoom physics, and crisp pacing to turn curious viewers into paid subscribers and product evangelists.",
    deliverables: [
      "End-to-end launch video concept, script, and storyboard",
      "Sleek UI animations, zooms, cursor smoothing, and mockups",
      "Product Hunt, Twitter/X, and website hero cut variations",
      "Sound design, custom audio mixing, and pro voiceover syncing",
      "60-second teaser cuts formatted for vertical Shorts/Reels",
      "Figma / high-res screen recording capture guidelines",
    ],
    idealFor:
      "SaaS founders, product teams, and tech startups preparing for a major feature launch or conversion overhaul.",
    icon: "play_circle",
    price: "Project-based or included in Scale retainers",
    proofLink: { text: "Explore Live SaaS Demos", href: "/work/demo-videos" },
  },
  {
    id: "linkedin-funnel-system",
    title: "LinkedIn Authority & Inbound Funnel",
    pitch:
      "Transform your video insights and founder expertise into an executive LinkedIn presence that attracts high-ticket clients, B2B enterprise deals, and partnership opportunities.",
    deliverables: [
      "Profile and headline rewrite optimized for your ideal customer persona",
      "12-16 high-impact thought leadership posts & carousels / month",
      "Lead magnet funnels and comment engagement playbooks",
      "Repurposing YouTube key insights into native text & PDFs",
      "Monthly inbound lead and connection growth report",
    ],
    idealFor:
      "Consultants, B2B founders, and executives who want high-ticket clients from LinkedIn without writing daily.",
    icon: "hub",
    price: "Monthly retainer or growth add-on",
    proofLink: { text: "Test Free LinkedIn Funnel Tool", href: "/linkedin-funnel" },
  },
  {
    id: "targeted-ads-growth",
    title: "Targeted YouTube Ads & Paid Amplification",
    pitch:
      "Accelerate channel growth and client acquisition by putting your top-performing YouTube videos directly in front of your dream buyers using targeted Google and YouTube ad campaigns.",
    deliverables: [
      "Targeted YouTube In-Feed & Discovery Ad campaign setup",
      "High-converting video hook scripting and ad creative edits",
      "Audience persona, competitor placement, and search keyword targeting",
      "Landing page, VSL, and booked call conversion tracking",
      "Weekly CPA, view-rate, and qualified pipeline reporting",
    ],
    idealFor:
      "Founders and businesses ready to scale beyond organic reach and turn video views into guaranteed pipeline.",
    icon: "ads_click",
    price: "Monthly ad management + retainer",
    proofLink: { text: "Calculate Your Paid Ad ROI", href: "/ad-roi-calculator" },
  },
  {
    id: "content-production-system",
    title: "Content Production System & SOPs",
    pitch:
      "A complete, reusable video production machine for your internal media team: custom templates, hook frameworks, B-roll asset libraries, and hands-on editor training.",
    deliverables: [
      "Production workflow audit and bottleneck elimination",
      "Custom templates for hooks, intros, CTAs, and motion graphics",
      "Editor training, video review frameworks, and complete SOPs",
      "Shared asset library, sound design kit, and brand style guide",
      "Monthly workflow coaching and quality assurance reviews",
    ],
    idealFor:
      "Agencies and internal media teams that want to scale video output with institutional consistency.",
    icon: "movie_edit",
    price: "One-time build or quarterly advisory",
    proofLink: { text: "Read Tim Cakir Case Study", href: "/work/case-studies" },
  },
];

const servicesFaqs = [
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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.pitch,
        provider: {
          "@type": "Person",
          name: "Anuj Mishra",
          url: "https://anuj4u.in",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "3000-8000",
          },
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="ambient-glow top-12 left-1/4"></div>

      {/* Hero */}
      <section className="mb-16 md:mb-20 text-center max-w-3xl mx-auto pt-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase mb-5">
          Turnkey Production &amp; Growth
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface mb-5 leading-tight tracking-tight">
          Services built to turn views into <span className="gradient-text">compounding revenue.</span>
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8">
          I produce and manage your YouTube channel, high-retention video content, and omnichannel distribution end-to-end. You record; I handle the editing, packaging, and growth.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/pricing" className="btn btn-dark">
            View Pricing &amp; Retainers ($3K – $8K)
          </Link>
          <Link href="/work" className="btn btn-secondary">
            Explore Portfolio Samples
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Book a Strategy Call
          </Link>
        </div>
      </section>

      {/* Services List, Vertical Stacked Cards */}
      <section className="mb-24 space-y-6">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className={`group glass-card rounded-3xl p-7 sm:p-9 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
              service.featured
                ? "border-2 border-primary shadow-xl bg-gradient-to-br from-primary/[0.03] to-transparent"
                : "border border-outline-variant/50"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                {service.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full shadow-sm">
                    Most Popular Retainer
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
                {service.title}
              </h2>
              <p className="text-sm font-semibold text-primary mb-3">
                {service.price}
              </p>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {service.pitch}
              </p>

              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                What is included:
              </p>
              <ul className="space-y-2 mb-6">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-outline-variant/30">
                <p className="text-xs text-on-surface-variant italic border-l-2 border-primary/40 pl-3">
                  Best for: {service.idealFor}
                </p>
                {service.proofLink && (
                  <Link
                    href={service.proofLink.href}
                    className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline ml-auto"
                  >
                    {service.proofLink.text}
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="md:w-64 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 md:pl-8">
              <div className="text-left md:text-right hidden sm:block">
                <p className="text-xs text-neutral-500 font-medium">Turnaround</p>
                <p className="text-sm font-bold text-on-surface">3 to 5 business days</p>
                <p className="text-xs text-neutral-500 font-medium mt-2">Communication</p>
                <p className="text-sm font-bold text-on-surface">Direct 1-on-1 Slack/WhatsApp</p>
              </div>

              <Link
                href={`/contact?service=${service.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-full shadow-md hover:scale-105 transition-transform hover:bg-primary/90 text-sm"
              >
                Get Started
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Retainer Pricing Tier Bridge Banner */}
      <section className="mb-24 rounded-3xl bg-neutral-950 text-white p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
              Predictable Retainers
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
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

      {/* How I Work Process */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Predictable Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            How I <span className="gradient-text">work with you</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            From your raw footage to a published, high-retention asset in under 7 business days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Strategy Kickoff (Day 1)",
              desc: "A focused intro call to audit your channel, target ICP, review retention drop-offs, and establish benchmarks.",
              icon: "call",
            },
            {
              step: "02",
              title: "Roadmap & Hooks (Days 2–3)",
              desc: "I script high-CTR title formulas, hook variations, and create custom thumbnail concepts before editing begins.",
              icon: "description",
            },
            {
              step: "03",
              title: "Pacing & Assembly (Days 4–6)",
              desc: "Precision editing in DaVinci Resolve: cutting dead air, dynamic zoom physics, sound design, and on-screen graphics.",
              icon: "movie_filter",
            },
            {
              step: "04",
              title: "Ship & Iterate (Weekly)",
              desc: "Timestamped review in Frame.io, publishing on schedule, and weekly retention analytics to continually raise watch time.",
              icon: "rocket_launch",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {s.step}
                </span>
                <span className="material-symbols-outlined text-primary text-xl">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">{s.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <p className="text-sm text-on-surface-variant mt-2">Clear answers on deliverables, turnaround times, and communication.</p>
        </div>
        <FAQAccordion items={servicesFaqs} />
      </section>

      {/* Final CTA */}
      <section className="cta-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Not sure which service fits best?</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
          Book a free 20-minute call. I will personally review your YouTube channel, raw footage, and
          growth goals, and recommend the highest-impact starting point.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-lg hover:scale-105"
        >
          Book a strategy call
          <span className="material-symbols-outlined">event</span>
        </Link>
      </section>
    </div>
  );
}
