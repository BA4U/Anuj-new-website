"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/work" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-black/[0.08]"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-5 sm:px-6 lg:px-10 xl:px-14 h-[68px] w-full max-w-[1240px] mx-auto">
        {/* Taffy-style Clover + Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Anuj Mishra, home"
        >
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:rotate-12">
            <circle cx="9.5" cy="9.5" r="5.5" fill="#F28C38" />
            <circle cx="18.5" cy="9.5" r="5.5" fill="#F28C38" />
            <circle cx="9.5" cy="18.5" r="5.5" fill="#F28C38" />
            <circle cx="18.5" cy="18.5" r="5.5" fill="#F28C38" />
          </svg>
          <span className="font-serif-accent italic text-[26px] leading-none text-[#111111] tracking-[-0.01em]">
            Anuj Mishra
          </span>
        </Link>

        {/* Taffy-style floating pill nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F7F7F7] border border-black/[0.06] rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-[14.5px] transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-[#111111] font-medium bg-white shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#111111]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link href="/contact" className="taffy-btn-dark px-5 py-2.5 text-[14px] font-medium inline-flex items-center gap-1.5">
            Book a call
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#111111] p-2 -mr-2 rounded-lg hover:bg-black/[0.05] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="material-symbols-outlined text-[22px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white/95 px-5 pb-6 pt-2 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-[16px] transition-colors ${
                isActive(link.href)
                  ? "text-[#111111] font-medium bg-[#F7F7F7]"
                  : "text-[#6F6F6F] hover:bg-[#F7F7F7]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="taffy-btn-dark w-full mt-3 py-3 text-center block text-[15px] font-medium"
          >
            Book a call
          </Link>
        </div>
      )}
    </header>
  );
}
