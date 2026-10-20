import type { Metadata } from "next";
import Link from "next/link";
import WorkShell from "@/components/WorkShell";
import ScrollReveal from "@/components/ScrollReveal";
import CaseShots from "@/components/CaseShots";
import { CASE_STUDIES } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Case Study: Tim Cakir YouTube Channel",
  description: "How video editing, packaging and channel growth helped Tim Cakir's AI channel reach 12.3K subscribers and win a $50,000 client from YouTube.",
  alternates: { canonical: "/work/case-studies" },
  openGraph: { title: "Case Study: Tim Cakir | Anuj Mishra", url: "https://anuj4u.in/work/case-studies", type: "website" },
};

export default function CaseStudiesPage() {
  const [study] = CASE_STUDIES;
  return (
    <WorkShell
      pill="Case study"
      title="From views to"
      accent="real revenue."
      desc="One channel, twelve months: better edits and thumbnails, a growing audience and a client worth $50,000 who came straight from YouTube."
      ctaTitle="Your channel could be next."
      ctaText="Start with an audit of your last 10 videos."
    >
      <ScrollReveal>
        <article className="card-glow p-6 md:p-10 text-center max-w-5xl mx-auto">
          <p className="eyebrow mb-2">{study.role}</p>
          <h2 className="text-[28px] md:text-[40px] display text-on-surface mb-3">{study.client}</h2>
          <p className="text-[16px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">{study.quote}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {study.did.map((d) => (
              <span key={d} className="text-[12.5px] rounded-full bg-primary/[0.08] text-primary px-3 py-1">{d}</span>
            ))}
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            {study.metrics?.map((m) => (
              <div key={m.label} className="rounded-2xl bg-white/70 border border-primary/10 py-5 px-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-[30px] md:text-[40px] font-extrabold tracking-[-0.03em] gradient-text leading-none">{m.value}</dd>
                <p className="text-[12.5px] text-on-surface-variant mt-2 leading-snug">{m.label}</p>
              </div>
            ))}
          </dl>
        </article>
      </ScrollReveal>

      <ScrollReveal className="max-w-3xl mx-auto mt-14 md:mt-20 text-center">
        <p className="eyebrow mb-2">What I did</p>
        <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-4">
          Content built to <span className="gradient-text">earn the click and the client.</span>
        </h2>
        <p className="text-[16.5px] text-on-surface-variant leading-relaxed">
          I edited the long-form videos and Shorts, designed the thumbnails and sharpened the titles so more of the right people clicked. Steady uploads and a clear style kept them watching, and the channel kept growing quarter after quarter.
        </p>
      </ScrollReveal>

      <ScrollReveal className="mt-12 md:mt-16">
        <div className="text-center mb-6">
          <p className="eyebrow mb-1">The proof</p>
          <h2 className="text-[22px] md:text-[28px] display text-on-surface">Straight from YouTube Studio</h2>
        </div>
        <CaseShots />
        <div className="flex justify-center mt-10">
          <Link href="/testimonials" className="btn btn-secondary">Read what clients say</Link>
        </div>
      </ScrollReveal>
    </WorkShell>
  );
}
