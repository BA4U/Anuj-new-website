import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/blog-posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
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
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

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
    <article className="max-w-[720px] mx-auto px-5 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="text-center flex flex-col items-center mb-10">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13.5px] text-on-surface-variant hover:text-primary transition-colors mb-6">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          All posts
        </Link>
        <time dateTime={post.date} className="eyebrow mb-3">{fmt(post.date)}</time>
        <h1 className="text-[30px] sm:text-[40px] md:text-[48px] display text-on-surface">{post.title}</h1>
        <p className="text-[14px] text-on-surface-variant mt-4">By Anuj Mishra</p>
      </header>

      <div className="space-y-5 text-[17px] leading-[1.7] text-on-surface">
        {post.blocks.map((b, i) => {
          if (b[0] === "h")
            return (
              <h2 key={i} className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] pt-6">
                {b[1]}
              </h2>
            );
          if (b[0] === "ul")
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 marker:text-primary">
                {b[1].map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            );
          return <p key={i}>{b[1]}</p>;
        })}
      </div>

      <div className="card-glow p-8 text-center mt-14 flex flex-col items-center">
        <h2 className="text-[24px] md:text-[28px] display text-on-surface mb-2">Want this applied to your channel?</h2>
        <p className="text-[15.5px] text-on-surface-variant mb-6">Get a 30-day plan in your inbox.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/youtube-funnel" className="btn btn-glow">Audit my channel</Link>
          <Link href="/contact" className="btn btn-secondary">Book a call</Link>
        </div>
      </div>
    </article>
  );
}
