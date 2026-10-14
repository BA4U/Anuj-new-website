import type { Metadata } from "next";
import Link from "next/link";
import WorkShell from "@/components/WorkShell";
import ScrollReveal from "@/components/ScrollReveal";
import YtThumb from "@/components/YtThumb";
import { CASE_STUDIES } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "YouTube Channel Case Studies",
  description: "Client stories and verified YouTube Studio numbers from channels Anuj Mishra edits and grows.",
  alternates: { canonical: "/work/case-studies" },
  openGraph: { title: "Channel Case Studies | Anuj Mishra", url: "https://anuj4u.in/work/case-studies", type: "website" },
};

export default function CaseStudiesPage() {
  const [lead, ...rest] = CASE_STUDIES;
  return (
    <WorkShell
      pill="Case studies"
      title="Clients and"
      accent="their results."
      desc="Numbers from YouTube Studio and words from the people I work with."
      ctaTitle="Your channel could be next."
      ctaText="Start with an audit of your last 10 videos."
    >
      {/* Lead study with verified numbers */}
      <ScrollReveal>
        <article className="card-glow p-6 md:p-10 text-center max-w-5xl mx-auto">
          <p className="eyebrow mb-2">{lead.role}</p>
          <h2 className="text-[28px] md:text-[40px] display text-on-surface mb-3">{lead.client}</h2>
          <p className="text-[16px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">{lead.quote}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {lead.did.map((d) => (
              <span key={d} className="text-[12.5px] rounded-full bg-primary/[0.08] text-primary px-3 py-1">{d}</span>
            ))}
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            {lead.metrics?.map((m) => (
              <div key={m.label} className="rounded-2xl bg-white/70 border border-primary/10 py-5 px-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-[30px] md:text-[38px] font-semibold tracking-[-0.03em] gradient-text leading-none">{m.value}</dd>
                <p className="text-[12.5px] text-on-surface-variant mt-2 leading-snug">{m.label}</p>
              </div>
            ))}
          </dl>
          <Link href="/#proof" className="btn btn-secondary mt-8">
            See the screenshots
          </Link>
        </article>
      </ScrollReveal>

      <ScrollReveal each className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
        {rest.map((c) => (
          <article key={c.client} className="reveal card-glow p-0 text-center overflow-hidden flex flex-col">
            {c.videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${c.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-video bg-surface-container overflow-hidden"
                aria-label={`Watch a video edited for ${c.client}`}
              >
                <YtThumb id={c.videoId} alt={`Video edited for ${c.client}`} />
              </a>
            )}
            <div className={`p-6 flex-1 flex flex-col items-center ${c.videoId ? "" : "justify-center py-10"}`}>
              <p className="eyebrow mb-1.5 !text-[10.5px]">{c.role}</p>
              <h3 className="text-[22px] font-semibold text-on-surface mb-2">{c.client}</h3>
              <p className="text-[15px] text-on-surface-variant leading-relaxed mb-4">&ldquo;{c.quote}&rdquo;</p>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {c.did.map((d) => (
                  <span key={d} className="text-[12px] rounded-full bg-primary/[0.08] text-primary px-2.5 py-1">{d}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </ScrollReveal>
    </WorkShell>
  );
}
