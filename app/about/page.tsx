import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anuj, Content Operator & Growth Partner",
  description: "Anuj Mishra runs content operations for coaches, authors, and founders across YouTube and LinkedIn. Founder of Anuj 4u, working with clients worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anuj Mishra | Content Operator & Growth Partner",
    description: "Founder of Anuj 4u. Runs content operations for coaches, authors, and founders across YouTube and LinkedIn.",
    url: "https://anuj4u.in/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Anuj Mishra | Content Operator & Growth Partner",
    description: "Founder of Anuj 4u. Runs content operations for coaches, authors, and founders across YouTube and LinkedIn.",
  },
};

const stats = [
  { value: "50+", label: "Channels served" },
  { value: "5+", label: "Years in content" },
  { value: "2", label: "Platforms run daily" },
  { value: "5", label: "Continents of clients" },
];

const story = [
  {
    year: "Where it started",
    title: "I started with a YouTube channel, not a service business.",
    body: "I launched my first YouTube channel to learn the craft. Editing my own videos, writing my own titles, designing my own thumbnails. I learned what works because the channel would not lie to me, either it grew or it did not.",
  },
  {
    year: "Then",
    title: "I started taking freelance editing work.",
    body: "Coaches and creators started asking if I could edit their videos too. I said yes, took on client work alongside my own channels, and that is when the real education began. Every project taught me what a paid client actually needs, which is different from what an algorithm rewards.",
  },
  {
    year: "Now",
    title: "I run content operations, not just edits.",
    body: "Today I work with a small group of clients as their content operator. That means strategy, scripts, edits, thumbnails, LinkedIn content, and reporting, all of it. I built the playbook for my own channels and now I apply it to client work, week in and week out.",
  },
];

const results = [
  { metric: "223K", label: "Views in 365 days", client: "Tim Cakir, YouTube channel" },
  { metric: "13.0%", label: "Thumbnail click rate", client: "Tim Cakir, Connectors Explained" },
  { metric: "+63%", label: "Views vs the previous 90 days", client: "Tim Cakir, YouTube channel" },
];

const trustedBy = [
  { name: "Victor Chan", role: "Launch Excel", icon: "smart_display" },
  { name: "Harjeet Dhillon", role: "Author & Actress", icon: "auto_stories" },
  { name: "Dr. Maurice Maurer", role: "Science Educator", icon: "school" },
  { name: "Blake Reddy", role: "Wealth Adviser", icon: "account_balance" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        {/* Hero: text left, photo right */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-24">
          <div className="text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1">
            <p className="eyebrow mb-4">About</p>
            <h1 className="text-[40px] sm:text-[52px] md:text-[60px] display text-on-surface mb-5">
              Hi, I&apos;m <span className="gradient-text">Anuj.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed max-w-md mb-7">
              I edit video and manage production end to end: social media, blog editing, publishing and packaging. I can also automate a full channel, from script to report.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link href="/contact" className="btn btn-glow">Book a call</Link>
              <Link href="/work" className="btn btn-secondary">See my work</Link>
            </div>
          </div>
          <div className="relative max-w-[380px] w-full mx-auto order-1 md:order-2">
            <div
              className="absolute -inset-4 rounded-[40px] opacity-70 blur-3xl"
              style={{ background: "linear-gradient(135deg, rgba(73,54,230,0.5), rgba(192,132,252,0.2))" }}
            />
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/60 bg-surface-container-low shadow-[0_50px_90px_-40px_rgba(73,54,230,0.6)]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Anuj Mishra"
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 md:mb-24">
          <div className="card-glow grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-primary/10">
            {stats.map((st) => (
              <div key={st.label} className="px-4 py-6 md:py-8 text-center">
                <div className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] gradient-text leading-none">{st.value}</div>
                <div className="text-[13px] text-on-surface-variant mt-2">{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-16 md:mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow mb-3">My story</p>
            <h2 className="text-[30px] md:text-[44px] display text-on-surface">How I got here</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {story.map((st) => (
              <div key={st.title} className="card-glow p-6 text-center">
                <p className="label mb-2 !text-[11px]">{st.year}</p>
                <h3 className="text-[18px] font-semibold text-on-surface mb-2 leading-snug">{st.title}</h3>
                <p className="text-[14.5px] text-on-surface-variant leading-relaxed">{st.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-16 md:mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow mb-3">Results</p>
            <h2 className="text-[30px] md:text-[44px] display text-on-surface">Numbers from a real channel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {results.map((r) => (
              <div key={r.label} className="card-glow p-6 text-center">
                <div className="text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] gradient-text leading-none mb-2">{r.metric}</div>
                <div className="text-[14px] font-medium text-on-surface mb-1">{r.label}</div>
                <div className="text-[13px] text-on-surface-variant">{r.client}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="mb-16 md:mb-24">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="eyebrow mb-3">Happy clients</p>
            <h2 className="text-[26px] md:text-[34px] display text-on-surface">Creators and brands I work with</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustedBy.map((c) => (
              <div key={c.name} className="card-glow py-5 px-3 text-center flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-primary/70 text-[24px]">{c.icon}</span>
                <span className="font-semibold text-on-surface text-[14px]">{c.name}</span>
                <span className="text-[12px] text-on-surface-variant">{c.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-3">Let us work on your channel.</h2>
            <p className="text-[16px] text-on-surface-variant leading-relaxed mb-7 max-w-lg">
              Start with an audit of your last 10 videos, or book a call and we will look at your goals together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/youtube-funnel" className="btn btn-glow">Audit my channel</Link>
              <Link href="/contact" className="btn btn-secondary">Book a call</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
