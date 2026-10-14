"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Testimonials from "@/components/Testimonials";
import YtThumb from "@/components/YtThumb";
import CountUp from "@/components/CountUp";

/* ─── Real client work, playable on the page ────────────────────── */
const WORK = [
  {
    title: "ChatGPT Connectors Explained",
    client: "Tim Cakir",
    result: "47.4K views and a 13.0% thumbnail click rate",
    videoId: "mHOLzwe4sMQ",
    tag: "YouTube growth",
  },
  {
    title: "How Smart Excel Users Rename 100s of Files",
    client: "Victor Chan, Launch Excel",
    result: "A clear, fast tutorial edit for a course brand",
    videoId: "pcfFzxnhwUE",
    tag: "Video editing",
  },
  {
    title: "ChatGPT o1 vs Claude 3.5: Coding Battle",
    client: "Dr. Maurice Maurer, Training Scientists",
    result: "Screen-heavy science content, edited to hold attention",
    videoId: "y11b_rVHcyg",
    tag: "Education",
  },
];

const STATS = [
  { value: "540+", label: "Videos edited" },
  { value: "125M+", label: "Reach generated" },
  { value: "50+", label: "Channels served" },
  { value: "5+", label: "Years in content" },
];

const FAQS = [
  {
    q: "How fast is turnaround?",
    a: "Most long-form edits land in 3 to 5 business days. Shorts and Reels take 24 to 48 hours. Retainer clients get priority slots.",
  },
  {
    q: "What does a revision look like?",
    a: "Two rounds come with every deliverable. Leave timestamped comments on the cut and I turn them around in 24 to 48 hours.",
  },
  {
    q: "What tools do you work in?",
    a: "Descript and DaVinci Resolve for editing, Premiere Pro when a project calls for it, and Canva for thumbnails and graphics.",
  },
  {
    q: "Do I need to hire you for everything?",
    a: "No. Many clients start with one video, a thumbnail set or a channel audit, then move to a retainer once it clicks.",
  },
  {
    q: "How do we communicate?",
    a: "A shared WhatsApp or email thread, with files in Google Drive or Frame.io.",
  },
  {
    q: "Which niches do you work with?",
    a: "Creators, coaches, course sellers and B2B teams, mostly in finance, education, tech and personal brands.",
  },
];

/* ─── Real results: Tim Cakir's YouTube Studio and Google Ads screenshots ─── */
const PROOF = [
  {
    src: "/proof/365-day-analytics.png",
    label: "365-day channel analytics",
    headline: "Grow your channel",
    stat: "223K views in a year",
    note: "One channel, twelve months: 223,493 views and 6.9K new subscribers.",
    client: "Tim Cakir, YouTube channel",
  },
  {
    src: "/proof/90-day-performance.png",
    label: "90-day performance",
    headline: "Grow every quarter",
    stat: "+63% views in 90 days",
    note: "34.1K views against the previous 90 days, with an 8.8% thumbnail click rate.",
    client: "Tim Cakir, YouTube channel",
  },
  {
    src: "/proof/organic-impressions.png",
    label: "Organic reach",
    headline: "Get found",
    stat: "140K impressions",
    note: "One Gemini tutorial: 140K impressions and 16.1K views, 36% of them from YouTube search.",
    client: "Tim Cakir, Gemini tutorial",
  },
  {
    src: "/proof/thumbnail-ctr.png",
    label: "Thumbnail click rate",
    headline: "Win the click",
    stat: "13.0% click rate",
    note: "ChatGPT Connectors Explained: 13.0% CTR on 220K impressions, 47.4K views.",
    client: "Tim Cakir, packaging",
  },
  {
    src: "/proof/google-ads-growth.png",
    label: "Google Ads",
    headline: "Grow with paid reach",
    stat: "$0.23 average CPC",
    note: "A $600 YouTube campaign at a $0.23 average CPC and a 1.86% view rate.",
    client: "Tim Cakir, paid media",
  },
  {
    src: "/proof/us-audience.png",
    label: "Audience",
    headline: "Reach the right viewers",
    stat: "23.6% from the US",
    note: "Top geographies over 90 days: US 23.6%, India 9.5%, UK 5.8% of views.",
    client: "Tim Cakir, audience",
  },
];

