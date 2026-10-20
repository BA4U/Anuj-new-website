import type { Metadata } from "next";
import Link from "next/link";
import WorkShell from "@/components/WorkShell";
import ScrollReveal from "@/components/ScrollReveal";
import PlayThumb from "@/components/PlayThumb";

export const metadata: Metadata = {
  title: "Video Testimonial Edits",
  description: "A selection of testimonial edits I cut for clients.",
  alternates: { canonical: "/work/testimonial-edits" },
  openGraph: { title: "Video Testimonial Edits | Anuj Mishra", url: "https://anuj4u.in/work/testimonial-edits", type: "website" },
};

/** Testimonial edits I cut for clients. Add the client name and a one-line context when you have it. */
const EDITS = [
  {
    id: "TVjGyWn4RhM",
    title: "Video testimonial edit",
    client: "",
    caption: "",
  },
  {
    id: "nw3AbdcMpzg",
    title: "Video testimonial edit",
    client: "",
    caption: "",
  },
];

export default function TestimonialEditsPage() {
  return (
    <WorkShell
      pill="Testimonial edits"
      title="Client testimonial"
      accent="edits portfolio."
      desc="A selection of testimonial edits I cut for clients."
      ctaTitle="Want testimonial edits for your channel?"
      ctaText="Send me a sample and I will tell you what I would change first."
    >
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EDITS.map((edit) => (
            <div key={edit.id} className="card-glow p-0 overflow-hidden">
              <PlayThumb id={edit.id} title={edit.title} />
              <div className="p-5">
                {edit.client && <p className="label mb-1 !text-[10.5px]">{edit.client}</p>}
                <h3 className="text-[17px] font-semibold text-on-surface mb-1">{edit.title}</h3>
                {edit.caption && (
                  <p className="text-[14px] text-on-surface-variant leading-relaxed">{edit.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto mt-14 md:mt-20 flex flex-col items-center">
        <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-3">Want this kind of testimonial work on your channel?</h2>
        <p className="text-[16px] text-on-surface-variant leading-relaxed mb-7 max-w-lg">
          I can cut testimonial edits that hold the shot, keep the message clear, and match the tone your audience already trusts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn btn-glow">Book a call</Link>
          <Link href="/work/long-form" className="btn btn-secondary">See more editing work</Link>
        </div>
      </div>
    </WorkShell>
  );
}
