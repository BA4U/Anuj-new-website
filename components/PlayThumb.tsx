"use client";

import { useState } from "react";
import YtThumb from "@/components/YtThumb";
import VideoModal from "@/components/VideoModal";

export default function PlayThumb({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${title}`}
        className={`group relative block w-full aspect-video bg-surface-container overflow-hidden ${className}`}
      >
        <YtThumb id={id} alt={title} className="transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[26px] ml-0.5">play_arrow</span>
        </span>
      </button>
      {open && <VideoModal id={id} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
