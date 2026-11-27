import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
  description:
    "Discover how Anuj Mishra helps founders, creators, and B2B leaders scale YouTube channels with high-retention video editing, thumbnail packaging, and growth systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
    description:
      "5+ years scaling YouTube channels, video retention, and content operations for founders and creators worldwide.",
    url: "https://anuj4u.in/about",
    type: "profile",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Anuj Mishra - Solo YouTube Growth Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
    description:
      "5+ years scaling YouTube channels, video retention, and content operations for founders and creators worldwide.",
    images: ["/api/og"],
  },
};

const STATS = [
  { value: "540+", label: "Videos produced & edited" },
  { value: "10M+", label: "Views generated across clients" },
  { value: "5+", label: "Years in video & growth" },
  { value: "100%", label: "Direct solo accountability" },
];

interface TimelineEvent {
  period: string;
  role: string;
  highlight: string;
  description: string;
  tags: string[];
  icon: string;
}

const TIMELINE: TimelineEvent[] = [
  {
    period: "2024 – Present",
    role: "Solo YouTube Growth Partner & Content Operator",
    highlight: "+$50K Client Pipeline & End-to-End Retention Systems",
    description:
      "Partnering directly with selected creators, educators, and B2B founders to run their entire video growth engine. Managing script hook frameworks, retention-first editing, high-CTR thumbnail packaging, SaaS demo walkthroughs, and LinkedIn thought-leadership. Generated over $50,000 in client pipeline for Launch Excel (Victor Chan) and scaled high-retention technical education channels.",
    tags: ["Channel Management", "Retention Pacing", "SaaS Demos", "Thumbnail A/B Testing"],
    icon: "trending_up",
  },
  {
    period: "2022 – 2024",
    role: "High-Retention Video Editor & Podcast Producer",
    highlight: "Automated Production Pipelines & Full Podcast Launches",
    description:
      "Engineered full video podcast architectures and production workflows for international creators and professionals (including Harjeet Dhillon, Blake Reddy, and Tim Cakir). Designed custom multi-camera visual layouts, audio mastering chains, and retention-first pacing that reduced client production overhead by over 80%.",
    tags: ["Video Podcasts", "DaVinci Resolve", "Descript", "Audio Engineering"],
    icon: "mic",
  },
  {
    period: "2020 – 2022",
    role: "Freelance Video Editor & Packaging Specialist",
    highlight: "International Client Scaling & Format Testing",
    description:
      "Transitioned from personal content experimentation into global freelance client work. Tested hundreds of video hooks, retention curves, title formulas, and graphic treatments. Produced educational tutorials, sales-page VSLs, and early short-form videos that reliably earned viewer watch time.",
    tags: ["Client Growth", "Hook Psychology", "Graphic Design", "Educational Video"],
    icon: "play_circle",
  },
  {
    period: "2019",
    role: "Where It Started: First Personal YouTube Channel",
    highlight: "The Groundwork: Scripting, Pacing & Algorithm Dynamics",
    description:
      "Launched my first personal YouTube channel to learn the craft from scratch. Edited my own footage, tested titles, designed thumbnails, and studied retention drop-offs frame by frame. Established my core philosophy early: the YouTube Studio data doesn't lie, content either earns attention or it doesn't.",
    tags: ["Channel Launch", "Self-Taught Craft", "YouTube Studio", "Data-First"],
    icon: "lightbulb",
  },
];

const TOOLKIT = [
  {
    name: "DaVinci Resolve Studio",
    category: "Color & High-End Assembly",
    desc: "Used for seamless multi-camera sync, color grading, tactile motion curves, and precision retention pacing.",
    icon: "video_settings",
  },
  {
    name: "Descript",
    category: "Speech Editing & Text Sync",
    desc: "Rapid speech cleanup, removing filler words, and synchronizing dynamic kinetic captions.",
    icon: "record_voice_over",
  },
  {
    name: "Premiere Pro & After Effects",
    category: "Motion & UI Animation",
    desc: "Custom title cards, UI zooms, cursor smoothing, and 3D mockups for SaaS product walkthroughs.",
    icon: "animation",
  },
  {
    name: "Photoshop & Canva Pro",
    category: "Thumbnail Packaging",
    desc: "Crafting high-contrast visual hooks, facial cutouts, and readable typography that boost CTR by 13-15%.",
    icon: "brush",
  },
  {
    name: "YouTube Studio & Retention AI",
    category: "Analytics & Drop-Off Diagnostics",
    desc: "Analyzing second-by-second audience retention curves to eliminate drop-off points before the next upload.",
    icon: "insights",
  },
  {
    name: "Frame.io & Notion",
    category: "Frictionless Client Workspace",
    desc: "Timestamped video reviews and editorial calendars so handoffs take minutes, not back-and-forth emails.",
    icon: "fact_check",
  },
];

