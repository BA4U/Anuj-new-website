import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog: YouTube and LinkedIn Growth Notes",
  description: "Practical notes on YouTube growth, video editing and LinkedIn, from Anuj Mishra's own research and client work.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Anuj Mishra", url: "https://anuj4u.in/blog", type: "website" },
};

const fmt = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function BlogIndex() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <p className="eyebrow mb-4">Blog</p>
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] display text-on-surface mb-4">
            Notes on <span className="gradient-text">growth.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed">
            Research and lessons from my own channels and client work.
          </p>
        </header>

        <ScrollReveal each className="grid grid-cols-1 gap-5">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="reveal group card-glow spotlight p-6 md:p-8 text-center flex flex-col items-center">
              <time dateTime={p.date} className="label mb-2 !text-[11px]">{fmt(p.date)}</time>
              <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] text-on-surface group-hover:text-primary transition-colors max-w-2xl">
                {p.title}
              </h2>
              <p className="text-[15px] md:text-[16px] text-on-surface-variant leading-relaxed mt-3 max-w-xl">{p.excerpt}</p>
              <span className="text-[13.5px] font-medium text-primary inline-flex items-center gap-1 mt-4">
                Read post
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </Link>
          ))}
        </ScrollReveal>

        <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto mt-14 flex flex-col items-center">
          <h2 className="text-[26px] md:text-[34px] display text-on-surface mb-3">Get a 30-day plan for your channel.</h2>
          <p className="text-[16px] text-on-surface-variant leading-relaxed mb-7 max-w-lg">
            Paste your channel link and the plan lands in your inbox.
          </p>
          <Link href="/youtube-funnel" className="btn btn-glow">
            Audit my channel
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
