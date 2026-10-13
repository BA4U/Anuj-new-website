import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Ways to Work Together",
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
      desc: "Refining my craft in Descript and DaVinci Resolve allows me to transform raw footage into high-retention stories that capture and hold attention.",
      icon: "content_cut",
    },
    {
      title: "SMM & Lead Gen Strategist",
      desc: "Evolving into a full-stack strategist, I now combine AI-powered management with performance ads to turn views into measurable business growth.",
      icon: "trending_up",
    },
  ];

  const catalogServices = [
    {
      title: "Professional Video Editing",
      icon: "movie",
      desc: "Transform your raw footage into engaging, high-quality videos with professional audio editing, B-Rolls, transitions, and effects.",
      features: ["High-retention editing", "Color grading & styling", "Sound design & noise reduction", "Subtitles & captions"]
    },
    {
      title: "Canva Graphic Design",
      icon: "palette",
      desc: "Eye-catching, click-worthy thumbnail designs created in Canva that boost your CTR and attract viewers to your content.",
      features: ["Click-worthy thumbnails", "YouTube channel banners", "Social media templates", "Certificates & invitations"]
    },
    {
      title: "Descript Master Tutoring",
      icon: "school",
      desc: "Master Descript and streamline your workflow with customized 1-on-1 coaching sessions tailored to your skill level.",
      features: ["1-on-1 personalized sessions", "Workflow automation coaching", "Advanced editing tricks", "Descript setup & template creation"]
    },
    {
      title: "YouTube Channel Management",
      icon: "analytics",
      desc: "Complete management of your YouTube channel including editing, SEO optimization, publishing and community engagement.",
      features: ["End-to-end channel SMM", "SEO & description optimization", "CTR & Thumbnail strategy", "Comment & community management"]
    },
    {
      title: "YouTube Channel Audit",
      icon: "fact_check",
      desc: "Comprehensive analysis of your channel's performance, SEO, and audience engagement with actionable recommendations.",
      features: ["CTR & retention diagnostics", "Competitor analysis", "Hook & pacing critique", "Growth strategy blueprint"]
    },
    {
      title: "Google Ads & YouTube Campaigns",
      icon: "ads_click",
      desc: "Strategic campaign setup and optimization for YouTube Ads & Google Ads to maximize reach, engagement, and conversions.",
      features: ["Google & YouTube Ads setup", "Audience targeting selection", "Ad copy & creative review", "ROI tracking & analytics dashboard"]
    }
  ];

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow top-12 left-1/4"></div>
      <div className="ambient-glow-2 bottom-1/4 right-1/4"></div>

      {/* Hero Section */}
      <section className="mb-20 text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Solutions & Growth Services
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold text-on-surface mb-6 leading-tight">
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
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Why Me</p>
          <h2 className="text-3xl font-bold text-on-surface mb-3">Your Growth, My Expertise</h2>
          <p className="text-on-surface-variant text-base">What makes the difference when you work with me.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyWorkWithMe.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between"
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
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Core Solutions</p>
          <h2 className="text-3xl font-bold text-on-surface mb-3">Premium Focus Areas</h2>
          <p className="text-on-surface-variant text-base">Integrated strategies for modern businesses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Service 1: AI-Powered Social Media Management (Large Span) */}
          <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row gap-8 items-center transition-all border border-outline-variant/30">
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
            <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent p-5 flex flex-col justify-between border border-outline-variant/30">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Auto-Scheduler</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+340% Reach</span>
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-white/80 rounded border border-outline-variant/20 px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[9px] font-semibold text-on-surface">30 LinkedIn Posts generated</span>
                </div>
                <div className="h-6 w-[85%] bg-white/80 rounded border border-outline-variant/20 px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span className="text-[9px] font-semibold text-on-surface">YouTube SMM Calendar synced</span>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="material-symbols-outlined text-primary/60 text-5xl">auto_awesome</span>
              </div>
            </div>
          </div>

          {/* Service 2: Expert Video Editing (Small Span) */}
          <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between transition-all border border-outline-variant/30">
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
          <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-4 flex flex-col justify-between transition-all border border-outline-variant/30">
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
          <div className="glass-card rounded-3xl p-8 md:p-10 md:col-span-8 flex flex-col md:flex-row-reverse gap-8 items-center transition-all border border-outline-variant/30">
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
            <div className="flex-1 w-full relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent p-5 flex flex-col justify-between border border-outline-variant/30">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Custom App/Web Dev</span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Responsive</span>
              </div>
              <div className="relative w-full h-24 mt-2">
                <div className="absolute top-0 left-0 w-[70%] h-20 bg-white/95 rounded-lg border border-outline-variant/20 shadow p-1.5 space-y-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-red-400"></div>
                    <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                    <div className="w-1 h-1 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-1.5 w-[60%] bg-purple-500/20 rounded"></div>
                  <div className="h-1.5 w-[40%] bg-indigo-500/20 rounded"></div>
                </div>
                <div className="absolute bottom-0 right-2 w-[35%] h-16 bg-white/95 rounded-md border border-outline-variant/30 shadow-md p-1 space-y-1 z-10">
                  <div className="w-full h-1 bg-outline-variant/40 rounded-full"></div>
                  <div className="h-2 w-full bg-purple-500/20 rounded"></div>
                  <div className="h-2 w-[70%] bg-indigo-500/20 rounded"></div>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="material-symbols-outlined text-purple-600/60 text-5xl">devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Catalog */}
      <section className="mb-24 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Service Catalog</p>
          <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-3">Granular Offerings</h2>
          <p className="text-on-surface-variant text-base">Select standard services you can book immediately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogServices.map((service, idx) => (
            <div key={idx} className="group glass-card rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between border border-outline-variant/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="border-t border-outline-variant/30 pt-4 mb-6">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">What&apos;s Included:</p>
                  <ul className="space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-emerald-500 text-sm font-bold">check</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link 
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-surface hover:bg-primary hover:text-white border border-outline-variant text-on-surface font-semibold py-3 rounded-xl transition-all shadow-sm"
              >
                Book Service <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Need Custom Section */}
      <section className="glass-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden  shadow-2xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Need a Custom Solution?</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
          If you don&apos;t see exactly what you need, or require a tailored package that combines multiple services, let&apos;s build a personalized strategy together.
        </p>
        <Link
          href="/contact?type=custom"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-lg"
        >
          Book Consultation
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </section>
    </div>
  );
}
