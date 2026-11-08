"use client";

import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";

interface VideoTestimonialProps {
  videoId?: string;
  thumbnailUrl?: string;
  clientName?: string;
  clientRole?: string;
  companyName?: string;
  avatarUrl?: string;
  headline?: string;
  metric?: string;
  metricLabel?: string;
  quote?: string;
  duration?: string;
}

export default function VideoTestimonial({
  videoId = "", // Plug in YouTube ID or client video ID when ready
  thumbnailUrl = "/thumbnails/mothers-day-ai-and-humanity.webp",
  clientName = "Victor Chan",
  clientRole = "Founder",
  companyName = "Launch Excel",
  avatarUrl,
  headline = "How We Scaled Client Pipeline by $50,000 Using YouTube Video & High-Retention Edits",
  metric = "+$50K",
  metricLabel = "Pipeline Generated in 90 Days",
  quote = "Anuj has been a game-changer for our video production. Long-form edits and VSLs with crisp pacing helped us turn viewers directly into high-ticket clients.",
  duration = "1:45 min",
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className="relative group rounded-[28px] overflow-hidden border border-black/[0.08] bg-[#0c0c12] text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_28px_80px_-20px_rgba(73,54,230,0.35)]">
        {/* Subtle ambient lighting */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/40 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Video Preview / Player column (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] bg-neutral-950 overflow-hidden flex items-center justify-center">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={headline}
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
            )}

            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Apple TV-style Glass Play Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="relative z-10 flex flex-col items-center gap-3 cursor-pointer group/btn"
              aria-label={`Play client story: ${clientName}`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover/btn:scale-110 group-hover/btn:bg-white group-hover/btn:text-black text-white transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[32px] sm:text-[38px] translate-x-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium tracking-wide text-white/90 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Watch Client Story • {duration}
              </span>
            </button>

            {/* Floating Top Left Metric Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 shadow-lg">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Verified Result</div>
                <div className="text-lg font-black tracking-tight text-white leading-tight">{metric}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Story & Impact Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-[#0e0e16]/80 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              {/* Apple-style pill kicker */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-300 mb-4">
                Client Case Study
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug mb-4">
                {headline}
              </h3>

              <div className="relative mb-6">
                <p className="text-neutral-300 text-[14.5px] sm:text-[15.5px] leading-relaxed italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              {/* Key Highlights Pill Row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[12px] font-medium bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-lg">
                  YouTube Long-Form
                </span>
                <span className="text-[12px] font-medium bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-lg">
                  Retention Hooks
                </span>
                <span className="text-[12px] font-medium bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-lg">
                  Funnel VSL
                </span>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-white/10 overflow-hidden">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={clientName} width={44} height={44} className="object-cover" />
                  ) : (
                    clientName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{clientName}</h4>
                  <p className="text-xs text-neutral-400">
                    {clientRole}, <span className="text-white/80">{companyName}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
              >
                Watch story
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {isPlaying && (
        <VideoModal
          id={videoId || "mHOLzwe4sMQ"} // Defaults to client video sample if videoId is pending
          title={`${clientName} Case Study Video`}
          onClose={() => setIsPlaying(false)}
        />
      )}
    </>
  );
}
