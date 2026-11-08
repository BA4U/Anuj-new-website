"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VideoTestimonial from "@/components/VideoTestimonial";

interface Testimonial {
  name: string;
  role: string;
  niche: string;
  platform: string;
  photo: string;
  quote: string;
  outcome: string;
  deliverables: string[];
  fallbackPhoto: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Victor Chan",
    role: "YouTuber & Founder, Launch Excel",
    niche: "Spreadsheet & Productivity Training",
    platform: "YouTube (@LaunchExcel)",
    photo: "victor-chan",
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever.",
    outcome: "+$50,000 Client Pipeline",
    deliverables: ["Long-form YouTube Edits", "Sales VSL Production", "Thumbnail Packaging"],
    fallbackPhoto:
      "https://yt3.googleusercontent.com/kYYcUQ3rCa-g8_1k1tvnrnf9AVAU1upq2EK-6j8q1U0JD54XjQ7STYeMAa1W6i_YBkoZwNXSMAQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Harjeet Dhillon",
    role: "Canadian Actress, Author & Podcast Host",
    niche: "Personal Growth & Inspirational Talks",
    platform: "Video Podcast & YouTube",
    photo: "harjeet-dhillon",
    quote:
      "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of software and has guided me more than I could ever hope for with setting up my podcast. He has a solid work ethic and is awesome at receiving feedback.",
    outcome: "Complete Podcast Launch",
    deliverables: ["Podcast Architecture", "Dynamic Video Editing", "High-Contrast Thumbnails"],
    fallbackPhoto:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ",
  },
  {
    name: "Dr. Maurice Maurer",
    role: "PhD in Computational Physics · Founder, Training Scientists",
    niche: "STEM & Machine Learning Education",
    platform: "YouTube (@trainingscientists)",
    photo: "maurice-maurer",
    quote:
      "I hired Anuj to do video editing and graphic design work for my YouTube channel. He did an excellent job, always responds very quickly and produces great results. I am very happy working with him and will continue to do so in the future.",
    outcome: "High-Retention Technical Edits",
    deliverables: ["Complex Python Code Edits", "2D Data Visualizations", "Thumbnail Design"],
    fallbackPhoto:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ6INETUPr4mfcMG6fzakgmVe5e0s0KvLX5o9-bovSubFnxmIk9lm30G7Ll4D6BdJK7ytOohIo7vBYXU2GMvrqiEEmvbG2xvd4HAv2BiMhpjz3Gh-edOo3E3tJgdnPaFhtPMXA3hqMQ6HJM_Dj0YDOq517NWpHXYbHIQ7cNvICkULHA7Y1P5DdAK24q-lcIRCF2yHsMw0clQk7pKVik8UrA0Kp4AEBB7E9l-mmVaAzSsasp7CGmeZDg",
  },
  {
    name: "Blake Reddy",
    role: "Private Client Wealth Adviser",
    niche: "High-Net-Worth Advisory & Finance",
    platform: "Executive Video Podcast",
    photo: "blake-reddy",
    quote:
      "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend. Thank you Anuj!",
    outcome: "Automated Production System",
    deliverables: ["Custom Layout Templates", "Audio & Visual Master", "Brand Cohesion"],
    fallbackPhoto:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcV5YGRB486ybQ9zwbwu0Ihd1rDTcA1kf0hwynkmwEXSqTX_79g7gIDH2nZ8y2C5BQz8-bmX9SUCHmwklbnNosL59RHW49XgZpUMfaw7lthcJ4jGoOCpOker1OCanqdNjv7CyOaM_PJ4IxgIsk9uAXdxu0A6MrrK5NhtnhOj6BGFYv5NDx0iIr3LJ4dapkVvKiPUUFDWo9323rCyOH5QneWioGae6YJMew3Ch6Dw0DebyQ3i7jed8hrQ",
  },
  {
    name: "Tim Cakir",
    role: "Growth Consultant & AI Tech Creator",
    niche: "AI Tools, Automation & Notion",
    platform: "YouTube (@timcakir)",
    photo: "tim-cakir",
    quote:
      "Anuj understands YouTube retention better than most editors. He doesn't just cut clips—he structures the video so viewers stay hooked all the way through. Fast turnaround and zero back-and-forth.",
    outcome: "Tech & AI Channel Scaling",
    deliverables: ["Retention Pacing", "On-Screen Graphics", "CTR Thumbnail Testing"],
    fallbackPhoto: "",
  },
  {
    name: "Eric Presnall",
    role: "Founder, VideoRep · On-Camera Host",
    niche: "Video Creation & Creator Brand Building",
    platform: "Short-Form (Reels & Shorts)",
    photo: "eric-presnall",
    quote:
      "The first 3 seconds of short-form decide everything. Anuj knows how to craft visual hooks, dynamic pacing, and crisp sound effects that stop people from scrolling past.",
    outcome: "High-Retention Short-Form",
    deliverables: ["Scroll-Stopping Hooks", "Fast-Cut Pacing", "Engaging Captions"],
    fallbackPhoto: "",
  },
];

