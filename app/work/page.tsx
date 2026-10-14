import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import YtThumb from "@/components/YtThumb";
import OwnChannel from "@/components/OwnChannel";

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
  { href: "/work/long-form", label: "Long-form edits", desc: "YouTube episodes, tutorials and podcasts.", count: "16 videos", kind: "long" },
  { href: "/work/short-form", label: "Shorts and Reels", desc: "Vertical clips with a hook in the first second.", count: "10 Shorts", kind: "short" },
  { href: "/work/thumbnails", label: "Thumbnails and graphics", desc: "Thumbnails designed for the click.", count: "25 thumbnails", kind: "thumb" },
  { href: "/work/case-studies", label: "Case studies", desc: "Client stories with real YouTube Studio numbers.", count: "5 clients", kind: "case" },
] as const;

function Preview({ kind }: { kind: (typeof categories)[number]["kind"] }) {
  const box = "relative rounded-lg overflow-hidden shadow-lg bg-surface-container";
  if (kind === "long")
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-2.5 px-4 bg-gradient-to-br from-[#efe9ff] to-[#dcd0ff]">
        {["mHOLzwe4sMQ", "pcfFzxnhwUE", "y11b_rVHcyg"].map((id, i) => (
          <div key={id} className={`${box} aspect-video w-[34%] ${i === 1 ? "scale-110 z-10" : ""}`}>
            <YtThumb id={id} alt="" className="transition-transform duration-700 group-hover:scale-[1.06]" />
          </div>
        ))}
      </div>
    );
  if (kind === "short")
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gradient-to-br from-[#2b1a6b] to-[#6d3fe0]">
        {["dD3jLdx2k7A", "TJR9l12hN0I", "klcoy936_mo"].map((id, i) => (
          <div key={id} className={`${box} h-[80%] aspect-[9/16] ${i === 1 ? "scale-110 z-10" : ""}`}>
            <YtThumb id={id} alt="" vertical className="transition-transform duration-700 group-hover:scale-[1.06]" />
          </div>
        ))}
      </div>
    );
  if (kind === "thumb")
    return (
      <div className="absolute inset-0 grid grid-cols-2 gap-1.5 p-1.5 bg-gradient-to-br from-[#efe9ff] to-[#dcd0ff]">
        {["chatgpt-connectors-explained", "top-5-gpts-worth-50k", "claude-zapier-automate-everything", "custom-gpt-without-coding"].map((slug) => (
          <div key={slug} className="relative rounded-md overflow-hidden">
            <Image src={`/thumbnails/${slug}.webp`} alt="" fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="absolute inset-0 bg-[#0c0c14]">
      <Image src="/proof/365-day-analytics.png" alt="" fill sizes="520px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
    </div>
  );
}

export default function WorkPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <p className="eyebrow mb-2">Work</p>
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] display text-on-surface mb-4">
            Work you can <span className="gradient-text">watch.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed">
            Real videos, thumbnails and results from creators and teams I work with.
          </p>
        </header>

        <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="reveal group card-glow spotlight p-0 text-center">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Preview kind={c.kind} />
              </div>
              <div className="p-6">
                <h2 className="text-[21px] font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors">{c.label}</h2>
                <p className="text-[15px] text-on-surface-variant leading-relaxed mb-3">{c.desc}</p>
                <span className="text-[13px] font-medium text-primary inline-flex items-center gap-1">
                  {c.count}
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        <OwnChannel />

        <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto mt-14 md:mt-20 flex flex-col items-center">
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
