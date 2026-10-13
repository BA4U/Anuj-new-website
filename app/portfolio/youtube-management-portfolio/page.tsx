"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function YouTubeManagementPortfolio() {
  return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden min-h-screen">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Header */}
      <div className="mb-16 max-w-4xl pt-6 relative z-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:translate-x-[-4px] transition-transform">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Portfolios</span>
        </Link>
        <h1 className="text-4xl md:text-6xl display text-on-surface mb-4 leading-tight">
          YouTube Channel <span className="gradient-text">Management</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
          End-to-end channel management — editing, publishing, SEO metadata, and performance tracking — to grow your audience and get you monetized faster.
        </p>
      </div>

      {/* Case Study: Tim Cakir */}
      <div className="relative z-10 mb-16">
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Case Study Header */}
          <div className="p-8 md:p-12 border-b border-outline/10">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src="https://anuj4u.in/wp-content/uploads/2025/03/tim-cakir-CHANNEL.png"
                  alt="Tim Cakir"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-on-surface mb-1">Tim Cakir</h2>
                <p className="text-on-surface-variant text-sm mb-3">Empowering founders &amp; business leaders with AI tools</p>
                <a
                  href="https://www.youtube.com/@timcakir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  Visit Channel
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-base max-w-3xl">
              We started with a 15-day trial. Tim was impressed and extended to a long-term arrangement. Through editorial strategy, SEO-optimized metadata, and consistent high-quality editing, his channel went from 9 subscribers to monetized and scaling — in just 4 months.
            </p>
          </div>

          {/* Growth Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-outline/10">
            {[
              { label: "Subscribers Before", value: "9", color: "" },
              { label: "Subscribers After", value: "2,000+", color: "text-green-500" },
              { label: "Views Before", value: "1,121", color: "" },
              { label: "Views After", value: "72,000+", color: "text-green-500" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 md:p-8 border-r border-outline/10 last:border-r-0 text-center">
                <div className={`text-3xl md:text-4xl font-semibold mb-1 ${stat.color || "text-on-surface"}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Analytics Screenshot */}
          <div className="p-8 md:p-12">
            <h3 className="text-xl font-bold text-on-surface mb-6">Verified Analytics (Nov 2024 – Mar 2025)</h3>
            <div className="relative w-full aspect-video max-w-3xl rounded-xl overflow-hidden">
              <Image
                src="https://anuj4u.in/wp-content/uploads/2025/03/Tim-Cakir-YouTube-analytics.png"
                alt="Tim Cakir YouTube Analytics Dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What I Handle */}
      <div className="relative z-10 mb-16">
        <h2 className="text-2xl font-bold text-on-surface mb-8">What I Handle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "movie_edit",
              title: "Video Editing",
              desc: "Descript for speech-based editing and DaVinci Resolve for animations, b-rolls, and premium transitions."
            },
            {
              icon: "publish",
              title: "SEO Publishing",
              desc: "Click-optimised titles, high-CTR thumbnails, and SEO tags targeting US search intent and high-value keywords."
            },
            {
              icon: "bar_chart",
              title: "Performance Tracking",
              desc: "Monitoring the first 48-hour lifecycle of each video and pivoting metadata based on real retention data."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">{item.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-on-surface mb-3">Ready to grow your channel?</h2>
        <p className="text-on-surface-variant mb-8 text-sm">Let&apos;s build a strategy that gets you to monetization faster.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg transition-transform"
        >
          Book a Free Call
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
        </Link>
      </div>
    </div>
  );
}
