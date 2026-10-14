import type { Metadata } from "next";
import Image from "next/image";
import WorkShell from "@/components/WorkShell";
import ScrollReveal from "@/components/ScrollReveal";
import { THUMBNAILS } from "@/lib/work-data";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Design Portfolio",
  description: "Thumbnails designed by Anuj Mishra for YouTube creators, podcasts and educators.",
  alternates: { canonical: "/work/thumbnails" },
  openGraph: { title: "YouTube Thumbnail Design | Anuj Mishra", url: "https://anuj4u.in/work/thumbnails", type: "website" },
};

export default function ThumbnailsPage() {
  return (
    <WorkShell
      pill="Thumbnails and graphics"
      title="Thumbnails that"
      accent="earn the click."
      desc="A selection of thumbnails I designed for creators, podcasts and educators."
      ctaTitle="Want thumbnails like these?"
      ctaText="I design and test them with your titles, so each video starts with a strong package."
    >
      <ScrollReveal each className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {THUMBNAILS.map((t) => (
          <figure key={t.slug} className="reveal card-glow spotlight p-0 text-center overflow-hidden">
            <div className="relative aspect-video bg-surface-container">
              <Image
                src={`/thumbnails/${t.slug}.webp`}
                alt={`${t.title} YouTube thumbnail for ${t.client}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover"
              />
            </div>
            <figcaption className="p-4">
              <p className="eyebrow mb-1 !text-[10.5px]">{t.client}</p>
              <p className="text-[15px] font-semibold text-on-surface leading-snug">{t.title}</p>
            </figcaption>
          </figure>
        ))}
      </ScrollReveal>
    </WorkShell>
  );
}
