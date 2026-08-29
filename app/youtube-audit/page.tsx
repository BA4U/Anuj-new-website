"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PageState = "input" | "analyzing" | "preview";
type EmailState = "idle" | "sending" | "sent";

// ─── Constants ─────────────────────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  { label: "Reading your channel & top videos…", icon: "visibility" },
  { label: "Mapping your retention curve…", icon: "insights" },
  { label: "Finding where viewers drop off…", icon: "trending_down" },
  { label: "Matching proven fix playbooks…", icon: "construction" },
  { label: "Finalizing your 3 fixes ✨", icon: "check_circle" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "link",
    title: "Paste Your Channel URL",
    desc: "Drop in your YouTube channel link. We read your niche and recent content — no uploads or logins needed.",
    color: "from-red-500/20 to-orange-500/5",
    iconColor: "text-red-600",
  },
  {
    step: "02",
    icon: "insights",
    title: "AI Audits Retention",
    desc: "Our AI maps the drop-off patterns that are costing you watch time and ranks the 3 fixes that matter most.",
    color: "from-amber-500/20 to-yellow-500/5",
    iconColor: "text-amber-600",
  },
  {
    step: "03",
    icon: "mark_email_read",
    title: "Delivered to Inbox",
    desc: "Three actionable, prioritized retention fixes land in your inbox — ready to ship this week.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
];

const SAMPLE_FIXES = [
  {
    rank: 1,
    tactic: "Hook",
    title: "Front-load the payoff in the first 15 seconds",
    problem:
      "Most viewers decide to stay or leave within the first 5–10 seconds. A slow, context-heavy intro pushes your swipe-away point dangerously early.",
    impact: "+15–25% average view duration on new uploads.",
  },
  {
    rank: 2,
    tactic: "Retention Loop",
    title: "Plant open loops to pull viewers past the dip",
    problem:
      "Retention usually craters around the 40–60% mark when a long segment runs out of novelty and viewers bounce before the CTA.",
    impact: "+8–12% retention through the mid-video dip.",
  },
  {
    rank: 3,
    tactic: "Pacing",
    title: "Cut dead air and tighten your cut rhythm",
    problem:
      "Unedited pauses and slow transitions signal 'low production' to the algorithm and train viewers to speed-watch or leave.",
    impact: "+5–10% swipe-away reduction in the first minute.",
  },
];

const FAQS = [
  {
    q: "Do I need to give you access to my channel?",
    a: "No. We only need your public channel URL. The audit is based on proven YouTube retention mechanics applied to your niche and content style.",
  },
  {
    q: "What exactly do I get?",
    a: "Three prioritized fixes — each with the specific drop-off problem, a step-by-step fix you can ship this week, and the retention impact you can expect.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The retention audit is completely free. If you want help implementing the fixes, you can book a strategy call — but there's no obligation.",
  },
];

