"use client";

import React, { useState } from "react";
import Image from "next/image";
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

  const socials = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBNWHHyIDzpj8sfFWVk8Qjy1SB9-KJH5v7FfQD1PbcVrLD2H0CdcLGyABMCGDz-gm1IVbPXGphTTcAO7Fcmpy7T6I7JkJpdMYj3lav-pyTCfTte6ekNAgk5KEgp0U0vM9qm5OinZN6exvoCb0atsMP4MJ3z3Eu5HzSi2oVGa2QUGqmCtffKHWb8Gl1NVmepAD4IRoeqKsfo2nJttV-9Z1O9NrKEYyLrJn8knGg4j84sWbbhytE5vSNBTQ",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919999999999",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA17F-y8vrxW3bvBAdkowyk3b-xCxG0RKf1uyvnpnKB2sQ9VgSutDDDsaXFZ5RdQf-J1CB7EJzyeupk8w033Hge7oT6SybHcrdLAXFOlksCYJB4R3bUr-LLWYz4ryIQb733hhgkzDfUi3iEJO6dGFFgXDRa_L21xXsmQr89xhVQl_d7cT0VxkG7IpFMrJMU2KLA_h_VW_qz0PjvxHMtLYgvZM-x4E2VOXsCue49R1ZSXk6PTpiUvDZmrQ",
    },
    {
      name: "Telegram",
      href: "https://t.me",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCz--i1jo-8rVGLtpEaPYryXe4Q9bY9CRis-TqviQeUK0fm-7nfvXRFUFX730foWg1VSnRoDbc7JSw2Xz05fqk0FnzIZKtN9UN2Ohl7LbHod0C8P5XIWxkjYBQ_4lgpFUXeCQH60c3roznYYjgdU7p9UjtMlKrX9Y_UF1mwZBZkLayce71unDpwZGqJwFWNNwICx9LQ7eDOeE9kce7sK5P_4oUt8xUg-TvSRSfKc_8mMNvcq3tw5hbPxw",
    },
    {
      name: "Discord",
      href: "https://discord.com",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLaGWuLKxFIkKUH8dkWz73wi5Na49KXqUquaELYPXhG0n8JY3sVyEANKOmVVBWvnKxDWGEsvCTVERFqy5r_UqrQVZuYFfM5L1_bnip6zvSLSOpDSM0tMRuEn4mTKkrCsNocsJ5aC-GVZoijkYH8V7yDRvtXUkSkxNt0MzFkioMpoE7q3Df8Nuq-k3arsnNA6tZk0IgP1y3q5ulRGiPeZmw7cYarPMmVmaE6Vewoj91oMRuwDkOldVeoQ",
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 bottom-10 right-[-100px]"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
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

          {/* Social Grid */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xs font-bold text-on-surface-variant mb-6 uppercase tracking-wider">
              Connect with me
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface hover:bg-secondary-container transition-all group border border-outline-variant/30"
                >
                  <div className="relative w-6 h-6 shrink-0">
                    <Image
                      src={social.image}
                      alt={social.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="font-semibold text-sm text-on-surface">{social.name}</span>
                </a>
              ))}
            </div>
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
