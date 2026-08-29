import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Anuj Mishra",
  description: "Explore the portfolio of Anuj Mishra, featuring high-retention video editing, social media management, and performance marketing case studies.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio & Case Studies | Anuj Mishra",
    description: "Explore the portfolio of Anuj Mishra, featuring high-retention video editing, social media management, and performance marketing case studies.",
    url: "https://anuj4u.in/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Anuj Mishra",
    description: "Explore the portfolio of Anuj Mishra, featuring high-retention video editing, social media management, and performance marketing case studies.",
  },
};

export default function PortfolioPage() {
  const projects = [
    {
      title: "Launch Excel VSL",
      category: "Video Editing",
      client: "Victor Chan",
      description: "Edited a high-retention Video Sales Letter (VSL) focusing on pacing, visual hooks, and clear messaging to increase course conversion rates.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yRc9SLVU3wxVmFvr7DMbGjSG3qYpjfjh9tYzKpUK33eg2W1nnTjvlsrLhaBi6krKX0TdNuf7yLsAsOYdU0JLMomjjGoi8SejZX8T3hCSpIAsARplRb8T70IM2rYKk5Ol3q4KoPIE-WoRs5APA61VFmLYbW3uQbgFXi7YB-juA37Eo8ILQ718O2RtslZ9odscWJ2rdNEn697yO0U8SxV4Hs0xAN-6D1M18mtUaFkHgsfZF3v8LBALQw",
      tags: ["Premiere Pro", "VSL", "Retention"],
      problem: "Course sales page had strong traffic but a low conversion rate — the explainer video lost viewers before the offer.",
      action: "Re-cut the VSL with a stronger hook in the first 5 seconds, tighter pacing, and on-screen proof points throughout.",
      result: "+38% course signup rate from the same traffic",
      resultMetric: "+38%",
      serviceName: "Expert Video Editing",
      serviceHref: "/services"
    },
    {
      title: "Author Podcast Launch",
      category: "Podcast & SMM",
      client: "Harjeet Dhillon",
      description: "Full-stack launch of a new podcast. Managed video editing, created engaging thumbnails, and wrote SEO-optimized YouTube descriptions.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ",
      tags: ["Podcast", "Thumbnails", "SEO"],
      problem: "A first-time author wanted to launch a podcast but had no editing workflow, branding, or distribution plan.",
      action: "Built the full launch: episode edits, custom thumbnails, SEO descriptions, and a consistent posting calendar.",
      result: "1,200+ listens in the first 30 days with zero paid promotion",
      resultMetric: "1.2K",
      serviceName: "AI-Powered Social Media Management",
      serviceHref: "/services"
    },
    {
      title: "Scientific Channel Growth",
      category: "YouTube Management",
      client: "Dr. Maurice Maurer",
      description: "Provided comprehensive video editing and graphic design to elevate the visual quality of complex scientific explanations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ6INETUPr4mfcMG6fzakgmVe5e0s0KvLX5o9-bovSubFnxmIk9lm30G7Ll4D6BdJK7ytOohIo7vBYXU2GMvrqiEEmvbG2xvd4HAv2BiMhpjz3Gh-edOo3E3tJgdnPaFhtPMXA3hqMQ6HJM_Dj0YDOq517NWpHXYbHIQ7cNvICkULHA7Y1P5DdAK24q-lcIRCF2yHsMw0clQk7pKVik8UrA0Kp4AEBB7E9l-mmVaAzSsasp7CGmeZDg",
      tags: ["DaVinci Resolve", "Education", "Design"],
      problem: "Complex science content had great substance but flat visuals that hurt watch-time and credibility.",
      action: "Elevated every video with motion graphics, clear on-screen diagrams, and tighter retention-focused edits.",
      result: "+25% average view duration across the channel",
      resultMetric: "+25%",
      serviceName: "Expert Video Editing",
      serviceHref: "/services"
    },
    {
      title: "Wealth Adviser Shorts",
      category: "Short-form Content",
      client: "Blake Reddy",
      description: "Designed bespoke video layouts and templates for podcast clips, saving the client hours of production time weekly.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcV5YGRB486ybQ9zwbwu0Ihd1rDTcA1kf0hwynkmwEXSqTX_79g7gIDH2nZ8y2C5BQz8-bmX9SUCHmwklbnNosL59RHW49XgZpUMfaw7lthcJ4jGoOCpOker1OCanqdNjv7CyOaM_PJ4IxgIsk9uAXdxu0A6MrrK5NhtnhOj6BGFYv5NDx0iIr3LJ4dapkVvKiPUUFDWo9323rCyOH5QneWioGae6YJMew3Ch6Dw0DebyQ3i7jed8hrQ",
      tags: ["Shorts", "Templates", "Finance"],
      problem: "Repurposing long podcast episodes into shorts took the client hours of manual work every week.",
      action: "Designed a reusable short-form template system and clip selection workflow for fast, on-brand edits.",
      result: "6+ hours saved every week of production time",
      resultMetric: "6 hrs/wk",
      serviceName: "Digital Solutions",
      serviceHref: "/services"
    }
  ];

  const categories = ["All", "Video Editing", "Podcast & SMM", "YouTube Management", "Short-form Content"];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          My Work
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Selected <span className="gradient-text">Projects & Case Studies</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          A showcase of recent video edits, channel management successes, and growth campaigns.
        </p>
      </div>

      {/* Category Filter (Visual Only) */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
        {categories.map((cat, idx) => (
          <button 
            key={idx} 
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              idx === 0 
              ? "bg-primary text-white shadow-md shadow-primary/20" 
              : "bg-surface border border-outline-variant/60 text-on-surface hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative z-10">
        {projects.map((project, idx) => (
          <div key={idx} className="group glass-card rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-outline-variant/50">
            {/* Image Container */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-surface-container-low">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {project.category}
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface mb-1">{project.title}</h3>
                  <p className="text-sm font-semibold text-on-surface-variant">Client: {project.client}</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </span>
              </div>

              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Case study: problem / action / result */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-error text-base shrink-0 mt-0.5">priority_high</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    <span className="font-semibold text-on-surface">Problem: </span>
                    {project.problem}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">play_circle</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    <span className="font-semibold text-on-surface">Action: </span>
                    {project.action}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-emerald-600 text-base shrink-0">trending_up</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    <span className="font-bold text-emerald-700">{project.resultMetric}</span>
                    <span className="font-semibold text-on-surface"> Result: </span>
                    {project.result}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/30">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-surface-container-low border border-outline-variant/40 text-on-surface-variant px-3 py-1 rounded-md text-xs font-semibold">
                    {tag}
                  </span>
                ))}
                <Link
                  href={project.serviceHref}
                  className="ml-auto inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-semibold hover:bg-primary/20 transition-colors"
                >
                  {project.serviceName}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
        <h2 className="text-3xl font-bold text-on-surface mb-4">Want to see similar results?</h2>
        <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
          Let&apos;s discuss your goals and how we can implement these strategies for your brand.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-primary-container">
          Start a Project <span className="material-symbols-outlined">rocket_launch</span>
        </Link>
      </div>
    </div>
  );
}
