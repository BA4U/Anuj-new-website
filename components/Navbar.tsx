"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center px-6 lg:px-16 py-4 w-full max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden shadow-md group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-white/20 rounded-full w-4 h-4 m-auto"></div>
            <span>A</span>
          </div>
          <span className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors duration-300">
            Anuj Mishra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-all duration-200 hover:text-primary ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1 font-semibold"
                    : "text-on-surface/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:bg-primary-container transition-all duration-200 shadow-md hover:shadow-indigo-500/25 hover:scale-105 active:scale-95"
          >
            Contact me
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-on-surface p-2 rounded-lg hover:bg-surface-container"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface-container-lowest border-b border-outline-variant px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-lg font-medium transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-on-surface/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-full shadow-md mt-4"
          >
            Contact me
          </Link>
        </div>
      )}
    </header>
  );
}
