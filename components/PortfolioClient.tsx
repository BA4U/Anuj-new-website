"use client";

import React, { useState } from "react";
import Image from "next/image";

type Project = {
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  youtubeUrl: string;
};

export default function PortfolioClient({ projects: initialProjects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const categories = ["All", "Video Editing", "Podcast & SMM", "YouTube Management", "Short-form Content"];

  const projects: Project[] = [
    {
      title: "Launch Excel VSL",
      category: "Video Editing",
      client: "Victor Chan",
      description: "High-retention Video Sales Letter (VSL) focusing on pacing, visual hooks, and clear messaging to increase course conversion rates.",
      image: "https://anuj4u.in/wp-content/uploads/2025/03/video-editing-thumbnail.jpg",
      tags: ["Premiere Pro", "VSL", "Retention"],
      youtubeUrl: "https://www.youtube.com/embed/-SYqXdaZXl8"
    },
    {
      title: "Author Podcast Launch",
      category: "Podcast & SMM",
      client: "Harjeet Dhillon",
      description: "Full-stack launch of a new podcast. Managed video editing, created engaging thumbnails, and wrote SEO-optimized YouTube descriptions.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/insta.webp",
      tags: ["Podcast", "Thumbnails", "SEO"],
      youtubeUrl: "https://www.youtube.com/embed/izidLZclYZs"
    },
    {
      title: "Scientific Channel Growth",
      category: "YouTube Management",
      client: "Dr. Maurice Maurer",
      description: "Provided comprehensive video editing and graphic design to elevate the visual quality of complex scientific explanations.",
      image: "https://anuj4u.in/wp-content/uploads/2025/11/Thumbnails-and-graphics-cover.jpg",
      tags: ["DaVinci Resolve", "Education", "Design"],
      youtubeUrl: "https://www.youtube.com/embed/mHOLzwe4sMQ"
    },
    {
      title: "Wealth Adviser Shorts",
      category: "Short-form Content",
      client: "Blake Reddy",
      description: "Designed bespoke video layouts and templates for podcast clips, saving the client hours of production time weekly.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/best-social-meda.webp",
      tags: ["Shorts", "Templates", "Finance"],
      youtubeUrl: "https://www.youtube.com/embed/y11b_rVHcyg"
    },
    {
      title: "Dan Koe Interview",
      category: "Video Editing",
      client: "Self-Project",
      description: "Speculative video edit demonstrating advanced kinetic typography, sound design, and narrative pacing in the style of Dan Koe.",
      image: "https://anuj4u.in/wp-content/uploads/2025/03/video-editing-thumbnail.jpg",
      tags: ["Typography", "Descript", "Visual Hooks"],
      youtubeUrl: "https://www.youtube.com/embed/-DB8-7eLsTY"
    },
    {
      title: "Explainer Video Concept",
      category: "Video Editing",
      client: "Various Creators",
      description: "Dynamic visual cuts, motion graphics overlays, and text styling designed to retain and engage educational video viewers.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/insta.webp",
      tags: ["Explainer", "Descript", "B-Roll"],
      youtubeUrl: "https://www.youtube.com/embed/68lgEUQDiDQ"
    },
    {
      title: "Tutorial Video Showcase",
      category: "Short-form Content",
      client: "Training Scientists",
      description: "Interactive tutorial editing focusing on pacing, zoom effects, and clear instructions for high-value technical courses.",
      image: "https://anuj4u.in/wp-content/uploads/2025/11/Thumbnails-and-graphics-cover.jpg",
      tags: ["Tutorial", "Screencast", "CapCut"],
      youtubeUrl: "https://www.youtube.com/embed/bejvX2uUTDo"
    },
    {
      title: "Viral Shorts Editing",
      category: "Short-form Content",
      client: "Multiple Creators",
      description: "TikTok/Reels format video with fast-paced cuts, sound effects, auto-captions, and visual hooks engineered for the algorithm.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/best-social-meda.webp",
      tags: ["Shorts", "Viral", "Kinetic"],
      youtubeUrl: "https://www.youtube.com/embed/pcfFzxnhwUE"
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === cat
              ? "bg-primary text-white shadow-md shadow-primary/20" 
              : "bg-surface border border-outline-variant/60 text-on-surface hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative z-10 animate-fade-up">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="group glass-card rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 border border-outline-variant/50">
            {/* Image Container */}
            <div 
              className="relative w-full h-64 md:h-80 overflow-hidden bg-surface-container-low cursor-pointer"
              onClick={() => setSelectedVideo(project.youtubeUrl)}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl font-bold">play_arrow</span>
                </div>
              </div>
              
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {project.category}
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="text-2xl font-bold text-on-surface mb-1 hover:text-primary cursor-pointer transition-colors"
                    onClick={() => setSelectedVideo(project.youtubeUrl)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold text-on-surface-variant">Client: {project.client}</p>
                </div>
                <button 
                  onClick={() => setSelectedVideo(project.youtubeUrl)}
                  className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
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

      {/* Play Video Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-on-surface/80 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/10 animate-fade-up">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <iframe 
              src={`${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
