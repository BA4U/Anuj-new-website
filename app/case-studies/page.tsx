"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import VideoTestimonial from "@/components/VideoTestimonial";
import CaseShots from "@/components/CaseShots";
import ScrollReveal from "@/components/ScrollReveal";
import { CASE_STUDIES } from "@/lib/work-data";

const CLIENT_FEEDBACKS = [
  {
    name: "Victor Chan",
    role: "YouTuber & Founder, Launch Excel",
    platform: "YouTube · @launchexcel",
    channelUrl: "https://www.youtube.com/@launchexcel",
    photo: "/testimonials/victor-chan.jpg",
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever.",
    deliverables: ["Long-form YouTube Edits", "Sales VSL Production", "Thumbnail Packaging"],
  },
  {
    name: "Dr. Maurice Maurer",
    role: "PhD in Computational Physics · Founder, Training Scientists",
    platform: "YouTube · @TrainingScientists",
    channelUrl: "https://www.youtube.com/@TrainingScientists",
    photo: "/testimonials/maurice-maurer.jpg",
    quote:
      "I hired Anuj to do video editing and graphic design work for my YouTube channel. He did an excellent job, always responds very quickly and produces great results. I am very happy working with him and will continue to do so in the future.",
    deliverables: ["Complex Python Code Edits", "2D Data Visualizations", "Thumbnail Design"],
  },
  {
    name: "Harjeet Dhillon",
    role: "Canadian Actress, Author & Podcast Host",
    platform: "Video Podcast & YouTube",
    photo: "/testimonials/harjeet-dhillon.jpg",
    quote:
      "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of software and has guided me more than I could ever hope for with setting up my podcast. He has a solid work ethic and is awesome at receiving feedback.",
    deliverables: ["Podcast Architecture", "Dynamic Video Editing", "High-Contrast Thumbnails"],
  },
  {
    name: "Blake Reddy",
    role: "Private Client Wealth Adviser",
    platform: "Executive Video Podcast",
    photo: "/testimonials/blake-reddy.jpg",
    quote:
      "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend. Thank you Anuj!",
    deliverables: ["Custom Layout Templates", "Audio & Visual Master", "Brand Cohesion"],
  },
  {
    name: "Ross Zeiger",
    role: "Founder, Descript Mastery",
    platform: "Descript Mastery",
    photo: "/testimonials/ross-zeiger.jpg",
    quote:
      "Anuj is great! Professional, fast, and easy to work with.",
    deliverables: ["Descript Editing", "Long-Form YouTube", "Quick Turnaround"],
  },
];

