import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials | Anuj Mishra",
  description: "Read success stories and feedback from creators, authors, and professionals who have worked with Anuj Mishra.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | Anuj Mishra",
    description: "Read success stories and feedback from creators, authors, and professionals who have worked with Anuj Mishra.",
    url: "https://anuj4u.in/testimonials",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials | Anuj Mishra",
    description: "Read success stories and feedback from creators, authors, and professionals who have worked with Anuj Mishra.",
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Harjeet Dhillon",
      role: "Canadian actress and author",
      text: "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of softwares available and has guided me more than I could ever hope for with setting up my podcast. He has a solid work ethic and is awesome at receiving feedback.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDX1QBf9H4AztNNXxJlgKiDlGRYZEWbkt_1zlSxhOqPxmx9g4D8Hj517r9BGAq_OylFTF-Yi2yNgkVnqlzeylUdTAri15J_Y_EZg3bclrmRi9BQVtKDy4n7Co3py0VBeZrGaO9d3QcfDbd_bOGyoh1ZaJORB1eriKxwVcZBsoP0k8abvyR3OnPCKDUMpWsQVdZE7ZRcQB0bdhwoBj8VQEkiy4TO54TrP_r87Qr5lXuA7zh7j3vlgLeBDQ",
    },
    {
      name: "Victor Chan",
      role: "YouTuber & Founder of Launch Excel",
      text: "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yRc9SLVU3wxVmFvr7DMbGjSG3qYpjfjh9tYzKpUK33eg2W1nnTjvlsrLhaBi6krKX0TdNuf7yLsAsOYdU0JLMomjjGoi8SejZX8T3hCSpIAsARplRb8T70IM2rYKk5Ol3q4KoPIE-WoRs5APA61VFmLYbW3uQbgFXi7YB-juA37Eo8ILQ718O2RtslZ9odscWJ2rdNEn697yO0U8SxV4Hs0xAN-6D1M18mtUaFkHgsfZF3v8LBALQw",
    },
    {
      name: "Dr. Maurice Maurer",
      role: "PhD in Computational physics",
      text: "I hired Anuj to do Video editing + graphic design work for my Youtube channel. He did an excellent job and always responds very quickly and produces great results. I am very happy working with him and will continue to do so in the future.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ6INETUPr4mfcMG6fzakgmVe5e0s0KvLX5o9-bovSubFnxmIk9lm30G7Ll4D6BdJK7ytOohIo7vBYXU2GMvrqiEEmvbG2xvd4HAv2BiMhpjz3Gh-edOo3E3tJgdnPaFhtPMXA3hqMQ6HJM_Dj0YDOq517NWpHXYbHIQ7cNvICkULHA7Y1P5DdAK24q-lcIRCF2yHsMw0clQk7pKVik8UrA0Kp4AEBB7E9l-mmVaAzSsasp7CGmeZDg",
    },
    {
      name: "Blake Reddy",
      role: "Private Client Wealth Adviser",
      text: "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend! Thank you Anuj!",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAcV5YGRB486ybQ9zwbwu0Ihd1rDTcA1kf0hwynkmwEXSqTX_79g7gIDH2nZ8y2C5BQz8-bmX9SUCHmwklbnNosL59RHW49XgZpUMfaw7lthcJ4jGoOCpOker1OCanqdNjv7CyOaM_PJ4IxgIsk9uAXdxu0A6MrrK5NhtnhOj6BGFYv5NDx0iIr3LJ4dapkVvKiPUUFDWo9323rCyOH5QneWioGae6YJMew3Ch6Dw0DebyQ3i7jed8hrQ",
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Glow background */}
      <div className="ambient-glow top-0 right-1/4"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Client Feedback
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6">
          Client <span className="gradient-text">Success</span> Stories
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Don&apos;t just take my word for it. Here is what some of the amazing creators, authors, and professionals I&apos;ve worked with have to say.
        </p>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden border border-outline-variant/40 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span
              className="material-symbols-outlined absolute top-6 right-6 text-7xl text-primary/20 select-none pointer-events-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>

            <div className="relative z-10">
              <p className="text-on-surface text-base md:text-lg mb-8 italic leading-relaxed font-normal">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-base">{t.name}</h4>
                  <p className="text-xs text-on-surface-variant font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-on-surface">Want to join these success stories?</h3>
        <p className="text-on-surface-variant text-sm md:text-base mb-6">
          Let&apos;s discuss how we can grow your channel, podcast, or business.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-md hover:scale-105"
        >
          Get in Touch
          <span className="material-symbols-outlined">send</span>
        </Link>
      </div>
    </div>
  );
}
