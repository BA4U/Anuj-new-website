import type { Metadata } from "next";
import Link from "next/link";
import WorkShell from "@/components/WorkShell";
import ScrollReveal from "@/components/ScrollReveal";
import CaseShots from "@/components/CaseShots";
import PlayThumb from "@/components/PlayThumb";
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

      {/* Testimonial edit portfolio section */}
      <TestimonialVideoSection />
    </WorkShell>
  );
}

function TestimonialVideoSection() {
  const videoTestimonials = [
    { id: "TVjGyWn4RhM", title: "Video testimonial edit", client: "", caption: "" },
    { id: "nw3AbdcMpzg", title: "Video testimonial edit", client: "", caption: "" },
  ];

  const sampleEdits = [
    { id: "TJR9l12hN0I", title: "Battle of the AI Titans", client: "Tim Cakir", caption: "Short-form edit" },
    { id: "klcoy936_mo", title: "How I Use Notion as My Second Brain Daily", client: "Tim Cakir", caption: "Short-form edit" }
  ];

  return (
    <section className="mt-16 md:mt-24" aria-label="Video testimonial edits">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="eyebrow mb-2">Testimonial edits</p>
        <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-2">
          Video testimonial edits I’ve cut for clients.
        </h2>
        <p className="text-[16px] text-on-surface-variant leading-relaxed">
          A few testimonial edits I cut for clients.
        </p>
      </div>

      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videoTestimonials.map(c => (
              <div key={c.id} className="card-glow p-3">
                <PlayThumb id={c.id} title={c.title} />
                <div className="p-3">
                  <p className="text-[12.5px] font-medium text-on-surface truncate">{c.title}</p>
                  {c.client && <p className="text-[11.5px] text-on-surface-variant truncate">{c.client}</p>}
                  {c.caption && <p className="text-[11.5px] text-on-surface-variant truncate mt-0.5">{c.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glow p-6">
          <p className="label mb-2 !text-[11px]">Video editing sample</p>
          <h3 className="text-[18px] font-semibold text-on-surface mb-2">Real feedback, not a script.</h3>
          <p className="text-[15px] text-on-surface-variant leading-relaxed">
            This is how a client responded when I sent back the first cut of their video. The clip is short on purpose — it shows the kind of back-and-forth I aim for on every project.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Client sent a raw clip or long take.",
              "I edited it to the client’s brief — pacing, captions, sound, ends.",
              "They replied with feedback like the clip above."
            ].map(b => (
              <li key={b} className="flex items-start gap-3 text-[14.5px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">check_circle</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 label mb-3 !text-[11px]">More video editing samples</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleEdits.map(s => (
              <div key={s.id} className="relative overflow-hidden rounded-xl bg-surface-container">
                <PlayThumb id={s.id} title={s.title} />
                <div className="p-3">
                  <p className="text-[12.5px] font-medium text-on-surface truncate">{s.title}</p>
                  <p className="text-[11.5px] text-on-surface-variant truncate">{s.client}</p>
                  {s.caption && <p className="text-[11.5px] text-on-surface-variant truncate mt-0.5">{s.caption}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link href="/work/long-form" className="btn btn-glow">See long-form edits</Link>
            <Link href="/contact" className="btn btn-secondary">Ask about a sample edit</Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
