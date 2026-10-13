import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels & Shorts | Anuj Mishra",
  description: "Engaging short-form reels and YouTube Shorts. Vertical clips for social media that stop the scroll.",
  alternates: { canonical: "/reels" },
  openGraph: {
    title: "Reels & Shorts | Anuj Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
    url: "https://anuj4u.in/reels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reels & Shorts | Anuj Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
  },
};

const reels = [
  {
    id: "h2O8Gnq7w24",
    title: "Hook-first vertical",
    desc: "The first 3 seconds hook, the last 3 seconds call to action. Built for the scroll, captions baked in.",
    client: "Author channel",
    duration: "30s",
  },
  {
    id: "izidLZclYZs",
    title: "Punchy 30s reel",
    desc: "Sharp cuts, kinetic text, no dead air. Tuned for LinkedIn and Instagram feed.",
    client: "Education creator",
    duration: "30s",
  },
  {
    id: "Cd4YRPSLBVE",
    title: "Carousel-to-video clip",
    desc: "Static carousels re-cut into looping motion clips with on-brand captions.",
    client: "Course creator",
    duration: "45s",
  },
  {
    id: "y11b_rVHcyg",
    title: "Talking head + B-roll",
    desc: "On-camera delivery with overlaid visuals and timestamped chapter cards.",
    client: "YouTube channel",
    duration: "60s",
  },
  {
    id: "-SYqXdaZXl8",
    title: "30-second fix",
    desc: "Watch me fix a bad cut in 30 seconds. Same-day turnaround guaranteed.",
    client: "Brand campaign",
    duration: "30s",
  },
  {
    id: "abc123def456",
    title: "Trending audio + tip",
    desc: "Trending audio over a quick editing tip that got 50K views overnight.",
    client: "Social media agency",
    duration: "45s",
  },
];

function ReelTile({
  id,
  title,
  desc,
  client,
  duration,
}: {
  id: string;
  title: string;
  desc: string;
  client: string;
  duration: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
      className="group block glass-card rounded-2xl overflow-hidden border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all"
    >
      <div className="relative aspect-square bg-black">
        <Image
          src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded">
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg group-hover:scale-110 transition-transform" aria-hidden="true">
            play_circle
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
          {client}
        </p>
        <h3 className="text-base font-bold text-on-surface mb-1">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {desc}
        </p>
      </div>
    </a>
  );
}

export default function ReelsPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-12 pt-6 relative z-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to all work
        </Link>
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
          Short-form
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Reels <span className="gradient-text">& Shorts</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Scroll-stopping vertical content for YouTube Shorts, Instagram Reels, and LinkedIn. Click any tile to watch.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {reels.map((r) => (
          <ReelTile key={r.id} {...r} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-cyan-50 to-cyan-100 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need short-form content that converts?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Tell me your channel, your cadence, and your best-performing video so far.
          </p>
          <Link
            href="/contact?service=production-pod"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a strategy call
            <span className="material-symbols-outlined">event</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
