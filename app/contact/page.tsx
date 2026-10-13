"use client";

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Something went wrong. Please try again or email me directly at contact@anuj4u.in.");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="py-12 px-5 sm:px-6 lg:px-10 xl:px-14 max-w-[1240px] mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 bottom-10 right-[-100px]"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl display text-on-surface mb-6 leading-tight">
          Let&apos;s create something <span className="gradient-text">extraordinary.</span>
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
          I&apos;m always open to discussing video editing projects, YouTube channel growth, or marketing partnerships.
        </p>
      </div>

      {/* Bento Layout for Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Direct Email */}
          <div className="glass-card rounded-3xl p-8 hover:scale-[1.01] transition-transform duration-300 relative">
            <div className="gradient-border"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Email me directly</h3>
            <p className="text-on-surface-variant text-sm mb-4">I aim to respond within 24 hours.</p>
            <a
              href="mailto:contact@anuj4u.in"
              className="text-lg font-bold text-primary hover:underline decoration-primary/50 block"
            >
              contact@anuj4u.in
            </a>
            <a
              href="mailto:bg4uanujofficial@gmail.com"
              className="text-xs font-semibold text-on-surface-variant hover:text-primary mt-1 block"
            >
              bg4uanujofficial@gmail.com
            </a>
          </div>

          {/* What happens next */}
          <div className="card p-8">
            <h3 className="text-[11px] font-semibold text-on-surface-variant mb-5 uppercase tracking-[0.14em]">
              What happens next
            </h3>
            <ol className="space-y-5">
              {[
                {
                  n: "1",
                  t: "I reply within 24 hours",
                  d: "A real answer from me — not an autoresponder.",
                },
                {
                  n: "2",
                  t: "Free 20-minute audit call",
                  d: "I review your last 10 videos and flag what is costing you viewers.",
                },
                {
                  n: "3",
                  t: "A plan and a quote",
                  d: "Scope, timeline and price in writing. No obligation either way.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-on-surface/[0.06] text-on-surface text-[13px] font-semibold flex items-center justify-center shrink-0">
                    {step.n}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-on-surface">
                      {step.t}
                    </span>
                    <span className="block text-[14px] text-on-surface-variant leading-relaxed mt-0.5">
                      {step.d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-on-surface mb-6">Send a message</h2>

          {success ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-emerald-600 text-5xl mb-3">
                check_circle
              </span>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Message Sent Successfully!</h3>
              <p className="text-emerald-800 text-sm mb-6">
                Thank you for reaching out. Anuj will get back to you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-emerald-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Video Editing / YouTube Growth / General Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or channel goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-primary hover:bg-primary-container text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
