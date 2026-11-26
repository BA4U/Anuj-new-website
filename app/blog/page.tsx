import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog & Growth Notes: YouTube & LinkedIn Playbooks | Anuj Mishra",
  description:
    "Actionable, tested playbooks on YouTube channel growth, video retention, thumbnail packaging, and LinkedIn B2B inbound strategy by Anuj Mishra.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog & Growth Notes | Anuj Mishra",
    description: "Actionable playbooks on YouTube growth and LinkedIn B2B strategy.",
    url: "https://anuj4u.in/blog",
    type: "website",
  },
};

const POST_METADATA_MAP: Record<string, { cover: string; category: string; readTime: string }> = {
  "linkedin-growth-guide-2025": {
    cover: "/thumbnails/mastering-google-workspace-flows.webp",
    category: "LinkedIn Authority",
    readTime: "6 min read",
  },
  "youtube-growth-playbook-2025": {
    cover: "/thumbnails/chatgpt-o1-vs-claude-coding-battle.webp",
    category: "YouTube Growth",
    readTime: "8 min read",
  },
  "linkedin-growth-blueprint": {
    cover: "/thumbnails/top-5-gpts-worth-50k.webp",
    category: "Inbound Funnels",
    readTime: "5 min read",
  },
};

const fmt = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export default function BlogIndex() {
  return (
    <div className="relative overflow-hidden min-h-screen py-12 md:py-20">
      {/* Signature Ambient Auroras */}
      <div className="aurora aurora-a w-[540px] h-[540px] -top-32 -left-32 opacity-45 pointer-events-none" />
      <div className="aurora aurora-b w-[500px] h-[500px] top-1/2 -right-36 opacity-35 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-14 md:mb-16 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase mb-4 border border-primary/20 shadow-sm">
            Growth Playbooks
          </span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-extrabold tracking-tight text-on-surface mb-4 leading-tight">
            Notes on <span className="gradient-text">growth &amp; retention.</span>
          </h1>
          <p className="text-[16.5px] sm:text-[18px] text-on-surface-variant leading-relaxed">
            Data-backed breakdowns, algorithm experiments, and packaging playbooks from real client channels.
          </p>
        </header>

        {/* Visual-First Blog Card Grid */}
        <ScrollReveal each className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 mb-20">
          {POSTS.map((p) => {
            const meta = POST_METADATA_MAP[p.slug] || {
              cover: "/thumbnails/chatgpt-connectors-explained.webp",
              category: "Content Strategy",
              readTime: "5 min read",
            };

            return (
              <article key={p.slug} className="flex flex-col h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="reveal group card-glow spotlight rounded-[26px] p-0 flex flex-col h-full overflow-hidden border border-white/70 shadow-[0_15px_40px_-15px_rgba(73,54,230,0.18)] hover:shadow-[0_25px_60px_-18px_rgba(73,54,230,0.35)] transition-all duration-300"
                >
                  {/* Visual Cover Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                    <Image
                      src={meta.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                    {/* Category pill */}
                    <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      {meta.category}
                    </span>

                    {/* Reading time */}
                    <span className="absolute bottom-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
                      {meta.readTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <time dateTime={p.date} className="text-[11.5px] font-semibold text-primary uppercase tracking-wider block mb-2">
                        {fmt(p.date)}
                      </time>
                      <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-on-surface leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                        {p.title}
                      </h2>
                      <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                        {p.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-primary">
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read full playbook
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </ScrollReveal>

        {/* Lead Capture Banner */}
        <section className="card-glow spotlight rounded-[32px] p-8 md:p-12 text-center max-w-3xl mx-auto border border-primary/25 shadow-xl relative overflow-hidden">
          <span className="material-symbols-outlined text-3xl text-primary mb-2">auto_awesome</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-3">
            Want these frameworks applied to your channel?
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-7 max-w-lg mx-auto">
            Get a tailored 30-day retention and packaging roadmap specifically for your niche.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/youtube-funnel" className="btn btn-glow font-bold text-sm px-7 py-3">
              Audit My Channel Free
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link href="/contact" className="btn btn-secondary font-semibold text-sm px-6 py-3">
              Book a Strategy Call
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
