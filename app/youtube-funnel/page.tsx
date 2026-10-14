"use client";

import React, { useState } from "react";
import Link from "next/link";
import { parseChannelUrl } from "@/lib/youtube";
import BrandIcon from "@/components/BrandIcon";

const ANALYSIS_STEPS = [
  { label: "Checking your channel link…", icon: "play_circle" },
  { label: "Matching your niche and audience…", icon: "psychology" },
  { label: "Drafting hook and title ideas…", icon: "image" },
  { label: "Planning thumbnail direction…", icon: "person_search" },
  { label: "Building a custom 30-day YouTube plan…", icon: "calendar_month" },
  { label: "Finalizing your strategy ✨", icon: "check_circle" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "play_circle",
    title: "Share Your Channel URL",
    desc: "Paste your YouTube channel link. That's all I need to start, no long forms.",
    color: "from-red-500/20 to-indigo-500/5",
    iconColor: "text-red-600",
  },
  {
    step: "02",
    icon: "psychology",
    title: "Your Plan Gets Built",
    desc: "AI plus proven retention and packaging playbooks turn your niche into a 30-day plan: hooks, titles and thumbnail directions to test.",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-600",
  },
  {
    step: "03",
    icon: "mark_email_read",
    title: "Delivered to Your Inbox",
    desc: "Your complete 30-day YouTube strategy arrives in your inbox, hooks, title ideas, thumbnail direction and the one change that matters most.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
];

const PREVIEW_DAYS = [
  {
    day: 1,
    type: "Hook Fix",
    pillar: "Retention",
    pillarColor: "text-red-600",
    pillarBg: "bg-purple-50 border-red-200/60",
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
    hook: "3 thumbnail + title pairs built around the same video, pick the one that earns the click.",
    reason: "CTR is the gatekeeper. A stronger thumbnail and tighter title can double impressions without changing the video itself.",
    time: "Video 2 · next week",
  },
  {
    day: 14,
    type: "Audience Signal",
    pillar: "Targeting",
    pillarColor: "text-emerald-600",
    pillarBg: "bg-emerald-50 border-emerald-200/60",
    hook: "Your current audience looks broader than your best viewers. Narrow the framing to the people who actually finish.",
    reason: "A channel that speaks to everyone usually speaks to no one. Sharper audience framing raises retention and makes every upload work harder.",
    time: "Video 3 · in 2 weeks",
  },
];

const FAQS = [
  {
    q: "Does this actually analyze my YouTube channel?",
    a: "Your plan is built from your channel link and likely niche, using AI plus proven retention and packaging playbooks. It can't see your private YouTube Studio data, reply to the email with a screenshot of your last 90 days and I'll review it personally.",
  },
  {
    q: "What do I get with the free plan?",
    a: "The free plan includes the full 30-day YouTube strategy: the highest-impact fixes, hook and title ideas, thumbnail direction, and the one change that matters most, delivered to your inbox.",
  },
  {
    q: "Is the base plan really free?",
    a: "Yes. The 30-day YouTube strategy is yours at no cost, and I will not ask for payment details.",
  },
];

export default function YouTubeFunnelPage() {
  const [channelUrl, setChannelUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [pageState, setPageState] = useState<"input" | "analyzing" | "preview">("input");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [urlTipOpen, setUrlTipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent">("idle");
  const [emailError, setEmailError] = useState("");
  const [sentMode, setSentMode] = useState<"plan" | "review">("plan");
  const [honey, setHoney] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    const parsed = parseChannelUrl(channelUrl);
    if (!parsed.ok) {
      setUrlError(parsed.error);
      return;
    }
    setChannelUrl(parsed.url);

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
    setEmailError("");
    setEmailState("sending");
    try {
      const res = await fetch("/api/youtube-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl, email, website: honey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setEmailError(data?.error || "Something went wrong. Please try again.");
        setEmailState("idle");
        return;
      }
      setSentMode(data?.mode === "review" ? "review" : "plan");
      setEmailState("sent");
    } catch {
      setEmailError("Network problem, please check your connection and try again.");
      setEmailState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden theme-yt">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-60" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* HERO */}
      <section className="relative pt-10 pb-10 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 font-semibold text-xs tracking-wide uppercase mb-7">
            <BrandIcon brand="youtube" size={20} />
            Free YouTube Channel Analyzer
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            A free 30-day YouTube plan,{" "}
            <span className="gradient-text">built around your channel.</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Paste your YouTube channel link and get a 30-day plan, hooks, titles, thumbnail direction and
            the one change that matters most, straight to your inbox.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "schedule", text: "Ready in ~60 seconds" },
              { icon: "mail", text: "Delivered to inbox" },
              { icon: "lock", text: "A free, personal plan" },
              { icon: "star", text: "Built for your niche" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#E00000] text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URL INPUT */}
      <section className="px-5 sm:px-6 lg:px-10 xl:px-14 pb-20 max-w-[1240px] mx-auto">
        <div className="max-w-2xl mx-auto">
          {pageState === "input" && (
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-[#E00000] to-red-500/50 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <input
                        type="text"
                        inputMode="url"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                        placeholder="https://youtube.com/@yourchannel"
                        value={channelUrl}
                        onChange={(e) => {
                          setChannelUrl(e.target.value);
                          setUrlError("");
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all text-sm font-medium"
                      />
                    </div>

                    {urlError && (
                      <p className="text-xs text-error flex items-center gap-1 mt-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {urlError}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setUrlTipOpen((p) => !p)}
                      className="flex items-center gap-1.5 text-xs text-red-600/70 font-medium mt-2.5 hover:text-red-600 transition-colors"
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
                      <div className="mt-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15 space-y-2">
                        {[
                          "Open YouTube and go to your channel.",
                          "Copy the URL from your browser's address bar, it looks like youtube.com/@yourchannel or youtube.com/channel/UC….",
                          "On mobile: tap your channel name → Share → Copy link.",
                          <>It looks like: <code className="bg-surface-container px-1.5 py-0.5 rounded font-mono text-red-600 text-[11px]">youtube.com/@yourchannel</code></>,
                        ].map((tip, i) => (
                          <div key={i} className="flex gap-2.5">
                            <span className="text-red-600 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                            <span className="text-xs text-on-surface-variant leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!channelUrl.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-red-500/20 text-base"
                  >
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                    Analyze My Channel &amp; Build My Plan
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    Just your channel URL.
                  </p>
                </form>
              </div>
            </div>
          )}

          {pageState === "analyzing" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-[#E00000]/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white animate-pulse" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">
                  Analyzing Your Channel
                </h3>
                <p className="text-sm text-on-surface-variant mb-8">
                  {ANALYSIS_STEPS[analysisStep]?.label}
                </p>

                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-[#E00000] transition-all duration-700"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {ANALYSIS_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all ${i < analysisStep
                          ? "bg-emerald-100 text-emerald-700"
                          : i === analysisStep
                          ? "bg-red-500/10 text-red-600 font-semibold"
                          : "bg-surface-container text-on-surface-variant/40"
                        }`}
                    >
                      {i < analysisStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : i === analysisStep ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
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

      {/* HOW IT WORKS */}
      {pageState !== "preview" && (
        <section className="py-20 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-red-300 via-blue-300 to-emerald-300 opacity-40" />
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

      {/* PREVIEW */}
      {pageState === "preview" && (
        <section className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Almost there, one last step
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              Here's what your 30-day plan looks like
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Enter your email below to receive all 30 days in your inbox, completely free.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            {emailState === "sent" ? (
              <div className="glass-card rounded-2xl p-6 text-center border border-emerald-200/60 bg-emerald-50/40">
                <span className="material-symbols-outlined text-4xl text-emerald-500 mb-3 block">
                  check_circle
                </span>
                <h3 className="font-bold text-on-surface mb-1">
                  {sentMode === "plan" ? "Check your inbox! 🎉" : "Got it, I'm on it ✅"}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {sentMode === "plan" ? (
                    <>
                      Your 30-day YouTube plan is on its way to <strong>{email}</strong>. If it doesn&apos;t show up in a
                      few minutes, check spam.
                    </>
                  ) : (
                    <>
                      I&apos;ve received your channel and will email your personal 30-day plan to <strong>{email}</strong>{" "}
                      shortly.
                    </>
                  )}
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-red-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/4 to-[#E00000]/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-red-600 text-xl">
                      mark_email_read
                    </span>
                    <p className="font-bold text-on-surface">
                      Where should we send your 30-day plan?
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                      className="hidden"
                    />
                    <input id="plan-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-red-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-red-600/90 disabled:opacity-60 transition-all shrink-0 text-sm"
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
                  {emailError && (
                    <p role="alert" className="text-sm text-red-600 mt-3 flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-base shrink-0">error</span>
                      {emailError}
                    </p>
                  )}
                  <p className="text-xs text-on-surface-variant/50 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    No spam. We only send your strategy.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto space-y-5 mb-16">
            {/* Day 1, shown in full as the sample */}
            {PREVIEW_DAYS.slice(0, 1).map((day) => (
              <div key={day.day} className="glass-card rounded-3xl p-7 md:p-8 border border-[#E00000]/15 shadow-[0_24px_60px_-34px_rgba(73,54,230,0.5)]">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E00000] to-red-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">Day {day.day}, free sample</p>
                      <p className="text-xs text-on-surface-variant">{day.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-fixed text-[#E00000]">{day.type}</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${day.pillarBg} ${day.pillarColor}`}>{day.pillar}</span>
                  </div>
                </div>

                <div className="rounded-xl p-4 mb-5" style={{ borderLeft: "3px solid #7c3aed", background: "rgba(124,58,237,0.04)" }}>
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1.5">What I&apos;d fix first</p>
                  <p className="text-on-surface font-semibold text-sm leading-relaxed">&ldquo;{day.hook}&rdquo;</p>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0 mt-0.5">lightbulb</span>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Why this will perform</p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{day.reason}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Other days, title only */}
            {PREVIEW_DAYS.slice(1).map((day) => (
              <div key={day.day} className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {day.day}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-0.5">
                    Day {day.day} · {day.type}
                  </p>
                  <p className="text-sm font-semibold text-on-surface leading-snug">&ldquo;{day.hook}&rdquo;</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40 text-xl shrink-0" aria-hidden="true">lock</span>
              </div>
            ))}

            {/* One single locked panel */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E00000]/20">
              <div
                className="p-7 md:p-8 select-none pointer-events-none text-on-surface-variant text-sm leading-relaxed bg-white"
                style={{ filter: "blur(6px)" }}
                aria-hidden="true"
              >
                <p className="mb-3">
                  The exact hook line, the thumbnail concept, five title options ranked by curiosity, the best posting time and the one metric to watch, for every one of the 30 days.
                </p>
                <p className="mb-3">
                  Supporting rationale, the audience takeaway, and the follow-up action that compounds the result across the month.
                </p>
                <p>Days 2–30, written for your channel and your niche.</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-white/55 backdrop-blur-[2px]">
                <span className="material-symbols-outlined text-[#E00000] text-3xl mb-2">mail</span>
                <p className="font-bold text-on-surface text-[17px] mb-1">
                  {emailState === "sent" ? "Your full 30-day plan is on its way" : "Full plan unlocked in your inbox"}
                </p>
                <p className="text-sm text-on-surface-variant mb-4">
                  {emailState === "sent"
                    ? "Check your inbox (and spam) in a few minutes."
                    : "+ 27 more days, enter your email above and it's yours, free."}
                </p>
                {emailState !== "sent" && (
                  <button
                    type="button"
                    onClick={() => document.getElementById("plan-email")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className="btn btn-glow btn-sm"
                  >
                    Enter my email
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>
                )}
              </div>
            </div>

            {/* Book a call */}
            <div className="rounded-3xl p-7 md:p-8 text-center bg-gradient-to-br from-[#E00000] to-red-600 text-white shadow-[0_24px_60px_-30px_rgba(255,0,0,0.45)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 mb-2">Prefer to talk it through?</p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">Book a free call and we&apos;ll go through your channel live.</h3>
              <p className="text-white/75 text-sm max-w-md mx-auto mb-5">20 minutes, no pitch deck. I&apos;ll show you what I&apos;d change first and why.</p>
              <Link
                href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#E00000] font-semibold text-[15px] px-6 py-3 hover:bg-white/90 transition-colors"
              >
                Book a call
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
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
                  <span className="text-[16.5px] font-medium text-on-surface group-hover:text-red-600 transition-colors">
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
