import React from "react";
import Link from "next/link";

const socials: { name: string; href: string; icon: string }[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/byanuj4u/", icon: "person" },
  { name: "WhatsApp", href: "https://wa.me/9123997677", icon: "chat" },
  { name: "Telegram", href: "https://t.me/anujmishra4u", icon: "send" },
  { name: "Skype", href: "https://join.skype.com/invite/yCZ9IhClcTvD", icon: "forum" },
];

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

  const tools = [
    { name: "Free LinkedIn plan", href: "/linkedin-funnel" },
    { name: "Analyze my YouTube channel", href: "/youtube-funnel" },
    { name: "All free tools", href: "/free-tools" },
  ];

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0f] text-[#f5f5f7] w-full pt-16 pb-10 mt-auto">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-[8px] bg-white text-[#0b0b0f] text-[13px] font-semibold flex items-center justify-center">
                A
              </span>
              <span className="font-semibold text-[15px] tracking-[-0.01em]">
                Anuj Mishra
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-white/55 max-w-sm mb-6">
              Videos that hook. Strategy that scales. Real analytics, real clients, one channel at a time.
            </p>
            <a
              href="mailto:contact@anuj4u.in"
              className="text-[15px] font-medium text-white hover:text-white/70 transition-colors"
            >
              contact@anuj4u.in
            </a>
            <div className="mt-8 max-w-sm">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent border border-white/10 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-300/80 mb-2">
                Free channel audit
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed mb-3">
                Paste your YouTube channel and get a 30-day plan — hooks, titles, thumbnail direction and the one fix that matters.
              </p>
              <Link
                href="/youtube-funnel"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:text-white/80 transition-colors"
              >
                Analyze my YouTube channel
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
              </div>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free tools */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Free tools
            </h4>
            <ul className="space-y-2.5">
              {tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Connect
            </h4>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors duration-150"
                    aria-label={social.name}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-white/50 mb-6">
                Prefer email? I reply within 24 hours.
              </p>
            )}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[12px] text-white/60">
                Open for projects
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} Anuj Mishra. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
