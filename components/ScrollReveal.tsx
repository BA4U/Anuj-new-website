"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  /** Children carry their own `.reveal` class and animate one after another (wrapper stays static). */
  each?: boolean;
}

export default function ScrollReveal({ children, className = "", stagger = false, each = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible to the container
            el.classList.add("visible");
            // Also add visible to all reveal children
            el.querySelectorAll(".reveal").forEach((child) => {
              child.classList.add("visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${each ? "stagger" : `reveal ${stagger ? "stagger" : ""}`} ${className}`}>
      {children}
    </div>
  );
}
