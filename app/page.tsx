"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Testimonials from "@/components/Testimonials";
import YtThumb from "@/components/YtThumb";
import CountUp from "@/components/CountUp";

/* ─── Work formats (categories, not single videos) ─────────────── */
const FORMATS = [
  { title: "Long-form YouTube", desc: "Tutorials, interviews and explainers edited for retention.", href: "/work/long-form", count: "16 videos", img: { type: "yt", id: "mHOLzwe4sMQ" }, span: "lg:col-span-2" },
  { title: "Short-form", desc: "Shorts and Reels cut to hook in the first second.", href: "/work/short-form", count: "10 Shorts", img: { type: "yt-v", id: "dD3jLdx2k7A" }, span: "lg:col-span-2" },
  { title: "Podcast editing", desc: "Full episodes with clean audio, layouts and chapters.", href: "/work/long-form", count: "Video podcasts", img: { type: "file", src: "/thumbnails/mothers-day-ai-and-humanity.webp" }, span: "lg:col-span-2" },
  { title: "Thumbnails and graphics", desc: "Packaging designed to win the click.", href: "/work/thumbnails", count: "25 thumbnails", img: { type: "file", src: "/thumbnails/chatgpt-connectors-explained.webp" }, span: "lg:col-span-3" },
  { title: "Channel growth", desc: "Case studies with real YouTube Studio numbers.", href: "/work/case-studies", count: "5 clients", img: { type: "file", src: "/proof/thumbnail-ctr.png" }, span: "lg:col-span-3" },
] as const;

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
  { src: "/proof/thumbnail-ctr.png", label: "Thumbnail click rate", headline: "Videos people click", stat: "13.0%", statLabel: "click rate on 220K impressions", note: "Titles and thumbnails built to earn the click from the first impression." },
  { src: "/proof/365-day-analytics.png", label: "365-day analytics", headline: "Views that keep growing", stat: "223K", statLabel: "views in 365 days", note: "Steady uploads, sharper packaging and 6.9K new subscribers over twelve months." },
  { src: "/proof/90-day-performance.png", label: "90-day performance", headline: "Growth every quarter", stat: "+63%", statLabel: "views vs the previous 90 days", note: "A consistent edit style and posting rhythm lift each quarter above the last." },
  { src: "/proof/organic-impressions.png", label: "Organic reach", headline: "Found in search", stat: "140K", statLabel: "impressions, 36% from YouTube search", note: "Titles and descriptions that match what viewers actually search for." },
  { src: "/proof/us-audience.png", label: "Audience", headline: "The right viewers", stat: "23.6%", statLabel: "of views from the US", note: "The audience a channel wants: US, India and UK lead the top geographies." },
  { src: "/proof/google-ads-growth.png", label: "Google Ads", headline: "Paid reach that pays off", stat: "$0.23", statLabel: "average cost per click", note: "A $600 YouTube campaign tested at a 1.86% view rate." },
];

const PROOF_INTERVAL = 6500;

const STEPS = [
  { n: "01", title: "Audit and goals", body: "I review your last 10 videos and your analytics, then we agree on what success looks like." },
  { n: "02", title: "Plan", body: "You get a content plan: topics, titles, thumbnail directions and a posting calendar." },
  { n: "03", title: "Set up", body: "We connect your tools, brand kit and shared folders so every handoff is simple." },
  { n: "04", title: "Produce", body: "I script, edit and package each video, then cut Shorts and blog posts from it." },
  { n: "05", title: "Review", body: "You get timestamped drafts. Two rounds of revisions are included with every video." },
  { n: "06", title: "Publish and report", body: "I upload, schedule and track results, then share a monthly report on what to repeat." },
];

const HANDLES = [
  { icon: "movie_edit", title: "Video editing", body: "Long-form and short-form cuts with clean pacing, captions and sound." },
  { icon: "imagesmode", title: "Thumbnails and packaging", body: "Titles, thumbnails and hooks built to earn the click." },
  { icon: "share", title: "Social media", body: "Reels, Shorts and TikTok cut from your long videos and posted on schedule." },
  { icon: "edit_note", title: "Blog editing", body: "Scripts and videos turned into search-ready posts." },
  { icon: "publish", title: "Publishing", body: "Uploads, descriptions, chapters and scheduling handled for you." },
  { icon: "automation", title: "Full automation", body: "Scripting, voiceover, editing, publishing and reporting in one flow." },
];

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";

const Arrow = () => <span className="material-symbols-outlined text-[18px]">arrow_forward</span>;