const PROOF_INTERVAL = 6500;

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body: "I watch your last 10 videos and read your retention curves. You get the top three fixes.",
  },
  {
    n: "02",
    title: "Build and ship",
    body: "You approve the plan. I cut the videos, design the packaging and schedule the posts.",
  },
  {
    n: "03",
    title: "Measure and scale",
    body: "Monthly reports on retention, click rate and reach. We keep what works and drop what does not.",
  },
];

const HANDLES = [
  { icon: "movie_edit", title: "Video editing", body: "Long-form and short-form cuts with clean pacing, captions and sound." },
  { icon: "imagesmode", title: "Thumbnails and packaging", body: "Titles, thumbnails and hooks built to earn the click." },
  { icon: "share", title: "Social media", body: "Reels, Shorts and TikTok cut from your long videos and posted on schedule." },
  { icon: "edit_note", title: "Blog editing", body: "Scripts and videos turned into search-ready posts." },
  { icon: "publish", title: "Publishing", body: "Uploads, descriptions, chapters and scheduling handled for you." },
  { icon: "automation", title: "Full automation", body: "Scripting, voiceover, editing, publishing and reporting in one flow." },
];

const OWN_CHANNEL = [
  { id: "2WBQik0I4IA", title: "Claude Code Can Now Stop Itself Deleting Your Files" },
  { id: "7LUG9W9BWXk", title: "The Free AI Tool That Outperforms Big Tech" },
  { id: "AwoeQOGTT1g", title: "Run 125B Model Free: Strata AI Engine" },
];

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";

const Arrow = () => <span className="material-symbols-outlined text-[18px]">arrow_forward</span>;

