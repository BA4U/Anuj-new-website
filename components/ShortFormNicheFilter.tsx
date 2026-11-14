"use client";

import React, { useState, useMemo } from "react";
import VideoTile from "@/components/VideoTile";
import type { Vid } from "@/lib/work-data";

interface ShortFormNicheFilterProps {
  videos: Vid[];
}

export default function ShortFormNicheFilter({ videos }: ShortFormNicheFilterProps) {
  const [activeNiche, setActiveNiche] = useState<string>("All Niches");

  const niches = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => {
      if (v.niche) set.add(v.niche);
    });
    return ["All Niches", ...Array.from(set)];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (activeNiche === "All Niches") return videos;
    return videos.filter((v) => v.niche === activeNiche);
  }, [videos, activeNiche]);

  return (
    <div className="space-y-8">
      {/* Niche Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-2">
        {niches.map((niche) => {
          const isSelected = activeNiche === niche;
          const count = niche === "All Niches" 
            ? videos.length 
            : videos.filter((v) => v.niche === niche).length;

          return (
            <button
              key={niche}
              onClick={() => setActiveNiche(niche)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.03]"
                  : "bg-neutral-900/[0.04] text-neutral-600 hover:bg-neutral-900/[0.08] hover:text-neutral-900"
              }`}
            >
              <span>{niche}</span>
              <span
                className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected ? "bg-white/25 text-white" : "bg-neutral-900/[0.06] text-neutral-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
        {filteredVideos.map((v) => (
          <VideoTile key={v.id} {...v} vertical />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant text-sm">
          No short videos found in this niche.
        </div>
      )}
    </div>
  );
}
