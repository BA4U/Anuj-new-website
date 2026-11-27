"use client";

import React, { useState } from "react";
import Image from "next/image";
import YtThumb from "@/components/YtThumb";

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
  tags?: string[];
  categoryLabel?: string;
}

export default function VideoTestimonial({
  videoId = "TbP5kY8BXUI",
  thumbnailUrl,
  clientName = "Client Case Study",
  clientRole = "Founder & YouTube Creator",
  companyName = "AI & Tutorial Channel",
  avatarUrl = "",
  headline = "Got $50,000 Client Deals Directly from YouTube",
  quote = "Consistent editing, clear packaging, and retention-focused storytelling turned educational AI and tutorial videos into $50,000 in inbound client deals.",
  tags = ["YouTube Tutorials & AI", "Thumbnail Packaging", "+$50K Inbound Deals"],
  categoryLabel = "YouTube Tutorial & AI Case Study",
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVideoId = videoId || "TbP5kY8BXUI";

  return (
    <div className="relative group rounded-[28px] overflow-hidden border border-black/[0.08] bg-[#0c0c12] text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_28px_80px_-20px_rgba(73,54,230,0.35)]">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/40 transition-colors duration-700" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Video Preview / Inline Player column (7 cols) */}
        <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:min-h-[420px] bg-black overflow-hidden flex items-center justify-center">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title={`${clientName} — ${headline}`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group/btn focus:outline-none"
              aria-label={`Play client testimonial: ${headline}`}
            >
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-center opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <YtThumb
                  id={activeVideoId}
                  alt={headline}
                  className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              )}

              {/* Subtle gradient for play button contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover/btn:bg-black/10 transition-colors" />

              {/* Minimal Glass Play Button */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/55 backdrop-blur-md border border-white/35 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover/btn:scale-110 group-hover/btn:bg-white group-hover/btn:text-black text-white transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[34px] sm:text-[40px] translate-x-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Testimonial Story & Impact Column (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-[#0e0e16]/85 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-300 mb-4">
              {categoryLabel}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug mb-4">
              {headline}
            </h3>

            <div className="relative mb-6">
              <p className="text-neutral-300 text-[14.5px] sm:text-[15.5px] leading-relaxed italic">
                &ldquo;{quote}&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span key={tag} className="text-[12px] font-medium bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-lg">
                  {tag}
                </span>
              ))}
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

            {!isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
              >
                Play video
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
