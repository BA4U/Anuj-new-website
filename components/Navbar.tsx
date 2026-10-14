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
    { name: "Work", href: "/work" },
    { name: "Free tools", href: "/free-tools" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 material transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-black/[0.08]"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-5 sm:px-6 lg:px-10 xl:px-14 h-[68px] w-full max-w-[1240px] mx-auto">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Anuj Mishra, home"
        >
          <span className="w-9 h-9 rounded-[10px] bg-on-surface text-white text-[16px] font-semibold flex items-center justify-center tracking-tight group-hover:bg-primary transition-colors duration-200">
            A
          </span>
          <span className="font-semibold text-[18px] text-on-surface tracking-[-0.01em]">
            Anuj Mishra
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full text-[16px] transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-on-surface font-medium bg-black/[0.055]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-black/[0.035]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-dark ml-3 !py-3 !px-6 !text-[15px]">
            Start a project
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-on-surface p-2 -mr-2 rounded-lg hover:bg-black/[0.05] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="material-symbols-outlined text-[22px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile drawer, translucent material, fades in */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] px-5 pb-6 pt-2 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-[17px] transition-colors ${
                isActive(link.href)
                  ? "text-on-surface font-medium bg-black/[0.05]"
                  : "text-on-surface-variant hover:bg-black/[0.035]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-dark w-full mt-3"
          >
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
