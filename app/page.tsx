"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { AbTest } from "@/components/AbTest";

export default function Home() {
  const coreTags = [
    "Video Editing",
    "SMM",
    "Google & LinkedIn Ads",
    "AI Tools & Automation",
  ];

  const marqueeRef = useRef<HTMLElement>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setMarqueePaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden -mt-20">
      {/* Background ambient light */}
      <div className="ambient-glow -top-24 -left-24"></div>
      <div className="ambient-glow-2 top-1/2 -right-24"></div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 flex flex-col justify-center pt-32 pb-16 overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Left Column */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 leading-tight tracking-tight">
              Videos that hook.{" "}
              <span className="gradient-text drop-shadow-sm">Strategy that scales.</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              I&apos;m Anuj — a video editor and growth marketer who helps creators and brands turn content into real revenue. No templates, no fluff.
            </p>

            {/* CTA Buttons — A/B tested: portfolio (A) vs LinkedIn funnel (B) */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <AbTest
                experiment="hero_cta"
                variantA={
                  <Link
                    href="/portfolio"
                    className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    See my work
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                }
                variantB={
                  <Link
                    href="/linkedin-funnel"
                    className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    Get your content plan
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                }
              />
              <Link
                href="/contact"
                className="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 text-on-surface font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:scale-105"
              >
                Get in touch
              </Link>
            </div>

            {/* Core Expertise Tags */}
            <div className="pt-8 border-t border-outline-variant/40">
              <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-4">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {coreTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-surface-container-lowest/60 border border-outline-variant/40 px-4 py-2 rounded-full text-xs font-semibold text-on-surface shadow-sm backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Portrait */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              
              {/* Floating Icons */}
              <div className="absolute flex -left-2 sm:-left-3 md:-left-6 top-6 sm:top-10 w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 animate-bounce p-1.5 sm:p-2 md:p-3 border border-indigo-100" style={{ animationDuration: "3s" }}>
                <span className="material-symbols-outlined text-red-600 text-lg sm:text-xl md:text-2xl">smart_display</span>
              </div>

              <div className="absolute flex -right-1 sm:-right-2 md:-right-4 top-1/3 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-blue-100">
                <span className="material-symbols-outlined text-blue-600 text-lg sm:text-xl md:text-2xl">work</span>
              </div>

              <div className="absolute flex left-1 sm:left-0 md:left-4 bottom-16 sm:bottom-20 md:bottom-12 w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-purple-100 animate-pulse">
                <span className="material-symbols-outlined text-purple-600 text-lg sm:text-xl md:text-2xl">auto_awesome</span>
              </div>

              {/* Main Portrait Card */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60 bg-white/40">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVgUM1CPI-chpiQnnacQOAazwKAIf2X5MgiRD1canwHi3-PNyeCAN1VYG06tYjQXLskeEt_ktPsUvDxxN_L9Ohk4yupNmlg-bnC10qZyeDx8ECQZEKVtWU5uq9eVhCx-qcTE5wosJfkt6NTN6fw9c2ZtGqxAoEYBnAnJcnKUPeyciq0_zM4K1C4Dtx2W0MJQ8MRGsfWMx0jiAQKjKTIiW7Jelor9RbkB7lzUza283dH10yzGnlDwkwt3iQtBL7DGOtn_1Z9OgjKUy2mg"
                    alt="Professional portrait of Anuj Mishra"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">Anuj Mishra</h4>
                        <p className="text-xs text-on-surface-variant">Video Editor & Growth Marketer</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── TESTIMONIALS MARQUEE ─── */}
      <ScrollReveal>
        <section
          ref={marqueeRef}
          data-marquee-paused={marqueePaused ? "true" : "false"}
          className="py-16 bg-surface overflow-hidden border-b border-outline-variant/30"
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-10">
            <div className="text-center w-full">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">What Clients Say</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Words From My Happy Clients</h2>
            </div>
          </div>

          {/* Row 1 — Left to Right */}
          <div className="relative flex overflow-x-hidden group py-4">
            <div className="animate-marquee flex whitespace-nowrap gap-6 px-3 group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. I look forward to working with him some more.&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Victor Chan</h4>
                      <p className="text-xs text-on-surface-variant">YouTuber & Founder</p>
                    </div>
                  </div>
                  
                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;Anuj has been monumental in creating my podcast. He has a solid work ethic and is awesome at receiving feedback. I am so glad I worked with him.&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Harjeet Dhillon</h4>
                      <p className="text-xs text-on-surface-variant">Actress & Author</p>
                    </div>
                  </div>

                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;The quality of edits and strategic inputs on content packaging have significantly boosted our channel retention. Creative, innovative, and brilliant ideas.&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Dr. Maurice Maurer</h4>
                      <p className="text-xs text-on-surface-variant">Science Educator</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
          </div>
          
          {/* Row 2 — Right to Left */}
          <div className="relative flex overflow-x-hidden group py-4">
            <div className="animate-marquee-reverse flex whitespace-nowrap gap-6 px-3 group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend!&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Blake Reddy</h4>
                      <p className="text-xs text-on-surface-variant">Private Client Wealth Adviser</p>
                    </div>
                  </div>
                  
                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever. Highly recommend for any creator.&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Victor Chan</h4>
                      <p className="text-xs text-on-surface-variant">Founder, Launch Excel</p>
                    </div>
                  </div>

                  <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      &quot;I hired Anuj to do video editing and graphic design work. He did an excellent job and always responds very quickly. I will continue working with him.&quot;
                    </p>
                    <div className="flex flex-col items-center gap-1 pt-4 text-center border-t border-outline-variant/20">
                      <h4 className="font-bold text-on-surface text-sm">Dr. Maurice Maurer</h4>
                      <p className="text-xs text-on-surface-variant">PhD, Computational Physics</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── STATS BAR ─── */}
      <ScrollReveal>
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">100+</h3>
              <p className="text-sm font-medium text-indigo-100">Videos Edited</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">10M+</h3>
              <p className="text-sm font-medium text-indigo-100">Reach Generated</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">12+</h3>
              <p className="text-sm font-medium text-indigo-100">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">5+</h3>
              <p className="text-sm font-medium text-indigo-100">Years Experience</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-20 bg-surface-container-low/60 border-t border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">What I Do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Services Built to Grow Your Brand
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Not just edits and posts — complete systems that turn viewers into paying clients.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="reveal glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">movie_edit</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Video Editing</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  High-retention edits in Descript & DaVinci Resolve. YouTube long-form, Shorts, Reels, VSLs, and podcast episodes — all engineered to keep viewers watching.
                </p>
                <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="reveal glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">AI & Social Management</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  AI-driven content calendars, automated posting workflows, community engagement, and analytics reporting — your entire social presence, handled.
                </p>
                <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="reveal glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">ads_click</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Performance Paid Ads</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Google & LinkedIn ad campaigns built for leads, not vanity metrics. Every rupee tracked, every conversion measured.
                </p>
                <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <ScrollReveal>
        <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-12 glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
            <div className="md:w-1/2 relative z-10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">About Me</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-6">
                From YouTube creator to <span className="gradient-text">growth specialist</span>
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg mb-4 leading-relaxed">
                I started editing videos for my own YouTube channel years ago. That taught me something no course ever could — how real audiences actually watch, skip, and click.
              </p>
              <p className="text-on-surface-variant text-base mb-6 leading-relaxed">
                Now I use that instinct to edit for other creators, run their socials, and build ad campaigns that convert. If your content isn&apos;t growing, I can probably tell you why in 10 minutes.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-primary/50"
              >
                Read my full story <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 relative z-10">
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">trending_up</span>
                <span className="font-bold text-on-surface text-sm">Algorithmic Growth</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">groups</span>
                <span className="font-bold text-on-surface text-sm">Community First</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">psychology</span>
                <span className="font-bold text-on-surface text-sm">Creator Mindset</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">speed</span>
                <span className="font-bold text-on-surface text-sm">Fast Turnarounds</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── PROCESS SECTION ─── */}
      <section className="py-20 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
                From first call to <span className="gradient-text">real growth</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              
              <div className="reveal relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">1</div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Discovery</h3>
                <p className="text-on-surface-variant text-sm max-w-xs">I&apos;ll watch your last 10 videos, audit your analytics, and find exactly where viewers are dropping off.</p>
              </div>
              <div className="reveal relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">2</div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Build & Execute</h3>
                <p className="text-on-surface-variant text-sm max-w-xs">I craft the edits, build your content calendar, and set up the ad campaigns — you approve, I ship.</p>
              </div>
              <div className="reveal relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">3</div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Measure & Scale</h3>
                <p className="text-on-surface-variant text-sm max-w-xs">We track what&apos;s working, double down on winners, and cut what isn&apos;t. Rinse, repeat, grow.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SELECTED WORKS ─── */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Portfolio</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">Selected Works</h2>
              <p className="text-on-surface-variant text-base">A glimpse into recent projects driving growth.</p>
            </div>
            <Link href="/portfolio" className="bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container text-on-surface font-semibold py-2.5 px-6 rounded-full transition-all flex items-center gap-2">
              View Full Portfolio <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </ScrollReveal>
        
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 */}
            <div className="reveal group relative rounded-3xl overflow-hidden glass-card hover:shadow-xl transition-all duration-300">
              <div className="relative w-full h-64 overflow-hidden bg-surface-container-low border-b border-outline-variant/30">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yRc9SLVU3wxVmFvr7DMbGjSG3qYpjfjh9tYzKpUK33eg2W1nnTjvlsrLhaBi6krKX0TdNuf7yLsAsOYdU0JLMomjjGoi8SejZX8T3hCSpIAsARplRb8T70IM2rYKk5Ol3q4KoPIE-WoRs5APA61VFmLYbW3uQbgFXi7YB-juA37Eo8ILQ718O2RtslZ9odscWJ2rdNEn697yO0U8SxV4Hs0xAN-6D1M18mtUaFkHgsfZF3v8LBALQw"
                  alt="Launch Excel VSL editing project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow">Video Editing</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-on-surface mb-2">Launch Excel VSL</h3>
                <p className="text-on-surface-variant text-sm mb-4">High-retention sales video resulting in increased course signups.</p>
                <Link href="/portfolio" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
              </div>
            </div>
            
            {/* Work Item 2 */}
            <div className="reveal group relative rounded-3xl overflow-hidden glass-card hover:shadow-xl transition-all duration-300">
              <div className="relative w-full h-64 overflow-hidden bg-surface-container-low border-b border-outline-variant/30">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ"
                  alt="Author Podcast production and launch"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-purple-600 text-xs font-bold px-3 py-1 rounded-full shadow">Podcast & SMM</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-on-surface mb-2">Author Podcast Launch</h3>
                <p className="text-on-surface-variant text-sm mb-4">Full-stack podcast launch including editing, thumbnails, and SEO descriptions.</p>
                <Link href="/portfolio" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── FREE TOOLS STRIP ─── */}
      <ScrollReveal>
        <section className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl glass-card border border-primary/20 bg-gradient-to-br from-primary/5 via-secondary-fixed/40 to-primary/5 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
                  <span className="material-symbols-outlined text-white text-3xl">
                    bolt
                  </span>
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">
                    Free Tools
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-1">
                    Get a free growth tool
                  </h2>
                  <p className="text-on-surface-variant text-sm md:text-base max-w-md">
                    Generate a 30-day LinkedIn content calendar with AI — completely free. More tools on the way.
                  </p>
                </div>
              </div>
              <Link
                href="/funnels"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all shrink-0"
              >
                Explore Free Tools
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── BOTTOM CTA ─── */}
      <ScrollReveal>
        <section className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-on-surface">
                Ready to grow?
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg mb-8">
                Let&apos;s talk about your content, your goals, and how I can help you get there. No pitch decks — just a real conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
                >
                  Start a Project
                  <span className="material-symbols-outlined">send</span>
                </Link>
                <Link
                  href="/funnels"
                  className="inline-flex items-center gap-2 border-2 border-primary/40 text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all"
                >
                  Get a free tool
                  <span className="material-symbols-outlined">bolt</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
