"use client";

import React, { useState } from "react";

interface Category {
  key: string;
  title: string;
  count: number;
}

export default function LongFormNicheNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<string>("all");

  const scrollTo = (key: string) => {
    setActive(key);
    if (key === "all") {
      window.scrollTo({ top: 260, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-12 px-2 sticky top-[76px] z-20 py-2.5 bg-background/80 backdrop-blur-md rounded-2xl border border-black/[0.04] shadow-sm">
      <button
        type="button"
        onClick={() => scrollTo("all")}
        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
          active === "all"
            ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
            : "bg-neutral-900/[0.04] text-neutral-600 hover:bg-neutral-900/[0.08]"
        }`}
      >
        <span>All Categories</span>
      </button>
      {categories.map((c) => {
        const isSelected = active === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => scrollTo(c.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isSelected
                ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                : "bg-neutral-900/[0.04] text-neutral-600 hover:bg-neutral-900/[0.08]"
            }`}
          >
            <span>{c.title}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                isSelected ? "bg-white/25 text-white" : "bg-neutral-900/[0.06] text-neutral-500"
              }`}
            >
              {c.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
