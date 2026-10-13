import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description: "Explore the niche portfolios of Anuj Mishra, featuring long-form video editing, Reels/Shorts editing, Canva designs, and YouTube growth management.",
};

interface Category {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  bullets: string[];
}

export default function PortfolioPage() {
  const categories: Category[] = [
    {
      title: "Long-form Video Editing",
      subtitle: "YouTube, VSLs & Courses",
      description: "Professional audio with noise reduction, EQ, and compressor. Removes filler words, pauses, and mistakes. Adds custom intros, B-rolls, and engaging animations to elevate video quality.",
      image: "https://anuj4u.in/wp-content/uploads/2025/03/video-editing-thumbnail.jpg",
      link: "/portfolio/video-editing",
      bullets: [
        "Professional audio enhancement & EQ",
        "Seamless pacing & mistake removal",
        "B-roll, custom animations & transitions"
      ]
    },
    {
      title: "Reels & Shorts Editing",
      subtitle: "Short-form Content",
      description: "Hook viewers in the first 3 seconds with strong visuals. Fast-paced editing to match platform trends, custom kinetic captions, and sound effects designed for maximum viral engagement.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/insta.webp",
      link: "/portfolio/shorts-editing-portfolio",
      bullets: [
        "Algorithm-optimized 3-second hooks",
        "Kinetic typography & text animations",
        "High-impact sound design & transitions"
      ]
    },
    {
      title: "Thumbnails & Graphic Designs",
      subtitle: "Canva Design & CTR Optimization",
      description: "Design eye-catching thumbnails to boost CTR. Maintain brand colors and typography for channel consistency, using high-resolution images with bold, clear text.",
      image: "https://anuj4u.in/wp-content/uploads/2025/11/Thumbnails-and-graphics-cover.jpg",
      link: "/portfolio/graphic-design-portfolio",
      bullets: [
        "High-CTR custom YouTube thumbnails",
        "Consistent brand colors & aesthetics",
        "Social media graphics & channel banners"
      ]
    },
    {
      title: "YouTube Channel Management",
      subtitle: "Growth & Optimization",
      description: "Manage channel publishing, titles, descriptions, tag optimization, and play-lists. Perform audience retention audits and implement data-driven growth strategies.",
      image: "https://anuj4u.in/wp-content/uploads/2025/02/best-social-meda.webp",
      link: "/portfolio/youtube-management-portfolio",
      bullets: [
        "SEO metadata & tags optimization",
        "Analytics & audience retention audits",
        "Growth-focused titles & SMM scheduling"
      ]
    }
  ];

  return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden min-h-screen">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl display text-on-surface mb-6 leading-tight">
          My Previous <span className="gradient-text">Work & Portfolios</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Explore my portfolio by category to see niche edits, custom designs, and growth audits built to deliver measurable results.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative z-10">
        {categories.map((cat, idx) => (
          <Link 
            key={idx} 
            href={cat.link}
            className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 cursor-pointer"
          >
            <div>
              {/* Image Container */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden bg-surface-container-low">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={idx < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">
                  {cat.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-2">
                  {cat.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                        check_circle
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action */}
            <div className="px-8 pb-8">
              <div 
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 px-6 rounded-xl group-hover:bg-primary-container transition-all group-hover:shadow-lg"
              >
                <span>See My Work</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-4xl mx-auto shadow-2xl">
        <h2 className="text-3xl font-bold text-on-surface mb-4">Want to see similar results?</h2>
        <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
          Let&apos;s discuss your goals and how we can implement these strategies for your brand.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:bg-primary-container">
          Start a Project <span className="material-symbols-outlined">rocket_launch</span>
        </Link>
      </div>
    </div>
  );
}
