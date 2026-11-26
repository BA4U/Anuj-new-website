import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/blog-posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Anuj Mishra`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://anuj4u.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Anuj Mishra"],
    },
  };
}

const fmt = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const meta = {
    cover: post.cover || "/blog/claude-ai-video-editing.jpg",
    category: post.category || "Growth Playbook",
    readTime: post.readTime || "7 min read",
  };

  const otherPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Anuj Mishra", url: "https://anuj4u.in/about" },
    publisher: { "@type": "Person", name: "Anuj Mishra" },
    mainEntityOfPage: `https://anuj4u.in/blog/${post.slug}`,
  };

  return (
    <article className="min-h-screen relative overflow-hidden py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Signature Ambient Auroras */}
      <div className="aurora aurora-a w-[540px] h-[540px] -top-32 -left-32 opacity-40 pointer-events-none" />
      <div className="aurora aurora-b w-[500px] h-[500px] top-1/2 -right-36 opacity-30 pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to all playbooks
        </Link>

        {/* Article Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {meta.category}
            </span>
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              {meta.readTime}
            </span>
            <time dateTime={post.date} className="text-xs font-medium text-neutral-500">
              {fmt(post.date)}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.18] mb-6">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center justify-center sm:justify-start gap-3.5 pt-4 border-t border-black/[0.06]">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-neutral-900 border-2 border-primary/30 shadow-md">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Anuj Mishra"
                fill
                sizes="44px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-on-surface">Anuj Mishra</p>
                <span className="material-symbols-outlined text-primary text-[16px]" title="Verified Partner">
                  verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">Solo YouTube Growth Partner &amp; Editor</p>
            </div>
          </div>
        </header>

        {/* Visual Hero Banner */}
        <div className="relative aspect-[16/9] w-full rounded-[28px] overflow-hidden bg-neutral-950 shadow-[0_20px_50px_-20px_rgba(73,54,230,0.35)] border border-white/70 mb-12">
          <Image
            src={meta.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 860px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Executive Summary / TL;DR Box */}
        <div className="card-glow spotlight rounded-2xl p-6 md:p-7 border border-primary/25 shadow-md mb-12 bg-gradient-to-br from-primary/[0.04] to-purple-500/[0.02]">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            Quick Takeaway &amp; Summary
          </div>
          <p className="text-sm md:text-[15px] text-on-surface-variant leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Formatted Article Body */}
        <div className="space-y-6 text-[16.5px] sm:text-[17.5px] leading-[1.75] text-neutral-800">
          {post.blocks.map((b, i) => {
            // Heading blocks
            if (b[0] === "h") {
              const text = b[1];
              const isMajorStep = text.startsWith("Step") || text.startsWith("Part") || /^\d+\./.test(text);

              return (
                <div key={i} className="pt-8 pb-1">
                  {isMajorStep && (
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2 border border-primary/15">
                      Milestone Framework
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface leading-snug">
                    {text}
                  </h2>
                </div>
              );
            }

            // Bullet lists
            if (b[0] === "ul") {
              return (
                <div key={i} className="my-5 p-5 sm:p-6 rounded-2xl bg-neutral-900/[0.03] border border-black/[0.06] shadow-2xs">
                  <ul className="space-y-3">
                    {b[1].map((li, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-neutral-800">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            // Paragraphs & Callout Detection
            const pText = b[1];
            const isTip = pText.startsWith("Pro Tip:") || pText.startsWith("Tool:") || pText.startsWith("SEO Hack:") || pText.startsWith("Result:");

            if (isTip) {
              return (
                <div
                  key={i}
                  className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-primary/5 to-transparent border-l-4 border-primary text-sm sm:text-base font-medium text-neutral-900 shadow-2xs flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div>{pText}</div>
                </div>
              );
            }

            return <p key={i} className="text-neutral-700">{pText}</p>;
          })}
        </div>

        {/* Author Bio Box */}
        <section className="card-glow spotlight rounded-[28px] p-7 sm:p-9 border border-white/70 shadow-lg mt-16 mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/40 shadow-md bg-neutral-900">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
              alt="Anuj Mishra"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="font-bold text-lg text-on-surface">Anuj Mishra</h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                YouTube Growth Partner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
              I partner directly with founders, creators, and B2B leaders to scale high-retention video systems, custom packaging, and omnichannel distribution with zero agency handoffs.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link href="/youtube-funnel" className="btn btn-primary text-xs px-5 py-2">
                Audit My Channel
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </Link>
              <Link href="/about" className="btn btn-secondary text-xs px-4 py-2">
                About Anuj
              </Link>
            </div>
          </div>
        </section>

        {/* Read More Section */}
        {otherPosts.length > 0 && (
          <section className="border-t border-black/[0.08] pt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-6">
              More Growth Playbooks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => {
                const otherCover = p.cover || "/blog/claude-ai-video-editing.jpg";
                const otherCategory = p.category || "Strategy";
                const otherReadTime = p.readTime || "5 min read";

                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="card-glow spotlight rounded-2xl p-5 border border-white/60 hover:shadow-md transition-all group block"
                  >
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-neutral-900">
                      <Image
                        src={otherCover}
                        alt={p.title}
                        fill
                        sizes="380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      {otherCategory} • {otherReadTime}
                    </span>
                    <h4 className="font-bold text-sm text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
