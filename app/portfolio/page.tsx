import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Anuj Mishra",
  description: "Explore the portfolio of Anuj Mishra, featuring high-retention video editing, social media management, and performance marketing case studies.",
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
      link: "#"
    },
    {
      title: "Author Podcast Launch",
      category: "Podcast & SMM",
      client: "Harjeet Dhillon",
      description: "Full-stack launch of a new podcast. Managed video editing, created engaging thumbnails, and wrote SEO-optimized YouTube descriptions.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ",
      tags: ["Podcast", "Thumbnails", "SEO"],
      link: "#"
    },
    {
      title: "Scientific Channel Growth",
      category: "YouTube Management",
      client: "Dr. Maurice Maurer",
      description: "Provided comprehensive video editing and graphic design to elevate the visual quality of complex scientific explanations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ6INETUPr4mfcMG6fzakgmVe5e0s0KvLX5o9-bovSubFnxmIk9lm30G7Ll4D6BdJK7ytOohIo7vBYXU2GMvrqiEEmvbG2xvd4HAv2BiMhpjz3Gh-edOo3E3tJgdnPaFhtPMXA3hqMQ6HJM_Dj0YDOq517NWpHXYbHIQ7cNvICkULHA7Y1P5DdAK24q-lcIRCF2yHsMw0clQk7pKVik8UrA0Kp4AEBB7E9l-mmVaAzSsasp7CGmeZDg",
      tags: ["DaVinci Resolve", "Education", "Design"],
      link: "#"
    },
    {
      title: "Wealth Adviser Shorts",
      category: "Short-form Content",
      client: "Blake Reddy",
      description: "Designed bespoke video layouts and templates for podcast clips, saving the client hours of production time weekly.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcV5YGRB486ybQ9zwbwu0Ihd1rDTcA1kf0hwynkmwEXSqTX_79g7gIDH2nZ8y2C5BQz8-bmX9SUCHmwklbnNosL59RHW49XgZpUMfaw7lthcJ4jGoOCpOker1OCanqdNjv7CyOaM_PJ4IxgIsk9uAXdxu0A6MrrK5NhtnhOj6BGFYv5NDx0iIr3LJ4dapkVvKiPUUFDWo9323rCyOH5QneWioGae6YJMew3Ch6Dw0DebyQ3i7jed8hrQ",
      tags: ["Shorts", "Templates", "Finance"],
      link: "#"
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
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
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
                <a href={project.link} className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </a>
              </div>
              
              <p className="text-on-surface-variant text-base leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/30">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-surface-container-low border border-outline-variant/40 text-on-surface-variant px-3 py-1 rounded-md text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-4xl mx-auto bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white border border-indigo-900/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">Want to see similar results?</h2>
        <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
          Let&apos;s discuss your goals and how we can implement these strategies for your brand.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-indigo-50">
          Start a Project <span className="material-symbols-outlined">rocket_launch</span>
        </Link>
      </div>
    </div>
  );
}
