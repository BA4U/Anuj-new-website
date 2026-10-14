"use client";

import { useState } from "react";
import YtThumb from "@/components/YtThumb";
import VideoModal from "@/components/VideoModal";

export default function VideoTile({
  id,
  title,
  client,
  vertical = false,
}: {
  id: string;
  title: string;
  client: string;
  vertical?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="reveal group block w-full card-glow spotlight p-0 text-center focus-visible:outline-none"
        aria-label={`Play ${title}`}
      >
        <div className={`relative w-full overflow-hidden bg-surface-container ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
          <YtThumb id={id} alt={title} vertical={vertical} className="transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1060]/55 via-transparent to-transparent" />
          <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-[26px] ml-0.5">play_arrow</span>
          </span>
        </div>
        <div className="p-4 md:p-5">
          <p className="label mb-1.5 !text-[10.5px]">{client}</p>
          <h3 className="text-[15.5px] font-semibold text-on-surface leading-snug">{title}</h3>
        </div>
      </button>
      {open && <VideoModal id={id} vertical={vertical} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
