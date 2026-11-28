"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import VideoTestimonial from "@/components/VideoTestimonial";
import YtThumb from "@/components/YtThumb";
import CountUp from "@/components/CountUp";

/* ─── Rotating Platform Data (Official Brand Marks) ─────────────── */
type PlatformItem = {
  id: string;
  label: string;
  gradient?: string;
  color?: string;
};

const PLATFORMS: PlatformItem[] = [
  { id: "youtube", label: "YouTube", color: "#FF0000" },
  { id: "instagram", label: "Instagram", gradient: "linear-gradient(135deg, #ec4899, #f97316)" },
  { id: "linkedin", label: "LinkedIn", gradient: "linear-gradient(135deg, #0a66c2, #2563eb)" },
  { id: "spotify", label: "Podcasts", gradient: "linear-gradient(135deg, #1db954, #0d9488)" },
];

const LOOP_PLATFORMS: PlatformItem[] = [...PLATFORMS, PLATFORMS[0]];

function PlatformLogo({ id, className = "w-full h-full" }: { id: string; className?: string }) {
  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="#FF0000"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        />
        <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <radialGradient id="igBrandGrad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#igBrandGrad)" />
        <path
          fill="#fff"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
          transform="translate(2.4 2.4) scale(0.8)"
        />
      </svg>
    );
  }
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="#0A66C2"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        fill="#fff"
        d="M17.5 10.6c-3.3-2-8.8-2.2-12-1.2a1 1 0 0 1-.6-1.9c3.7-1.1 9.7-.9 13.6 1.4a1 1 0 0 1-1 1.7zm-.1 2.9c-.3.4-.8.5-1.2.3-2.8-1.7-7-2.2-10.3-1.2a.85.85 0 1 1-.5-1.6c3.8-1.2 8.5-.6 11.7 1.3.4.2.5.8.3 1.2zm-1.4 2.8c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1a.7.7 0 0 1-.3-1.4c3.9-.9 7.3-.5 10.1 1.2.3.2.4.6.2 1z"
      />
    </svg>
  );
}

/* ─── VideoCard component ────────────────────────────────────── */
type ClientVideo = {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  channelUrl: string;
};

