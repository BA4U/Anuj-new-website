import type { Metadata } from "next";
import WorkShell from "@/components/WorkShell";
import VideoTile from "@/components/VideoTile";
import ScrollReveal from "@/components/ScrollReveal";
import { LONG_FORM } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Long-form Video Editing Work",
  description: "YouTube and podcast edits for creators, educators and B2B teams. Watch real long-form videos edited by Anuj Mishra.",
  alternates: { canonical: "/work/long-form" },
  openGraph: { title: "Long-form Video Editing Work | Anuj Mishra", url: "https://anuj4u.in/work/long-form", type: "website" },
};

export default function LongFormPage() {
  return (
    <WorkShell
      pill="Long-form"
      title="Long-form"
      accent="edits."
      desc="YouTube episodes, tutorials and podcasts. Tap any video to watch it."
      ctaTitle="Want your channel here?"
      ctaText="Send me your channel and I will tell you what I would change first."
    >
      <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LONG_FORM.map((v) => (
          <VideoTile key={v.id} {...v} />
        ))}
      </ScrollReveal>
    </WorkShell>
  );
}