const TACTIC_COLORS: Record<string, { text: string; bg: string }> = {
  Hook: { text: "text-red-600", bg: "bg-red-50 border-red-200/60" },
  "Pattern Interrupt": { text: "text-amber-600", bg: "bg-amber-50 border-amber-200/60" },
  "Retention Loop": { text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200/60" },
  Pacing: { text: "text-pink-600", bg: "bg-pink-50 border-pink-200/60" },
};

// ─── Page Component ────────────────────────────────────────────────────────────
export default function YouTubeAuditPage() {
  const [channelUrl, setChannelUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [urlError, setUrlError] = useState("");
  const [pageState, setPageState] = useState<PageState>("input");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    try {
      new URL(channelUrl);
    } catch {
      setUrlError("Please enter a valid channel URL (e.g. youtube.com/@yourname)");
      return;
    }

    setPageState("analyzing");
    setAnalysisStep(0);
    setAnalysisProgress(0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 800));
      setAnalysisStep(i);
      setAnalysisProgress(Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100));
    }

    await new Promise((r) => setTimeout(r, 400));
    setPageState("preview");
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailState("sending");
    try {
      const res = await fetch("/api/youtube-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl, email, niche }),
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

      {/* HERO */}
      <section className="relative pt-10 pb-10 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff0000]/10 border border-[#ff0000]/20 text-[#ff0000] font-semibold text-xs tracking-wide uppercase mb-7">
            <span className="material-symbols-outlined text-base">youtube_activity</span>
            Free YouTube Retention Audit
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            Find the <span className="gradient-text">3 Fixes</span> That Will Keep Viewers Watching
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Paste your channel URL. Our AI maps your drop-off points and hands you the three
            highest-impact retention fixes — the ones that actually move average view duration.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "schedule", text: "Audit in ~45 seconds" },
              { icon: "mail", text: "Delivered to inbox" },
              { icon: "trending_up", text: "More watch time" },
              { icon: "paid", text: "100% free" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URL INPUT */}
      <section className="px-6 lg:px-16 pb-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mx-auto">
          {pageState === "input" && (
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff0000] via-[#ff6a00] to-[#ff0000]/50 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-[#ff0000]/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#ff0000] flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-white text-xl">play_circle</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface leading-tight">
                      Enter Your YouTube Channel URL
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      We&apos;ll audit your retention and build your fix list automatically
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ff0000] text-xl">
                        link
                      </span>
                      <input
                        type="url"
                        required
                        placeholder="https://youtube.com/@your-channel"
                        value={channelUrl}
                        onChange={(e) => {
                          setChannelUrl(e.target.value);
                          setUrlError("");
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#ff0000]/30 focus:border-[#ff0000]/50 transition-all text-sm font-medium"
                      />
                    </div>

                    {urlError && (
                      <p className="text-xs text-error flex items-center gap-1 mt-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {urlError}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Your niche (optional) — e.g. tech reviews, fitness, vlogs"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!channelUrl.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#ff0000] text-white font-bold py-4 rounded-xl hover:bg-[#ff0000]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[#ff0000]/20 text-base"
                  >
                    <span className="material-symbols-outlined text-xl">insights</span>
                    Audit My Channel
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    No access needed. Just your public channel URL.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* Analyzing state */}
          {pageState === "analyzing" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000]/5 to-primary/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#ff0000] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#ff0000]/30">
                  <span className="material-symbols-outlined text-white text-3xl animate-pulse">play_circle</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">Auditing Your Channel</h3>
                <p className="text-sm text-on-surface-variant mb-8">{ANALYSIS_STEPS[analysisStep]?.label}</p>

                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff0000] to-[#ff6a00] transition-all duration-700"
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
                          ? "bg-[#ff0000]/10 text-[#ff0000] font-semibold"
                          : "bg-surface-container text-on-surface-variant/40"
                      }`}
                    >
                      {i < analysisStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : i === analysisStep ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse shrink-0" />
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
        <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-red-300 via-amber-300 to-emerald-300 opacity-40" />
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 relative group"
              >
                <div className="absolute -top-4 left-8 bg-surface text-on-surface-variant font-black text-xs tracking-widest px-2 py-1 rounded-full border border-outline-variant/40">
                  {step.step}
                </div>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <span className={`material-symbols-outlined text-3xl ${step.iconColor}`}>{step.icon}</span>
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
        <section ref={previewRef} className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Your Audit Is Ready!
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              Here&apos;s a Sneak Peek of Your 3 Fixes
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Enter your email below to receive the full audit in your inbox — completely free.
            </p>
          </div>

          {/* Email capture */}
          <div className="max-w-xl mx-auto mb-12">
            {emailState === "sent" ? (
              <div className="glass-card rounded-2xl p-6 text-center border border-emerald-200/60 bg-emerald-50/40">
                <span className="material-symbols-outlined text-4xl text-emerald-500 mb-3 block">check_circle</span>
                <h3 className="font-bold text-on-surface mb-1">Check your inbox! 🎉</h3>
                <p className="text-sm text-on-surface-variant">
                  Your retention audit is on its way to <strong>{email}</strong>
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/funnels"
                    className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-6 py-3 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
                  >
                    Explore more free tools
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#ff0000] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#ff0000]/90 transition-all text-sm"
                  >
                    Book a strategy call
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-[#ff0000]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/4 to-primary/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#ff0000] text-xl">mark_email_read</span>
                    <p className="font-bold text-on-surface">Where should we send your audit?</p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#ff0000]/30 focus:border-[#ff0000]/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-[#ff0000] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#ff0000]/90 disabled:opacity-60 transition-all shrink-0 text-sm"
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
                    No spam. Just your retention audit.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sample fix cards (visible) */}
          <div className="space-y-6 mb-16">
            {SAMPLE_FIXES.map((fix) => {
              const tone = TACTIC_COLORS[fix.tactic] || { text: "text-primary", bg: "bg-primary-fixed" };
              return (
                <div key={fix.rank} className="glass-card rounded-3xl p-8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#ff0000] text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {fix.rank}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Fix #{fix.rank}</p>
                        <p className="text-xs text-on-surface-variant">Biggest retention lever</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${tone.bg} ${tone.text}`}>
                      {fix.tactic}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-on-surface mb-5 leading-snug">{fix.title}</h3>

                  <div className="rounded-xl p-4 mb-4" style={{ borderLeft: "3px solid #ef4444", background: "rgba(239,68,68,0.05)" }}>
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1.5">The Drop-Off Problem</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{fix.problem}</p>
                  </div>

                  <div className="rounded-xl p-4 bg-emerald-50/60 border border-emerald-200/50">
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Expected Impact</p>
                    <p className="text-sm text-emerald-800 font-semibold leading-relaxed">{fix.impact}</p>
                  </div>
                </div>
              );
            })}

            <div className="glass-card rounded-3xl p-6 text-center border-2 border-dashed border-outline-variant/40">
              <p className="text-on-surface-variant text-sm mb-1">
                <strong className="text-on-surface">Full step-by-step fixes</strong> are waiting in your inbox
              </p>
              <p className="text-xs text-on-surface-variant/60">
                Each fix includes the exact actions to ship this week
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-16 bg-surface-container-low/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-on-surface">Questions? Answered.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-on-surface text-sm pr-4">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000]/8 via-transparent to-primary/8 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-[#ff0000] uppercase tracking-widest mb-4">Start Today</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
              More Watch Time <span className="gradient-text">Starts Now</span>
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto mb-10">
              Paste your channel URL. Get the 3 retention fixes that will keep viewers watching — free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPageState("input");
                }}
                className="group inline-flex items-center justify-center gap-2 bg-[#ff0000] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#ff0000]/90 transition-all hover:scale-105 shadow-xl hover:shadow-[#ff0000]/20 text-lg"
              >
                <span className="material-symbols-outlined">insights</span>
                Audit My Channel
              </button>
              <Link
                href="/funnels"
                className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-8 py-4 rounded-2xl hover:border-primary/40 hover:text-primary transition-all text-lg"
              >
                See all free tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
