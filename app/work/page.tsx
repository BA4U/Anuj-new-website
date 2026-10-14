import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Work | Anuj Mishra",
  description: "Long-form edits, short-form reels, thumbnails, and channel case studies by Anuj Mishra.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Anuj Mishra",
    description: "Long-form edits, short-form reels, thumbnails, and channel case studies.",
    url: "https://anuj4u.in/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Anuj Mishra",
    description: "Long-form edits, short-form reels, thumbnails, and channel case studies.",
  },
};

const categories = [
  { href: "/work/long-form", icon: "movie", label: "Long-form edits", desc: "YouTube episodes, tutorials and podcasts.", count: "16 videos" },
  { href: "/work/short-form", icon: "smartphone", label: "Shorts and Reels", desc: "Vertical clips with a hook in the first second.", count: "10 Shorts" },
  { href: "/work/thumbnails", icon: "image", label: "Thumbnails and graphics", desc: "Thumbnails designed for the click.", count: "25 thumbnails" },
  { href: "/work/case-studies", icon: "analytics", label: "Case studies", desc: "Client stories with real YouTube Studio numbers.", count: "5 clients" },
];

export default function WorkPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <p className="eyebrow mb-4">Work</p>
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] display text-on-surface mb-4">
            Work you can <span className="gradient-text">watch.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed">
            Real videos, thumbnails and results from creators and teams I work with.
          </p>
        </header>

        <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="reveal group card-glow spotlight p-7 md:p-8 text-center flex flex-col items-center">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white flex items-center justify-center mb-4 shadow-[0_14px_30px_-12px_rgba(124,77,240,0.8)]">
                <span className="material-symbols-outlined text-[24px]">{c.icon}</span>
              </span>
              <h2 className="text-[21px] font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">{c.label}</h2>
              <p className="text-[15px] text-on-surface-variant leading-relaxed mb-3">{c.desc}</p>
              <span className="text-[13px] font-medium text-primary inline-flex items-center gap-1">
                {c.count}
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </Link>
          ))}
        </ScrollReveal>

        <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto mt-14 flex flex-col items-center">
          <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-3">Want your channel here?</h2>
          <p className="text-[16px] text-on-surface-variant leading-relaxed mb-7 max-w-lg">Start with an audit of your last 10 videos.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/youtube-funnel" className="btn btn-glow">Audit my channel</Link>
            <Link href="/contact" className="btn btn-secondary">Book a call</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
