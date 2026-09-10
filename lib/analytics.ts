// Lightweight, privacy-friendly analytics helper.
// Works with Plausible (configured via NEXT_PUBLIC_PLAUSIBLE_DOMAIN).
// Custom events require the "tagged-events" Plausible script.

type PlausibleProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: PlausibleProps; callback?: () => void }
    ) => void;
  }
}

export function trackEvent(name: string, props?: PlausibleProps): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
}

export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
export const ANALYTICS_ENABLED = PLAUSIBLE_DOMAIN.length > 0;
