import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Services | Anuj Mishra",
  description: "Expert services in high-retention video editing, AI-powered social media management, and performance paid media (Google Ads & LinkedIn).",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Anuj Mishra",
    description: "Expert services in high-retention video editing, AI-powered social media management, and performance paid media (Google Ads & LinkedIn).",
    url: "https://anuj4u.in/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Anuj Mishra",
    description: "Expert services in high-retention video editing, AI-powered social media management, and performance paid media (Google Ads & LinkedIn).",
  },
};

export default function ServicesPage() {
  const whyWorkWithMe = [
    {
      title: "Content Creator Roots",
      desc: "Starting as a YouTube creator, I learned first-hand what makes content click. This foundational experience drives my audience-first approach to every project.",
      icon: "movie",
    },
    {
      title: "Video Editing Mastery",
      desc: "Years of refining my craft in Descript and DaVinci Resolve allow me to transform raw footage into high-retention stories that capture and hold attention.",
      icon: "content_cut",
    },
    {
      title: "SMM & Lead Gen Strategist",
      desc: "Evolving into a full-stack strategist, I now combine AI-powered management with performance ads to turn views into measurable business growth.",
      icon: "trending_up",
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow top-12 left-1/4"></div>

      {/* Hero Section */}
      <section className="mb-20 text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Solutions & Growth Services
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Maximizing Reach & <br />
          <span className="gradient-text">Revenue</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          I help creators & brands maximize reach and revenue with expert video editing in Descript, YouTube channel management, and conversion-focused design. I create content that connects, strategies that scale.
        </p>
      </section>

      {/* Why Work With Me */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Why Me</p>
          <h2 className="text-3xl font-bold text-on-surface mb-3">Your Growth, My Expertise</h2>
          <p className="text-on-surface-variant text-base">What makes the difference when you work with me.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyWorkWithMe.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        {/* Service 1: AI-Powered Social Media Management (Large Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row gap-8 items-center hover:-translate-y-1 transition-all">
          <div className="flex-1">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">
              AI-Powered Social Media Management
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">
              Leveraging cutting-edge AI workflows and strategic content calendars to automate growth while maintaining a human touch in community engagement.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                AI Workflows
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Content Calendars
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Automation
              </span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary/40 text-7xl">
              auto_awesome
            </span>
          </div>
        </div>

        {/* Service 2: Expert Video Editing (Small Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">movie_edit</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Expert Video Editing</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              High-end post-production using Descript, DaVinci Resolve, and CapCut. Specialized in high-retention Reels, Shorts, and long-form Podcasts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Descript
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              DaVinci
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              CapCut
            </span>
          </div>
        </div>

        {/* Service 3: Paid Media (Small Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">ads_click</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">High-Performance Paid Media</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Precision-targeted Google Ads and LinkedIn Ads campaigns designed specifically for lead generation and high-intent conversions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Google Ads
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Lead Gen
            </span>
          </div>
        </div>

        {/* Service 4: Digital Solutions (Large Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row-reverse gap-8 items-center hover:-translate-y-1 transition-all">
          <div className="flex-1">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Digital Solutions</h3>
            <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">
              AI-powered workflows, Website & Mobile App development. I help creators and businesses grow by tailoring every service to boost your success.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                AI Workflows
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Web Dev
              </span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary/40 text-7xl">
              devices
            </span>
          </div>
        </div>
      </section>

      {/* Pricing — Tiered Packages */}
      <section className="mb-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Working Together</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Choose Your <span className="gradient-text">Growth Plan</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            Transparent monthly packages designed to scale with you. Every plan is tailored to your goals — prices are indicative bands and confirmed on a free intro call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            const isFeatured = pkg.featured;
            return (
              <div
                key={pkg.name}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  isFeatured
                    ? "bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl md:-translate-y-4"
                    : "glass-card border border-outline-variant/50"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-black px-3 py-1 rounded-full tracking-wider shadow-md">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${isFeatured ? "text-white" : "text-on-surface"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-5 ${isFeatured ? "text-white/80" : "text-on-surface-variant"}`}>
                  {pkg.tagline}
                </p>

                <div className="mb-6">
                  <span className={`text-3xl font-extrabold ${isFeatured ? "text-white" : "text-on-surface"}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm font-medium ${isFeatured ? "text-white/70" : "text-on-surface-variant"}`}>
                    {" "}/ mo
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm">
                      <span
                        className={`material-symbols-outlined text-base shrink-0 mt-0.5 ${
                          isFeatured ? "text-white" : "text-primary"
                        }`}
                      >
                        check_circle
                      </span>
                      <span className={isFeatured ? "text-white/90" : "text-on-surface-variant"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?plan=${pkg.slug}`}
                  className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full transition-all hover:scale-105 text-sm ${
                    isFeatured
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary-container"
                  }`}
                >
                  Book a Call
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-on-surface-variant mt-6">
          Not sure which fits? Book a free call and I&apos;ll recommend the right starting point.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Questions? Answered.</h2>
        </div>
        <FAQAccordion items={servicesFaqs} />
      </section>

      <section className="glass-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Let&apos;s Build Your Strategy Today</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
          Reach out for a free consultation on how we can optimize your video retention and marketing pipeline.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-lg hover:scale-105"
        >
          Book Consultation
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </section>
    </div>
  );
}

const packages = [
  {
    name: "Starter",
    slug: "starter",
    tagline: "For creators getting consistent",
    price: "₹18K",
    featured: false,
    features: [
      "4 edited videos / month (Shorts or long-form)",
      "1 social platform management",
      "Basic content calendar",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth",
    slug: "growth",
    tagline: "For brands ready to scale",
    price: "₹42K",
    featured: true,
    features: [
      "12 edited videos / month (mixed formats)",
      "2 platforms + AI content calendar",
      "1 Google or LinkedIn ad campaign",
      "Bi-weekly strategy calls",
      "Priority 48-hr turnaround",
    ],
  },
  {
    name: "Scale",
    slug: "scale",
    tagline: "Full-growth partnership",
    price: "₹85K+",
    featured: false,
    features: [
      "Unlimited video editing queue",
      "Full social + paid media management",
      "Multi-channel ad campaigns",
      "Dedicated growth strategist",
      "Weekly reporting & optimization",
    ],
  },
];

const servicesFaqs = [
  {
    q: "How are payments structured?",
    a: "All plans are billed monthly. The prices shown are indicative bands — final scope and pricing are confirmed on a free intro call so we match the plan to your exact goals and budget.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Most clients start on Growth and scale up (or down) as their needs change. There's no lock-in — plans can be adjusted with a simple conversation.",
  },
  {
    q: "What do you need from me to start?",
    a: "Access to your channels, a short brand brief, and your raw footage or assets. I'll handle the strategy, editing, posting, and reporting from there.",
  },
  {
    q: "Do you offer one-off projects?",
    a: "Yes — if you only need a single VSL, podcast edit, or ad campaign, book a call and we'll scope it as a project rather than a monthly plan.",
  },
  {
    q: "What results can I expect?",
    a: "Results depend on your niche and starting point, but clients typically see improved retention, more consistent posting, and clearer funnel performance within the first 60–90 days.",
  },
];
