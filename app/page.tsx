"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

/* ─── Real client work — playable on the page ───────────────────────── */
const WORK = [
  {
    title: "Launch Excel — Sales VSL",
    client: "Victor Chan, Founder of Launch Excel",
    result: "High-retention VSL built to lift course signups",
    videoId: "-SYqXdaZXl8",
    tag: "Video editing",
  },
  {
    title: "Author Podcast — Full Launch",
    client: "Harjeet Dhillon, Actress & Author",
    result: "Editing, thumbnails and SEO for a new show",
    videoId: "izidLZclYZs",
    tag: "Podcast",
  },
  {
    title: "Science Channel — Growth Edits",
    client: "Dr. Maurice Maurer",
    result: "Packaging and edits for complex explainers",
    videoId: "mHOLzwe4sMQ",
    tag: "YouTube growth",
  },
];

const STATS = [
  { value: "600+", label: "Videos edited" },
  { value: "45+", label: "Clients served" },
  { value: "10M+", label: "Reach generated" },
  { value: "6+", label: "Years experience" },
];

/* ─── Engagement models ─────────────────────────────────────────────────
 * `price: ""` renders as "Price on request".
 * Drop your rate in (e.g. "₹25,000 / video" or "$499 / month") and it shows.
 * ───────────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "One-off project",
    blurb: "A single video, thumbnail set or channel audit — try the workflow with zero commitment.",
    price: "",
    unit: "",
    features: [
      "One deliverable, end to end",
      "Two revision rounds included",
      "Thumbnail + title options to A/B test",
      "Delivered in 3–5 business days",
    ],
    cta: "Start a project",
    featured: false,
  },
  {
    name: "Monthly retainer",
    blurb: "A steady editing pipeline for creators and teams publishing every week.",
    price: "",
    unit: "/ month",
    features: [
      "Fixed number of videos every month",
      "Thumbnails, titles and descriptions included",
      "Priority turnaround and a shared channel",
      "Monthly retention and CTR report",
      "Cancel any time after 2 months",
    ],
    cta: "Build my pipeline",
    featured: true,
  },
  {
    name: "Channel partner",
    blurb: "Full YouTube management — you record, I handle everything to publish.",
    price: "",
    unit: "/ month",
    features: [
      "End-to-end editing and publishing",
      "Packaging: titles, thumbnails, SEO",
      "Community and comment management",
      "Analytics reviews and strategy calls",
      "Paid ads managed on request",
    ],
    cta: "Talk about management",
    featured: false,
  },
];

const FAQS = [
  {
    q: "How fast is turnaround?",
    a: "Most long-form edits land in 3–5 business days, and Shorts/Reels within 24–48 hours. Retainer and management clients get priority slots, and I can flag rush work before we start.",
  },
  {
    q: "What does a revision look like?",
    a: "Two rounds are included on every deliverable. You comment directly on the cut — timestamped notes are best — and I turn revisions around in 24–48 hours.",
  },
  {
    q: "What tools do you work in?",
    a: "Descript and DaVinci Resolve for editing, Premiere Pro when a project calls for it, Canva for thumbnails and graphics, plus your existing scheduler and analytics stack for management work.",
  },
  {
    q: "Do I need to hire you for everything?",
    a: "No. Plenty of clients start with a single video, a thumbnail set or a channel audit. If the fit is right, we can move to a retainer later.",
  },
  {
    q: "How do we communicate?",
    a: "A shared WhatsApp or email thread, with files in Google Drive or Frame.io. I respond within 24 hours on business days — you will never be left wondering where a project is.",
  },
  {
    q: "Which niches do you work with?",
    a: "Creators, coaches, course sellers and B2B teams — mostly in finance, education, tech and personal brand. If retention and packaging matter to your niche, it probably works.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week.",
    name: "Victor Chan",
    role: "YouTuber & Founder, Launch Excel",
  },
  {
    quote:
      "Anuj has been monumental in creating my podcast. He doesn't stop at editing — he has a vast knowledge of software and has guided me more than I could hope for. Solid work ethic, and awesome at receiving feedback.",
    name: "Harjeet Dhillon",
    role: "Actress & Author",
  },
  {
    quote:
      "The quality of edits and strategic inputs on content packaging have significantly boosted our channel retention. Creative, innovative, and brilliant ideas.",
    name: "Dr. Maurice Maurer",
    role: "Science Educator, PhD",
  },
];

/* ─── Real client proof — actual analytics screenshots ──────────── */
const PROOF = [
  {
    src: "/proof/365-day-analytics.png",
    label: "365-day channel analytics",
    metric: "Full-year growth curve",
    client: "Tim Cakir — YouTube channel",
  },
  {
    src: "/proof/90-day-performance.png",
    label: "90-day performance",
    metric: "Quarter-over-quarter lift",
    client: "Tim Cakir — YouTube channel",
  },
  {
    src: "/proof/organic-impressions.png",
    label: "Organic impressions",
    metric: "100k+ organic impressions",
    client: "Tim Cakir — YouTube channel",
  },
  {
    src: "/proof/thumbnail-ctr.png",
    label: "Thumbnail CTR",
    metric: "Click-through rate optimization",
    client: "Tim Cakir — packaging",
  },
  {
    src: "/proof/google-ads-growth.png",
    label: "Google Ads growth",
    metric: "Paid campaign performance",
    client: "Tim Cakir — paid media",
  },
  {
    src: "/proof/us-audience.png",
    label: "US audience targeting",
    metric: "Geo-targeted reach",
    client: "Tim Cakir — audience strategy",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const PROOF_NOTES: Record<string, string> = {
  "/proof/365-day-analytics.png": "A full year of consistent editing and packaging compounding on one channel.",
  "/proof/90-day-performance.png": "The same channel, quarter over quarter — the trend line is the point.",
  "/proof/organic-impressions.png": "Impressions earned organically: people finding the channel on their own.",
  "/proof/thumbnail-ctr.png": "Packaging tested and refined so more impressions turn into clicks.",
  "/proof/google-ads-growth.png": "Paid campaigns run alongside organic growth, tracked to cost and view rate.",
  "/proof/us-audience.png": "Audience targeted by geography so the right viewers see the content.",
};


const STEPS = [
  {
    n: "01",
    title: "Audit",
    body: "I watch your last 10 videos and read the retention curves. You get the three things costing you viewers — free, whether we work together or not.",
  },
  {
    n: "02",
    title: "Build & ship",
    body: "You approve the plan, I cut the videos, design the packaging and schedule the publishing. Two revision rounds are baked in.",
  },
  {
    n: "03",
    title: "Measure & scale",
    body: "Monthly reporting on retention, CTR and reach. We double down on what worked and cut what didn't — no vanity dashboards.",
  },
];

const Arrow = () => <span className="material-symbols-outlined text-[18px]">arrow_forward</span>;

export default function Home() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [proofIdx, setProofIdx] = useState(0);
  const [zoom, setZoom] = useState(false);

  const active = PROOF[proofIdx];

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

      {/* ─── 1 · HERO — promise + one clear action ─────────────────── */}
      <section className="relative pt-14 md:pt-24 pb-14 md:pb-20">
        <div className="aurora aurora-a w-[520px] h-[520px] -top-40 -left-40" />
        <div className="aurora aurora-b w-[460px] h-[460px] top-10 right-[-140px]" />

        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal each>
              <p className="reveal inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium text-primary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open for new projects
              </p>
              <h1 className="reveal text-[42px] sm:text-[58px] lg:text-[72px] display text-on-surface mb-6">
                Videos that hook.
                <br />
                <span className="gradient-text-animated">Strategy that scales.</span>
              </h1>
              <p className="reveal text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed max-w-xl mb-8">
                I&apos;m Anuj — I edit video and run growth for creators and B2B teams who are tired of
                content that nobody watches. High-retention edits, sharp packaging, and reporting that
                proves it worked.
              </p>
              <div className="reveal flex flex-wrap items-center gap-3 mb-4">
                <Link href="/youtube-funnel" className="btn btn-glow">
                  Get my free channel audit
                  <Arrow />
                </Link>
                <a href="#proof" className="btn btn-secondary">
                  <span className="material-symbols-outlined text-[18px]">monitoring</span>
                  See the proof
                </a>
              </div>
              <p className="reveal text-[13px] text-on-surface-variant">
                Free · No credit card · I reply within 24 hours
              </p>
            </ScrollReveal>
          </div>

          {/* Portrait with parallax depth + floating proof chips */}
          <div className="lg:col-span-5">
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div
                className="absolute -inset-4 rounded-[40px] opacity-80 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(73,54,230,0.55) 0%, rgba(139,92,246,0.4) 55%, rgba(192,132,252,0.15) 100%)",
                }}
              />
              <div data-parallax="0.06" className="parallax">
                <div className="relative rounded-[28px] overflow-hidden border border-white/60 bg-surface-container-low aspect-[4/5] shadow-[0_2px_6px_rgba(0,0,0,0.05),0_50px_90px_-40px_rgba(73,54,230,0.6)]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVgUM1CPI-chpiQnnacQOAazwKAIf2X5MgiRD1canwHi3-PNyeCAN1VYG06tYjQXLskeEt_ktPsUvDxxN_L9Ohk4yupNmlg-bnC10qZyeDx8ECQZEKVtWU5uq9eVhCx-qcTE5wosJfkt6NTN6fw9c2ZtGqxAoEYBnAnJcnKUPeyciq0_zM4K1C4Dtx2W0MJQ8MRGsfWMx0jiAQKjKTIiW7Jelor9RbkB7lzUza283dH10yzGnlDwkwt3iQtBL7DGOtn_1Z9OgjKUy2mg"
                    alt="Portrait of Anuj Mishra"
                    fill
                    sizes="(max-width: 1024px) 380px, 420px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <div data-parallax="-0.05" className="parallax absolute -left-3 sm:-left-8 top-[18%]">
                <div className="float-y rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_18px_40px_-18px_rgba(73,54,230,0.5)] px-4 py-3">
                  <p className="text-[22px] font-semibold tracking-tight text-on-surface leading-none">600+</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">videos edited</p>
                </div>
              </div>
              <div data-parallax="0.09" className="parallax absolute -right-2 sm:-right-6 bottom-[14%]">
                <div className="float-y-delayed rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_18px_40px_-18px_rgba(73,54,230,0.5)] px-4 py-3">
                  <p className="text-[22px] font-semibold tracking-tight gradient-text leading-none">10M+</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">reach generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Count-up numbers */}
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 mt-14 md:mt-20">
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
      </section>

      {/* ─── 2 · PROOF — interactive data viewer (dark, cinematic) ─── */}
      <section id="proof" className="relative overflow-hidden py-20 md:py-28 scroll-mt-14 bg-gradient-to-b from-[#f4f0ff] via-[#ebe5ff] to-[#f6f3ff] border-y border-primary/10">
        <div className="aurora aurora-a w-[640px] h-[640px] -top-56 left-[-160px]" />
        <div className="aurora aurora-b w-[600px] h-[600px] bottom-[-240px] right-[-140px]" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(73,54,230,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">Real results</p>
              <h2 className="text-[34px] md:text-[56px] display text-on-surface">
                Don&apos;t trust words. <span className="gradient-text-animated">Check the data.</span>
              </h2>
              <p className="text-[17px] md:text-[18px] text-on-surface-variant leading-relaxed mt-5 max-w-2xl">
                Straight from a real YouTube Studio and ad account — no mock-ups. Pick a screenshot, then
                open it full size to read every number.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Picker */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 lg:pb-0 snap-x" role="tablist" aria-label="Proof screenshots">
              {PROOF.map((item, i) => {
                const on = i === proofIdx;
                return (
                  <button
                    key={item.src}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setProofIdx(i)}
                    className={`snap-start shrink-0 w-[260px] lg:w-auto text-left rounded-2xl border p-4 transition-all duration-300 ${
                      on
                        ? "border-primary/40 bg-white shadow-[0_20px_50px_-24px_rgba(73,54,230,0.55)]"
                        : "border-primary/10 bg-white/55 hover:bg-white/85 hover:border-primary/25"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[13px] font-semibold ${on ? "bg-gradient-to-br from-primary to-purple-500 text-white" : "bg-primary/10 text-primary/70"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[15px] font-semibold leading-snug ${on ? "text-on-surface" : "text-on-surface/80"}`}>{item.metric}</span>
                        <span className="block text-[12.5px] text-on-surface-variant mt-0.5 truncate">{item.label}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Viewer — tilts flat as you scroll into it */}
            <div className="lg:col-span-8">
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
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className={`object-contain transition-opacity duration-500 ${i === proofIdx ? "opacity-100" : "opacity-0"}`}
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
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[18px] font-semibold text-on-surface">{active.metric}</p>
                  <p className="text-[14.5px] text-on-surface-variant mt-1 max-w-xl">{PROOF_NOTES[active.src]}</p>
                </div>
                <Link href="/youtube-funnel" className="btn btn-glow shrink-0">
                  Get results like this
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 · SOCIAL PROOF — what clients say ───────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="aurora aurora-b w-[420px] h-[420px] top-0 right-[-120px] opacity-30" />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">Clients</p>
                <h2 className="text-[32px] md:text-[48px] display text-on-surface">
                  What they say <span className="gradient-text">when the work ships.</span>
                </h2>
              </div>
              <Link href="/testimonials" className="btn btn-secondary btn-sm shrink-0">
                Read all
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal each className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="reveal card-glow spotlight p-7 flex flex-col">
                <span className="material-symbols-outlined text-[34px] text-primary/30 mb-3 !font-[800]" aria-hidden="true">format_quote</span>
                <blockquote className="text-[15.5px] text-on-surface leading-relaxed mb-6 flex-grow">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-5 border-t border-primary/10">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white text-[12.5px] font-semibold flex items-center justify-center shrink-0">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-on-surface">{t.name}</span>
                    <span className="block text-[13px] text-on-surface-variant">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 4 · SELECTED WORK — the showcase ──────────────────────── */}
      <section id="work" className="relative py-16 md:py-24 bg-surface-container-low/70 border-y border-black/[0.06] scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">Selected work</p>
                <h2 className="text-[32px] md:text-[48px] display text-on-surface">
                  The edits behind the numbers — <span className="gradient-text">press play.</span>
                </h2>
              </div>
              <Link href="/portfolio" className="btn btn-secondary btn-sm shrink-0">
                All case studies
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
                className="reveal group text-left card-glow spotlight p-0 focus-visible:outline-none"
                aria-label={`Play ${item.title}`}
              >
                <div className="relative w-full aspect-video bg-surface-container overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1060]/55 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute left-3 top-3 text-[11px] font-semibold tracking-[0.06em] uppercase text-white bg-black/55 backdrop-blur px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-lg scale-95 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-semibold text-on-surface mb-1">{item.title}</h3>
                  <p className="text-[14px] text-on-surface-variant leading-snug">{item.result}</p>
                  <p className="text-[13px] text-on-surface-variant/70 mt-2">{item.client}</p>
                </div>
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 5 · PROCESS — remove the fear of starting ─────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="text-[32px] md:text-[48px] display text-on-surface">
                From first call to <span className="gradient-text">measurable growth.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                No long onboarding, no retainers you can&apos;t leave. Every engagement starts with a free
                audit of your last 10 videos — you keep the audit either way.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="hidden md:block absolute top-[34px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <ScrollReveal each className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((step) => (
                <div key={step.n} className="reveal card-glow spotlight p-7 pt-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white text-[15px] font-semibold flex items-center justify-center mb-5 shadow-[0_14px_30px_-12px_rgba(124,77,240,0.8)]">
                    {step.n}
                  </div>
                  <h3 className="text-[20px] font-semibold text-on-surface mb-2">{step.title}</h3>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed">{step.body}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 6 · LEAD MAGNET — low-friction first step ─────────────── */}
      <section className="relative py-6 md:py-10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#3b28c9] via-[#5340ea] to-[#8b5cf6] p-8 md:p-14 text-white shadow-[0_40px_90px_-40px_rgba(73,54,230,0.9)]">
              <div className="aurora aurora-b w-[420px] h-[420px] -top-32 -right-24 opacity-60" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 mb-3">Free · takes about a minute</p>
                  <h2 className="text-[30px] md:text-[46px] display text-white mb-4">
                    Get a free 30-day plan built around your channel.
                  </h2>
                  <p className="text-[16.5px] text-white/75 leading-relaxed max-w-2xl">
                    Paste your YouTube channel link and get hooks, titles, thumbnail direction and the one fix
                    that matters most — straight to your inbox.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
                  <Link href="/youtube-funnel" className="btn btn-on-dark w-full lg:w-auto">
                    Analyze my YouTube channel
                    <Arrow />
                  </Link>
                  <Link href="/linkedin-funnel" className="text-[14px] text-white/80 hover:text-white underline underline-offset-4 decoration-white/30">
                    Or get the free LinkedIn plan
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 7 · FAQ — answer objections before they ask ───────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[860px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">Questions</p>
              <h2 className="text-[32px] md:text-[44px] display text-on-surface">
                Before you <span className="gradient-text">reach out.</span>
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
                    <span className={`material-symbols-outlined text-[22px] text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}>add</span>
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

      {/* ─── 8 · CLOSING CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white via-[#f1ecff] to-[#e6deff]">
        <div className="aurora aurora-a w-[640px] h-[640px] -top-72 left-1/2 -translate-x-1/2" />
        <div className="aurora aurora-b w-[420px] h-[420px] bottom-[-180px] right-[8%]" />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 text-center">
          <ScrollReveal>
            <h2 className="text-[36px] md:text-[60px] display text-on-surface mb-5">
              Your next 10 videos, <span className="gradient-text-animated">built for your audience.</span>
            </h2>
            <p className="text-[17px] md:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
              Send me your channel or a rough brief. I&apos;ll come back with what I&apos;d change first — no
              pitch deck, no obligation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-glow">
                Start a project
                <Arrow />
              </Link>
              <a href="mailto:contact@anuj4u.in" className="btn btn-secondary">
                contact@anuj4u.in
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Proof lightbox: full-size, scrollable, arrow-key navigation ─── */}
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
              <p className="text-[15px] font-semibold truncate">{active.metric}</p>
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
              alt={`${active.label} — full size`}
              className="mx-auto w-full max-w-[1600px] h-auto rounded-xl bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* ─── Video lightbox ───────────────────────────────────────── */}
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
