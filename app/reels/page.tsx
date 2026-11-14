import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ShortFormNicheFilter from "@/components/ShortFormNicheFilter";
import { SHORT_FORM } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Reels & Shorts | High-Retention Vertical Videos",
  description: "Engaging short-form reels and YouTube Shorts. Scroll-stopping vertical clips for creators, founders and B2B brands.",
  alternates: { canonical: "/reels" },
  openGraph: {
    title: "Reels & Shorts | Anuj Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
    url: "https://anuj4u.in/reels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reels & Shorts | Anuj Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
  },
};

export default function ReelsPage() {
  return (
    <div className="py-12 px-5 sm:px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-10 pt-6 relative z-10 text-center max-w-3xl mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to all work
        </Link>
        <div className="block">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
            9:16 Vertical Content
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Reels <span className="gradient-text">& Shorts</span>
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Scroll-stopping vertical content for YouTube Shorts, Instagram Reels, and LinkedIn. Filter by niche and click any video to watch.
        </p>
      </section>

      {/* Interactive Niche Filter & Verified Vertical Grid */}
      <section className="relative z-10 mb-16">
        <ShortFormNicheFilter videos={SHORT_FORM} />
      </section>

      {/* CTA Box */}
      <section className="relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/[0.04] to-purple-500/[0.04] border border-primary/20 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need short-form content that converts?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6 max-w-xl mx-auto">
            I cut viral hooks, add dynamic motion captions, and deliver platform-ready 9:16 assets directly from your raw footage or long-form videos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact?service=production-pod"
              className="btn btn-primary"
            >
              Get Short-Form Content
            </Link>
            <Link
              href="/pricing"
              className="btn btn-secondary"
            >
              View Pricing Tiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
