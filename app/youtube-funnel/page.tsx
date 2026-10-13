"use client";

import React, { useState } from "react";
import Link from "next/link";

type PageState = "input" | "analyzing" | "preview";
type EmailState = "idle" | "sending" | "sent";

const ANALYSIS_STEPS = [
  { label: "Reading your channel analytics…", icon: "play_circle" },
  { label: "Checking retention and hook performance…", icon: "psychology" },
  { label: "Scanning thumbnails, titles and packaging…", icon: "image" },
  { label: "Auditing audience and targeting signals…", icon: "person_search" },
  { label: "Building a custom 30-day YouTube plan…", icon: "calendar_month" },
  { label: "Finalizing your strategy ✨", icon: "check_circle" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "play_circle",
    title: "Share Your Channel URL",
    desc: "Paste your YouTube channel URL. We read the public analytics, packaging and recent output — no extra forms needed.",
    color: "from-purple-500/20 to-indigo-500/5",
    iconColor: "text-purple-600",
  },
  {
    step: "02",
    icon: "psychology",
    title: "AI Analyzes & Builds",
    desc: "Our AI understands your niche, hook strength, thumbnail CTR and audience. It then crafts a 30-day plan with the specific fixes that will move your numbers.",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-600",
  },
  {
    step: "03",
    icon: "mark_email_read",
    title: "Delivered to Your Inbox",
    desc: "Your complete 30-day YouTube strategy arrives in your inbox — hooks, title ideas, thumbnail direction and the one change that matters most.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
];

const PREVIEW_DAYS = [
  {
    day: 1,
    type: "Hook Fix",
    pillar: "Retention",
    pillarColor: "text-purple-600",
    pillarBg: "bg-purple-50 border-purple-200/60",
    hook: "The first 30 seconds of your latest video drift before the payoff. Tighten the promise, then deliver.",
    reason: "The first 30 seconds decide whether YouTube pushes your video further. A weak hook caps your impressions before the content even gets judged.",
    time: "Video 1 · this week",
  },
  {
    day: 7,
    type: "Thumbnail + Title",
    pillar: "Packaging",
    pillarColor: "text-blue-600",
    pillarBg: "bg-blue-50 border-blue-200/60",
    hook: "3 thumbnail + title pairs built around the same video — pick the one that earns the click.",
    why: "CTR is the gatekeeper. A stronger thumbnail and tighter title can double impressions without changing the video itself.",
    time: "Video 2 · next week",
  },
  {
    day: 14,
    type: "Audience Signal",
    pillar: "Targeting",
    pillarColor: "text-emerald-600",
    pillarBg: "bg-emerald-50 border-emerald-200/60",
    hook: "Your current audience looks broader than your best viewers. Narrow the framing to the people who actually finish.",
    why: "A channel that speaks to everyone usually speaks to no one. Sharper audience framing raises retention and makes every upload work harder.",
    time: "Video 3 · in 2 weeks",
  },
];

const FAQS = [
  {
    q: "Does this actually analyze my YouTube channel?",
    a: "Yes. Your channel URL gives us the public analytics context — recent videos, packaging, audience, and how the last uploads performed. The AI uses this to suggest the fixes most likely to move your numbers, not generic advice.",
  },
  {
    q: "What do I get with the free plan?",
    a: "The free plan includes the full 30-day YouTube strategy: the highest-impact fixes, hook and title ideas, thumbnail direction, and the one change that matters most — delivered to your inbox.",
  },
  {
    q: "What's the premium unlock?",
    a: "Premium unlocks a done-with-you thumbnail direction pack, a full title set for your next video, and a prioritized backlog of the next 5 edits — matched to your niche and audience.",
  },
  {
    q: "Is the base plan really free?",
    a: "Completely free. The 30-day YouTube strategy is yours at no cost. Premium unlocks are optional paid upgrades — the base plan is always free.",
  },
];

export default function YouTubeFunnelPage() {
  const [channelUrl, setChannelUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [pageState, setPageState] = useState<PageState>("input");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [urlTipOpen, setUrlTipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    if (
      !/youtu\.be\/|youtube\.com\/(channel\/|c\/|user\/)/i.test(channelUrl)
    ) {
      setUrlError(
        "Please enter a valid YouTube channel URL (e.g. youtube.com/@yourchannel)"
      );
      return;
    }

    setPageState("analyzing");
    setAnalysisStep(0);
    setAnalysisProgress(0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setAnalysisStep(i);
      setAnalysisProgress(Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100));
    }

    await new Promise((r) => setTimeout(r, 400));
    setPageState("preview");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailState("sending");
    try {
      const res = await fetch("/api/youtube-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUrl,
          email,
          niche: "auto",
          goal: "auto",
        }),
      });
      if (!res.ok) throw new Error();
      setEmailState("sent");
    } catch {
      setEmailState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-60" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-10 pb-10 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 font-semibold text-xs tracking-wide uppercase mb-7">
            <span className="w-5 h-5 rounded-[4px] bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
              yt
            </span>
            Free YouTube Channel Analyzer
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            A free 30-day YouTube plan, <span className="gradient-text">built around your channel.</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Paste your YouTube channel URL. Our AI reads the analytics, packaging and audience signals, then builds a
            30-day strategy — hooks, titles, thumbnail direction and the one change that matters most — straight to your inbox.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "schedule", text: "Ready in ~60 seconds" },
              { icon: "mail", text: "Delivered to inbox" },
              { icon: "lock", text: "Public data only" },
              { icon: "star", text: "Built for your niche" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          URL INPUT — BEFORE "HOW IT WORKS"
      ══════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-6 lg:px-10 xl:px-14 pb-20 max-w-[1240px] mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* ── Input state ── */}
          {pageState === "input" && (
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-primary to-purple-500/50 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center shrink-0 shadow-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface leading-tight">
                      Enter Your YouTube Channel URL
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      We'll analyze your channel and build your strategy automatically
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <div className="relative">
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <input
                        type="url"
                        required
                        placeholder="https://youtube.com/@yourchannel"
                        value={channelUrl}
                        onChange={(e) => {
                          setChannelUrl(e.target.value);
                          setUrlError("");
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all text-sm font-medium"
                      />
                    </div>

                    {urlError && (
                      <p className="text-xs text-error flex items-center gap-1 mt-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {urlError}
                      </p>
                    )}

                    {/* Tip toggle */}
                    <button
                      type="button"
                      onClick={() => setUrlTipOpen((p) => !p)}
                      className="flex items-center gap-1.5 text-xs text-purple-600/70 font-medium mt-2.5 hover:text-purple-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">info</span>
                      How to find your YouTube channel URL
                      <span
                        className={`material-symbols-outlined text-sm transition-transform duration-200 ${urlTipOpen ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>

                    {urlTipOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-2">
                        {[
                          "Open YouTube and go to your channel.",
                          "Copy the URL from your browser's address bar — it looks like youtube.com/@yourchannel or youtube.com/channel/UC….",
                          "On mobile: tap your channel name → Share → Copy link.",
                          <>It looks like: <code className="bg-surface-container px-1.5 py-0.5 rounded font-mono text-purple-600 text-[11px]">youtube.com/@yourchannel</code></>,
                        ].map((tip, i) => (
                          <div key={i} className="flex gap-2.5">
                            <span className="text-purple-600 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                            <span className="text-xs text-on-surface-variant leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!channelUrl.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/20 text-base"
                  >
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                    Analyze My Channel &amp; Build My Plan
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    No credit card. No sign-up. Just your channel URL.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* ── Analyzing state ── */}
          {pageState === "analyzing" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-primary/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white animate-pulse" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">
                  Analyzing Your Channel
                </h3>
                <p className="text-sm text-on-surface-variant mb-8">
                  {ANALYSIS_STEPS[analysisStep]?.label}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-primary transition-all duration-700"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>

                {/* Step pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {ANALYSIS_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all ${i < analysisStep
                          ? "bg-emerald-100 text-emerald-700"
                          : i === analysisStep
                          ? "bg-purple-500/10 text-purple-600 font-semibold"
                          : "bg-surface-container text-on-surface-variant/40"
                        }`}
                    >
                      {i < analysisStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : i === analysisStep ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse shrink-0" />
                      ) : null}
                      {step.label.replace("…", "").replace(" ✨", "")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — only visible before preview
      ══════════════════════════════════════════════════════ */}
      {pageState !== "preview" && (
        <section className="py-20 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-300 via-blue-300 to-emerald-300 opacity-40" />
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 relative group"
              >
                <div className="absolute -top-4 left-8 bg-surface text-on-surface-variant font-black text-xs tracking-widest px-2 py-1 rounded-full border border-outline-variant/40">
                  {step.step}
                </div>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <span className={`material-symbols-outlined text-3xl ${step.iconColor}`}>
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          PREVIEW — shown after analysis completes
      ══════════════════════════════════════════════════════ */}
      {pageState === "preview" && (
        <section className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Your 30-Day YouTube Plan Is Ready!
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              Here's a Sneak Peek of Your Strategy
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Enter your email below to receive all 30 days in your inbox — completely free.
            </p>
          </div>

          {/* ── Email capture ── */}
          <div className="max-w-xl mx-auto mb-12">
            {emailState === "sent" ? (
              <div className="glass-card rounded-2xl p-6 text-center border border-emerald-200/60 bg-emerald-50/40">
                <span className="material-symbols-outlined text-4xl text-emerald-500 mb-3 block">
                  check_circle
                </span>
                <h3 className="font-bold text-on-surface mb-1">Check your inbox! 🎉</h3>
                <p className="text-sm text-on-surface-variant">
                  Your 30-day YouTube strategy is on its way to{" "}
                  <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/4 to-primary/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-purple-600 text-xl">
                      mark_email_read
                    </span>
                    <p className="font-bold text-on-surface">
                      Where should we send your 30-day plan?
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-purple-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-purple-600/90 disabled:opacity-60 transition-all shrink-0 text-sm"
                    >
                      {emailState === "sending" ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send It
                          <span className="material-symbols-outlined text-base">send</span>
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-on-surface-variant/50 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    No spam. We only send your strategy.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Preview day cards ── */}
          <div className="space-y-6 mb-16">
            {PREVIEW_DAYS.map((day) => (
              <div key={day.day} className="glass-card rounded-3xl p-8 relative overflow-hidden">
                {/* Day header */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">Day {day.day}</p>
                      <p className="text-xs text-on-surface-variant">{day.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-fixed text-primary">
                      {day.type}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${day.pillarBg} ${day.pillarColor}`}>
                      {day.pillar}
                    </span>
                  </div>
                </div>

                {/* Insight — visible */}
                <div
                  className="rounded-xl p-4 mb-5"
                  style={{ borderLeft: "3px solid #7c3aed", background: "rgba(124,58,237,0.04)" }}
                >
                  <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1.5">
                    What I'd fix first
                  </p>
                  <p className="text-on-surface font-semibold text-sm leading-relaxed">
                    &ldquo;{day.hook}&rdquo;
                  </p>
                </div>

                {/* Blurred full plan */}
                <div className="relative mb-5">
                  <div
                    className="text-on-surface-variant text-sm leading-relaxed select-none pointer-events-none"
                    style={{ filter: "blur(5px)" }}
                  >
                    <p className="mb-2">
                      Detailed step-by-step plan for this video — retentions targets, the exact hook line, the thumbnail concept,
                      the title options, the posting time and the one metric to watch. This is built from your channel, not a template.
                    </p>
                    <p>
                      Supporting rationale, the audience takeaway, and the follow-up action that compounds the result over the next 30 days.
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 border border-primary/20 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-base">mail</span>
                      <span className="text-xs font-bold text-primary">
                        Full plan unlocked in your inbox
                      </span>
                    </div>
                  </div>
                </div>

                {/* Why this works — visible */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50 mb-5">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">
                      Why This Will Perform
                    </p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{day.reason}</p>
                  </div>
                </div>

                {/* Locked: thumbnail direction + title set */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "image",
                      label: "Thumbnail Direction",
                      desc: "Visual direction for your next thumbnail — composition, focal point, and the one detail that earns the click — matched to your audience",
                    },
                    {
                      icon: "title",
                      label: "Title Set",
                      desc: "5 title options for the same video, ranked by predicted CTR and curiosity gap — with the reasoning behind each one",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="relative rounded-xl overflow-hidden border border-outline-variant/30"
                    >
                      {/* Blurred content underneath */}
                      <div
                        className="p-4 select-none pointer-events-none bg-surface-container-low"
                        style={{ filter: "blur(4px)" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-on-surface-variant text-lg">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold text-on-surface">{item.label}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {item.desc} — lorem ipsum dolor sit amet consectetur adipiscing elit
                          professional brand visual design concept.
                        </p>
                      </div>
                      {/* Lock overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-surface/50">
                        <button
                          className="flex items-center gap-1.5 bg-on-surface text-surface-container-lowest text-xs font-bold px-4 py-2 rounded-lg hover:bg-on-surface/80 transition-all shadow-md"
                          onClick={() => {}}
                        >
                          <span className="material-symbols-outlined text-sm">lock</span>
                          Unlock Premium
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* More days teaser */}
            <div className="glass-card rounded-3xl p-6 text-center border-2 border-dashed border-outline-variant/40">
              <p className="text-on-surface-variant text-sm mb-1">
                <strong className="text-on-surface">+ 27 more days</strong> of strategy waiting in your inbox
              </p>
              <p className="text-xs text-on-surface-variant/60">
                Each with the fix, the why, the posting time and the metric that tells you it worked
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">
              Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              Before You Ask
            </h2>
          </div>

          <div className="space-y-1">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="border-b border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[16.5px] font-medium text-on-surface group-hover:text-purple-600 transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-on-surface-variant shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    add
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15.5px] text-on-surface-variant leading-relaxed pb-5 pr-8 max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
