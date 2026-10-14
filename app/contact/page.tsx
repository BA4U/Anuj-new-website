"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Owner must set NEXT_PUBLIC_BOOKING_URL (e.g. a Calendly link) to enable the
// "Book a call" variant. Until then the A/B test falls back to the form only.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

const SERVICE_MAP: Record<string, string> = {
  "content-engine": "Video Editing",
  "linkedin-funnel-system": "YouTube Growth",
  "production-pod": "Short-form / Reels",
  "thumbnails": "Thumbnails & Graphics",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const presetService = (() => {
    const key = searchParams.get("service") ?? "";
    return SERVICE_MAP[key] ?? "";
  })();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: presetService,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (presetService) {
      setFormData((prev) => ({ ...prev, subject: presetService }));
    }
  }, [presetService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save message to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      // Send email notification to admin via Resend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      console.error("Error submitting contact form:", err);
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message || "Something went wrong. Please try again or email me directly at contact@anuj4u.in.");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/byanuj4u/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "hover:text-[#0A66C2]",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/9123997677",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "hover:text-green-600",
    },
    {
      name: "Telegram",
      href: "https://t.me/anujmishra4u",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: "hover:text-[#26A5E4]",
    },
    {
      name: "Skype",
      href: "https://join.skype.com/invite/yCZ9IhClcTvD",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C6.73 0 2.4 3.22 1.04 7.84L0 7.84C0 5.02 2.24 2.74 5 2.74C7.76 2.74 10 5.02 10 7.84C10 10.66 7.76 12.94 5 12.94C4.67 12.94 4.35 12.91 4.04 12.84L4.04 12.84C4.52 16.14 7.4 18.74 11 18.74C16.27 18.74 20.6 14.52 20.6 9.24C20.6 4.01 16.27 0 12 0ZM7.4 5.24C6.39 5.24 5.6 6.04 5.6 7.04C5.6 8.04 6.39 8.84 7.4 8.84C8.41 8.84 9.2 8.04 9.2 7.04C9.2 6.04 8.41 5.24 7.4 5.24ZM16.6 16.24C15.59 16.24 14.8 15.44 14.8 14.44C14.8 13.44 15.59 12.64 16.6 12.64C17.61 12.64 18.4 13.44 18.4 14.44C18.4 15.44 17.61 16.24 16.6 16.24Z"/>
        </svg>
      ),
      color: "hover:text-[#00AFF0]",
    },
  ];

  const inputCls =
    "w-full bg-white border border-black/[0.12] rounded-xl px-4 py-3 text-[15px] text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition";

  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-a w-[480px] h-[480px] -top-40 -left-40 opacity-50" />
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-24 relative">
        <header className="text-center max-w-xl mx-auto mb-10 md:mb-12 flex flex-col items-center">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-[38px] sm:text-[52px] md:text-[60px] display text-on-surface mb-4">
            Let&apos;s talk about <span className="gradient-text">your channel.</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-on-surface-variant leading-relaxed">
            Tell me what you are working on. I will get back to you with next steps.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* Form */}
          <div className="md:col-span-3 card-glow p-6 md:p-9">
            {success ? (
              <div className="text-center py-8 flex flex-col items-center">
                <span className="material-symbols-outlined text-emerald-600 text-5xl mb-3">check_circle</span>
                <h2 className="text-[22px] font-semibold text-on-surface mb-2">Message sent</h2>
                <p className="text-[15px] text-on-surface-variant mb-6">Thanks for reaching out. I will write back soon.</p>
                <button onClick={() => setSuccess(false)} className="btn btn-secondary btn-sm">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-700 text-[13px]">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c-name" className="block text-[13px] font-medium text-on-surface mb-1.5">Name</label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-[13px] font-medium text-on-surface mb-1.5">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-topic" className="block text-[13px] font-medium text-on-surface mb-1.5">What do you need?</label>
                  <select
                    id="c-topic"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`${inputCls} appearance-none`}
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23808080'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5rem" }}
                  >
                    <option value="">Choose one</option>
                    <option value="Video Editing">Video editing</option>
                    <option value="Short-form / Reels">Shorts and Reels</option>
                    <option value="Thumbnails & Graphics">Thumbnails and graphics</option>
                    <option value="YouTube Growth">YouTube growth</option>
                    <option value="Full Automation">Channel automation</option>
                    <option value="General Inquiry">Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-msg" className="block text-[13px] font-medium text-on-surface mb-1.5">Message</label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    placeholder="Your channel link and what you would like help with"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn btn-glow w-full disabled:opacity-50">
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Quick contact */}
          <aside className="md:col-span-2 flex flex-col gap-4 text-center md:text-left">
            <div className="card-glow p-6">
              <p className="label mb-2 !text-[11px]">Prefer to talk?</p>
              <div className="flex flex-col gap-2.5">
                {BOOKING_URL && (
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark w-full">
                    Book a call
                  </a>
                )}
                <a href="https://wa.me/9123997677" target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full">
                  WhatsApp
                </a>
                <a href="mailto:contact@anuj4u.in" className="btn btn-secondary w-full">
                  contact@anuj4u.in
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 px-1">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-full border border-black/[0.1] bg-white flex items-center justify-center text-on-surface-variant transition-colors ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-on-surface-variant">Loading…</div>}>
      <ContactForm />
    </Suspense>
  );
}