const PROOF_SHOTS = [
  {
    src: "/proof/28-day-analytics.png",
    title: "28-Day Channel Momentum",
    metric: "40.2K+ Views",
    caption: "Consistent watch time compounding across uploads with optimized retention structure.",
  },
  {
    src: "/proof/90-day-performance.png",
    title: "90-Day Scaling Curve",
    metric: "128K+ Total Impressions",
    caption: "Browse features and suggested video distribution unlocked through steady high AVD.",
  },
  {
    src: "/proof/thumbnail-ctr.png",
    title: "Click-Through Rate Packaging",
    metric: "10.4% Avg CTR",
    caption: "High-contrast visual design and curiosity framing that out-clicks competing videos.",
  },
  {
    src: "/proof/google-ads-growth.png",
    title: "Paid Ads & Conversion Growth",
    metric: "3.8x ROAS",
    caption: "Targeted video ad campaigns driving qualified high-intent leads to sales pipelines.",
  },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ClientAvatar({ item }: { item: Testimonial }) {
  const [src, setSrc] = useState<string | null>(`/testimonials/${item.photo}.jpg`);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
        {initials(item.name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={item.name}
      className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-primary/20 shadow-md bg-surface-container"
      onError={() => {
        if (item.fallbackPhoto && src !== item.fallbackPhoto) {
          setSrc(item.fallbackPhoto);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}

export default function TestimonialsPage() {
  const [selectedProof, setSelectedProof] = useState<typeof PROOF_SHOTS[0] | null>(null);

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden min-h-screen">
      {/* Ambient background lighting */}
      <div className="ambient-glow top-0 right-1/4 opacity-40 pointer-events-none" />
      <div className="ambient-glow-2 bottom-1/4 left-[-100px] opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="text-center mb-16 max-w-3xl mx-auto pt-6 relative z-10">
        <p className="eyebrow mb-3">Client Feedback</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-6">
          Real creators. <span className="gradient-text">Real channel growth.</span>
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Every testimonial below is from a real client I partner with. Here is what they have to say about
          my editing, retention strategy, communication, and work ethic.
        </p>
      </section>

      {/* Featured Video Testimonial Spotlight */}
      <section className="max-w-4xl mx-auto mb-20 relative z-10">
        <VideoTestimonial />
      </section>

      {/* Section Header: Text Testimonials */}
      <section className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 font-semibold text-xs mb-3">
          <span className="material-symbols-outlined text-sm">verified</span>
          Verified Reviews &amp; Client Outcomes
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
          Written Client Testimonials
        </h2>
      </section>

      {/* Comprehensive Grid of Text Testimonials */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-24 relative z-10">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.name}
            className="glass-card rounded-[28px] p-8 md:p-9 relative overflow-hidden border border-outline-variant/40 flex flex-col justify-between hover:shadow-[0_20px_50px_-20px_rgba(73,54,230,0.2)] transition-all duration-300 group"
          >
            {/* Watermark Quote Icon */}
            <span
              className="material-symbols-outlined absolute top-6 right-6 text-7xl text-primary/10 select-none pointer-events-none group-hover:text-primary/15 transition-colors"
              aria-hidden="true"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>

            <div className="relative z-10">
              {/* Star Rating & Outcome Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
                <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[19px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="text-xs font-bold text-on-surface ml-1.5">5.0 Verified</span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t.outcome}
                </span>
              </div>

              {/* Quote Body */}
              <blockquote className="text-on-surface text-[15.5px] md:text-[16.5px] leading-relaxed mb-6 font-normal">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Deliverable Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {t.deliverables.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Profile Footer */}
            <div className="flex items-center gap-4 pt-5 border-t border-outline-variant/30 relative z-10">
              <ClientAvatar item={t} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-on-surface text-base truncate">{t.name}</h3>
                  <span className="material-symbols-outlined text-primary text-base" title="Verified Client">
                    verified
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-medium truncate">{t.role}</p>
                <p className="text-[11px] font-semibold text-primary mt-0.5 truncate">{t.platform}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Verified Analytics & Studio Proof Section */}
      <section className="mb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-2">Verified Proof</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Proof Straight from YouTube Studio
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Real subscriber growth, click-through rates, and retention graphs from channels I work on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROOF_SHOTS.map((shot) => (
            <div
              key={shot.title}
              onClick={() => setSelectedProof(shot)}
              className="glass-card rounded-2xl overflow-hidden border border-outline-variant/40 hover:border-primary/40 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-emerald-400 font-bold text-xs border border-white/10">
                  {shot.metric}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-on-surface text-sm mb-1">{shot.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {shot.caption}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-primary mt-3 flex items-center gap-1 group-hover:underline">
                  Click to inspect proof
                  <span className="material-symbols-outlined text-xs">zoom_in</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof Lightbox Modal */}
      {selectedProof && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-on-surface text-lg">{selectedProof.title}</h3>
                <p className="text-xs text-emerald-600 font-semibold">{selectedProof.metric} Verified</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface transition-colors"
                aria-label="Close proof preview"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-outline-variant/30 mb-4 bg-neutral-950">
              <Image
                src={selectedProof.src}
                alt={selectedProof.title}
                fill
                sizes="800px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">{selectedProof.caption}</p>
          </div>
        </div>
      )}

      {/* CTA Box */}
      <section className="glass-card rounded-3xl p-10 md:p-12 text-center max-w-3xl mx-auto shadow-2xl relative z-10 border border-primary/20">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-on-surface">
          Ready to turn your channel into a reliable growth engine?
        </h3>
        <p className="text-on-surface-variant text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          I partner 1-on-1 with selected creators and founders to handle their entire YouTube editing,
          packaging, and retention engine.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-md text-sm"
          >
            Book a 1-on-1 Strategy Call
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
          <Link
            href="/pricing"
            className="glass-card hover:bg-surface-container text-on-surface font-semibold px-6 py-3.5 rounded-full border border-outline-variant/40 transition-all text-sm"
          >
            View Transparent Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
