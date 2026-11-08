import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Services",
  description: "Three content services for creators, coaches, authors and founders: LinkedIn Funnel System, Content Engine and Content Production System.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Anuj Mishra",
    description: "Three content services built to grow your reach and revenue.",
    url: "https://anuj4u.in/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Anuj Mishra",
    description: "Three content services built to grow your reach and revenue.",
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
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "content-engine",
    title: "YouTube Growth Engine (Flagship)",
    pitch:
      "Full turnkey YouTube operation engineered for retention, watch time, and revenue. Strategy, scripting, high-retention editing, packaging, SEO publishing, and Shorts repurposing.",
    deliverables: [
      "4 to 8 high-retention long-form videos edited per month",
      "12 to 16 viral Shorts and Reels cut with dynamic pacing",
      "High-CTR thumbnail packaging (with A/B testing concepts)",
      "Channel audit, content calendar, and 90-day growth strategy",
      "SEO titles, timestamps, descriptions, and scheduling",
      "Weekly analytics review and retention drop-off fixes",
    ],
    idealFor:
      "Creators, founders, coaches, and authors who want YouTube to be their primary inbound revenue engine.",
    icon: "rocket_launch",
    price: "Custom monthly retainer",
    featured: true,
  },
  {
    id: "linkedin-funnel-system",
    title: "LinkedIn Authority & Inbound Funnel",
    pitch:
      "Transform your YouTube video insights and expertise into an executive LinkedIn presence that attracts high-ticket clients, B2B deals, and partnership opportunities.",
    deliverables: [
      "Profile and headline rewrite optimized for your ideal ICP",
      "12-16 high-impact thought leadership posts & carousels / month",
      "Lead magnet funnels and comment engagement playbooks",
      "Repurposing YouTube key insights into native text & PDFs",
      "Monthly inbound lead and connection growth report",
    ],
    idealFor:
      "Consultants, B2B founders, and executives who want high-ticket clients from LinkedIn without writing daily.",
    icon: "hub",
    price: "Monthly retainer or add-on",
  },
  {
    id: "targeted-ads-growth",
    title: "Targeted YouTube Ads & Paid Amplification",
    pitch:
      "Accelerate channel growth and client acquisition by putting your top-performing YouTube videos directly in front of your dream buyers using paid Google/YouTube ads.",
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
  },
  {
    id: "content-production-system",
    title: "Content Production System & SOPs",
    pitch:
      "A complete, reusable video production machine for your internal team: templates, hook frameworks, B-roll asset libraries, and editor training.",
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
  },
];

const servicesFaqs = [
  {
    q: "How does pricing work?",
    a: "Plans are billed monthly. After a short intro call I send a quote that matches your goals and budget, with no upsells or hidden costs.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Most clients start with the LinkedIn Funnel System and add Content Engine once they are ready to scale. There is no lock-in, and plans can be adjusted with a simple conversation.",
  },
  {
    q: "What do you need from me to start?",
    a: "Access to your channels, a short brand brief, and your raw footage or assets. I handle the strategy, production, posting, and reporting from there.",
  },
  {
    q: "How fast can we launch?",
    a: "After the intro call, most clients are live within 7 to 14 days. LinkedIn Funnel System clients usually have their first week of posts ready inside 10 days.",
  },
  {
    q: "Do you offer one-off projects?",
    a: "Yes. If you only need a single VSL, podcast edit, or ad campaign, book a call and I will scope it as a project rather than a monthly plan.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-12 left-1/4"></div>

      {/* Hero */}
      <section className="mb-20 text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Services
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Four ways to <span className="gradient-text">scale your YouTube channel & content</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          I produce and manage your YouTube channel, high-retention content, and multi-platform distribution end-to-end. You record; I handle everything else.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <Link href="/pricing" className="btn btn-dark">View pricing & plans</Link>
          <Link href="/contact" className="btn btn-secondary">Book a call</Link>
        </div>
      </section>

      {/* Services, Vertical Stacked Cards */}
      <section className="mb-24 space-y-6">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className={`group glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
              service.featured
                ? "border-2 border-primary shadow-xl"
                : "border border-outline-variant/50"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                {service.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
                {service.title}
              </h2>
              <p className="text-sm font-semibold text-primary mb-4">
                {service.price}
              </p>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {service.pitch}
              </p>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                What you get
              </p>
              <ul className="space-y-2 mb-6">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant italic border-l-2 border-primary/40 pl-3">
                Best for: {service.idealFor}
              </p>
            </div>

            <div className="md:w-64 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform hover:bg-primary-container text-sm"
              >
                Get Started
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* How We Work */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            How I <span className="gradient-text">work with you</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            A simple, predictable engagement, from first call to first deliverable in
            under 7 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Free Intro Call",
              desc: "20-minute call to understand your goals, current setup, and what success looks like.",
              icon: "call",
            },
            {
              step: "02",
              title: "Scope & Plan",
              desc: "I send a tailored proposal with deliverables, timeline, and a fixed monthly scope.",
              icon: "description",
            },
            {
              step: "03",
              title: "Onboarding",
              desc: "Brand brief, asset handover, channel access, and a shared workspace for everything.",
              icon: "handshake",
            },
            {
              step: "04",
              title: "Ship & Iterate",
              desc: "Weekly delivery against an agreed calendar, with monthly reporting and strategy calls.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Questions? Answered.</h2>
        </div>
        <FAQAccordion items={servicesFaqs} />
      </section>

      <section className="cta-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden ">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Not sure which plan fits?</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
          Book a free 20-minute call. I will personally review your YouTube channel, content, and
          goals, and recommend the highest-impact starting point.
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
