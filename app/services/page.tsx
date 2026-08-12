import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Anuj Mishra",
  description: "Expert services in high-retention video editing, AI-powered social media management, and performance paid media (Google Ads & LinkedIn).",
};

export default function ServicesPage() {
  const whyWorkWithMe = [
    {
      title: "Content Creator Roots",
      desc: "Starting as a YouTube creator, I learned first-hand what makes content click. This foundational experience drives my audience-first approach to every project.",
      icon: "movie",
    },
    {
      title: "Video Editing Mastery",
      desc: "Years of refining my craft in Descript and DaVinci Resolve allow me to transform raw footage into high-retention stories that capture and hold attention.",
      icon: "content_cut",
    },
    {
      title: "SMM & Lead Gen Strategist",
      desc: "Evolving into a full-stack strategist, I now combine AI-powered management with performance ads to turn views into measurable business growth.",
      icon: "trending_up",
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow top-12 left-1/4"></div>

      {/* Hero Section */}
      <section className="mb-20 text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Solutions & Growth Services
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Maximizing Reach & <br />
          <span className="gradient-text">Revenue</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          I help creators & brands maximize reach and revenue with expert video editing in Descript, YouTube channel management, and conversion-focused design. I create content that connects, strategies that scale.
        </p>
      </section>

      {/* Why Work With Me */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-on-surface mb-3">Your Growth, My Expertise</h2>
          <p className="text-on-surface-variant text-base">Why Work With Me? 👇</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyWorkWithMe.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        {/* Service 1: AI-Powered Social Media Management (Large Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row gap-8 items-center hover:-translate-y-1 transition-all">
          <div className="flex-1">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">
              AI-Powered Social Media Management
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">
              Leveraging cutting-edge AI workflows and strategic content calendars to automate growth while maintaining a human touch in community engagement.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                AI Workflows
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Content Calendars
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Automation
              </span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary/40 text-7xl">
              auto_awesome
            </span>
          </div>
        </div>

        {/* Service 2: Expert Video Editing (Small Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">movie_edit</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Expert Video Editing</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              High-end post-production using Descript, DaVinci Resolve, and CapCut. Specialized in high-retention Reels, Shorts, and long-form Podcasts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Descript
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              DaVinci
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              CapCut
            </span>
          </div>
        </div>

        {/* Service 3: Paid Media (Small Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div>
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">ads_click</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">High-Performance Paid Media</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Precision-targeted Google Ads and LinkedIn Ads campaigns designed specifically for lead generation and high-intent conversions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Google Ads
            </span>
            <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Lead Gen
            </span>
          </div>
        </div>

        {/* Service 4: Digital Solutions (Large Span) */}
        <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row-reverse gap-8 items-center hover:-translate-y-1 transition-all">
          <div className="flex-1">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Digital Solutions</h3>
            <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">
              AI-powered workflows, Website & Mobile App development. I help creators and businesses grow by tailoring every service to boost your success.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                AI Workflows
              </span>
              <span className="bg-secondary-fixed text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full">
                Web Dev
              </span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary/40 text-7xl">
              devices
            </span>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="glass-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white border border-indigo-900/50 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Let&apos;s Build Your Strategy Today</h2>
        <p className="text-indigo-200 text-base mb-8 max-w-xl mx-auto">
          Reach out for a free consultation on how we can optimize your video retention and marketing pipeline.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-8 py-3.5 rounded-full hover:bg-indigo-50 transition-all shadow-lg hover:scale-105"
        >
          Book Consultation
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </section>
    </div>
  );
}
