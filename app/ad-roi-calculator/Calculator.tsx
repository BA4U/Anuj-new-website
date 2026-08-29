"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Currency = "INR" | "USD";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
};

type Result = {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  cpc: number;
  cpa: number;
  roas: number;
  profit: number;
  verdict: "excellent" | "good" | "okay" | "poor";
  verdictLabel: string;
  verdictColor: string;
  verdictDescription: string;
};

function formatMoney(value: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOL[currency];
  if (value >= 10_000_000) return `${symbol}${(value / 10_000_000).toFixed(2)}Cr`;
  if (value >= 100_000) return `${symbol}${(value / 100_000).toFixed(2)}L`;
  if (value >= 1_000) return `${symbol}${(value / 1_000).toFixed(1)}K`;
  return `${symbol}${value.toFixed(0)}`;
}

function compute(spend: number, ctrPct: number, convPct: number, aov: number, currency: Currency): Result {
  // Final, honest model:
  //   Clicks       = (spend / CPM) * 1000 * (CTR% / 100)      assume CPM = $10 (or ₹800)
  //   Conversions  = Clicks * (Conv% / 100)
  //   Revenue      = Conversions * AOV
  //   CPA          = spend / max(conversions, 1)
  //   ROAS         = revenue / spend
  //   Profit       = revenue - spend
  //   CPC          = spend / max(clicks, 1)

  const cpm = currency === "USD" ? 10 : 800;
  const impressionsDerived = (spend / cpm) * 1000;
  const clicksDerived = impressionsDerived * (ctrPct / 100);
  const conversionsDerived = clicksDerived * (convPct / 100);
  const revenueDerived = conversionsDerived * aov;
  const cpcDerived = clicksDerived > 0 ? spend / clicksDerived : 0;
  const cpaDerived = conversionsDerived > 0 ? spend / conversionsDerived : 0;
  const roasDerived = spend > 0 ? revenueDerived / spend : 0;
  const profitDerived = revenueDerived - spend;

  let verdict: Result["verdict"] = "poor";
  let verdictLabel = "Losing money";
  let verdictColor = "text-red-600";
  let verdictDescription = "Your numbers are below break-even. Tighten the ad creative or targeting before scaling.";

  if (roasDerived >= 4) {
    verdict = "excellent";
    verdictLabel = "Excellent ROAS";
    verdictColor = "text-emerald-600";
    verdictDescription = "This creative is a money printer. Scale the budget and ship variations to protect it from creative fatigue.";
  } else if (roasDerived >= 2) {
    verdict = "good";
    verdictLabel = "Profitable — scale it";
    verdictColor = "text-emerald-600";
    verdictDescription = "You're comfortably profitable. Test new audiences and double down on what's working.";
  } else if (roasDerived >= 1) {
    verdict = "okay";
    verdictLabel = "Break-even zone";
    verdictColor = "text-amber-600";
    verdictDescription = "You're covering costs but not making meaningful profit. Optimize the funnel before spending more.";
  }

  return {
    impressions: Math.round(impressionsDerived),
    clicks: Math.round(clicksDerived),
    conversions: Math.round(conversionsDerived),
    revenue: revenueDerived,
    cpc: cpcDerived,
    cpa: cpaDerived,
    roas: roasDerived,
    profit: profitDerived,
    verdict,
    verdictLabel,
    verdictColor,
    verdictDescription,
  };
}

type Tips = {
  primary: string;
  secondary: string;
  tertiary: string;
};

function generateTips(result: Result, spend: number, ctrPct: number, convPct: number): Tips {
  if (result.roas >= 2) {
    return {
      primary:
        "Scale the budget by 20% every 48 hours. Sudden jumps reset the learning phase and tank your CPM.",
      secondary:
        "Build 3 new creatives using your current winner's hook — same first 3 seconds, different angles for the rest.",
      tertiary:
        "Move 10% of your budget to a lookalike audience of purchasers, not the broad audience. Higher intent, lower CPA.",
    };
  }
  if (result.roas >= 1) {
    return {
      primary:
        "Your CTR is the first lever. Test 5 new hooks in the first 3 seconds — that single metric usually moves ROAS more than any other.",
      secondary:
        "Tighten your landing page above the fold. Match the headline to the ad's exact promise. A 1% lift in conversion rate often doubles profitability.",
      tertiary:
        "Cut your 20% worst-performing audiences/placements before adding budget. Refresh the surviving 80% first.",
    };
  }
  // Poor — different advice for CTR vs conversion
  if (ctrPct < 1.0) {
    return {
      primary:
        "Your creative isn't stopping the scroll. Test pattern-interrupt hooks in the first second — text on screen, a question, or a stat that breaks the feed rhythm.",
      secondary:
        "Try a 9:16 vertical format if you're running square. Vertical creatives consistently beat square on Meta by 30%+ on thumb-stop ratio.",
      tertiary:
        "Run a 5-second unskippable hook test. If the hook itself flops, the rest of the ad never gets a chance.",
    };
  }
  if (convPct < 1.5) {
    return {
      primary:
        "The click is happening but the page isn't closing. Cut every step between the ad click and the checkout — one tap, one decision, one form field.",
      secondary:
        "Add a single, time-bound offer above the fold (e.g. 'free shipping until Sunday'). Anchors action when the page itself feels generic.",
      tertiary:
        "Add social proof within the first scroll: reviews, customer count, or 'as seen in'. Conversion rates jump 15–30% with proof in the hero.",
    };
  }
  return {
    primary:
      "Your unit economics need a creative overhaul. The offer itself isn't compelling enough at the price point. Test a stronger hook AND a smaller, more specific audience.",
    secondary:
      "Lower your daily budget and raise the bid. Smaller, higher-intent audiences convert better than broad reach at this stage.",
    tertiary:
      "Pause the campaign for 7 days, then relaunch with refreshed creative. The algorithm needs new signal to escape a losing pattern.",
  };
}

