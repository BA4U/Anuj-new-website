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
  "linkedin-funnel-system": "LinkedIn Growth",
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
                    <option value="LinkedIn Growth">LinkedIn growth and management</option>
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
