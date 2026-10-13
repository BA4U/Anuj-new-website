"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GraphicDesignPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const thumbnails = [
    { title: "Descript Course", image: "https://anuj4u.in/wp-content/uploads/2025/05/anuj-Youtube-Thumbnails-in-canva-768x432.png" },
    { title: "Custom GPT Builder", image: "https://anuj4u.in/wp-content/uploads/2025/05/custom-gpt-YouTube-Thumbnail-new-768x432.png" },
    { title: "Scientific Visualization", image: "https://anuj4u.in/wp-content/uploads/2025/05/Maurice-Thumbnail-1-768x432.png" },
    { title: "Medicare Guide", image: "https://anuj4u.in/wp-content/uploads/2025/05/Paul-Stallan-YouTube-Thumbnail-medicare-v2-768x432.png" },
    { title: "Best AI Extensions", image: "https://anuj4u.in/wp-content/uploads/2025/05/best-ai-agent-chrome-extension-768x432.png" },
    { title: "IFE Food Brand Pitch", image: "https://anuj4u.in/wp-content/uploads/2025/05/IFE-2025-LUCY-WAGER-YouTube-Thumbnail-768x432.png" },
    { title: "AI Automation System", image: "https://anuj4u.in/wp-content/uploads/2025/10/250k-ai-system-with-claude-code-YouTube-Thumbnail-768x432.jpg" },
    { title: "Kyle Podcast Interview", image: "https://anuj4u.in/wp-content/uploads/2025/10/Kyle-Podcast-Youtube-Thumbnail-768x432.jpg" },
    { title: "ChatGPT Connects", image: "https://anuj4u.in/wp-content/uploads/2025/10/CHATGPT-CONNECTS-EXPLAINED-final-768x432.png" },
    { title: "Mike Sommer Podcast", image: "https://anuj4u.in/wp-content/uploads/2025/10/Mike-Sommer-Podcast-Thumbnail-768x432.jpg" },
    { title: "Claude Automations", image: "https://anuj4u.in/wp-content/uploads/2025/11/claude-AUTOMATE-EVERYTHING-768x432.png" },
    { title: "Top 5 GPTs", image: "https://anuj4u.in/wp-content/uploads/2025/11/Top-5-GPT-worth-50K-2-768x432.png" },
    { title: "Tim Cakir Thumbnail 3", image: "https://anuj4u.in/wp-content/uploads/2025/05/Tim-Cakir-YouTube-Thumbnail-3-768x432.png" },
    { title: "Tim Cakir Thumbnail 5", image: "https://anuj4u.in/wp-content/uploads/2025/05/Tim-Cakir-YouTube-Thumbnail-5-768x432.png" },
    { title: "Tim Cakir Channel 1", image: "https://anuj4u.in/wp-content/uploads/2025/05/tim-1-768x432.png" },
    { title: "Charlsey Childers", image: "https://anuj4u.in/wp-content/uploads/2025/05/Charlsey-Childers-Youtube-Thumbnail-768x432.png" },
    { title: "Thumbnail Design 6", image: "https://anuj4u.in/wp-content/uploads/2025/05/anuj-thumbnail-design-6-768x432.png" },
    { title: "Harjeet Mother's Day", image: "https://anuj4u.in/wp-content/uploads/2025/05/MOTHERS-day-Harjeet-YouTube-Thumbnail-768x432.png" },
  ];

  const bannersAndCovers = [
    { title: "Harjeet YouTube Banner", image: "https://anuj4u.in/wp-content/uploads/2025/05/HarjeetYoutube-Banner-768x432.png" },
    { title: "LinkedIn Banner Template", image: "https://anuj4u.in/wp-content/uploads/2025/05/LinkedIn-Banner-Template-by-Anuj-768x192.png" },
    { title: "LinkedIn Carousel Slide", image: "https://anuj4u.in/wp-content/uploads/2025/05/Anuj-Linkedin-Post2-768x768.png" },
    { title: "Course Certificate Design", image: "https://anuj4u.in/wp-content/uploads/2025/05/Certificate-by-anuj-768x543.png" },
    { title: "Python Course Certificate", image: "https://anuj4u.in/wp-content/uploads/2025/05/Maurice-Python-for-Biologists-Certificate-by-anuj-768x543.png" },
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
        <h1 className="text-4xl md:text-6xl display text-on-surface mb-4 leading-tight">
          Thumbnails &amp; <span className="gradient-text">Graphic Designs</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
          High-CTR YouTube thumbnails, channel banners, LinkedIn graphics, and custom certificates — all designed in Canva to match each client&apos;s brand.
        </p>
      </div>

      {/* Section: YouTube Thumbnails */}
      <div className="mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-on-surface mb-6">YouTube Thumbnails</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {thumbnails.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(item.image)}
              className="group relative aspect-video overflow-hidden rounded-xl bg-surface-container-low focus:outline-none"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <span className="w-full text-white text-[11px] font-medium px-2 py-1.5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section: Banners & Covers */}
      <div className="mb-16 relative z-10">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Banners, Covers &amp; Certificates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bannersAndCovers.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(item.image)}
              className="group relative w-full overflow-hidden rounded-xl bg-surface-container-low focus:outline-none"
            >
              <div className="relative w-full h-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <span className="w-full text-white text-[11px] font-medium px-3 py-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-[-44px] right-0 z-10 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Design Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