function VideoCard({ video }: { video: ClientVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="shrink-0 w-[82vw] sm:w-[340px] md:w-[380px] snap-center group">
      {/* Thumbnail / Player */}
      <div className="glass-card rounded-[18px] p-1 shadow-[0_12px_40px_-16px_rgba(73,54,230,0.22)] overflow-hidden">
        <div className="relative aspect-video rounded-[13px] overflow-hidden bg-neutral-950">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group/btn relative w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label={`Play ${video.title}`}
            >
              <YtThumb
                id={video.id}
                alt={video.title}
                className="group-hover/btn:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/25 group-hover/btn:bg-black/15 transition-colors" />
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white shadow-xl group-hover/btn:scale-110 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                <span className="material-symbols-outlined text-[26px] sm:text-[30px] translate-x-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
      {/* Channel name + Video title — YouTube-style */}
      <div className="flex items-start gap-2.5 mt-3 px-1">
        <a href={video.channelUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5">
          <Image
            src={video.channelAvatar}
            alt={video.channel}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
        </a>
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-on-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </p>
          <a
            href={video.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-on-surface-variant hover:text-primary transition-colors mt-0.5 inline-block"
          >
            {video.channel}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Real Client Data (No subscriber counts, no arrows) ────────── */
const HERO_AVATARS = [
  { src: "/testimonials/victor-chan.jpg", name: "Victor Chan" },
  { src: "/testimonials/harjeet-dhillon.jpg", name: "Harjeet Dhillon" },
  { src: "/testimonials/maurice-maurer.jpg", name: "Dr. Maurice Maurer" },
  { src: "/testimonials/blake-reddy.jpg", name: "Blake Reddy" },
  { src: "/testimonials/ross-zeiger.jpg", name: "Ross Zeiger" },
];

const CLIENT_CARDS = [
  {
    name: "Victor Chan",
    role: "Founder, Launch Excel",
    photo: "/testimonials/victor-chan.jpg",
    handle: "@launchexcel",
    channelUrl: "https://www.youtube.com/@launchexcel",
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week.",
  },
  {
    name: "Dr. Maurice Maurer",
    role: "Founder, Training Scientists",
    photo: "/testimonials/maurice-maurer.jpg",
    handle: "@TrainingScientists",
    channelUrl: "https://www.youtube.com/@TrainingScientists",
    quote:
      "I hired Anuj to do video editing and graphic design work for my YouTube channel. He did an excellent job, always responds very quickly and produces great results.",
  },
  {
    name: "Harjeet Dhillon",
    role: "Canadian Actress & Podcast Host",
    photo: "/testimonials/harjeet-dhillon.jpg",
    badge: "Video Podcast",
    quote:
      "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he has guided me more than I could ever hope for.",
  },
  {
    name: "Blake Reddy",
    role: "Private Client Wealth Adviser",
    photo: "/testimonials/blake-reddy.jpg",
    badge: "Podcast Branding",
    quote:
      "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend.",
  },
  {
    name: "Ross Zeiger",
    role: "Founder, Descript Mastery",
    photo: "/testimonials/ross-zeiger.jpg",
    badge: "Descript Mastery",
    quote:
      "Anuj is great! Professional, fast, and easy to work with.",
  },
];


/* ─── Client Video Showcase (horizontal scroll, client work only) ─── */
const CLIENT_VIDEOS = [
  {
    id: "-DB8-7eLsTY",
    title: "Can AI Video Avatars REALLY Replace Human Presenters?",
    channel: "Eric Presnall - VideoRep",
    channelAvatar: "/avatars/eric-presnall.jpg",
    channelUrl: "https://www.youtube.com/@VideoRepMarketing",
  },
  {
    id: "-SYqXdaZXl8",
    title: "Dan Koe’s Playbook for Financial Freedom and Fulfillment",
    channel: "Circle",
    channelAvatar: "/avatars/circle.jpg",
    channelUrl: "https://www.youtube.com/@circleapp",
  },
  {
    id: "mHOLzwe4sMQ",
    title: "ChatGPT Connectors EXPLAINED: 5 Best Use Cases and Limitations Revealed!",
    channel: "Tim Cakir",
    channelAvatar: "/avatars/tim-cakir.jpg",
    channelUrl: "https://www.youtube.com/@timcakir",
  },
  {
    id: "pcfFzxnhwUE",
    title: "How Smart Excel Users Rename 100s of Files",
    channel: "Victor Chan",
    channelAvatar: "/avatars/victor-chan.jpg",
    channelUrl: "https://www.youtube.com/@launchexcel",
  },
  {
    id: "y11b_rVHcyg",
    title: "ChatGPT o1 vs Claude 3.5: Coding Battle - Create a Snake Game & an Electron Cloud Simulation",
    channel: "Training Scientists",
    channelAvatar: "/avatars/training-scientists.jpg",
    channelUrl: "https://www.youtube.com/@TrainingScientists",
  },
  {
    id: "TW3omRuTQA8",
    title: "Life Changing Secrets to Manifesting Positivity!",
    channel: "Harjeet Dhillon",
    channelAvatar: "/avatars/harjeet-dhillon.jpg",
    channelUrl: "https://www.youtube.com/@harjeetd111",
  },
  {
    id: "izidLZclYZs",
    title: "From Broke to YouTube Millionaire: The Making of Sean Cannell",
    channel: "Circle",
    channelAvatar: "/avatars/circle.jpg",
    channelUrl: "https://www.youtube.com/@circleapp",
  },
  {
    id: "68lgEUQDiDQ",
    title: "Copy My SECRET AI Prompt to Rank on YouTube & AI Search",
    channel: "Eric Presnall - VideoRep",
    channelAvatar: "/avatars/eric-presnall.jpg",
    channelUrl: "https://www.youtube.com/@VideoRepMarketing",
  },
];

const STATS = [
  { value: "540+", label: "Videos edited" },
  { value: "125M+", label: "Reach generated" },
  { value: "50+", label: "Channels served" },
  { value: "5+", label: "Years in content" },
];

const HANDLES = [
  { n: "01", icon: "manage_search", title: "Audit", body: "I dig into your channel, analytics and last 10 videos to find what is costing you views." },
  { n: "02", icon: "edit_note", title: "Scripting", body: "Hooks, outlines and scripts built on what the audit found, so every video starts strong." },
  { n: "03", icon: "movie_edit", title: "Editing", body: "Long-form and short-form cuts with clean pacing, captions and sound." },
  { n: "04", icon: "imagesmode", title: "Thumbnails and packaging", body: "Titles, thumbnails and hooks built to earn the click." },
  { n: "05", icon: "publish", title: "Publishing", body: "Uploads, descriptions, chapters and scheduling handled for you." },
  { n: "06", icon: "insights", title: "Reporting", body: "The numbers in plain English: what worked, what to repeat, what to drop." },
];

const PROOF = [
  { src: "/proof/thumbnail-ctr.png", label: "Thumbnail click rate", headline: "Videos people click", stat: "13.0%", statLabel: "click rate on 220K impressions", note: "Good titles and thumbnails earn the click from the first impression." },
  { src: "/proof/365-day-analytics.png", label: "365-day analytics", headline: "Views that keep growing", stat: "223K", statLabel: "views in 365 days", note: "Steady uploads and sharper packaging grow sustained audience." },
  { src: "/proof/90-day-performance.png", label: "90-day performance", headline: "Growth every quarter", stat: "+63%", statLabel: "views vs the previous 90 days", note: "A consistent style and posting rhythm lifts each quarter above the last." },
  { src: "/proof/organic-impressions.png", label: "Organic reach", headline: "Found in search", stat: "140K", statLabel: "impressions, 36% from YouTube search", note: "Titles and descriptions match what viewers search for." },
  { src: "/proof/us-audience.png", label: "Audience", headline: "The right viewers", stat: "23.6%", statLabel: "of views from the US", note: "Top geographies: US, India and UK." },
  { src: "/proof/google-ads-growth.png", label: "Google Ads", headline: "Paid reach that pays off", stat: "$0.23", statLabel: "average cost per click", note: "A $600 YouTube campaign at a 1.86% view rate." },
];

const FORMATS = [
  { title: "Long-form YouTube Videos", desc: "Tutorials, interviews and explainers edited for retention.", href: "/work/long-form", count: "16 videos", img: { type: "yt", id: "mHOLzwe4sMQ" } },
  { title: "Demo & Product Launch", desc: "SaaS walkthroughs, feature tours and product launch videos.", href: "/work/demo-videos", count: "Launch Videos", img: { type: "yt", id: "1nT4g9VeJDk" } },
  { title: "Short-form Clips", desc: "Shorts and Reels cut to hook in the first second.", href: "/work/short-form", count: "12 Shorts", img: { type: "yt-v", id: "dD3jLdx2k7A" } },
  { title: "Podcast Editing", desc: "Full episodes with clean audio, layouts and chapters.", href: "/work/long-form#podcast", count: "Video podcasts", img: { type: "file", src: "/brand/podcast-editing-showcase.jpg" } },
  { title: "Thumbnails & Graphics", desc: "Packaging designed to win the click.", href: "/work/thumbnails", count: "25 thumbnails", img: { type: "file", src: "/thumbnails/chatgpt-connectors-explained.webp" } },
  { title: "Channel Growth", desc: "Case studies with real YouTube Studio numbers.", href: "/work/case-studies", count: "Case studies", img: { type: "file", src: "/proof/thumbnail-ctr.png" } },
] as const;

const FAQS = [
  { q: "How fast is turnaround?", a: "Most long-form edits land in 3 to 5 business days. Shorts and Reels take 24 to 48 hours. Retainer clients get priority slots." },
  { q: "What does a revision look like?", a: "Two rounds come with every deliverable. Leave timestamped comments on the cut and I turn them around in 24 to 48 hours." },
  { q: "What tools do you work in?", a: "Descript and DaVinci Resolve for editing, Premiere Pro when a project calls for it, and Canva for thumbnails and graphics." },
  { q: "Do I need to hire you for everything?", a: "No. Many clients start with one video, a thumbnail set or a channel audit, then move to a retainer once it clicks." },
  { q: "How do we communicate?", a: "A shared WhatsApp or email thread, with files in Google Drive or Frame.io." },
  { q: "Which niches do you work with?", a: "Creators, coaches, course sellers and B2B teams, mostly in finance, education, tech and personal brands." },
];

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";
const Arrow = () => <span className="material-symbols-outlined text-[18px]">arrow_forward</span>;

export default function Home() {
  const [platformIdx, setPlatformIdx] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const [wordWidth, setWordWidth] = useState<number | undefined>(undefined);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [timPlaying, setTimPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [proofIdx, setProofIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [proofPaused, setProofPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  const active = PROOF[proofIdx];
  const currentPlatform = PLATFORMS[platformIdx % PLATFORMS.length];

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Measure active rotating platform item width so spacing stays exact
  useEffect(() => {
    const measure = () => {
      const el = itemRefs.current[platformIdx % PLATFORMS.length];
      if (el) setWordWidth(el.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [platformIdx]);

  // Rotate platform upward in a seamless loop + sync corner 3D/blurred icons
  useEffect(() => {
    if (!motionOk) return;
    const timer = setInterval(() => {
      setMorphing(true);
      setTimeout(() => {
        setPlatformIdx((i) => i + 1);
        setMorphing(false);
      }, 240);
    }, 2500);
    return () => clearInterval(timer);
  }, [motionOk]);

  // After sliding up to the cloned YouTube item, snap back to index 0 without transition
  useEffect(() => {
    if (platformIdx !== PLATFORMS.length) return;
    const resetTimer = setTimeout(() => {
      setNoTransition(true);
      setPlatformIdx(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false);
        });
      });
    }, 720);
    return () => clearTimeout(resetTimer);
  }, [platformIdx]);

  useEffect(() => {
    if (proofPaused || zoom || !motionOk) return;
    const t = setTimeout(() => setProofIdx((i) => (i + 1) % PROOF.length), 6500);
    return () => clearTimeout(t);
  }, [proofIdx, proofPaused, zoom, motionOk]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
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

      {/* 1 · CENTER-ALIGNED LIGHT APPLE-GLASS HERO */}
      <section className="relative pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="aurora aurora-a w-[520px] h-[520px] -top-40 -left-40 opacity-50" />
        <div className="aurora aurora-b w-[480px] h-[480px] top-10 right-[-140px] opacity-40" />

        <div className="relative max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10 text-center flex flex-col items-center">
          {/* Synced 3D Glossy Corner Logo (Top Right) */}
          <div
            className={`hidden md:flex absolute right-4 lg:right-8 top-4 w-20 h-20 rounded-[22px] items-center justify-center border border-white/80 shadow-[0_24px_45px_-12px_rgba(73,54,230,0.3)] pointer-events-none float-y transition-all duration-500 ${
              morphing ? "opacity-0 blur-md scale-75 translate-y-2" : "opacity-100 blur-0 scale-100"
            }`}
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(243,240,255,0.85))" }}
            aria-hidden="true"
          >
            <div className="w-11 h-11 flex items-center justify-center">
              <PlatformLogo id={currentPlatform.id} />
            </div>
          </div>

          {/* Synced Soft-Blurred Corner Logo (Bottom Left) */}
          <div
            className={`hidden md:flex absolute left-4 lg:left-8 bottom-6 w-16 h-16 rounded-[18px] items-center justify-center border border-white/60 shadow-xl pointer-events-none float-y-delayed transition-all duration-500 ${
              morphing ? "opacity-0 blur-lg scale-75" : "opacity-85 blur-[3.5px] scale-100"
            }`}
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(237,233,254,0.65))" }}
            aria-hidden="true"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <PlatformLogo id={currentPlatform.id} />
            </div>
          </div>

          {/* Top Review Pill with Real Circular Client Avatars */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-card border border-white/80 shadow-sm mb-7">
            <div className="flex -space-x-2">
              {HERO_AVATARS.map((a) => (
                <Image
                  key={a.name}
                  src={a.src}
                  alt={a.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white bg-surface-container"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-amber-400 tracking-tight">★★★★★</span>
              <span className="font-bold text-on-surface">5.0</span>
              <span className="text-on-surface-variant">Worked With 50+ Creators &amp; Brands</span>
            </div>
          </div>

          {/* 2-Line Center-Aligned Headline with Official Brand Logos */}
          <h1 className="text-[34px] sm:text-[50px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.14] max-w-4xl mb-5 text-on-surface flex flex-col items-center">
            <span>I Build Your Presence</span>
            <span className="inline-flex flex-wrap items-center justify-center gap-x-[0.26em]">
              <span>&amp; Authority on</span>
              <span
                className="inline-block h-[1.2em] overflow-hidden align-middle transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: wordWidth ? `${wordWidth}px` : "auto" }}
              >
                <span
                  className={`flex flex-col items-start ${
                    noTransition
                      ? "transition-none"
                      : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  }`}
                  style={{ transform: `translateY(-${platformIdx * 1.2}em)` }}
                >
                  {LOOP_PLATFORMS.map((p, i) => (
                    <span
                      key={`${p.id}-${i}`}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      className="h-[1.2em] inline-flex items-center gap-[0.22em] whitespace-nowrap font-extrabold"
                    >
                      <PlatformLogo id={p.id} className="w-[0.78em] h-[0.78em] shrink-0" />
                      {p.gradient ? (
                        <span
                          className="bg-clip-text text-transparent"
                          style={{ backgroundImage: p.gradient }}
                        >
                          {p.label}
                        </span>
                      ) : (
                        <span style={{ color: p.color }}>{p.label}</span>
                      )}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          {/* Personalized "I" Description (Zero em-dashes) */}
          <p className="text-[16px] sm:text-[18.5px] text-on-surface-variant max-w-2xl leading-relaxed mb-8">
            I help creators and brands reach the right audience with content strategy, editing, publishing, and full social media management, all handled end-to-end.
          </p>

          {/* Dual CTAs with Purple-Blue Gradient Call Button */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={BOOKING_URL}
              className="btn btn-glow inline-flex items-center gap-2"
            >
              Book Free Strategy Call
              <Arrow />
            </Link>
            <Link href="/case-studies" className="btn btn-secondary">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · TIM CAKIR TESTIMONIAL VIDEO (Thin Apple-glass border) */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-[920px] mx-auto px-5 sm:px-6 lg:px-10">
          <div className="text-center mb-4">
            <p className="eyebrow">Client Feedback</p>
          </div>
          <div className="glass-card rounded-[22px] p-1.5 shadow-[0_24px_60px_-24px_rgba(73,54,230,0.22)]">
            <div className="relative aspect-video rounded-[16px] overflow-hidden bg-neutral-950 flex items-center justify-center">
              {timPlaying ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/TbP5kY8BXUI?autoplay=1&rel=0"
                  title="Tim Cakir Client Testimonial"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setTimPlaying(true)}
                  className="group relative w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
                  aria-label="Play Tim Cakir client testimonial"
                >
                  <YtThumb
                    id="TbP5kY8BXUI"
                    alt="Tim Cakir Client Testimonial"
                    className="opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                    <span className="material-symbols-outlined text-[36px] sm:text-[42px] translate-x-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
          <p className="text-center text-xs sm:text-[13px] text-on-surface-variant font-medium mt-3">
            <span className="font-semibold text-on-surface">Tim Cakir</span> · Founder of AI Operator, helping businesses adopt AI workflows &amp; automation
          </p>
        </div>
      </section>

      {/* 2b · WORK SHOWCASE: Horizontal Scrollable Video Rail */}
      <section className="pb-10 md:pb-14 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10 mb-6">
          <p className="eyebrow">Work Showcase</p>
        </div>
        <div
          className="relative"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
          }}
        >
          <div className="flex gap-4 marquee-track pl-[max(20px,calc((100vw-1140px)/2+20px))]">
            {CLIENT_VIDEOS.map((v, i) => (
              <VideoCard key={`${v.id}-${i}`} video={v} />
            ))}
            {/* Duplicate set for seamless marquee loop */}
            {CLIENT_VIDEOS.map((v, i) => (
              <VideoCard key={`${v.id}-dup-${i}`} video={v} />
            ))}
          </div>
        </div>
      </section>


      {/* 3 · CLIENTS I WORK WITH (Real circular photos, quotes, channel links; no subscriber counts or arrows) */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
                <p className="eyebrow mb-2">Clients</p>
                <h2 className="text-[30px] md:text-[44px] display text-on-surface">
                  Worked With <span className="gradient-text">50+ Creators</span> and Brands
                </h2>

            </div>
          </ScrollReveal>

          <div
            className="relative"
            style={{ maskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)" }}
          >
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {CLIENT_CARDS.map((c) => (
              <article key={c.name} className="card-glow spotlight rounded-[24px] p-6 sm:p-7 flex flex-col justify-between gap-5 shrink-0 w-[85vw] sm:w-[420px] snap-center">
                <p className="text-[15px] text-on-surface-variant leading-relaxed">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-black/[0.06]">
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      src={c.photo}
                      alt={c.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold text-on-surface truncate">{c.name}</h3>
                      <p className="text-xs text-on-surface-variant truncate">{c.role}</p>
                      {c.channelUrl && (
                        <a
                          href={c.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] font-semibold text-primary hover:underline mt-0.5 inline-block"
                        >
                          {c.handle}
                        </a>
                      )}
                    </div>
                  </div>
                  {c.badge && (
                    <span className="shrink-0 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                      {c.badge}
                    </span>
                  )}
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 · PROBLEM / SOLUTION (Apple-Glass Comparison) */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-2">Problem / Solution</p>
              <h2 className="text-[30px] md:text-[44px] display text-on-surface">
                The Difference Between Guessing And <span className="gradient-text">Growing On YouTube</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-[26px] p-7 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-bold">✕</span>
                <h3 className="text-lg font-bold text-on-surface">Doing Everything Yourself</h3>
              </div>
              <ul className="space-y-3 text-[15px] text-on-surface-variant">
                <li className="flex items-start gap-2.5"><span className="text-rose-400 mt-0.5">•</span> No clear YouTube content strategy behind your uploads</li>
                <li className="flex items-start gap-2.5"><span className="text-rose-400 mt-0.5">•</span> Inconsistent posting without a structured content plan</li>
                <li className="flex items-start gap-2.5"><span className="text-rose-400 mt-0.5">•</span> Low click-through rates due to weak titles and thumbnails</li>
                <li className="flex items-start gap-2.5"><span className="text-rose-400 mt-0.5">•</span> Poor audience retention caused by unoptimized video structure</li>
                <li className="flex items-start gap-2.5"><span className="text-rose-400 mt-0.5">•</span> Time-consuming editing, uploads, and channel management</li>
              </ul>
            </div>

            <div className="card-glow spotlight rounded-[26px] p-7 sm:p-8 space-y-5 border border-primary/25 relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
                <h3 className="text-lg font-bold text-on-surface">My System Built For Growth</h3>
              </div>
              <ul className="space-y-3 text-[15px] text-on-surface">
                <li className="flex items-start gap-2.5"><span className="text-emerald-600 mt-0.5 font-bold">✓</span> Data-driven YouTube strategy built with proven growth patterns</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-600 mt-0.5 font-bold">✓</span> Structured content planning designed for consistency</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-600 mt-0.5 font-bold">✓</span> High-converting thumbnails and titles built just for you</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-600 mt-0.5 font-bold">✓</span> Retention-focused video editing to keep viewers engaged longer</li>
                <li className="flex items-start gap-2.5"><span className="text-emerald-600 mt-0.5 font-bold">✓</span> Full management, optimization, and clear monthly reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · STATS BAR */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="card-glow spotlight grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-primary/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-6 py-6 md:py-8 text-center">
                  <div className="text-[34px] md:text-[44px] font-extrabold tracking-[-0.03em] gradient-text leading-none">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[13px] text-on-surface-variant mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 · HOW I WORK */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-2">How I work</p>
              <h2 className="text-[30px] md:text-[48px] display text-on-surface md:whitespace-nowrap">
                The whole channel, <span className="gradient-text">start to finish.</span>
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-relaxed mt-4">
                Audit, script, edit, package, publish, report. Hand me one video or the full pipeline.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HANDLES.map((h, i) => (
              <div key={h.title} className="reveal card-glow spotlight p-6 text-center flex flex-col items-center relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white flex items-center justify-center mb-4 shadow-[0_14px_30px_-12px_rgba(124,77,240,0.8)]">
                  <span className="material-symbols-outlined text-[22px]">{h.icon}</span>
                </div>
                <span className="absolute top-4 right-4 text-[12px] font-bold tracking-[0.14em] text-primary/50">{h.n}</span>
                <h3 className="text-[18px] font-semibold text-on-surface mb-1.5">{h.title}</h3>
                <p className="text-[14.5px] text-on-surface-variant leading-relaxed">{h.body}</p>
                {i < HANDLES.length - 1 && (i + 1) % 3 !== 0 && (
                  <span className="material-symbols-outlined hidden lg:flex absolute -right-[13px] top-1/2 -translate-y-1/2 text-[22px] text-primary/40 bg-[#f7f5ff] w-6 justify-center">
                    arrow_forward
                  </span>
                )}
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

      {/* 7 · COSMO TAYLOR VIDEO TESTIMONIAL */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
          <ScrollReveal>
            <VideoTestimonial
              videoId="IYphbtdwb5M"
              clientName="Cosmo Taylor"
              clientRole="Business Owner & Author"
              headline="Cosmo Taylor: Podcast Production"
              quote="Anuj manages the entire podcast pipeline, from full-episode editing and Spotify publishing to Instagram, Facebook & LinkedIn clips, carousels, and my book release video funnel."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 8 · REAL RESULTS: YOUTUBE STUDIO SCREENSHOTS */}
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
              <div className="pinned-callout mb-6">$50,000 worth of clients from just YouTube in three months.</div>
              <h2 className="text-[34px] md:text-[54px] display text-on-surface">
                Real results that convert:<span className="gradient-text-animated"> see.</span>
              </h2>
              <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed mt-4">
                Views, clicks and the right audience, straight from YouTube Studio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-2 text-center lg:text-left order-2 lg:order-1 min-h-[210px] flex items-center justify-center lg:justify-start">
              <div key={proofIdx} className="tm-in">
                <p className="eyebrow mb-1">{active.label}</p>
                <p className="text-[30px] md:text-[38px] font-semibold tracking-[-0.025em] text-on-surface leading-tight">{active.headline}</p>
                <p className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] gradient-text leading-none mt-4">{active.stat}</p>
                <p className="text-[14px] text-on-surface-variant mt-1.5">{active.statLabel}</p>
                <p className="text-[16px] text-on-surface-variant leading-relaxed mt-4 max-w-sm mx-auto lg:mx-0">{active.note}</p>
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
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
                      style={{ animationDuration: `${6500}ms`, animationPlayState: proofPaused ? "paused" : "running" }}
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

      {/* 9 · PORTFOLIO FORMATS */}
      <section id="work" className="relative py-16 md:py-24 bg-surface-container-low/70 border-b border-black/[0.06] scroll-mt-[68px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <p className="eyebrow mb-2">Portfolio</p>
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
              <Link key={f.title} href={f.href} className="reveal group card-glow spotlight p-0 text-center lg:col-span-2">
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
                  {f.img.type === "yt" && (
                    <YtThumb id={f.img.id} alt={f.title} className="transition-transform duration-700 group-hover:scale-[1.05]" />
                  )}
                  {f.img.type === "yt-v" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2b1a6b] to-[#6d3fe0]">
                      <div className="relative h-[86%] aspect-[9/16] rounded-lg overflow-hidden shadow-lg bg-surface-container">
                        <YtThumb id={f.img.id} alt={f.title} vertical className="transition-transform duration-700 group-hover:scale-[1.06]" />
                      </div>
                    </div>
                  )}
                  {f.img.type === "file" && (
                    <Image src={f.img.src} alt={f.title} fill sizes="520px" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[19px] font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-[14.5px] text-on-surface-variant leading-relaxed mb-3">{f.desc}</p>
                  <span className="text-[13px] font-medium text-primary inline-flex items-center gap-1">
                    {f.count}
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-[820px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="eyebrow mb-2">FAQ</p>
              <h2 className="text-[32px] md:text-[48px] display text-on-surface">
                Questions, <span className="gradient-text">answered.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-2.5">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="text-[16px] sm:text-[17px] font-semibold text-on-surface">{f.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-primary shrink-0">
                      {open ? "remove" : "add"}
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[15px] text-on-surface-variant leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11 · CLOSING CTA */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent">
        <div className="max-w-[860px] mx-auto px-5 sm:px-6 text-center">
          <p className="eyebrow mb-3">Ready when you are</p>
          <h2 className="text-[34px] md:text-[54px] display text-on-surface mb-5">
            Let&apos;s turn your content into <span className="gradient-text">your best growth channel.</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Paste your channel link for a free 30-day plan, or book a call and I will tell you what I would change first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
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

      {/* Results lightbox */}
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
