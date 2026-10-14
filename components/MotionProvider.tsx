"use client";

import { useEffect } from "react";

/**
 * One tiny global motion engine (no animation library needed):
 *  - top scroll progress bar            → sets --scroll on <html>
 *  - [data-scrub]    scroll-scrubbed    → sets --p (0→1) on the element
 *  - [data-parallax] depth layers       → sets --py (px) on the element
 *  - .spotlight      cursor glow cards  → sets --mx/--my on the element
 * Everything is rAF-throttled, passive, and disabled for reduced-motion users.
 */
export default function MotionProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const max = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--scroll", String(Math.min(1, window.scrollY / max)));
      if (reduce) return;

      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        const r = el.getBoundingClientRect();
        // 0 when the top edge enters the bottom of the screen, 1 when it reaches ~35% from top
        const start = vh;
        const end = vh * 0.35;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        el.style.setProperty("--p", p.toFixed(3));
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const r = el.getBoundingClientRect();
        const centerOffset = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(-centerOffset * speed).toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onMove = (e: MouseEvent) => {
      if (reduce) return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
