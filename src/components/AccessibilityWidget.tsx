"use client";

import { useState, useEffect, useRef } from "react";

const SCALES = [1, 1.15, 1.3, 1.5] as const;
type Scale = (typeof SCALES)[number];

const KEYS = {
  fontScale: "a11y-font-scale",
  highContrast: "a11y-high-contrast",
  underlineLinks: "a11y-underline-links",
} as const;

function load(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function Toggle({
  id,
  checked,
  onToggle,
  label,
}: {
  id: string;
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span id={id} className="text-sm text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
          checked ? "bg-green-700" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState<Scale>(1);
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sync state from localStorage on mount — DOM already pre-applied via inline script in layout.tsx
  useEffect(() => {
    const raw = parseFloat(load(KEYS.fontScale) ?? "1");
    const scale = SCALES.find((s) => s === raw) ?? 1;
    setFontScale(scale);
    setHighContrast(load(KEYS.highContrast) === "true");
    setUnderlineLinks(load(KEYS.underlineLinks) === "true");
  }, []);

  // Apply font scale to html element so all rem-based sizes scale proportionally
  useEffect(() => {
    document.documentElement.style.fontSize =
      fontScale === 1 ? "" : `${fontScale * 100}%`;
    save(KEYS.fontScale, String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    save(KEYS.highContrast, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("underline-links", underlineLinks);
    save(KEYS.underlineLinks, String(underlineLinks));
  }, [underlineLinks]);

  // Close on Escape, return focus to trigger
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        !panelRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Move focus to first interactive element in panel when opening
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, [tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, [open]);

  const scaleIdx = SCALES.indexOf(fontScale);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ustawienia dostępności"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {/* Universal Accessibility Symbol */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 11h12M12 8v5m-3.5 7.5L12 13l3.5 7.5"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Panel dostępności"
          aria-modal="false"
          className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50"
        >
          <div className="p-4 space-y-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Dostępność
            </p>

            {/* Font size controls */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Rozmiar tekstu
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const prev = SCALES[scaleIdx - 1];
                    if (prev !== undefined) setFontScale(prev);
                  }}
                  disabled={scaleIdx === 0}
                  aria-label="Zmniejsz rozmiar tekstu"
                  className="flex-1 rounded-lg border border-gray-300 py-1.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  A−
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale(1)}
                  aria-label={`Aktualny rozmiar: ${Math.round(fontScale * 100)}%. Kliknij aby zresetować`}
                  className="flex-1 rounded-lg border border-gray-300 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {Math.round(fontScale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = SCALES[scaleIdx + 1];
                    if (next !== undefined) setFontScale(next);
                  }}
                  disabled={scaleIdx === SCALES.length - 1}
                  aria-label="Powiększ rozmiar tekstu"
                  className="flex-1 rounded-lg border border-gray-300 py-1.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  A+
                </button>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Toggles */}
            <div className="space-y-3">
              <Toggle
                id="a11y-contrast"
                checked={highContrast}
                onToggle={() => setHighContrast((v) => !v)}
                label="Wysoki kontrast"
              />
              <Toggle
                id="a11y-underline"
                checked={underlineLinks}
                onToggle={() => setUnderlineLinks((v) => !v)}
                label="Podkreślenie linków"
              />
            </div>

            {/* Reset all */}
            <button
              type="button"
              onClick={() => {
                setFontScale(1);
                setHighContrast(false);
                setUnderlineLinks(false);
              }}
              className="w-full rounded-lg border border-gray-200 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Przywróć domyślne ustawienia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
