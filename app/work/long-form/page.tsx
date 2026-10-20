import type { Metadata } from "next";
import { Fragment } from "react";
import WorkShell from "@/components/WorkShell";
import VideoTile from "@/components/VideoTile";
import ScrollReveal from "@/components/ScrollReveal";
import { LONG_FORM, CONTENT_TYPES } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Long-form Video Editing Work",
  description: "Podcast, educational, tech and explainer videos edited by Anuj Mishra for creators, educators and B2B teams.",
  alternates: { canonical: "/work/long-form" },
  openGraph: { title: "Long-form Video Editing Work | Anuj Mishra", url: "https://anuj4u.in/work/long-form", type: "website" },
};

/** Testimonial edits I cut for clients. Add the client name when you have it. */
const TESTIMONIAL_EDITS = [
  { id: "TVjGyWn4RhM", title: "Video testimonial edit", client: "Client testimonial" },
  { id: "nw3AbdcMpzg", title: "Video testimonial edit", client: "Client testimonial" },
];

export default function LongFormPage() {
  return (
    <WorkShell
      pill="Long-form"
      title="Every kind of"
      accent="long-form video."
      desc="Podcasts, tutorials, tech and explainers. Tap any video to watch it."
      ctaTitle="Want your channel here?"
      ctaText="Send me your channel and I will tell you what I would change first."
    >
      <div className="space-y-14 md:space-y-20">
        {CONTENT_TYPES.map((group) => (
          <Fragment key={group.key}>
            {/* Testimonial edits sit right above the explainer group */}
            {group.key === "explainer" && (
              <section id="testimonial-edits" className="scroll-mt-24">
                <div className="text-center max-w-2xl mx-auto mb-7 md:mb-9">
                  <h2 className="text-[26px] md:text-[34px] display text-on-surface mb-2">Testimonial edits</h2>
                  <p className="text-[16px] text-on-surface-variant leading-relaxed">
                    Testimonial edits I cut for clients. Tap any video to watch it.
                  </p>
                </div>
                <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                  {TESTIMONIAL_EDITS.map((v) => (
                    <VideoTile key={v.id} {...v} />
                  ))}
                </ScrollReveal>
              </section>
            )}

            <section id={group.key} className="scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto mb-7 md:mb-9">
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
