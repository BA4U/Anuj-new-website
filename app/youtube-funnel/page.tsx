"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { parseChannelUrl } from "@/lib/youtube";
import BrandIcon from "@/components/BrandIcon";

interface InspectedChannel {
  name: string;
  handle: string;
  avatar: string | null;
  description: string;
  channelId: string | null;
  recentVideos: Array<{ title: string; published: string }>;
  detectedTopics: string[];
  packagingNotes: string[];
}

const ANALYSIS_STEPS = [
  { label: "Verifying YouTube channel handle…", icon: "play_circle" },
  { label: "Fetching public channel metadata & uploads…", icon: "person_search" },
  { label: "Scanning recent video titles and packaging…", icon: "psychology" },
  { label: "Identifying topic gaps and retention drop-offs…", icon: "category" },
  { label: "Drafting 30-day customized roadmap…", icon: "calendar_month" },
  { label: "Finalizing your personal strategy ✨", icon: "check_circle" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "play_circle",
    title: "Share Your Channel URL",
    desc: "Paste your YouTube channel link or @handle. I verify the channel and read your public uploads in real time.",
    color: "from-primary/20 to-indigo-500/5",
    iconColor: "text-primary",
  },
  {
    step: "02",
    icon: "psychology",
    title: "Real Channel Audit",
    desc: "I inspect your recent video titles, packaging patterns, and audience signals to find where views and watch time are slipping.",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-600",
  },
  {
    step: "03",
    icon: "mark_email_read",
    title: "Delivered to Your Inbox",
    desc: "Your complete 30-day roadmap arrives in your inbox: bespoke video ideas, hook scripts, and thumbnail packaging tailored to your channel.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
];

const FAQS = [
  {
    q: "Does this actually inspect my real YouTube channel?",
    a: "Yes. The moment you paste your channel link or @handle, I inspect your channel's public metadata, recent uploads, and packaging patterns in real time. If you want me to analyze your private retention graphs, simply reply to the audit email with a screenshot of your last 90 days from YouTube Studio.",
  },
  {
    q: "What do I get in the 30-day strategy?",
    a: "You get a day-by-day action plan: bespoke video titles designed for high CTR, thumbnail visual directions, hook frameworks to protect your first 30 seconds, and specific retention metrics to monitor.",
  },
  {
    q: "Is this free plan really free?",
    a: "Yes. The 30-day plan is completely free, and I will never ask for payment details for it. If you later want me to manage or edit your channel full-time, we can discuss a growth partnership.",
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

  // Real-time inspected channel data
  const [inspectedChannel, setInspectedChannel] = useState<InspectedChannel | null>(null);

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
    setAnalysisProgress(15);

    try {
      // 1) Trigger real server-side channel verification
      const inspectPromise = fetch("/api/youtube-funnel/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl: parsed.url }),
      });

      // Animate intermediate steps while inspection is running
      setAnalysisStep(1);
      setAnalysisProgress(35);
      await new Promise((r) => setTimeout(r, 600));

      setAnalysisStep(2);
      setAnalysisProgress(60);

      const res = await inspectPromise;
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setPageState("input");
        setUrlError(
          data?.error ||
            "I could not verify this YouTube channel. Please check the handle or link and ensure the channel is public."
        );
        return;
      }

      setInspectedChannel(data.channel);
      setAnalysisStep(4);
      setAnalysisProgress(85);

      await new Promise((r) => setTimeout(r, 600));
      setAnalysisStep(5);
      setAnalysisProgress(100);

      await new Promise((r) => setTimeout(r, 400));
      setPageState("preview");
    } catch {
      setPageState("input");
      setUrlError("Connection issue while inspecting channel. Please check your connection and try again.");
    }
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

  // Derive dynamic preview based on actual channel uploads
  const latestUploadTitle = inspectedChannel?.recentVideos?.[0]?.title;
  const secondUploadTitle = inspectedChannel?.recentVideos?.[1]?.title;

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-60" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* HERO */}
      <section className="relative pt-10 pb-10 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs tracking-wide uppercase mb-7">
            <BrandIcon brand="youtube" size={20} />
            Real YouTube Channel Analyzer
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            A 30-day YouTube growth plan,{" "}
            <span className="gradient-text">built around your actual channel.</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Paste your YouTube channel link or @handle. I inspect your real uploads, audit your packaging,
            and build a bespoke 30-day roadmap delivered to your inbox.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "verified", text: "Real-time channel inspection" },
              { icon: "schedule", text: "Ready in ~60 seconds" },
              { icon: "lock", text: "Zero generic filler" },
              { icon: "person", text: "Analyzed by Anuj Mishra" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#7c4df0] text-base">{b.icon}</span>
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
                      Enter Your YouTube Channel URL or @Handle
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      I&apos;ll inspect your uploads, audit your packaging, and build your custom plan
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
                        placeholder="youtube.com/@yourchannel or @yourhandle"
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
                      How to find your channel link
                      <span
                        className={`material-symbols-outlined text-sm transition-transform duration-200 ${urlTipOpen ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>

                    {urlTipOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15 space-y-2">
                        {[
                          "Open YouTube and go to your channel page.",
                          "Copy the URL from your address bar: youtube.com/@yourchannel or youtube.com/channel/UC…",
                          "You can also type just your handle: @yourchannel",
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
                    Audit Channel &amp; Build Custom Plan
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    Real public channel verification · No private passwords needed
                  </p>
                </form>
              </div>
            </div>
          )}

          {pageState === "analyzing" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#7c4df0]/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white animate-pulse" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C23.498 15.93 23.498 12 23.498 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">
                  Inspecting Channel in Real-Time
                </h3>
                <p className="text-sm text-on-surface-variant mb-8">
                  {ANALYSIS_STEPS[analysisStep]?.label}
                </p>

                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[#7c4df0] transition-all duration-700"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {ANALYSIS_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all ${
                        i < analysisStep
                          ? "bg-emerald-100 text-emerald-700"
                          : i === analysisStep
                          ? "bg-primary/10 text-primary font-semibold"
                          : "bg-surface-container text-on-surface-variant/40"
                      }`}
                    >
                      {i < analysisStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : i === analysisStep ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
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
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              How The Audit Works
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

      {/* PREVIEW */}
      {pageState === "preview" && (
        <section className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">verified</span>
              Channel Verified &amp; Audited
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              {inspectedChannel ? `Audit & Strategy for ${inspectedChannel.name}` : "Here is your 30-day plan"}
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto text-sm">
              Enter your email to receive all 30 days and the full packaging breakdown, completely free.
            </p>
          </div>

          {/* REAL AUDITED CHANNEL CARD */}
          {inspectedChannel && (
            <div className="max-w-2xl mx-auto mb-8 glass-card rounded-2xl p-6 border border-primary/20 bg-surface-container/60 shadow-lg">
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                {inspectedChannel.avatar ? (
                  <Image
                    src={inspectedChannel.avatar}
                    alt={inspectedChannel.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30 shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                    YT
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-on-surface text-lg leading-tight truncate">
                      {inspectedChannel.name}
                    </h3>
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    {inspectedChannel.handle}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20">
                      {inspectedChannel.recentVideos.length} Uploads Scanned
                    </span>
                    {inspectedChannel.detectedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {inspectedChannel.packagingNotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-outline-variant/30 text-xs text-on-surface-variant space-y-1">
                  <p className="font-semibold text-on-surface text-[11px] uppercase tracking-wider text-primary">
                    Packaging Diagnostics:
                  </p>
                  {inspectedChannel.packagingNotes.map((note, idx) => (
                    <p key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="material-symbols-outlined text-xs text-primary shrink-0 mt-0.5">
                        arrow_right
                      </span>
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EMAIL SUBMIT CARD */}
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
                      Your custom 30-day YouTube plan is on its way to <strong>{email}</strong>. If it doesn&apos;t show
                      up in a few minutes, check your spam or promotions tab.
                    </>
                  ) : (
                    <>
                      I&apos;ve received your channel and will email your personal 30-day plan to{" "}
                      <strong>{email}</strong> shortly.
                    </>
                  )}
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/4 to-[#7c4df0]/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-xl">
                      mark_email_read
                    </span>
                    <p className="font-bold text-on-surface">
                      Where should I send your custom 30-day plan?
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
                    <input
                      id="plan-email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-primary text-white font-bold px-5 py-3 rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-all shrink-0 text-sm"
                    >
                      {emailState === "sending" ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send My Plan
                          <span className="material-symbols-outlined text-base">send</span>
                        </>
                      )}
                    </button>
                  </form>
                  {emailError && (
                    <p role="alert" className="text-sm text-primary mt-3 flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-base shrink-0">error</span>
                      {emailError}
                    </p>
                  )}
                  <p className="text-xs text-on-surface-variant/50 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    No spam. I only send your strategy.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC AUDIT PREVIEWS */}
          <div className="max-w-3xl mx-auto space-y-5 mb-16">
            {/* Day 1 sample card */}
            <div className="glass-card rounded-3xl p-7 md:p-8 border border-[#7c4df0]/15 shadow-[0_24px_60px_-34px_rgba(73,54,230,0.5)]">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c4df0] to-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Day 1 · High-Leverage Fix</p>
                    <p className="text-xs text-on-surface-variant">Immediate Retention Unlock</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-fixed text-[#7c4df0]">
                    Hook Retention
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-purple-50 border-primary/20 text-primary">
                    Pacing &amp; Opening
                  </span>
                </div>
              </div>

              <div className="rounded-xl p-4 mb-5" style={{ borderLeft: "3px solid #7c3aed", background: "rgba(124,58,237,0.04)" }}>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                  {latestUploadTitle
                    ? `Audit observation on latest upload: "${latestUploadTitle.slice(0, 50)}..."`
                    : "What I'd optimize first on your channel"}
                </p>
                <p className="text-on-surface font-semibold text-sm leading-relaxed">
                  {latestUploadTitle
                    ? `Eliminate the 15-second preamble. Open with the exact core payoff of the title and introduce immediate curiosity tension before the 30-second drop-off.`
                    : "The first 30 seconds of your videos must state the payoff immediately. Avoid slow greeting warmups that trigger early drop-off."}
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0 mt-0.5">lightbulb</span>
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">
                    Why this moves the needle
                  </p>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    YouTube’s recommendation system weights 30-second audience retention above almost all other early signals. Raising early retention from 45% to 65% frequently unlocks broader browse feed distribution.
                  </p>
                </div>
              </div>
            </div>

            {/* Day 7 sample card */}
            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                7
              </div>
              <div className="min-w-0 flex-grow">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Day 7 · Thumbnail + Title Contrast
                </p>
                <p className="text-sm font-semibold text-on-surface leading-snug">
                  {secondUploadTitle
                    ? `A/B packaging test built around: "${secondUploadTitle.slice(0, 45)}..."`
                    : "3 complementary title + thumbnail pairings to elevate CTR on your next upload"}
                </p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 text-xl shrink-0" aria-hidden="true">
                lock
              </span>
            </div>

            {/* Day 14 sample card */}
            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                14
              </div>
              <div className="min-w-0 flex-grow">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Day 14 · Content Pillar Expansion
                </p>
                <p className="text-sm font-semibold text-on-surface leading-snug">
                  Uncovering untapped audience search intent in{" "}
                  {inspectedChannel?.detectedTopics?.[0] ? `#${inspectedChannel.detectedTopics[0]}` : "your niche"}
                </p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 text-xl shrink-0" aria-hidden="true">
                lock
              </span>
            </div>

            {/* Locked days blur teaser */}
            <div className="relative rounded-3xl overflow-hidden border border-[#7c4df0]/20">
              <div
                className="p-7 md:p-8 select-none pointer-events-none text-on-surface-variant text-sm leading-relaxed bg-white"
                style={{ filter: "blur(6px)" }}
                aria-hidden="true"
              >
                <p className="mb-3">
                  Days 2–30: Complete hook scripts, thumbnail visual layouts, topic outlines, and retention targets
                  tailored specifically to your channel catalog and audience.
                </p>
                <p>
                  Includes weekly pacing audits, Shorts-to-longform bridge strategies, and community tab engagement plays.
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px] p-6 text-center">
                <span className="material-symbols-outlined text-3xl text-primary mb-2">lock</span>
                <p className="font-bold text-on-surface text-base mb-1">
                  28 More Days Tailored to Your Channel
                </p>
                <p className="text-xs text-on-surface-variant max-w-sm mb-4">
                  Enter your email above to get the full 30-day strategy delivered free to your inbox.
                </p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 text-center relative overflow-hidden border border-primary/20">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
              Want me to personally review your YouTube analytics?
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              I partner 1-on-1 with creators and founders to run their entire video editing, packaging, and growth engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full text-sm transition-all"
              >
                Book a 1-on-1 Strategy Call
              </Link>
              <Link
                href="/portfolio/youtube-management-portfolio"
                className="glass-card hover:bg-surface-container text-on-surface font-medium px-6 py-3 rounded-full text-sm transition-all border border-outline-variant/40"
              >
                View YouTube Case Studies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      <section className="py-20 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[800px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 border border-outline-variant/30">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left font-semibold text-on-surface text-sm"
              >
                {faq.q}
                <span className={`material-symbols-outlined text-base transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <p className="mt-3 text-xs text-on-surface-variant leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
