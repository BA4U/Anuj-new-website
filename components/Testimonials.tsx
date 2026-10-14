"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Real client testimonials.
 * Photos: drop a square image at /public/testimonials/<photo>.jpg to override the
 * fallback photo below. If neither loads, the initials badge is shown.
 */
const ITEMS = [
  {
    name: "Victor Chan",
    role: "YouTuber & Founder, Launch Excel",
    photo: "victor-chan",
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever.",
    fallback:
      "",
  },
  {
    name: "Harjeet Dhillon",
    role: "Canadian actress & author",
    photo: "harjeet-dhillon",
    quote:
      "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of software and has guided me more than I could ever hope for. He has a solid work ethic and is awesome at receiving feedback.",
    fallback:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ",
  },
  {
    name: "Dr. Maurice Maurer",
    role: "PhD, computational physics · YouTube educator",
    photo: "maurice-maurer",
    quote:
      "I hired Anuj to do video editing and graphic design work for my YouTube channel. He did an excellent job, always responds very quickly and produces great results. I am very happy working with him and will continue to do so in the future.",
    fallback:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ6INETUPr4mfcMG6fzakgmVe5e0s0KvLX5o9-bovSubFnxmIk9lm30G7Ll4D6BdJK7ytOohIo7vBYXU2GMvrqiEEmvbG2xvd4HAv2BiMhpjz3Gh-edOo3E3tJgdnPaFhtPMXA3hqMQ6HJM_Dj0YDOq517NWpHXYbHIQ7cNvICkULHA7Y1P5DdAK24q-lcIRCF2yHsMw0clQk7pKVik8UrA0Kp4AEBB7E9l-mmVaAzSsasp7CGmeZDg",
  },
  {
    name: "Blake Reddy",
    role: "Private client wealth adviser",
    photo: "blake-reddy",
    quote:
      "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend. Thank you Anuj!",
    fallback:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcV5YGRB486ybQ9zwbwu0Ihd1rDTcA1kf0hwynkmwEXSqTX_79g7gIDH2nZ8y2C5BQz8-bmX9SUCHmwklbnNosL59RHW49XgZpUMfaw7lthcJ4jGoOCpOker1OCanqdNjv7CyOaM_PJ4IxgIsk9uAXdxu0A6MrrK5NhtnhOj6BGFYv5NDx0iIr3LJ4dapkVvKiPUUFDWo9323rCyOH5QneWioGae6YJMew3Ch6Dw0DebyQ3i7jed8hrQ",
  },
];

const INTERVAL = 8000; // slow on purpose

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Local photo → remote fallback → initials. */
function Avatar({ item, size }: { item: (typeof ITEMS)[number]; size: number }) {
  const [src, setSrc] = useState<string | null>(`/testimonials/${item.photo}.jpg`);
  const [stage, setStage] = useState(0);
  const style = { width: size, height: size };
  if (!src) {
    return (
      <span
        style={{ ...style, fontSize: size * 0.34 }}
        className="rounded-full bg-gradient-to-br from-primary to-purple-500 text-white font-semibold flex items-center justify-center shrink-0"
      >
        {initials(item.name)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={style}
      className="rounded-full object-cover shrink-0 bg-primary-fixed"
      onError={() => {
        if (stage === 0) {
          setStage(1);
          setSrc(item.fallback);
        } else {
          setSrc(null);
        }
      }}
    />
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || !motion) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % ITEMS.length), INTERVAL);
    return () => clearTimeout(t);
  }, [idx, paused, motion]);

  const cur = ITEMS[idx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Featured quote */}
        <figure className="lg:col-span-8 relative rounded-[28px] p-[1.5px] tm-frame">
          <div className="relative h-full rounded-[27px] bg-white/90 backdrop-blur-xl p-7 sm:p-10 md:p-12 overflow-hidden">
            <div className="aurora aurora-a w-[360px] h-[360px] -top-40 -right-32 opacity-40" />
            <span
              className="material-symbols-outlined absolute top-6 right-8 text-[90px] leading-none text-primary/10 select-none"
              aria-hidden="true"
            >
              format_quote
            </span>

            <div key={idx} className="relative tm-in">
              <div className="flex items-center gap-1 mb-6 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <blockquote className="text-[20px] sm:text-[24px] md:text-[27px] leading-[1.45] font-medium tracking-[-0.01em] text-on-surface min-h-[170px] md:min-h-[200px]">
                &ldquo;{cur.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-8 pt-6 border-t border-primary/10">
                <span className="tm-ring rounded-full p-[3px] shrink-0">
                  <span className="block rounded-full bg-white p-[2px]">
                    <Avatar key={cur.name} item={cur} size={60} />
                  </span>
                </span>
                <span>
                  <span className="block text-[17px] font-semibold text-on-surface">{cur.name}</span>
                  <span className="block text-[14px] text-on-surface-variant">{cur.role}</span>
                </span>
              </figcaption>
            </div>
          </div>
        </figure>

        {/* Selector */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" role="tablist" aria-label="Client testimonials">
          {ITEMS.map((t, i) => {
            const active = i === idx;
            return (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIdx(i)}
                className={`relative overflow-hidden text-left rounded-2xl border px-4 py-3.5 flex items-center gap-3 transition-all duration-500 ${
                  active
                    ? "border-primary/30 bg-gradient-to-br from-primary-fixed/70 to-white shadow-[0_12px_32px_-14px_rgba(73,54,230,0.45)] lg:translate-x-1"
                    : "border-black/[0.07] bg-white/70 hover:bg-white hover:border-primary/20"
                }`}
              >
                <Avatar item={t} size={44} />
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold text-on-surface truncate">{t.name}</span>
                  <span className="block text-[12.5px] text-on-surface-variant truncate">{t.role}</span>
                </span>
                {active && motion && (
                  <span
                    key={`${idx}-${paused}`}
                    className="tm-progress absolute left-0 bottom-0 h-[3px] bg-gradient-to-r from-primary to-purple-400"
                    style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </button>
            );
          })}
          <Link
            href="/testimonials"
            className="text-[13.5px] font-medium text-primary hover:text-primary-container inline-flex items-center gap-1 px-1 pt-1"
          >
            Read all client stories
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
