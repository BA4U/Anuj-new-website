"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SHOTS = [
  { src: "/proof/365-day-analytics.png", label: "365-day analytics" },
  { src: "/proof/thumbnail-ctr.png", label: "Thumbnail click-through rate" },
  { src: "/proof/90-day-performance.png", label: "90-day performance" },
  { src: "/proof/thumbnail-ctr-2.png", label: "Thumbnail click-through rate" },
  { src: "/proof/organic-impressions.png", label: "Organic impressions" },
  { src: "/proof/28-day-analytics.png", label: "Last 28 days" },
  { src: "/proof/us-audience.png", label: "Audience" },
];

const INTERVAL = 2500;

/** Real YouTube Studio screenshots that advance every 2.5 seconds. Hover pauses. */
export default function CaseShots() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SHOTS.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <div
      className="max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="card-glow p-2 md:p-3">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0c14]">
          {SHOTS.map((s, n) => (
            <Image
              key={s.src}
              src={s.src}
              alt={`YouTube Studio: ${s.label}`}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className={`object-contain transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
              priority={n === 0}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {SHOTS.map((s, n) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show ${s.label}`}
            onClick={() => setI(n)}
            className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-primary" : "w-2 bg-primary/25"}`}
          />
        ))}
      </div>
      <p className="text-center text-[13px] text-on-surface-variant mt-3">{SHOTS[i].label}</p>
    </div>
  );
}
