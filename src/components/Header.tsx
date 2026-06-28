"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccessibilityWidget from "./AccessibilityWidget";

const navLinks = [
  { href: "/artykuly", label: "Artykuły" },
  { href: "/poradniki", label: "Poradniki" },
  { href: "/kalkulator-zdrowia", label: "Kalkulator zdrowia" },
  { href: "/kalkulator-petow", label: "Kalkulator petów" },
  { href: "/kalendarz-rzucania", label: "Kalendarz" },
  { href: "/o-nas", label: "O nas" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Close menu on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            aria-label="RzucamFaje.pl – strona główna"
            className="flex items-center gap-2 group"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-700 group-hover:bg-green-800 transition-colors"
            >
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" opacity="0.9"/>
                <rect x="5" y="10.5" width="10" height="3" rx="1.5" fill="white" opacity="0.9"/>
                <rect x="15" y="10.5" width="3" height="3" rx="1" fill="#86efac"/>
                <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              RzucamFaje
              <span className="text-green-700 dark:text-green-400">.pl</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Nawigacja główna" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AccessibilityWidget />

            <Link
              href="/zacznij-dzis"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-green-700 dark:bg-green-600 text-white text-sm font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Zacznij dziś
            </Link>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              type="button"
              className="md:hidden p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        ref={menuRef}
        role="region"
        aria-label="Menu mobilne"
        hidden={!menuOpen}
        className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <nav aria-label="Nawigacja mobilna">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/zacznij-dzis"
              className="mt-2 px-4 py-2.5 rounded-lg bg-green-700 text-white text-sm font-semibold text-center hover:bg-green-800 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Zacznij dziś
            </Link>
          </div>
        </nav>
      </div>

      {/* Screen-reader live region for menu state announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {menuOpen ? "Menu nawigacyjne otwarte" : ""}
      </div>
    </header>
  );
}