const PRINCIPLES = [
  {
    title: "Retention Over Fluff",
    icon: "timer",
    desc: "Every second on screen must earn the next. I cut the dead air, tighten the pacing, and ensure your hook delivers on the title's promise within the first 30 seconds.",
  },
  {
    title: "Packaging Decides the Click",
    icon: "visibility",
    desc: "A brilliant video that nobody clicks is a wasted upload. I develop the title and thumbnail concepts before the edit begins, anchoring viewer curiosity and driving CTR.",
  },
  {
    title: "100% Solo Accountability",
    icon: "person_check",
    desc: "No account managers, no outsourced junior editors, and no broken communication. You work and communicate directly with me via WhatsApp or Slack every single week.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Anuj Mishra",
      url: "https://anuj4u.in/about",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8",
      jobTitle: "Solo YouTube Growth Partner & Video Editor",
      description:
        "5+ years scaling YouTube channels, video retention, and content operations for creators and founders worldwide.",
      knowsAbout: [
        "YouTube Channel Management",
        "Video Editing",
        "Viewer Retention Pacing",
        "Thumbnail Design & A/B Testing",
        "SaaS Product Demo Videos",
        "LinkedIn Thought Leadership",
        "DaVinci Resolve",
        "Descript",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "YouTube Growth Strategist & Video Producer",
        occupationLocation: {
          "@type": "Country",
          name: "Worldwide",
        },
      },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Signature Ambient Auroras & Background Glows */}
      <div className="aurora aurora-a w-[560px] h-[560px] -top-32 -left-32 opacity-45 pointer-events-none" />
      <div className="aurora aurora-b w-[500px] h-[500px] top-1/3 -right-36 opacity-35 pointer-events-none" />
      <div className="aurora aurora-a w-[480px] h-[480px] bottom-20 left-10 opacity-30 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10 pt-10 md:pt-16 pb-20 relative z-10">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center mb-16 md:mb-20">
          <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20 shadow-sm">
              Solo Growth Partner
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-5 leading-[1.15]">
              Hi, I&apos;m <span className="gradient-text">Anuj Mishra.</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-4 max-w-xl">
              I am an independent YouTube growth strategist, video editor, and content operator. Over the past 5+ years,
              I&apos;ve helped creators, educators, and B2B founders turn raw video footage into
              high-retention content systems that generate predictable views and inbound revenue.
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl">
              I don&apos;t run a bloated agency with junior handoffs. When you partner with me, I personally
              handle your channel audit, hook scripting, video pacing, thumbnail packaging, and multi-platform distribution.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/contact"
                className="btn btn-glow font-medium px-6 py-3 rounded-full text-sm inline-flex items-center gap-1.5 shadow-lg"
              >
                Work with Me Directly
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/work"
                className="btn btn-secondary text-on-surface font-medium px-6 py-3 rounded-full text-sm"
              >
                Explore My Work
              </Link>
            </div>
          </div>

          {/* Profile Photo with Apple-style framing & glow */}
          <div className="md:col-span-5 relative max-w-[340px] w-full mx-auto order-1 md:order-2">
            <div
              className="absolute -inset-4 rounded-[40px] opacity-70 blur-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(73,54,230,0.55), rgba(168,85,247,0.4))" }}
            />
            <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden border border-white/70 bg-surface-container shadow-[0_30px_70px_-20px_rgba(73,54,230,0.5)]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Anuj Mishra - Solo YouTube Growth Partner & High-Retention Video Editor"
                fill
                sizes="(max-width: 768px) 80vw, 340px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center bg-black/60 backdrop-blur-md rounded-2xl py-2.5 px-3 border border-white/15 shadow-xl">
                <p className="text-white font-bold text-xs sm:text-sm">Anuj Mishra</p>
                <p className="text-[11px] text-purple-200">YouTube Growth Partner &amp; Editor</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR - UPGRADED TO CARD-GLOW SPOTLIGHT */}
        <section className="mb-20">
          <div className="card-glow spotlight rounded-[28px] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30 shadow-[0_20px_50px_-20px_rgba(73,54,230,0.25)] border border-white/60">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-6 sm:p-7 text-center">
                <div className="text-3xl md:text-4xl font-extrabold gradient-text leading-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-on-surface-variant font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED CLIENT IMPACT SPOTLIGHT - UPGRADED TO CARD-GLOW SPOTLIGHT */}
        <section className="mb-24">
          <div className="card-glow spotlight rounded-[32px] p-8 md:p-12 relative overflow-hidden border border-primary/25 shadow-[0_25px_65px_-20px_rgba(73,54,230,0.3)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3 inline-block">
                  Verified Client Impact
                </span>
                <blockquote className="text-lg md:text-xl font-medium text-on-surface leading-snug mb-4">
                  &ldquo;I edited and packaged videos for twelve months. One single YouTube client was worth <span className="font-bold text-primary">$50,000</span> to him directly.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    TC
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Tim Cakir</p>
                    <p className="text-xs text-on-surface-variant">AI &amp; Tech Creator | Growth Partner Client</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 shrink-0 w-full md:w-auto">
                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-4 border border-black/[0.08] text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <p className="text-2xl font-bold gradient-text">$50K</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Client pipeline won</p>
                </div>
                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-4 border border-black/[0.08] text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <p className="text-2xl font-bold gradient-text">13–15%</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Peak thumbnail CTR</p>
                </div>
                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-4 border border-black/[0.08] text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <p className="text-2xl font-bold gradient-text">223K</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Views in 365 days</p>
                </div>
                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-4 border border-black/[0.08] text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <p className="text-2xl font-bold gradient-text">+63%</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Views QoQ growth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE - UPGRADED CARDS & CONNECTOR */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="eyebrow mb-2">My Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
              Experience &amp; Milestones
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              How I evolved from running personal YouTube channels to orchestrating high-retention content
              systems for international creators and B2B leaders.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical glowing connector line */}
            <div className="absolute left-4 md:left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-purple-400 to-primary/20 rounded-full shadow-[0_0_12px_rgba(73,54,230,0.5)] pointer-events-none" />

            <div className="space-y-10">
              {TIMELINE.map((item) => (
                <div key={item.period} className="relative flex items-start gap-5 md:gap-8 group">
                  {/* Glowing Node Dot */}
                  <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-white border-2 border-primary text-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(73,54,230,0.35)] group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-lg md:text-xl">
                      {item.icon}
                    </span>
                  </div>

                  {/* Milestone Card - UPGRADED TO CARD-GLOW SPOTLIGHT */}
                  <div className="flex-1 card-glow spotlight rounded-[26px] p-6 md:p-8 border border-white/70 shadow-[0_15px_40px_-15px_rgba(73,54,230,0.22)] group-hover:shadow-[0_25px_60px_-18px_rgba(73,54,230,0.4)] transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wide border border-primary/15">
                        {item.period}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-sm">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-on-surface mb-2 leading-snug">
                      {item.role}
                    </h3>

                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06]">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-black/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREATIVE TOOLKIT & PRODUCTION STACK - UPGRADED TO CARD-GLOW */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-2">Production Toolkit</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
              Tools I Build &amp; Edit In
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Institutional-grade production software, analytics diagnostics, and client review systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLKIT.map((tool) => (
              <div
                key={tool.name}
                className="card-glow spotlight rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-[0_20px_45px_-15px_rgba(73,54,230,0.3)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary/15 to-primary/5 text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-primary block mb-1">
                  {tool.category}
                </span>
                <h3 className="text-base font-bold text-on-surface mb-2">{tool.name}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW I WORK / CORE PRINCIPLES - UPGRADED TO CARD-GLOW */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-2">Guiding Standards</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
              How I Approach Content
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Three rules that govern every video cut, thumbnail created, and channel managed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="card-glow spotlight rounded-2xl p-7 flex flex-col justify-between border border-white/60 shadow-sm hover:shadow-[0_22px_50px_-18px_rgba(73,54,230,0.32)] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-purple-500/10 text-primary flex items-center justify-center mb-5 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION - UPGRADED GLOW */}
        <section className="card-glow spotlight rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto border border-primary/30 shadow-[0_30px_70px_-20px_rgba(73,54,230,0.4)] relative">
          <p className="eyebrow mb-2">Let&apos;s Connect</p>
          <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-4">
            Ready to scale your YouTube channel?
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-8 max-w-lg mx-auto">
            Start with a free live audit of your channel, or book a 1-on-1 strategy call with me directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/youtube-funnel"
              className="btn btn-glow font-bold px-7 py-3.5 rounded-full text-sm shadow-lg inline-flex items-center gap-2"
            >
              Audit My Channel
              <span className="material-symbols-outlined text-base">auto_awesome</span>
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary font-semibold px-7 py-3.5 rounded-full text-sm"
            >
              Book a Strategy Call
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
