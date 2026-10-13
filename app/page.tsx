"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

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

export default function Home() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-glow -top-32 -left-32" />
      <div className="ambient-glow-2 top-[60%] -right-32" />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-[42px] sm:text-[56px] lg:text-[68px] display text-on-surface mb-6">
              Videos that hook.
              <br />
              <span className="gradient-text">Strategy that scales.</span>
            </h1>

            <p className="text-[18px] md:text-[19px] text-on-surface-variant leading-relaxed max-w-xl mb-8">
              I'm Anuj — I edit video and run growth for creators and
              B2B teams who are tired of content that nobody watches.
              High-retention edits, sharp packaging, and reporting that proves
              it worked.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link href="/contact" className="btn btn-dark">
                Start a project
              </Link>
              <a href="#work" className="btn btn-secondary">
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                Watch the work
              </a>
            </div>

            {/* Proof strip — real numbers, not AI fluff */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pt-8 border-t border-black/[0.08] max-w-2xl">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[28px] font-semibold text-on-surface tracking-[-0.02em]">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-on-surface-variant mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait — purple gradient wash behind the card */}
          <div className="lg:col-span-5">
            <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div
                className="absolute inset-0 rounded-[32px] opacity-70 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(73,54,230,0.55) 0%, rgba(139,92,246,0.35) 60%, rgba(147,51,234,0) 100%)",
                }}
              />
              <div className="relative rounded-[28px] overflow-hidden border border-black/[0.08] bg-surface-container-low aspect-[4/5] shadow-[0_2px_6px_rgba(0,0,0,0.05),0_40px_80px_-48px_rgba(0,0,0,0.45)]">
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
          </div>
        </div>
      </section>

      {/* ─── REAL RESULTS (client proof — trust-builder, before the work) ─── */}
      <section className="py-16 md:py-24 border-t border-black/[0.07] scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Real results</p>
              <h2 className="text-[32px] md:text-[44px] display text-on-surface">
                Results, <span className="gradient-text">with the receipts.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Not polish — numbers. A real channel + ad account, screenshot straight from the studio, showing
                what consistent editing, packaging and strategy compound into over a year.
              </p>
            </div>
          </ScrollReveal>

          {/* Insight callout — rotating client-proof quote */}
          <Callout />

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROOF.map((item) => (
                <ProofCard key={item.src} {...item} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SELECTED WORK (playable) ─────────────────────────────── */}
      <section id="work" className="py-16 md:py-24 border-t border-black/[0.07] scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">Selected work</p>
                <h2 className="text-[32px] md:text-[44px] display text-on-surface">
                  Don't take my word for it — <span className="gradient-text">press play.</span>
                </h2>
              </div>
              <Link href="/portfolio" className="btn btn-secondary btn-sm shrink-0">
                All case studies
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORK.map((item) => (
                <button
                  key={item.videoId}
                  type="button"
                  onClick={() => setPlaying(item.videoId)}
                  className="group text-left card card-hover overflow-hidden p-0 focus-visible:outline-none"
                  aria-label={`Play ${item.title}`}
                >
                  <div className="relative w-full aspect-video bg-surface-container overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <span className="absolute left-3 top-3 text-[11px] font-semibold tracking-[0.06em] uppercase text-white bg-black/55 backdrop-blur px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-lg scale-95 opacity-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      <span className="material-symbols-outlined text-[26px] ml-0.5">
                        play_arrow
                      </span>
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-semibold text-on-surface mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-on-surface-variant leading-snug">
                      {item.result}
                    </p>
                    <p className="text-[13px] text-on-surface-variant/70 mt-2">
                      {item.client}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-surface-container-low/70 border-y border-black/[0.07]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="text-[32px] md:text-[44px] display text-on-surface">
                From first call to <span className="gradient-text">measurable growth.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                No long onboarding, no retainers you can't leave. Every
                engagement starts with a free audit of your last 10 videos —
                you keep the audit either way.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
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
              ].map((step) => (
                <div key={step.n} className="card p-7">
                  <div className="text-[13px] font-semibold text-primary tracking-[0.08em] mb-4">
                    {step.n}
                  </div>
                  <h3 className="text-[19px] font-semibold text-on-surface mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">Clients</p>
                <h2 className="text-[32px] md:text-[44px] display text-on-surface">
                  What they say <span className="gradient-text">when the work ships.</span>
                </h2>
              </div>
              <Link href="/testimonials" className="btn btn-secondary btn-sm shrink-0">
                Read all
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="card p-7 flex flex-col">
                  <blockquote className="text-[15.5px] text-on-surface leading-relaxed mb-6 flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-5 border-t border-black/[0.07]">
                    <span className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant text-[12.5px] font-semibold flex items-center justify-center shrink-0">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold text-on-surface">
                        {t.name}
                      </span>
                      <span className="block text-[13px] text-on-surface-variant">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 0%, rgba(124, 58, 237, 0.38) 0%, rgba(11, 11, 15, 0) 62%)",
          }}
        />
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 text-center">
          <ScrollReveal>
            <h2 className="text-[34px] md:text-[52px] display text-white mb-5">
              Your next 10 videos will be customized to{" "}
              <span className="gradient-text">your target audience.</span>
            </h2>
            <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-9 leading-relaxed">
              Send me your channel or a rough brief. I'll come back with
              what I'd change first — no pitch deck, no obligation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-on-dark">
                Start a project
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <a
                href="mailto:contact@anuj4u.in"
                className="btn btn-ghost !text-white !border-white/25 hover:!bg-white/10"
              >
                contact@anuj4u.in
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── VIDEO LIGHTBOX ───────────────────────────────────────── */}
      {playing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setPlaying(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
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

/* ────────────────────────────────────────────────────────────────────────── */
/* Sub-components — keep the page body readable. These are stable exports.  */
/* ────────────────────────────────────────────────────────────────────────── */

function Callout() {
  const QUOTES = [
    {
      metric: "$50,000 worth of clients from just YouTube — in three months.",
      why: "When the channel is credible and the content reaches the right audience, growth stops being luck and starts being repeatable.",
    },
    {
      metric: "Your channel builds trust, credibility and presence — that brings revenue.",
      why: "People buy from channels that sound like they know what they are talking about. Packaging and momentum are the difference.",
    },
    {
      metric: "Your content is not reaching the right audience — you need the right expertise.",
      why: "A channel that looks good and converts is a system, not a video. That is what we build together.",
    },
  ];
  const pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div
      className="card p-7 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 before:content-[''] before:absolute before:-top-3 before:left-6 before:h-[1px] before:w-4 before:bg-primary/40"
    >
      <span className="text-3xl md:text-4xl leading-none text-on-surface font-semibold tracking-tight">
        &ldquo;{pick.metric}&rdquo;
      </span>
      <p className="text-[15px] text-on-surface-variant leading-relaxed">
        {pick.why}
      </p>
    </div>
  );
}

function ProofCard({ src, label, metric, client }: (typeof PROOF)[0]) {
  const [loaded, setLoaded] = useState(false);
  const [proofOpen, setProofOpen] = useState<string | null>(null);

  return (
    <>
      <figure
        className="card card-hover overflow-hidden group cursor-pointer"
        onClick={() => setProofOpen(src)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setProofOpen(src)}
        aria-label={`View ${label}`}
      >
        <div className="relative w-full aspect-[16/10] bg-surface-container-low overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-container">
              <span className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          )}
          <Image
            src={src}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              loaded ? "" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <figcaption className="p-5">
          <p className="text-[15px] font-semibold text-on-surface mb-0.5">
            {metric}
          </p>
          <p className="text-[13.5px] text-on-surface-variant">
            {label} · {client}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-primary">
            <span className="material-symbols-outlined text-[13px]">open_in_full</span>
            Tap to open full size
          </span>
        </figcaption>
      </figure>

      {proofOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setProofOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setProofOpen(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Close proof"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <Image
              src={proofOpen}
              alt="Client proof — full size"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
