import type { Metadata } from "next";
import WorkShell from "@/components/WorkShell";
import ShortFormNicheFilter from "@/components/ShortFormNicheFilter";
import { SHORT_FORM } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "Short-form Video Editing: Shorts and Reels",
  description: "Vertical clips for YouTube Shorts, Reels and TikTok, edited by Anuj Mishra. Filter by niche and watch real client Shorts.",
  alternates: { canonical: "/work/short-form" },
  openGraph: { title: "Short-form Video Editing | Anuj Mishra", url: "https://anuj4u.in/work/short-form", type: "website" },
};

export default function ShortFormPage() {
  return (
    <WorkShell
      pill="Short-form"
      title="Shorts and"
      accent="Reels."
      desc="Vertical clips with a hook in the first second, formatted by niche. Tap any Short to watch it."
      ctaTitle="Need Shorts for your channel?"
      ctaText="I can cut them from your long videos and post them on schedule."
    >
      <ShortFormNicheFilter videos={SHORT_FORM} />
    </WorkShell>
  );
}
