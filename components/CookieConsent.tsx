"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANALYTICS_ENABLED, PLAUSIBLE_DOMAIN } from "@/lib/analytics";

const CONSENT_KEY = "cookie-consent";

// Inject the privacy-friendly Plausible analytics script after consent.
function loadPlausible(): void {
  if (typeof window === "undefined" || !ANALYTICS_ENABLED) return;
  if (document.getElementById("plausible-script")) return;

  const script = document.createElement("script");
  script.id = "plausible-script";
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = "https://plausible.io/js/script.tagged-events.js";
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadPlausible();
      return;
    }
    if (stored === null) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadPlausible();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-outline-variant/50 bg-surface/95 backdrop-blur-md shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-on-surface-variant leading-relaxed flex-1">
          We use privacy-friendly analytics (no cookies, no personal data) to
          improve this site. By continuing you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="text-primary font-semibold hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
