"use client";

import { useEffect, useState, type ReactNode } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export type AbVariant = "A" | "B";

/**
 * Renders one of two variants for a named experiment. The variant is assigned
 * once per visitor (persisted in a cookie) so the experience is stable across
 * page loads. Exposure is pushed to window.dataLayer for measurement once an
 * analytics tool (GA4 / PostHog) is connected.
 */
export function AbTest({
  experiment,
  variantA,
  variantB,
}: {
  experiment: string;
  variantA: ReactNode;
  variantB: ReactNode;
}) {
  const [variant, setVariant] = useState<AbVariant | null>(null);

  useEffect(() => {
    const cookieName = `anua_ab_${experiment}`;
    let v = readCookie(cookieName) as AbVariant | null;
    if (!v || (v !== "A" && v !== "B")) {
      v = Math.random() < 0.5 ? "A" : "B";
      writeCookie(cookieName, v);
    }
    setVariant(v);

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "ab_exposure", experiment, variant: v });
    }
  }, [experiment]);

  // Render variant A during SSR / first paint to keep layout stable (no CLS).
  if (variant === null || variant === "A") return <>{variantA}</>;
  return <>{variantB}</>;
}