const FAQS = [
  {
    q: "What is ROAS?",
    a: "ROAS = Return on Ad Spend. It's the revenue you earn for every rupee or dollar you spend on ads. A ROAS of 3 means you made ₹3 for every ₹1 spent.",
  },
  {
    q: "What's a good ROAS?",
    a: "It depends on your margins. E-commerce brands usually need 3×+ to be safely profitable. Lead-gen businesses often target 5×+ because each lead is worth more over time.",
  },
  {
    q: "How are impressions and clicks calculated here?",
    a: "We assume an average CPM (cost per 1,000 impressions) of $10 USD / ₹800 INR, then apply your CTR to get clicks and your conversion rate to get sales. Real CPMs vary by niche, country, and platform — use your own ad manager numbers for the truest read.",
  },
  {
    q: "What if I don't know my exact CTR or conversion rate?",
    a: "Use your last 30-day average from the ad platform. If you have no data yet, start with industry baselines: 1% CTR on Meta, 2% on Google Search, and 1–3% conversion rate on most landing pages.",
  },
];

export default function Calculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [spend, setSpend] = useState(50000);
  const [ctr, setCtr] = useState(1.5);
  const [conv, setConv] = useState(2.0);
  const [aov, setAov] = useState(currency === "INR" ? 1500 : 75);
  const [showFullTips, setShowFullTips] = useState(false);

  // Keep AOV currency synced when user toggles currency
  React.useEffect(() => {
    setAov(currency === "INR" ? 1500 : 75);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const result = useMemo(
    () => compute(spend, ctr, conv, aov, currency),
    [spend, ctr, conv, aov, currency]
  );
  const tips = useMemo(() => generateTips(result, spend, ctr, conv), [result, spend, ctr, conv]);

  const symbol = CURRENCY_SYMBOL[currency];
  const breakEvenRoas = 1;

  // Fire-and-forget analytics on first meaningful result
  const hasLoggedRef = useRef(false);
  useEffect(() => {
    if (hasLoggedRef.current || spend === 0) return;
    hasLoggedRef.current = true;
    fetch("/api/ad-roi-calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency,
        spend,
        ctr,
        conversionRate: conv,
        aov,
        roas: result.roas,
        verdict: result.verdictLabel,
      }),
    }).catch(() => {});
  }, [currency, spend, ctr, conv, aov, result.roas, result.verdictLabel]);

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-50" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* HERO */}
      <section className="relative pt-10 pb-6 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-semibold text-xs tracking-wide uppercase mb-7">
            <span className="material-symbols-outlined text-base">calculate</span>
            Free Ad Creative ROI Calculator
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            Is Your Ad <span className="gradient-text">Actually Profitable?</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Drop in your numbers. Get instant ROAS, CPA, and revenue — plus 3 tips to improve
            them. No sign-up, no email required.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="px-6 lg:px-16 pb-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* INPUT CARD */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-primary to-emerald-500/50 rounded-t-3xl" />

              {/* Currency toggle */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">Your Numbers</h2>
                <div className="inline-flex rounded-full border border-outline-variant/50 p-1 text-xs font-semibold">
                  {(["INR", "USD"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        currency === c
                          ? "bg-primary text-white"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    <span>Ad Spend</span>
                    <span className="text-on-surface">{symbol}{spend.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={currency === "USD" ? 100 : 5000}
                    max={currency === "USD" ? 100000 : 5_000_000}
                    step={currency === "USD" ? 100 : 1000}
                    value={spend}
                    onChange={(e) => setSpend(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant/60 mt-1">
                    <span>{symbol}{currency === "USD" ? "100" : "5,000"}</span>
                    <span>{symbol}{currency === "USD" ? "100K" : "50L"}</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    <span>CTR (click-through rate)</span>
                    <span className="text-on-surface">{ctr.toFixed(2)}%</span>
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={10}
                    step={0.1}
                    value={ctr}
                    onChange={(e) => setCtr(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant/60 mt-1">
                    <span>0.1%</span>
                    <span>10%</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    <span>Conversion Rate</span>
                    <span className="text-on-surface">{conv.toFixed(2)}%</span>
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={15}
                    step={0.1}
                    value={conv}
                    onChange={(e) => setConv(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant/60 mt-1">
                    <span>0.1%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    <span>Average Order Value</span>
                    <span className="text-on-surface">{symbol}{aov.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={currency === "USD" ? 10 : 200}
                    max={currency === "USD" ? 2000 : 50_000}
                    step={currency === "USD" ? 10 : 100}
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant/60 mt-1">
                    <span>{symbol}{currency === "USD" ? "10" : "200"}</span>
                    <span>{symbol}{currency === "USD" ? "2,000" : "50K"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS CARD */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-3xl p-7 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  Your Result
                </p>
                <div className="flex items-end gap-3 mb-1 flex-wrap">
                  <div className={`text-6xl md:text-7xl font-extrabold ${result.verdictColor}`}>
                    {result.roas.toFixed(2)}x
                  </div>
                  <div className="text-on-surface-variant font-semibold text-lg mb-2">ROAS</div>
                </div>
                <p className={`font-bold text-lg mb-3 ${result.verdictColor}`}>{result.verdictLabel}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {result.verdictDescription}
                </p>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Revenue", value: formatMoney(result.revenue, currency), color: "text-emerald-600" },
                    { label: "Profit", value: formatMoney(result.profit, currency), color: result.profit >= 0 ? "text-emerald-600" : "text-red-600" },
                    { label: "CPA", value: formatMoney(result.cpa, currency), color: "text-on-surface" },
                    { label: "CPC", value: result.cpc > 0 ? formatMoney(result.cpc, currency) : "—", color: "text-on-surface" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-surface-container-low p-4"
                    >
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                        {m.label}
                      </p>
                      <p className={`text-xl md:text-2xl font-extrabold ${m.color}`}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Volume stats */}
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    {result.impressions.toLocaleString()} est. impressions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">ads_click</span>
                    {result.clicks.toLocaleString()} est. clicks
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    {result.conversions.toLocaleString()} est. sales
                  </div>
                </div>
              </div>
            </div>

            {/* TIPS CARD */}
            <div className="glass-card rounded-3xl p-7 md:p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-white text-xl">lightbulb</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">3 Tips to Improve This</h3>
                  <p className="text-xs text-on-surface-variant">Based on your numbers</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-sm text-on-surface leading-relaxed">{tips.primary}</p>
                </li>
                <li className="flex gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-sm text-on-surface leading-relaxed">{tips.secondary}</p>
                </li>
                <li className="flex gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-sm text-on-surface leading-relaxed">{tips.tertiary}</p>
                </li>
              </ul>

              <button
                onClick={() => setShowFullTips((p) => !p)}
                className="mt-5 w-full flex items-center justify-center gap-1.5 text-emerald-700 text-sm font-semibold hover:text-emerald-800 transition-colors"
              >
                {showFullTips ? "Hide" : "See"} the playbook behind these tips
                <span
                  className={`material-symbols-outlined text-base transition-transform ${showFullTips ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>

              {showFullTips && (
                <div className="mt-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed">
                  <p className="mb-3">
                    These tips come from running paid campaigns for creators, SaaS, and e-com.
                    The framework is the same: <strong>fix the metric with the biggest gap to break-even first.</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>ROAS &lt; 1 and CTR &lt; 1% → fix the creative, not the funnel.</li>
                    <li>ROAS &lt; 1 and CTR &ge; 1% → fix the landing page or offer.</li>
                    <li>ROAS &ge; 2 → protect the creative from fatigue with weekly refreshes.</li>
                    <li>ROAS &ge; 4 → you found a winner. Scale slowly (20% every 2 days) to avoid resetting learning.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 lg:px-16 bg-surface-container-low/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-on-surface">Questions? Answered.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-on-surface text-sm pr-4">{faq.q}</span>
                  <span className="material-symbols-outlined text-emerald-600 shrink-0 transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — back to funnels */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500/30 shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">
              Want your ads <span className="gradient-text">actually managed?</span>
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg mb-8">
              I run Google and LinkedIn ad campaigns for creators and brands — creative, targeting,
              landing pages, and weekly reporting. No long contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all"
              >
                Book a strategy call
                <span className="material-symbols-outlined">send</span>
              </Link>
              <Link
                href="/funnels"
                className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary/40 hover:text-primary transition-all"
              >
                See all free tools
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