export default function CaseStudiesAndTestimonialsPage() {
  const [study] = CASE_STUDIES;

  return (
    <div className="py-12 md:py-16 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden min-h-screen">
      <div className="aurora aurora-a w-[520px] h-[520px] -top-40 -left-40 opacity-45" />
      <div className="aurora aurora-b w-[460px] h-[460px] top-24 right-[-120px] opacity-35" />

      {/* Hero */}
      <section className="text-center mb-14 md:mb-18 max-w-3xl mx-auto pt-4 relative z-10">
        <p className="eyebrow mb-3">Case Studies &amp; Testimonials</p>
        <h1 className="text-[34px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.1] text-on-surface mb-5">
          Hear it directly from <span className="gradient-text">clients.</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Video testimonials, YouTube Studio numbers, and feedback from the creators, founders, and brands I partner with.
        </p>
      </section>

      {/* 1. Tim Cakir Video Testimonial */}
      <section className="max-w-5xl mx-auto mb-16 relative z-10">
        <VideoTestimonial
          videoId="TbP5kY8BXUI"
          clientName="Tim Cakir"
          clientRole="AI Operator & Creator"
          avatarUrl="/avatars/tim-cakir.jpg"
          headline="Tim Cakir: Client Testimonial"
          quote="Consistent editing and packaging turned my YouTube channel into $50,000 in client deals."
        />

        {/* Tim Cakir channel info */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Image
            src="/avatars/tim-cakir.jpg"
            alt="Tim Cakir YouTube Channel"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div>
            <p className="text-[15px] font-bold text-on-surface">Tim Cakir</p>
            <p className="text-[13px] text-on-surface-variant">12.3K subscribers</p>
          </div>
          <a
            href="https://www.youtube.com/@timcakir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814Z" />
              <path d="m9.545 15.568 6.273-3.568-6.273-3.568v7.136Z" fill="#fff" />
            </svg>
            Visit Channel
          </a>
        </div>
      </section>

      {/* 2. Featured Case Study (Tim Cakir) — immediately after his testimonial */}
      <section className="mb-16 relative z-10">
        <ScrollReveal>
          <article className="card-glow spotlight rounded-[28px] p-6 sm:p-10 text-center max-w-5xl mx-auto">
            <p className="eyebrow mb-2">Featured Case Study · {study.role}</p>
            <h2 className="text-[28px] md:text-[42px] display text-on-surface mb-3">{study.client}</h2>
            <p className="text-[16px] md:text-[17.5px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              {study.quote}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {study.did.map((d) => (
                <span key={d} className="text-[12.5px] font-medium rounded-full bg-primary/[0.08] text-primary px-3.5 py-1">
                  {d}
                </span>
              ))}
            </div>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              {study.metrics?.map((m) => (
                <div key={m.label} className="rounded-2xl bg-white/75 border border-primary/10 py-5 px-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-[30px] md:text-[40px] font-extrabold tracking-[-0.03em] gradient-text leading-none">
                    {m.value}
                  </dd>
                  <p className="text-[12.5px] text-on-surface-variant mt-2 leading-snug">{m.label}</p>
                </div>
              ))}
            </dl>
          </article>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="text-center mb-6">
            <p className="eyebrow mb-1">The Proof</p>
            <h3 className="text-[22px] md:text-[28px] display text-on-surface">
              Straight from YouTube Studio
            </h3>
          </div>
          <CaseShots />
          <div className="text-center mt-6">
            <a
              href="https://www.youtube.com/@timcakir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View Tim&apos;s YouTube Channel
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Cosmo Taylor Video Testimonial — after the case study proof */}
      <section className="max-w-5xl mx-auto mb-20 relative z-10">
        <VideoTestimonial
          videoId="IYphbtdwb5M"
          clientName="Cosmo Taylor"
          clientRole="Business Owner & Author"
          headline="Cosmo Taylor: Podcast Production"
          quote="Anuj manages the entire podcast pipeline, from full-episode editing and Spotify publishing to Instagram, Facebook & LinkedIn clips, carousels, and my book release video funnel."
        />
      </section>

      {/* 4. All Written Client Feedbacks — no outcome badges */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-2">Client Feedback</p>
          <h2 className="text-[28px] md:text-[40px] display text-on-surface">
            What Clients Say <span className="gradient-text">Working With Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLIENT_FEEDBACKS.map((t) => (
            <article
              key={t.name}
              className="glass-card rounded-[26px] p-7 sm:p-8 relative overflow-hidden border border-white/80 flex flex-col justify-between gap-6 hover:shadow-[0_20px_50px_-20px_rgba(73,54,230,0.2)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                <blockquote className="text-on-surface text-[15.5px] leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex flex-wrap gap-1.5">
                  {t.deliverables.map((d) => (
                    <span
                      key={d}
                      className="text-[11.5px] font-medium px-2.5 py-1 rounded-full bg-primary/[0.07] text-primary"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-black/[0.06]">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={52}
                  height={52}
                  className="w-13 h-13 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-[15.5px] font-bold text-on-surface truncate">{t.name}</h3>
                  <p className="text-xs text-on-surface-variant truncate">{t.role}</p>
                  {t.channelUrl ? (
                    <a
                      href={t.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-semibold text-primary hover:underline mt-0.5 inline-block"
                    >
                      {t.platform}
                    </a>
                  ) : (
                    <span className="text-[12px] text-on-surface-variant/80 mt-0.5 inline-block">{t.platform}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center max-w-2xl mx-auto py-8 relative z-10">
        <h2 className="text-[28px] md:text-[38px] display text-on-surface mb-3">
          Ready to build your presence?
        </h2>
        <p className="text-[16px] text-on-surface-variant mb-7">
          Book a free strategy call or start with a free audit of your last 10 videos.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/contact"
            className="btn btn-glow inline-flex items-center gap-2"
          >
            Book Free Strategy Call
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link href="/youtube-funnel" className="btn btn-secondary">
            Audit my channel free
          </Link>
        </div>
      </section>
    </div>
  );
}
