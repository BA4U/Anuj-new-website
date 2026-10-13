"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface VideoProject {
  title: string;
  client: string;
  description: string;
  videoId: string;
}

export default function VideoEditingPortfolio() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const projects: VideoProject[] = [
    {
      title: "Launch Excel VSL",
      client: "Victor Chan",
      description: "High-retention Video Sales Letter (VSL) focusing on pacing and clear visual messaging.",
      videoId: "-SYqXdaZXl8"
    },
    {
      title: "Author Podcast Launch",
      client: "Harjeet Dhillon",
      description: "SEO optimized podcast launch layout with engaging speech transitions.",
      videoId: "izidLZclYZs"
    },
    {
      title: "Dan Koe Interview Style",
      client: "Self-Project",
      description: "Speculative edit demonstrating kinetic typography and narrative pacing.",
      videoId: "-DB8-7eLsTY"
    },
    {
      title: "Explainer Video Concept",
      client: "Various Creators",
      description: "Dynamic visual cuts and motion overlays designed to retain educational viewers.",
      videoId: "68lgEUQDiDQ"
    },
    {
      title: "Scientific Channel Growth",
      client: "Dr. Maurice Maurer",
      description: "Comprehensive editing to elevate the visual quality of complex scientific explanations.",
      videoId: "mHOLzwe4sMQ"
    },
    {
      title: "Tutorial Video Showcase",
      client: "Training Scientists",
      description: "Interactive tutorial editing focusing on pacing and clear instructions.",
      videoId: "bejvX2uUTDo"
    },
    {
      title: "Course Promo Edit",
      client: "Victor Chan",
      description: "Dynamic landing page promo with key focus highlights to drive signups.",
      videoId: "SFn5Vf38f8I"
    },
    {
      title: "Wealth Adviser Long Edit",
      client: "Blake Reddy",
      description: "Edited podcast episode focusing on corporate styling and clean audio balance.",
      videoId: "y11b_rVHcyg"
    },
    {
      title: "Descript Workflow Tutorial",
      client: "Anuj 4U",
      description: "Video tutorial showcasing advanced workflows and automated captioning in Descript.",
      videoId: "TZvt_fD8VP4"
    },
    {
      title: "Scientific Explanation VSL",
      client: "Training Scientists",
      description: "Illustrations converted into clean animations synced to narrator audio.",
      videoId: "ciwbmggLd4Y"
    },
    {
      title: "VSL Pacing Demo",
      client: "Victor Chan",
      description: "Short VSL pacing cut designed to test hook retention triggers.",
      videoId: "1nT4g9VeJDk"
    },
    {
      title: "Dynamic Cuts Explainer",
      client: "Multiple Creators",
      description: "Fast-paced social explainer with custom sound design and dynamic zooms.",
      videoId: "pMU8C1H1nHo"
    }
  ];

  const testimonials = [
    {
      quote: "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever.",
      author: "Victor Chan",
      title: "YouTuber & Founder of Launch Excel"
    },
    {
      quote: "Anuj has been instrumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of softwares available and has guided me more than I could ever hope for with setting up my podcast.",
      author: "Harjeet Dhillon",
      title: "Podcast Host & Author"
    }
  ];

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden min-h-screen">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Header */}
      <div className="mb-16 max-w-4xl pt-6 relative z-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:translate-x-[-4px] transition-transform">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Portfolios</span>
        </Link>
        <h1 className="text-4xl md:text-6xl display text-on-surface mb-6 leading-tight">
          Long-form <span className="gradient-text">Video Editing Portfolio</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl mb-4">
          A collection of long-form videos edited inside Descript and DaVinci Resolve to deliver high viewer retention and match client branding.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative z-10">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedVideo(`https://www.youtube.com/embed/${project.videoId}`)}
          >
            {/* Image Container with Hover Play Button */}
            <div className="relative w-full aspect-video bg-surface-container-low">
              <Image
                src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                Client: {project.client}
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mb-20 relative z-10">
        <h2 className="text-3xl font-bold text-on-surface mb-10 text-center">Video Editing Client Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full">
              <p className="text-on-surface-variant text-sm italic leading-relaxed mb-6">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-on-surface">{test.author}</h4>
                <p className="text-xs text-primary font-medium">{test.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Lightbox Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors flex items-center justify-center"
              onClick={() => setSelectedVideo(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <iframe
              src={`${selectedVideo}?autoplay=1`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
