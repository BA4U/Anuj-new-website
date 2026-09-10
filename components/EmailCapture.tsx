"use client";

import React, { useState } from "react";

type Variant = "card" | "inline" | "sidebar";

interface EmailCaptureProps {
  source: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  card: "glass-card rounded-3xl p-8 md:p-10 bg-gradient-to-br from-purple-50 via-purple-100 to-pink-200 shadow-2xl",
  inline: "glass-card rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-primary/20",
  sidebar: "glass-card rounded-2xl p-6 border border-outline-variant/40",
};

export function EmailCapture({
  source,
  title = "Get the next one in your inbox",
  description = "Real notes on what is working in content, YouTube, and LinkedIn. Once a week. No fluff.",
  buttonLabel = "Subscribe",
  variant = "card",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not subscribe right now.");
      }
      setStatus("success");
      setMessage("Check your inbox — you are on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className={variantClasses[variant]}>
      <h3 className="text-lg md:text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-white border border-outline-variant rounded-full px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary hover:bg-primary-container text-white font-semibold px-6 py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing…" : buttonLabel}
        </button>
      </form>
      {status === "success" && (
        <p className="text-xs text-green-700 font-medium mt-3">{message}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600 font-medium mt-3">{message}</p>
      )}
    </div>
  );
}
