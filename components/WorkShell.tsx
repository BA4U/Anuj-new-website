import Link from "next/link";
import type { ReactNode } from "react";

/** Shared centered shell for the Work pages. */
export default function WorkShell({
  pill,
  title,
  accent,
  desc,
  children,
  ctaTitle,
  ctaText,
}: {
  pill: string;
  title: string;
  accent: string;
  desc: string;
  children: ReactNode;
  ctaTitle: string;
  ctaText: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-on-surface-variant hover:text-primary transition-colors mb-6"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            All work
          </Link>
          <p className="eyebrow mb-4">{pill}</p>
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] display text-on-surface mb-4">
            {title} <span className="gradient-text">{accent}</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-on-surface-variant leading-relaxed">{desc}</p>
        </header>

        {children}

        <section className="mt-16 md:mt-24">
          <div className="card-glow p-8 md:p-12 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-[26px] md:text-[36px] display text-on-surface mb-3">{ctaTitle}</h2>
            <p className="text-[16px] text-on-surface-variant leading-relaxed mb-7 max-w-lg">{ctaText}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/youtube-funnel" className="btn btn-glow">
                Audit my channel
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Book a call
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
