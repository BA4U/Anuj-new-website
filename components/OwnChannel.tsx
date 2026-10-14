"use client";

import { useState } from "react";
import YtThumb from "@/components/YtThumb";
import VideoModal from "@/components/VideoModal";

const CHANNEL_URL = "https://www.youtube.com/channel/UCAX9oJpQqhRKFk4lsU7dBLg";

const SHORTS = [
  { id: "2WBQik0I4IA", title: "Claude Code Can Now Stop Itself Deleting Your Files" },
  { id: "HCS5bgxMezg", title: "Stop Hitting Your Claude Code Limit (3 Free Plugins)" },
  { id: "H_no5JD5D4o", title: "Claude Code Forgets Everything (Free 1-Command Fix)" },
  { id: "AwoeQOGTT1g", title: "Run 125B Model Free: Strata AI Engine" },
];

const PIPELINE = ["Scripting", "Voiceover", "Editing", "Publishing"];

export default function OwnChannel() {
  const [open, setOpen] = useState<(typeof SHORTS)[number] | null>(null);
  return (
    <section className="mt-16 md:mt-24">
      <div className="text-center max-w-3xl mx-auto mb-8 flex flex-col items-center">
        <p className="eyebrow mb-2">My own channel</p>
        <h2 className="text-[26px] sm:text-[32px] md:text-[44px] display text-on-surface mb-3 md:whitespace-nowrap">
          Rationale Hub runs <span className="gradient-text">on automation.</span>
        </h2>
        <p className="text-[16.5px] text-on-surface-variant leading-relaxed">
          A fully automated channel I built and run. I can set up the same workflow for yours.
        </p>
        <ol className="flex flex-wrap items-center justify-center gap-2 mt-5" aria-label="Automated workflow">
          {PIPELINE.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-primary/[0.08] text-primary text-[13px] font-medium px-3.5 py-1.5">{step}</span>
              {i < PIPELINE.length - 1 && <span className="material-symbols-outlined text-[16px] text-primary/50">arrow_forward</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {SHORTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setOpen(v)}
            className="group card-glow spotlight p-3 flex items-center gap-4 text-left focus-visible:outline-none"
            aria-label={`Play ${v.title}`}
          >
            <span className="relative w-[84px] shrink-0 aspect-[9/16] rounded-xl overflow-hidden bg-surface-container">
              <YtThumb id={v.id} alt="" vertical className="transition-transform duration-700 group-hover:scale-[1.06]" />
              <span className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px] ml-0.5">play_arrow</span>
              </span>
            </span>
            <span className="min-w-0">
              <span className="label block mb-1.5 !text-[10.5px]">Rationale Hub Short</span>
              <span className="block text-[15.5px] font-semibold text-on-surface leading-snug">{v.title}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Visit the channel
        </a>
        <a href="/contact" className="btn btn-dark">
          Automate my channel
        </a>
      </div>

      {open && <VideoModal id={open.id} vertical title={open.title} onClose={() => setOpen(null)} />}
    </section>
  );
}
