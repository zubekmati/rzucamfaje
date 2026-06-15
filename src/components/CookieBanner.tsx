"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    setVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (visible !== true) return null;

  return (
    <div
      role="region"
      aria-label="Informacja o plikach cookie"
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 dark:bg-gray-950 border-t border-gray-700 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-300 leading-relaxed">
          Ta strona używa tylko niezbędnych plików cookie do prawidłowego działania.{" "}
          <Link
            href="/polityka-prywatnosci"
            className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors"
          >
            Polityka prywatności
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="flex-shrink-0 px-5 py-1.5 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
}
