import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Long-form Video Edits | Anuj Mishra",
  description: "Long-form YouTube edits, podcast episode cuts, and VSLs edited by Anuj Mishra. 8 to 25 minute videos with retention-first pacing.",
  alternates: { canonical: "/work/long-form" },
  openGraph: {
    title: "Long-form Video Edits | Anuj Mishra",
    description: "Long-form YouTube, podcast, and VSL edits.",
    url: "https://anuj4u.in/work/long-form",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long-form Video Edits | Anuj Mishra",
    description: "Long-form YouTube, podcast, and VSL edits.",
  },
};

const longFormEdits = [
  {
    id: "y11b_rVHcyg",
    title: "Launch Excel — VSL re-cut",
    desc: "Sales-page video rebuilt with a stronger hook, tighter pacing, and on-screen proof points. Drove +38% course signup rate.",
    client: "Victor Chan · Launch Excel",
  },
  {
    id: "izidLZclYZs",
    title: "Training Scientists — episode edit",
    desc: "Lecture-style content layered with motion graphics, on-screen notes, and chapter markers for retention.",
    client: "Dr. Maurice Maurer · Training Scientists",
  },
  {
    id: "Cd4YRPSLBVE",
    title: "Author podcast — episode cut",
    desc: "Multi-cam interview with captions, branded lower-thirds, and B-roll that matches the story beats.",
    client: "Harjeet Dhillon",
  },
  {
    id: "-SYqXdaZXl8",
    title: "Wealth adviser — podcast edit",
    desc: "Long-form interview with timestamped chapters, a clean intro/outro, and a teaser for the next episode.",
    client: "Blake Reddy",
  },
];

function VideoTile({
  id,
  title,
  desc,
  client,
}: {
  id: string;
  title: string;
  desc: string;
  client: string;
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
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg group-hover:scale-110 transition-transform">
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

export default function LongFormPage() {
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
          Long-form
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Long-form <span className="gradient-text">Video Edits</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          YouTube episodes, podcast cuts, and VSLs. 8 to 25 minutes, retention
          first. Click any tile to watch the full video.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {longFormEdits.map((v) => (
          <VideoTile key={v.id} {...v} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need long-form editing for your channel?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Book a call and we will look at your last 5 videos together.
          </p>
          <Link
            href="/contact?service=content-engine"
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
