import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Portfolio | Anuj Mishra",
  description: "Full video portfolio showcasing long-form edits, short-form reels, and motion graphics by Anuj Mishra.",
  alternates: { canonical: "/work/video" },
  openGraph: {
    title: "Video Portfolio | Anuj Mishra",
    description: "Full video portfolio showcasing editing craft.",
    url: "https://anuj4u.in/work/video",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Portfolio | Anuj Mishra",
    description: "Full video portfolio showcasing editing craft.",
  },
};

const videoProjects = [
  {
    id: "y11b_rVHcyg",
    title: "Launch Excel — VSL re-cut",
    desc: "Sales-page video rebuilt with a stronger hook, tighter pacing, and on-screen proof points. Drove +38% course signup rate.",
    client: "Victor Chan · Launch Excel",
    duration: "12 min",
    category: "Long-form",
  },
  {
    id: "izidLZclYZs",
    title: "Training Scientists — episode edit",
    desc: "Lecture-style content layered with motion graphics, on-screen notes, and chapter markers for retention.",
    client: "Dr. Maurice Maurer · Training Scientists",
    duration: "18 min",
    category: "Long-form",
  },
  {
    id: "Cd4YRPSLBVE",
    title: "Author podcast — episode cut",
    desc: "Multi-cam interview with captions, branded lower-thirds, and B-roll that matches the story beats.",
    client: "Harjeet Dhillon",
    duration: "22 min",
    category: "Long-form",
  },
  {
    id: "-SYqXdaZXl8",
    title: "Wealth adviser — podcast edit",
    desc: "Long-form interview with timestamped chapters, a clean intro/outro, and a teaser for the next episode.",
    client: "Blake Reddy",
    duration: "15 min",
    category: "Long-form",
  },
  {
    id: "h2O8Gnq7w24",
    title: "Hook-first vertical",
    desc: "The first 3 seconds hook, the last 3 seconds call to action. Built for the scroll, captions baked in.",
    client: "Author channel",
    duration: "30s",
    category: "Short-form",
  },
  {
    id: "izidLZclYZs2",
    title: "Punchy 30s reel",
    desc: "Sharp cuts, kinetic text, no dead air. Tuned for LinkedIn and Instagram feed.",
    client: "Education creator",
    duration: "30s",
    category: "Short-form",
  },
];

function VideoCard({
  id,
  title,
  desc,
  client,
  duration,
  category,
}: {
  id: string;
  title: string;
  desc: string;
  client: string;
  duration: string;
  category: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
      className="group block glass-card rounded-2xl overflow-hidden border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all"
    >
      <div className="relative aspect-video bg-black">
        <Image
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
        <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {category}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded">
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg group-hover:scale-110 transition-transform" aria-hidden="true">
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

export default function VideoPage() {
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
          Full Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Video <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Every project, every format, every result. Long-form edits, short-form reels, and everything in between.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {videoProjects.map((v) => (
          <VideoCard key={v.id} {...v} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Want your work featured here?
          </h2>
          <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto leading-relaxed">
            I work with 2 clients at a time. If your channel is ready to grow, let us talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a free intro call
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
