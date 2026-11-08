import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
  description:
    "Learn about Anuj Mishra's 5+ year journey scaling YouTube channels, video retention, and content operations for creators and founders worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
    description:
      "5+ years mastering YouTube retention, video editing, and content operations for creators and founders.",
    url: "https://anuj4u.in/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Anuj Mishra | Solo YouTube Growth Partner & Video Editor",
    description:
      "5+ years mastering YouTube retention, video editing, and content operations for creators and founders.",
  },
};

const STATS = [
  { value: "50+", label: "Channels & projects scaled" },
  { value: "5+", label: "Years mastering video & growth" },
  { value: "10M+", label: "Views generated across clients" },
  { value: "100%", label: "Direct solo communication" },
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
      "Partnering directly with selected creators, educators, and B2B founders to run their entire video growth engine. Managing script hook frameworks, retention-first editing, high-CTR thumbnail packaging, and LinkedIn thought-leadership. Generated over $50,000 in client pipeline for Launch Excel (Victor Chan) and scaled high-retention technical education channels.",
    tags: ["Channel Management", "Retention Pacing", "VSL Production", "Thumbnail A/B Testing"],
    icon: "trending_up",
  },
  {
    period: "2022 – 2024",
    role: "High-Retention Video Editor & Podcast Producer",
    highlight: "Automated Production Pipelines & Full Podcast Launches",
    description:
      "Engineered full video podcast architectures and production workflows for international creators and professionals (including Harjeet Dhillon and Blake Reddy). Designed custom multi-camera visual layouts, audio mastering chains, and retention-first pacing that reduced client production overhead by over 80%.",
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
      "Launched my first personal YouTube channel to learn the craft from scratch. Edited my own footage, tested titles, designed thumbnails, and studied retention drop-offs frame by frame. Established my core philosophy early: the YouTube Studio data doesn't lie—content either earns attention, or it doesn't.",
    tags: ["Channel Launch", "Self-Taught Craft", "YouTube Studio", "Data-First"],
    icon: "lightbulb",
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
    title: "Zero Agency Layers",
    icon: "person_check",
    desc: "No account managers, no outsourced junior editors, and no broken communication. You work and communicate directly with me via WhatsApp or Slack every single week.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Ambient background glows */}
      <div className="ambient-glow top-[-80px] left-[-80px] opacity-40 pointer-events-none" />
      <div className="ambient-glow-2 top-1/2 right-[-100px] opacity-35 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10 pt-10 md:pt-16 pb-20 relative z-10">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center mb-16 md:mb-20">
          <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
            <p className="eyebrow mb-3">About Me</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-5 leading-[1.15]">
              Hi, I&apos;m <span className="gradient-text">Anuj Mishra.</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-4 max-w-xl">
              I am an independent YouTube growth strategist and video editor. Over the past 5+ years,
              I&apos;ve helped creators, educators, and B2B founders turn raw video footage into
              high-retention content systems that generate real views and revenue.
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl">
              I don&apos;t run a bloated agency with junior handoffs. When you partner with me, I personally
              handle your channel audit, video pacing, thumbnail packaging, and multi-platform distribution.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full text-sm transition-all shadow-md inline-flex items-center gap-1.5"
              >
                Work with Me Directly
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/work"
                className="glass-card hover:bg-surface-container text-on-surface font-medium px-6 py-3 rounded-full text-sm border border-outline-variant/40 transition-all"
              >
                Explore My Work
              </Link>
            </div>
          </div>

          {/* Profile Photo with Apple-style framing */}
          <div className="md:col-span-5 relative max-w-[340px] w-full mx-auto order-1 md:order-2">
            <div
              className="absolute -inset-3 rounded-[36px] opacity-60 blur-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(73,54,230,0.5), rgba(168,85,247,0.3))" }}
            />
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/60 bg-surface-container shadow-[0_30px_70px_-25px_rgba(73,54,230,0.45)]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Anuj Mishra - Video Editor & Growth Partner"
                fill
                sizes="(max-width: 768px) 80vw, 340px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center bg-black/60 backdrop-blur-md rounded-xl py-2 px-3 border border-white/10">
                <p className="text-white font-bold text-xs">Anuj Mishra</p>
                <p className="text-[11px] text-purple-200">YouTube Growth Partner &amp; Editor</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30 border border-outline-variant/40 shadow-sm">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-6 text-center">
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

        {/* EXPERIENCE TIMELINE (Requested Feature) */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="eyebrow mb-2">My Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
              Experience &amp; Milestones
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              How I evolved from running personal YouTube channels to orchestrating high-retention content
              systems for international creators.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-4 md:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-purple-400 to-primary/20 pointer-events-none" />

            <div className="space-y-10">
              {TIMELINE.map((item, index) => (
                <div key={item.period} className="relative flex items-start gap-5 md:gap-8 group">
                  {/* Glowing Node Dot */}
                  <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-white border-2 border-primary text-primary flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-lg md:text-xl">
                      {item.icon}
                    </span>
                  </div>

                  {/* Milestone Card */}
                  <div className="flex-1 glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-outline-variant/40 hover:border-primary/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wide">
                        {item.period}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-on-surface mb-2 leading-snug">
                      {item.role}
                    </h3>

                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-outline-variant/30">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant"
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

        {/* HOW I WORK / CORE PRINCIPLES */}
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
                className="glass-card rounded-2xl p-7 flex flex-col justify-between border border-outline-variant/40 hover:border-primary/30 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="glass-card rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto border border-primary/20 shadow-2xl relative">
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
              className="bg-primary hover:bg-primary/90 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              Audit My Channel
              <span className="material-symbols-outlined text-base">auto_awesome</span>
            </Link>
            <Link
              href="/contact"
              className="glass-card hover:bg-surface-container text-on-surface font-semibold px-7 py-3.5 rounded-full text-sm border border-outline-variant/40 transition-all"
            >
              Book a Strategy Call
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
