import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import WorkShell from "@/components/WorkShell";
import VideoTile from "@/components/VideoTile";
import ScrollReveal from "@/components/ScrollReveal";
import { DEMO_LAUNCH_VIDEOS } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Demo & Product Launch Videos | SaaS Walkthroughs & Launch Films",
  description:
    "High-converting SaaS product walkthroughs, feature demos, and launch videos engineered for Product Hunt, website hero sections, and investor excitement by Anuj Mishra.",
  alternates: { canonical: "/work/demo-videos" },
  openGraph: {
    title: "Demo & Product Launch Videos | Anuj Mishra",
    description: "SaaS walkthroughs, interactive feature demos, and launch videos that convert.",
    url: "https://anuj4u.in/work/demo-videos",
    type: "website",
  },
};

const LAUNCH_FEATURES = [
  {
    icon: "animation",
    title: "Sleek UI Zoom Physics",
    desc: "No boring static screen captures. Dynamic pan-and-zooms, cursor smoothing, and mockups focus the viewer's eyes exactly where the magic happens.",
  },
  {
    icon: "timer",
    title: "The 5-Second Hook",
    desc: "Grab busy prospects immediately with the core problem and payoff before diving into the solution, keeping retention high from second one.",
  },
  {
    icon: "devices",
    title: "Multi-Platform Asset Kit",
    desc: "One production yields full-length 16:9 website hero videos, 60s vertical cuts for X/Reels, and high-impact GIF loops for email campaigns.",
  },
  {
    icon: "volume_up",
    title: "Pro Sound Design",
    desc: "Subtle tactile UI clicks, swooshes, and custom background scoring that make software interactions feel satisfying and premium.",
  },
];

export default function DemoVideosPage() {
  return (
    <WorkShell
      pill="Product Media"
      title="Demo &"
      accent="product launch videos."
      desc="High-converting SaaS walkthroughs, feature demos, and launch assets engineered to turn visitors into active users."
      ctaTitle="Launching a product or major feature?"
      ctaText="Let's build a launch video that turns your software into an irresistible experience."
    >
      {/* Visual Hero Showcase Card */}
      <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-[28px] overflow-hidden mb-16 border border-white/70 shadow-[0_25px_60px_-15px_rgba(73,54,230,0.35)] group bg-neutral-950">
        <Image
          src="/brand/saas-demo-showcase.jpg"
          alt="SaaS Product Demo and Launch Film Production"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 z-10">
          <div>
            <span className="px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-primary/80 backdrop-blur-md text-white border border-white/20 inline-block mb-2 shadow-sm">
              Product Hunt &amp; Website Hero Ready
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dynamic UI Zoom Physics &amp; Launch Films
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mt-1">
              Converting complex software features into cinematic, high-retention product walkthroughs.
            </p>
          </div>
          <Link
            href="/contact?intent=demo"
            className="btn btn-primary self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg shadow-primary/30"
          >
            Request a Demo Video
          </Link>
        </div>
      </div>

      {/* Featured Video Showcase */}
      <section className="mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Real Client Demos & Tours
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-bold text-on-surface tracking-tight">
            Live Software Demos & Walkthroughs
          </h2>
          <p className="text-[15px] sm:text-[16px] text-on-surface-variant mt-2">
            Click any demo to watch how complex features are transformed into clear, engaging visual workflows.
          </p>
        </div>

        <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {DEMO_LAUNCH_VIDEOS.map((v) => (
            <div key={v.id} className="relative flex flex-col justify-between">
              <VideoTile {...v} />
              <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant px-1">
                <span className="inline-flex items-center gap-1.5 font-medium text-primary bg-primary/[0.07] px-2.5 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
                  {v.niche}
                </span>
                <span className="font-mono text-neutral-500">{v.duration}</span>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* Launch Architecture Breakdown */}
      <section className="mb-16 md:mb-24 rounded-3xl bg-neutral-900/[0.03] border border-neutral-900/[0.08] p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-2">The Launch Anatomy</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Engineered for <span className="gradient-text">conversion, not just aesthetics.</span>
          </h3>
          <p className="text-on-surface-variant text-sm sm:text-base mt-2">
            Every second of a demo video must either build curiosity, explain value, or remove buying friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAUNCH_FEATURES.map((feat) => (
            <div key={feat.title} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-black/[0.06] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
              </div>
              <h4 className="font-bold text-[16px] text-on-surface mb-2">{feat.title}</h4>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready for User Samples Callout */}
      <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-purple-500/[0.04] p-8 sm:p-10 text-center max-w-3xl mx-auto">
        <span className="material-symbols-outlined text-3xl text-primary mb-2">rocket_launch</span>
        <h4 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">
          Have your product recording ready?
        </h4>
        <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed max-w-xl mx-auto">
          Send over your Figma prototype, Loom walkthrough, or raw screen capture. I will script the hook, animate the UI, and deliver a launch-ready video package.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact?service=demo" className="btn btn-primary">
            Request Demo Video Scope
          </Link>
          <Link href="/services#pricing" className="btn btn-secondary">
            View Services &amp; Pricing
          </Link>
        </div>
      </section>
    </WorkShell>
  );
}
