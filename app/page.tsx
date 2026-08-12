import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const stats = [
    { value: "100+", label: "Videos Edited" },
    { value: "10M+", label: "Reach Generated" },
    { value: "5+", label: "Years Experience" },
  ];

  const coreTags = [
    "Video Editing",
    "SMM",
    "Google & LinkedIn Ads",
    "AI Tools & Automation",
  ];

  return (
    <div className="relative overflow-hidden -mt-20">
      {/* Background ambient light */}
      <div className="ambient-glow -top-24 -left-24"></div>
      <div className="ambient-glow-2 top-1/2 -right-24"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 flex flex-col justify-center pt-32 pb-16 overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Left Column: Text & Stats */}
          <div className="lg:w-1/2">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 leading-tight tracking-tight">
              Maximize Reach & Revenue with Expert{" "}
              <span className="gradient-text drop-shadow-sm">Social Media Strategy.</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              I help creators and brands scale through data-driven content, high-retention video editing, and conversion-focused ad management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/services"
                className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                See my work
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 text-on-surface font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:scale-105"
              >
                Get in touch
              </Link>
            </div>



            {/* Core Expertise Tags */}
            <div className="pt-8 border-t border-outline-variant/40">
              <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-4">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {coreTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-surface-container-lowest/60 border border-outline-variant/40 px-4 py-2 rounded-full text-xs font-semibold text-on-surface shadow-sm backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              
              {/* Floating Social Icons - visible on all screens, repositioned for mobile */}
              <div className="absolute flex -left-2 sm:-left-3 md:-left-6 top-6 sm:top-10 w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 animate-bounce p-1.5 sm:p-2 md:p-3 border border-indigo-100" style={{ animationDuration: "3s" }}>
                <span className="material-symbols-outlined text-red-600 text-lg sm:text-xl md:text-2xl">smart_display</span>
              </div>

              <div className="absolute flex -right-1 sm:-right-2 md:-right-4 top-1/3 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-blue-100">
                <span className="material-symbols-outlined text-blue-600 text-lg sm:text-xl md:text-2xl">work</span>
              </div>

              <div className="absolute flex left-1 sm:left-0 md:left-4 bottom-16 sm:bottom-20 md:bottom-12 w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-purple-100 animate-pulse">
                <span className="material-symbols-outlined text-purple-600 text-lg sm:text-xl md:text-2xl">auto_awesome</span>
              </div>

              {/* Main Portrait Card */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60 bg-white/40">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVgUM1CPI-chpiQnnacQOAazwKAIf2X5MgiRD1canwHi3-PNyeCAN1VYG06tYjQXLskeEt_ktPsUvDxxN_L9Ohk4yupNmlg-bnC10qZyeDx8ECQZEKVtWU5uq9eVhCx-qcTE5wosJfkt6NTN6fw9c2ZtGqxAoEYBnAnJcnKUPeyciq0_zM4K1C4Dtx2W0MJQ8MRGsfWMx0jiAQKjKTIiW7Jelor9RbkB7lzUza283dH10yzGnlDwkwt3iQtBL7DGOtn_1Z9OgjKUy2mg"
                    alt="Professional portrait of Anuj Mishra"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">Anuj Mishra</h4>
                        <p className="text-xs text-on-surface-variant">Video Editor & Growth Marketer</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* Featured Testimonials Marquee */}
      <section className="py-16 bg-surface overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-10">
          <div className="text-center w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Words From My Happy Clients</h2>
          </div>
        </div>

        
        <div className="relative flex overflow-x-hidden group py-4">
          <div className="animate-marquee flex whitespace-nowrap gap-6 px-3 group-hover:[animation-play-state:paused]">
            {/* Duplicate testimonials for infinite scroll */}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. I look forward to working with him some more."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">Victor Chan</h4>
                     <p className="text-xs text-on-surface-variant">YouTuber & Founder</p>
                   </div>
                </div>
                
                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "Anuj has been monumental in creating my podcast. He has a solid work ethic and is awesome at receiving feedback. I am so glad I worked with him."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">Harjeet Dhillon</h4>
                     <p className="text-xs text-on-surface-variant">Actress & Author</p>
                   </div>
                </div>

                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "The quality of edits and the strategic inputs on content packaging have significantly boosted our channel retention. He is creative, innovative and has brilliant ideas."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">Dr. Maurice Maurer</h4>
                     <p className="text-xs text-on-surface-variant">Science Educator</p>
                   </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
        </div>
        
        <div className="relative flex overflow-x-hidden group py-4">
          <div className="animate-[marquee-reverse_25s_linear_infinite] flex whitespace-nowrap gap-6 px-3 group-hover:[animation-play-state:paused]">
            {/* Duplicate testimonials for infinite scroll */}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "Anuj's attention to detail is unmatched. He understands the algorithms and edits in a way that hooks viewers immediately."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">Sarah Jenkins</h4>
                     <p className="text-xs text-on-surface-variant">Fitness Coach & Creator</p>
                   </div>
                </div>
                
                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "We hired Anuj to manage our entire social presence. The ROI has been incredible, and our engagement is up 300%."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">David Chen</h4>
                     <p className="text-xs text-on-surface-variant">Marketing Director, TechFlow</p>
                   </div>
                </div>

                <div className="w-[400px] flex-shrink-0 bg-white shadow-xl rounded-2xl p-8 relative whitespace-normal">
                   <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">
                     "He doesn't just edit videos; he crafts stories. The flow, the pacing, everything is just perfectly aligned with our brand voice."
                   </p>
                   <div className="flex flex-col items-center gap-1 pt-4 text-center">
                     <h4 className="font-bold text-on-surface text-sm">Elena Rodriguez</h4>
                     <p className="text-xs text-on-surface-variant">Lifestyle Vlogger</p>
                   </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#7c3aed] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">100+</h3>
            <p className="text-sm font-medium opacity-90">Videos Edited</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">10M+</h3>
            <p className="text-sm font-medium opacity-90">Reach Generated</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">12+</h3>
            <p className="text-sm font-medium opacity-90">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">5+</h3>
            <p className="text-sm font-medium opacity-90">Years Experience</p>
          </div>
        </div>
      </section>
      {/* Services Preview Section */}
      <section className="py-12 bg-surface-container-low/60 border-t border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Services Designed to Scale
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg">
              From high-retention video edits to complete social media strategies, I build systems that convert viewers into loyal clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">movie_edit</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Video Editing</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Expert post-production in Descript & DaVinci Resolve. High-retention Shorts, Reels, and podcasts.
              </p>
              <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">AI & Social Management</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                AI-driven content calendars, automated social media workflows, and community management.
              </p>
              <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">ads_click</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Performance Paid Ads</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                High-converting Google & LinkedIn Ad campaigns engineered for measurable lead generation.
              </p>
              <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto relative">
        <div className="flex flex-col md:flex-row items-center gap-12 glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-6">
              Hi, I&apos;m <span className="gradient-text">Anuj Mishra</span> 👋
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg mb-6 leading-relaxed">
              I transitioned from a YouTube creator to a full-stack growth specialist. My deep understanding of audience retention and algorithmic growth allows me to craft videos and campaigns that don&apos;t just look good—they convert.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-primary/50"
            >
              Read my full story <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 relative z-10">
             <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
               <span className="material-symbols-outlined text-primary text-4xl mb-2">trending_up</span>
               <span className="font-bold text-on-surface">Algorithmic Growth</span>
             </div>
             <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center mt-6">
               <span className="material-symbols-outlined text-primary text-4xl mb-2">groups</span>
               <span className="font-bold text-on-surface">Community First</span>
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-12">
            My <span className="gradient-text">Growth</span> Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">1</div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Discovery</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">We analyze your current metrics, identify content gaps, and define your conversion goals.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">2</div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Strategy & Creation</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">I craft high-retention video edits and build automated social calendars tailored to your brand.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center text-xl font-extrabold text-primary mb-6">3</div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Scale</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">We launch performance ads and optimize based on real-time data to maximize your ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Portfolio Section */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">Selected Works</h2>
            <p className="text-on-surface-variant text-base">A glimpse into recent projects driving growth.</p>
          </div>
          <Link href="/portfolio" className="bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container text-on-surface font-semibold py-2.5 px-6 rounded-full transition-all flex items-center gap-2">
            View Full Portfolio <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work Item 1 */}
          <div className="group relative rounded-3xl overflow-hidden glass-card hover:shadow-xl transition-all duration-300">
            <div className="relative w-full h-64 overflow-hidden bg-surface-container-low border-b border-outline-variant/30">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yRc9SLVU3wxVmFvr7DMbGjSG3qYpjfjh9tYzKpUK33eg2W1nnTjvlsrLhaBi6krKX0TdNuf7yLsAsOYdU0JLMomjjGoi8SejZX8T3hCSpIAsARplRb8T70IM2rYKk5Ol3q4KoPIE-WoRs5APA61VFmLYbW3uQbgFXi7YB-juA37Eo8ILQ718O2RtslZ9odscWJ2rdNEn697yO0U8SxV4Hs0xAN-6D1M18mtUaFkHgsfZF3v8LBALQw"
                alt="Video Editing Project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow">Video Editing</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-on-surface mb-2">Launch Excel VSL</h3>
              <p className="text-on-surface-variant text-sm mb-4">High-retention sales video resulting in increased course signups.</p>
              <Link href="/portfolio" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
            </div>
          </div>
          
          {/* Work Item 2 */}
          <div className="group relative rounded-3xl overflow-hidden glass-card hover:shadow-xl transition-all duration-300">
            <div className="relative w-full h-64 overflow-hidden bg-surface-container-low border-b border-outline-variant/30">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ"
                alt="Podcast Production"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-purple-600 text-xs font-bold px-3 py-1 rounded-full shadow">Podcast & SMM</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-on-surface mb-2">Author Podcast Launch</h3>
              <p className="text-on-surface-variant text-sm mb-4">Full-stack podcast launch including editing, thumbnails, and SEO descriptions.</p>
              <Link href="/portfolio" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-on-surface">
              Ready to elevate your brand&apos;s digital presence?
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg mb-8">
              Let&apos;s collaborate to craft high-impact video content and social media strategies tailored for your growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
            >
              Start a Project
              <span className="material-symbols-outlined">send</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