export default function Home() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [proofIdx, setProofIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [proofPaused, setProofPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  const active = PROOF[proofIdx];

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Proof slides advance by themselves; hovering, focus or the lightbox pauses them.
  useEffect(() => {
    if (proofPaused || zoom || !motionOk) return;
    const t = setTimeout(() => setProofIdx((i) => (i + 1) % PROOF.length), PROOF_INTERVAL);
    return () => clearTimeout(t);
  }, [proofIdx, proofPaused, zoom, motionOk]);

  // Keyboard: Esc closes overlays, arrows flip through proof while zoomed
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoom(false);
        setPlaying(null);
      }
      if (zoom && e.key === "ArrowRight") setProofIdx((i) => (i + 1) % PROOF.length);
      if (zoom && e.key === "ArrowLeft") setProofIdx((i) => (i - 1 + PROOF.length) % PROOF.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  useEffect(() => {
    document.body.style.overflow = zoom || playing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom, playing]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="relative overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1 · HERO */}
      <section className="relative pt-14 md:pt-24 pb-14 md:pb-20">
        <div className="aurora aurora-a w-[520px] h-[520px] -top-40 -left-40" />
        <div className="aurora aurora-b w-[460px] h-[460px] top-10 right-[-140px]" />

        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <ScrollReveal each className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="reveal eyebrow mb-6">Hi, I am Anuj</p>
              <h1 className="reveal text-[40px] sm:text-[54px] lg:text-[50px] xl:text-[58px] display text-on-surface mb-6">
                Videos that hook.
                <br />
                <span className="gradient-text-animated">Strategy that scales.</span>
              </h1>
              <p className="reveal text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed max-w-lg mb-8">
                I edit video and manage production end to end: social media, blog editing, publishing and packaging.
              </p>
              <div className="reveal flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link href="/youtube-funnel" className="btn btn-glow">
                  Audit my channel free
                  <Arrow />
                </Link>
                <Link href={BOOKING_URL} className="btn btn-secondary">
                  <span className="material-symbols-outlined text-[18px]">event</span>
                  Book a call
                </Link>
              </div>
            </ScrollReveal>

            {/* Portrait with floating chips */}
            <div className="relative w-full max-w-[420px] lg:max-w-[460px] mx-auto lg:ml-auto lg:mr-0">
              <div
                className="absolute -inset-4 rounded-[40px] opacity-80 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(73,54,230,0.55) 0%, rgba(139,92,246,0.4) 55%, rgba(192,132,252,0.15) 100%)",
                }}
              />
              <div data-parallax="0.05" className="parallax">
                <div className="relative rounded-[28px] overflow-hidden border border-white/60 bg-surface-container-low aspect-[4/5] shadow-[0_2px_6px_rgba(0,0,0,0.05),0_50px_90px_-40px_rgba(73,54,230,0.6)]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVgUM1CPI-chpiQnnacQOAazwKAIf2X5MgiRD1canwHi3-PNyeCAN1VYG06tYjQXLskeEt_ktPsUvDxxN_L9Ohk4yupNmlg-bnC10qZyeDx8ECQZEKVtWU5uq9eVhCx-qcTE5wosJfkt6NTN6fw9c2ZtGqxAoEYBnAnJcnKUPeyciq0_zM4K1C4Dtx2W0MJQ8MRGsfWMx0jiAQKjKTIiW7Jelor9RbkB7lzUza283dH10yzGnlDwkwt3iQtBL7DGOtn_1Z9OgjKUy2mg"
                    alt="Portrait of Anuj Mishra"
                    fill
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <div data-parallax="-0.05" className="parallax absolute -left-3 sm:-left-8 top-[18%]">
                <div className="float-y rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_18px_40px_-18px_rgba(73,54,230,0.5)] px-4 py-3 text-left">
                  <p className="text-[22px] font-semibold tracking-tight text-on-surface leading-none">540+</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">videos edited</p>
                </div>
              </div>
              <div data-parallax="0.09" className="parallax absolute -right-3 sm:-right-6 bottom-[12%]">
                <div className="float-y-delayed rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_18px_40px_-18px_rgba(73,54,230,0.5)] px-4 py-3 text-left">
                  <p className="text-[22px] font-semibold tracking-tight gradient-text leading-none">125M+</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">reach generated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Count-up numbers */}
          <div className="mt-14 md:mt-20">
            <ScrollReveal>
              <div className="card-glow spotlight grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-primary/10">
                {STATS.map((stat) => (
                  <div key={stat.label} className="px-6 py-6 md:py-8 text-center">
                    <div className="text-[34px] md:text-[44px] font-semibold tracking-[-0.03em] gradient-text leading-none">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[13px] text-on-surface-variant mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 1b · WHAT I TAKE ON */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-3">What I take on</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                The whole channel, <span className="gradient-text">start to finish.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Hand me one video or the full pipeline. I can run it from script to report.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HANDLES.map((h) => (
              <div key={h.title} className="reveal card-glow spotlight p-6 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[26px] text-primary mb-3">{h.icon}</span>
                <h3 className="text-[18px] font-semibold text-on-surface mb-1.5">{h.title}</h3>
                <p className="text-[14.5px] text-on-surface-variant leading-relaxed">{h.body}</p>
              </div>
            ))}
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <Link href="/services" className="btn btn-secondary">
              See services
            </Link>
            <Link href={BOOKING_URL} className="btn btn-dark">
              Book a call
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · RESULTS: slides advance on their own */}
      <section id="proof" className="relative overflow-hidden py-20 md:py-28 scroll-mt-14 bg-gradient-to-b from-[#f4f0ff] via-[#ebe5ff] to-[#f6f3ff] border-y border-primary/10">
        <div className="aurora aurora-a w-[640px] h-[640px] -top-56 left-[-160px]" />
        <div className="aurora aurora-b w-[600px] h-[600px] bottom-[-240px] right-[-140px]" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(73,54,230,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

        <div
          className="relative max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10"
          onMouseEnter={() => setProofPaused(true)}
          onMouseLeave={() => setProofPaused(false)}
          onFocus={() => setProofPaused(true)}
          onBlur={() => setProofPaused(false)}
        >
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">Real results</p>
              <h2 className="text-[34px] md:text-[56px] display text-on-surface">
                The data <span className="gradient-text-animated">backs it up.</span>
              </h2>
              <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed mt-5">
                Live numbers from a real YouTube Studio and ad account.
              </p>
            </div>
          </ScrollReveal>

          {/* Headline that changes with the slide */}
          <div className="text-center mb-6 min-h-[92px]">
            <div key={proofIdx} className="tm-in">
              <p className="text-[26px] md:text-[34px] font-semibold tracking-[-0.02em] text-on-surface">{active.headline}</p>
              <p className="text-[15.5px] md:text-[17px] text-on-surface-variant mt-1.5 max-w-xl mx-auto">{active.note}</p>
            </div>
          </div>

          {/* Viewer */}
          <div data-scrub className="scrub-tilt">
            <div className="rounded-[22px] border border-primary/15 bg-white/70 backdrop-blur-xl p-3 md:p-4 shadow-[0_40px_90px_-36px_rgba(73,54,230,0.55)]">
              <div className="flex items-center gap-1.5 px-2 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/15" />
                <span className="ml-3 text-[12px] text-on-surface-variant truncate">{active.label} · {active.client}</span>
              </div>
              <button
                type="button"
                onClick={() => setZoom(true)}
                className="group relative block w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0c0c14] cursor-zoom-in"
                aria-label={`Open ${active.label} full size`}
              >
                {PROOF.map((item, i) => (
                  <Image
                    key={item.src}
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 1100px) 100vw, 1000px"
                    className={`object-contain transition-opacity duration-700 ${i === proofIdx ? "opacity-100" : "opacity-0"}`}
                    priority={i === 0}
                  />
                ))}
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 text-[#0b0b0f] text-[12.5px] font-medium px-3.5 py-2 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  Open full size
                </span>
              </button>
            </div>
          </div>

          {/* Slide dots with progress */}
          <div className="flex items-center justify-center gap-2.5 mt-6" role="tablist" aria-label="Result slides">
            {PROOF.map((item, i) => {
              const on = i === proofIdx;
              return (
                <button
                  key={item.src}
                  role="tab"
                  aria-selected={on}
                  aria-label={item.headline}
                  onClick={() => setProofIdx(i)}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${on ? "w-14 bg-primary/20" : "w-2 bg-primary/25 hover:bg-primary/40"}`}
                >
                  {on && motionOk && (
                    <span
                      key={`${proofIdx}-${proofPaused}`}
                      className="tm-progress absolute inset-0 bg-primary"
                      style={{ animationDuration: `${PROOF_INTERVAL}ms`, animationPlayState: proofPaused ? "paused" : "running" }}
                    />
                  )}
                  {on && !motionOk && <span className="absolute inset-0 bg-primary" />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <Link href="/youtube-funnel" className="btn btn-glow">
              Audit my channel free
              <Arrow />
            </Link>
            <Link href={BOOKING_URL} className="btn btn-secondary">
              Book a call
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · CLIENTS */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="aurora aurora-b w-[420px] h-[420px] top-0 right-[-120px] opacity-30" />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-3">Happy clients</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                In their <span className="gradient-text">own words.</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
        </div>
      </section>

      {/* 4 · WORK */}
      <section id="work" className="relative py-16 md:py-24 bg-surface-container-low/70 border-y border-black/[0.06] scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-3">Work</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                Work worth <span className="gradient-text">pressing play on.</span>
              </h2>
              <Link href="/work" className="btn btn-secondary btn-sm mt-6">
                See all work
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal each className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORK.map((item) => (
              <button
                key={item.videoId}
                type="button"
                onClick={() => setPlaying(item.videoId)}
                className="reveal group text-center card-glow spotlight p-0 focus-visible:outline-none"
                aria-label={`Play ${item.title}`}
              >
                <div className="relative w-full aspect-video bg-surface-container overflow-hidden">
                  <YtThumb id={item.videoId} alt={item.title} className="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1060]/55 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute left-3 top-3 text-[11px] font-semibold tracking-[0.06em] uppercase text-white bg-black/55 backdrop-blur px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-lg scale-95 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-semibold text-on-surface mb-1 leading-snug">{item.title}</h3>
                  <p className="text-[14px] text-on-surface-variant leading-snug">{item.result}</p>
                  <p className="text-[13px] text-on-surface-variant/70 mt-2">{item.client}</p>
                </div>
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 4b · MY OWN AUTOMATED CHANNEL */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="aurora aurora-a w-[480px] h-[480px] -top-40 left-[-140px] opacity-40" />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-3">My own channel</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                Rationale Hub runs <span className="gradient-text">on automation.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Scripting, voiceover, editing and publishing, all in one automated workflow. I can build the same for your channel.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal each className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
            {OWN_CHANNEL.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group text-center card-glow spotlight p-0"
              >
                <div className="relative w-full aspect-[9/16] bg-surface-container overflow-hidden">
                  <YtThumb id={v.id} alt={v.title} vertical className="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="text-[12.5px] md:text-[15.5px] font-semibold text-on-surface leading-snug">{v.title}</h3>
                </div>
              </a>
            ))}
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <a href="https://www.youtube.com/channel/UCAX9oJpQqhRKFk4lsU7dBLg" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Watch the channel
            </a>
            <Link href={BOOKING_URL} className="btn btn-dark">
              Automate my channel
            </Link>
          </div>
        </div>
      </section>

      {/* 5 · PROCESS */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                From first call to <span className="gradient-text">steady growth.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Every project starts with an audit of your last 10 videos.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="hidden md:block absolute top-[34px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <ScrollReveal each className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((step) => (
                <div key={step.n} className="reveal card-glow spotlight p-7 pt-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white text-[15px] font-semibold flex items-center justify-center mb-5 shadow-[0_14px_30px_-12px_rgba(124,77,240,0.8)]">
                    {step.n}
                  </div>
                  <h3 className="text-[20px] font-semibold text-on-surface mb-2">{step.title}</h3>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed max-w-xs">{step.body}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6 · FREE PLAN */}
      <section className="relative py-6 md:py-10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#3b28c9] via-[#5340ea] to-[#8b5cf6] px-6 py-12 md:p-16 text-white text-center shadow-[0_40px_90px_-40px_rgba(73,54,230,0.9)]">
              <div className="aurora aurora-b w-[420px] h-[420px] -top-32 -right-24 opacity-60" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="relative max-w-2xl mx-auto flex flex-col items-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 mb-3">Lead magnet</p>
                <h2 className="text-[30px] md:text-[48px] display text-white mb-4">
                  A free 30-day plan for your channel.
                </h2>
                <p className="text-[16.5px] md:text-[18px] text-white/80 leading-relaxed mb-8">
                  Paste your channel link. Hooks, titles, thumbnail ideas and your top fix land in your inbox.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/youtube-funnel" className="btn btn-on-dark">
                    Audit my channel free
                    <Arrow />
                  </Link>
                  <Link href={BOOKING_URL} className="btn btn-ghost-on-dark">
                    Book a call
                  </Link>
                </div>
                <Link href="/linkedin-funnel" className="mt-6 text-[14px] text-white/80 hover:text-white underline underline-offset-4 decoration-white/30">
                  Prefer LinkedIn? Get the free LinkedIn plan
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7 · FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-[860px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">Questions</p>
              <h2 className="text-[32px] md:text-[48px] display text-on-surface">
                Quick <span className="gradient-text">answers.</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal each className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`reveal rounded-2xl border transition-colors duration-300 ${open ? "border-primary/25 bg-gradient-to-br from-primary-fixed/50 to-white" : "border-black/[0.08] bg-white"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="text-[16.5px] font-semibold text-on-surface">{f.q}</span>
                    <span className={`material-symbols-outlined text-[22px] text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>add</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] text-on-surface-variant leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* 8 · CLOSING CTA */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white via-[#f1ecff] to-[#e6deff]">
        <div className="aurora aurora-a w-[640px] h-[640px] -top-72 left-1/2 -translate-x-1/2" />
        <div className="aurora aurora-b w-[420px] h-[420px] bottom-[-180px] right-[8%]" />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 text-center">
          <ScrollReveal>
            <h2 className="text-[36px] md:text-[60px] display text-on-surface mb-5">
              Your next 10 videos, <span className="gradient-text-animated">built for your audience.</span>
            </h2>
            <p className="text-[17px] md:text-[19px] text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
              Send me your channel and I will tell you what I would change first.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-glow">
                Start a project
                <Arrow />
              </Link>
              <Link href={BOOKING_URL} className="btn btn-secondary">
                Book a call
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Results lightbox: full size, scrollable, arrow-key navigation */}
      {zoom && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-black/92 backdrop-blur-md animate-fade-in"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold truncate">{active.headline}</p>
              <p className="text-[12.5px] text-white/50 truncate">{active.label} · {active.client}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setProofIdx((i) => (i - 1 + PROOF.length) % PROOF.length)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Previous screenshot">
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>
              <span className="text-[13px] text-white/60 tabular-nums w-10 text-center">{proofIdx + 1}/{PROOF.length}</span>
              <button onClick={() => setProofIdx((i) => (i + 1) % PROOF.length)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Next screenshot">
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>
              <button onClick={() => setZoom(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center ml-1" aria-label="Close">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-3 sm:px-6 pb-6" onClick={() => setZoom(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.label}, full size`}
              className="mx-auto w-full max-w-[1600px] h-auto rounded-xl bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Video lightbox */}
      {playing && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setPlaying(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPlaying(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Close video"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
              title="Client work video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
