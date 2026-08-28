import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anuj Mishra | Video Editor & Growth Specialist",
  description: "Learn about Anuj Mishra's professional journey, growth philosophy, and expertise in video editing, social media strategy, and marketing.",
};

export default function AboutPage() {
  const experiences = [
    {
      period: "Present",
      title: "Marketing & Lead Gen",
      role: "Growth Specialist",
      description:
        "Focused on growth marketing—integrating AI for content planning, running high-conversion Google Ads, and generating consistent leads for B2B and B2C clients.",
      tags: ["Google Ads", "AI Automation", "Lead Gen"],
      active: true,
    },
    {
      period: "2021 — 2023",
      title: "Social Media Management",
      role: "Digital Strategist",
      description:
        "Scaled to managing full digital presences for companies, developing comprehensive social media strategies that increased organic reach by over 200%.",
      tags: ["Strategy", "Brand Growth", "Community"],
      active: false,
    },
    {
      period: "2019 — 2021",
      title: "Expert Video Editor",
      role: "Content Specialist",
      description:
        "Transitioned into professional editing, mastering the art of high-retention content for top-tier brands and fellow creators using Descript, DaVinci Resolve, and Premiere Pro.",
      tags: ["Video Editing", "Retention Design", "Descript"],
      active: false,
    },
    {
      period: "The Beginning",
      title: "YouTube Content Creator",
      role: "Independent Creator",
      description:
        "Started as a creator, learning the fundamentals of storytelling, audience engagement, and platform algorithms from the ground up.",
      tags: ["Storytelling", "Algorithms", "YouTube"],
      active: false,
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-glow top-0 right-0"></div>
      <div className="ambient-glow-2 top-1/3 left-0"></div>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12 mb-24 relative z-10 pt-4">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase w-fit">
            About Me
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight">
            👋 I&apos;m <br />
            <span className="gradient-text">Anuj Mishra</span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
            I help creators & brands maximize reach and revenue with expert video editing in Descript, YouTube channel management, and conversion-focused design in Canva. Leveraging 5+ years of experience, I create content that connects and strategies that scale.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="bg-secondary-container text-primary px-4 py-2 rounded-full font-semibold text-xs shadow-sm">
              Video Editing
            </span>
            <span className="bg-secondary-container text-primary px-4 py-2 rounded-full font-semibold text-xs shadow-sm">
              YouTube Management
            </span>
            <span className="bg-secondary-container text-primary px-4 py-2 rounded-full font-semibold text-xs shadow-sm">
              Content Optimization
            </span>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 to-purple-50">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Anuj Mishra Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Growth Philosophy (Bento Grid) */}
      <section className="mb-24 relative z-10">
        <div className="flex flex-col gap-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Growth Philosophy</h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
            My approach focuses on data-driven content and SEO to ensure your content provides more value and gains more views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento 1 */}
          <div className="col-span-1 md:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-end min-h-[320px] relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">smart_toy</span>
              <h3 className="text-2xl font-bold text-on-surface mb-2">AI-Powered Efficiency</h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                Leveraging cutting-edge AI tools to build high-performance social media calendars and marketing workflows that scale effortlessly.
              </p>
            </div>
          </div>

          {/* Bento 2 */}
          <div className="col-span-1 glass-card rounded-2xl p-8 flex flex-col justify-between min-h-[320px] hover:-translate-y-1 transition-transform">
            <div>
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">analytics</span>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Data-Driven Growth</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Moving beyond aesthetics to focus on lead generation, conversion rates, and measurable ROI through Google Ads.
              </p>
            </div>
            <div className="w-full h-20 bg-secondary-container/60 rounded-xl flex items-center justify-center text-primary font-bold text-xs uppercase tracking-wider">
              High ROI Focus
            </div>
          </div>

          {/* Bento 3 */}
          <div className="col-span-1 glass-card rounded-2xl p-8 flex flex-col justify-between min-h-[320px] hover:-translate-y-1 transition-transform">
            <div>
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">groups</span>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Community-First</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Drawing on my roots as a creator to build authentic connections that turn viewers into loyal brand advocates.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-start shadow-sm"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-end shadow-sm"></div>
              <div className="w-8 h-8 rounded-full bg-primary/20 shadow-sm"></div>
            </div>
          </div>

          {/* Bento 4 */}
          <div className="col-span-1 md:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-center min-h-[320px] relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-4 text-4xl">trending_up</span>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Strategic Scaling</h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                I don&apos;t just manage accounts—I engineer growth. My strategies are designed to maximize reach while maintaining the core brand identity that resonates with your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey (Timeline) */}
      <section className="mb-24 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-12">Professional Journey</h2>
        <div className="relative border-l-2 border-secondary-container ml-4 md:ml-8 pl-8 flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              <div
                className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 ${
                  exp.active
                    ? "bg-primary border-primary scale-125 shadow-lg shadow-indigo-500/50"
                    : "bg-surface-container-lowest border-outline-variant group-hover:border-primary group-hover:scale-125"
                } transition-all duration-300`}
              ></div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-baseline">
                <div className="md:w-1/4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${exp.active ? "text-primary" : "text-on-surface-variant"}`}>
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-on-surface mt-1">{exp.title}</h3>
                  <span className="text-xs font-medium text-on-surface-variant">{exp.role}</span>
                </div>
                <div className="md:w-3/4 glass-card p-6 rounded-2xl">
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl mt-12">
        <h2 className="text-3xl font-bold text-on-surface mb-4">Ready to elevate your content?</h2>
        <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
          I&apos;m currently accepting a limited number of clients. Let&apos;s build something great together.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-primary-container"
        >
          Let&apos;s Work Together
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
