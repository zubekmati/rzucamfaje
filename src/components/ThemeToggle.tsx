"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
      }
      aria-pressed={isDark}
      className="
        p-2 rounded-lg
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors
      "
    >
      {isDark ? (
        /* Sun icon — shown in dark mode, click → go light */
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m8.66-9H21M3 12H2.34m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
          />
        </svg>
      ) : (
        /* Moon icon — shown in light mode, click → go dark */
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