export default function Home() {
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
      }
      if (zoom && e.key === "ArrowRight") setProofIdx((i) => (i + 1) % PROOF.length);
      if (zoom && e.key === "ArrowLeft") setProofIdx((i) => (i - 1 + PROOF.length) % PROOF.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  useEffect(() => {
    document.body.style.overflow = zoom ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

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
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-2">What I take on</p>
              <h2 className="text-[30px] md:text-[48px] display text-on-surface md:whitespace-nowrap">
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

      {/* 2 · RESULTS: text and screenshot side by side, advancing on their own */}
      <section id="proof" className="relative overflow-hidden py-20 md:py-28 scroll-mt-[68px] bg-gradient-to-b from-[#f4f0ff] via-[#ebe5ff] to-[#f6f3ff] border-y border-primary/10">
        <div className="aurora aurora-a w-[640px] h-[640px] -top-56 left-[-160px]" />
        <div className="aurora aurora-b w-[600px] h-[600px] bottom-[-240px] right-[-140px]" />

        <div
          className="relative max-w-[1180px] mx-auto px-5 sm:px-6 lg:px-10"
          onMouseEnter={() => setProofPaused(true)}
          onMouseLeave={() => setProofPaused(false)}
          onFocus={() => setProofPaused(true)}
          onBlur={() => setProofPaused(false)}
        >
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <p className="eyebrow mb-2">Real results</p>
              <h2 className="text-[34px] md:text-[54px] display text-on-surface">
                Proof you can <span className="gradient-text-animated">see.</span>
              </h2>
              <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed mt-4">
                Views, clicks and the right audience, straight from YouTube Studio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
            {/* Text, changes with the slide */}
            <div className="lg:col-span-2 text-center lg:text-left order-2 lg:order-1 min-h-[210px] flex items-center justify-center lg:justify-start">
              <div key={proofIdx} className="tm-in">
                <p className="eyebrow mb-1">{active.label}</p>
                <p className="text-[30px] md:text-[38px] font-semibold tracking-[-0.025em] text-on-surface leading-tight">{active.headline}</p>
                <p className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] gradient-text leading-none mt-4">{active.stat}</p>
                <p className="text-[14px] text-on-surface-variant mt-1.5">{active.statLabel}</p>
                <p className="text-[16px] text-on-surface-variant leading-relaxed mt-4 max-w-sm mx-auto lg:mx-0">{active.note}</p>
              </div>
            </div>

            {/* Screenshot in a glass frame */}
            <div data-scrub className="scrub-tilt lg:col-span-3 order-1 lg:order-2">
              <div className="glass-card rounded-[22px] p-3 md:p-4 shadow-[0_40px_90px_-36px_rgba(73,54,230,0.55)]">
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
                      sizes="(max-width: 1024px) 100vw, 700px"
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
          </div>

          {/* Slide dots with progress */}
          <div className="flex items-center justify-center gap-2.5 mt-8" role="tablist" aria-label="Result slides">
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

      {/* 4 · WORK FORMATS */}
      <section id="work" className="relative py-16 md:py-24 bg-surface-container-low/70 border-y border-black/[0.06] scroll-mt-[68px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-2">Work</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                Every format, <span className="gradient-text">one editor.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Pick a format to see real examples.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
            {FORMATS.map((f) => (
              <Link key={f.title} href={f.href} className={`reveal group card-glow spotlight p-0 text-center ${f.span}`}>
                <div className="relative w-full aspect-[16/9] bg-surface-container overflow-hidden">
                  {f.img.type === "yt" && <YtThumb id={f.img.id} alt={f.title} className="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />}
                  {f.img.type === "yt-v" && (
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gradient-to-br from-[#2b1a6b] to-[#6d3fe0] overflow-hidden">
                      <div className="relative h-[86%] aspect-[9/16] rounded-xl overflow-hidden shadow-xl">
                        <YtThumb id={f.img.id} alt={f.title} vertical className="transition-transform duration-700 group-hover:scale-[1.06]" />
                      </div>
                      <div className="relative h-[86%] aspect-[9/16] rounded-xl overflow-hidden shadow-xl hidden sm:block">
                        <YtThumb id="TJR9l12hN0I" alt="" vertical className="transition-transform duration-700 group-hover:scale-[1.06]" />
                      </div>
                    </div>
                  )}
                  {f.img.type === "file" && (
                    <Image src={f.img.src} alt={f.title} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1060]/40 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-[19px] font-semibold text-on-surface mb-1">{f.title}</h3>
                  <p className="text-[14.5px] text-on-surface-variant leading-snug">{f.desc}</p>
                  <p className="text-[13px] font-medium text-primary mt-3 inline-flex items-center gap-1">
                    {f.count}
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </p>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 5 · PROCESS */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow mb-2">How it works</p>
              <h2 className="text-[32px] md:text-[52px] display text-on-surface">
                Six steps, <span className="gradient-text">no guesswork.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Here is exactly how a project runs, from the first audit to the monthly report.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((step) => (
              <div key={step.n} className="reveal card-glow spotlight p-7 text-center flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white text-[15px] font-semibold flex items-center justify-center mb-4 shadow-[0_14px_30px_-12px_rgba(124,77,240,0.8)]">
                  {step.n}
                </div>
                <h3 className="text-[19px] font-semibold text-on-surface mb-2">{step.title}</h3>
                <p className="text-[14.5px] text-on-surface-variant leading-relaxed max-w-xs">{step.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 6 · LEAD MAGNET */}
      <section className="relative py-6 md:py-10">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="cta-card px-6 py-12 md:p-16 text-center">
              <div className="relative max-w-2xl mx-auto flex flex-col items-center">
                <p className="eyebrow mb-2 !text-[#4a2fc9]">Free lead magnet</p>
                <h2 className="text-[30px] md:text-[46px] display text-on-surface mb-4">
                  A 30-day plan for your channel.
                </h2>
                <p className="text-[16.5px] md:text-[18px] text-on-surface/70 leading-relaxed mb-8">
                  Paste your channel link. Hooks, titles, thumbnail ideas and your top fix land in your inbox.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/youtube-funnel" className="btn btn-glow">
                    Audit my channel free
                    <Arrow />
                  </Link>
                  <Link href={BOOKING_URL} className="btn btn-secondary">
                    Book a call
                  </Link>
                </div>
                <Link href="/linkedin-funnel" className="mt-6 text-[14px] text-on-surface/70 hover:text-on-surface underline underline-offset-4 decoration-black/20">
                  Prefer LinkedIn? Get the LinkedIn plan
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
              <p className="text-[12.5px] text-white/50 truncate">{active.label}</p>
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

    </div>
  );
}
