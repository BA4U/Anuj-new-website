import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 border-t border-purple-200/50 w-full py-12" id="footer">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-16 gap-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-bold text-xl text-on-surface">Anuj Mishra</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="#"
            className="text-body-md text-on-secondary-container hover:text-primary transition-colors hover:underline decoration-primary/30"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-body-md text-on-secondary-container hover:text-primary transition-colors hover:underline decoration-primary/30"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-body-md text-on-secondary-container hover:text-primary transition-colors hover:underline decoration-primary/30"
          >
            Contact
          </Link>
        </div>

        <div className="text-body-md text-on-surface-variant">
          © {new Date().getFullYear()} Anuj Mishra Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
