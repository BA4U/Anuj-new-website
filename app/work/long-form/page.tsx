import type { Metadata } from "next";
import { Fragment } from "react";
import WorkShell from "@/components/WorkShell";
import VideoTile from "@/components/VideoTile";
import ScrollReveal from "@/components/ScrollReveal";
import LongFormNicheNav from "@/components/LongFormNicheNav";
import { LONG_FORM, CONTENT_TYPES } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Long-form Video Editing Work: Podcasts, Demos, Tutorials",
  description: "Podcast interviews, SaaS product demos, educational tutorials, and tech videos edited by Anuj Mishra. Filter by niche and format.",
  alternates: { canonical: "/work/long-form" },
  openGraph: { title: "Long-form Video Editing Work | Anuj Mishra", url: "https://anuj4u.in/work/long-form", type: "website" },
};

export default function LongFormPage() {
  const navCategories = CONTENT_TYPES.map((c) => ({
    key: c.key,
    title: c.title,
    count: c.ids.length,
  }));

  return (
    <WorkShell
      pill="Long-form"
      title="Every kind of"
      accent="long-form video."
      desc="Podcasts, SaaS product demos, tutorials, and tech breakdowns. Tap any video to watch."
      ctaTitle="Want your channel or product here?"
      ctaText="Send me your channel or product link and I will tell you what I would change first."
    >
      <LongFormNicheNav categories={navCategories} />

      <div className="space-y-16 md:space-y-24">
        {CONTENT_TYPES.map((group) => (
          <Fragment key={group.key}>
            <section id={group.key} className="scroll-mt-32">
              <div className="text-center max-w-2xl mx-auto mb-7 md:mb-9">
                <span className="text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
                  {group.title}
                </span>
                <h2 className="text-[26px] md:text-[34px] display text-on-surface mb-2">{group.title}</h2>
                <p className="text-[16px] text-on-surface-variant leading-relaxed">{group.blurb}</p>
              </div>
              <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {group.ids.map((id) => {
                  const v = LONG_FORM.find((x) => x.id === id);
                  return v ? <VideoTile key={v.id} {...v} /> : null;
                })}
              </ScrollReveal>
            </section>
          </Fragment>
        ))}
      </div>
    </WorkShell>
  );
}
