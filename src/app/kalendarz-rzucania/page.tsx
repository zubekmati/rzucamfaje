"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Link from "next/link";

// Print styles injected via dangerouslySetInnerHTML — controls @page and button appearance
const PRINT_STYLES = `
  @media print {
    @page { size: A4 portrait; margin: 15mm; }
    button { display: none !important; }
  }
`;

export default function KalendarzRzucaniaPage() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(day: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  const done = checked.size;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />
      <SkipLink />

      <div className="print:hidden">
        <Header />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none"
      >
        {/* Screen page header */}
        <section
          aria-labelledby="page-heading"
          className="print:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <p
              aria-hidden="true"
              className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2"
            >
              Narzędzie
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Kalendarz 30 dni bez papierosa
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Klikaj każdy dzień, który udało Ci się przeżyć bez papierosa. Wydrukuj i powieś w widocznym miejscu — fizyczny postęp motywuje silniej niż aplikacja.
            </p>
          </div>
        </section>

        {/* Print page header — only visible when printing */}
        <div className="hidden print:block text-center mb-8">
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
            RzucamFaje.pl
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            Moje 30 dni bez papierosa
          </h1>
          <p className="text-sm text-gray-600">
            Data startu: _______________________
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Progress bar — screen only */}
          <section
            aria-labelledby="progress-heading"
            className="print:hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                id="progress-heading"
                className="text-sm font-semibold text-gray-900 dark:text-white"
              >
                Postęp
              </h2>
              <span
                aria-live="polite"
                className="text-sm font-bold text-green-700 dark:text-green-400"
              >
                {done}/30 dni
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={30}
              aria-label={`${done} z 30 dni ukończonych`}
              className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(done / 30) * 100}%` }}
              />
            </div>
            {done === 30 && (
              <p className="mt-3 text-sm font-semibold text-green-700 dark:text-green-400 text-center">
                Gratulacje! Ukończyłeś/aś 30 dni bez papierosa!
              </p>
            )}
          </section>

          {/* Calendar grid */}
          <section aria-labelledby="calendar-heading">
            <h2 id="calendar-heading" className="sr-only print:not-sr-only print:text-lg print:font-bold print:text-gray-900 print:mb-4 print:sr-only">
              Kalendarz dni
            </h2>
            <div className="bg-white dark:bg-gray-900 print:bg-white rounded-2xl border border-gray-100 dark:border-gray-800 print:border-gray-300 p-4 sm:p-6 shadow-sm print:shadow-none">
              <div className="grid grid-cols-5 gap-2 sm:gap-3 print:gap-3">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const isChecked = checked.has(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggle(day)}
                      aria-label={`Dzień ${day}${isChecked ? " — zaznaczony" : ""}`}
                      aria-pressed={isChecked}
                      className={[
                        "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all duration-150",
                        "print:rounded-lg print:border-gray-300 print:cursor-default",
                        isChecked
                          ? "border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-500 shadow-sm"
                          : "border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 bg-white dark:bg-gray-900",
                      ].join(" ")}
                    >
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                          isChecked
                            ? "text-green-600 dark:text-green-400 print:text-gray-500"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        Dzień
                      </span>
                      <span
                        className={`text-lg sm:text-xl font-extrabold leading-none ${
                          isChecked
                            ? "text-green-700 dark:text-green-300 print:text-gray-900"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {day}
                      </span>
                      {/* Screen: checkmark or empty circle */}
                      <span className="print:hidden">
                        {isChecked ? (
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </span>
                      {/* Print: always empty circle */}
                      <div
                        aria-hidden="true"
                        className="hidden print:block w-4 h-4 rounded-full border-2 border-gray-400"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Action buttons — screen only */}
          <div className="print:hidden flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-700 dark:bg-green-600 text-white text-sm font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Drukuj kalendarz (A4)
            </button>
            <button
              type="button"
              onClick={() => setChecked(new Set())}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Resetuj postęp
            </button>
          </div>

          {/* Print footer */}
          <div className="hidden print:block text-center text-xs text-gray-400 border-t border-gray-200 pt-4 mt-4">
            rzucamfaje.pl/kalendarz-rzucania — bezpłatny do wydruku
          </div>

          {/* Related links — screen only */}
          <div className="print:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link
              href="/artykuly/pierwsze-30-dni-bez-papierosa-plan"
              className="group flex flex-col gap-1 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 hover:border-green-400 dark:hover:border-green-600 transition-all"
            >
              <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                Czytaj też
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors leading-snug">
                Pierwsze 30 dni bez papierosa — plan tygodniowy
              </span>
            </Link>
            <Link
              href="/artykuly/aplikacje-do-rzucania-palenia-ranking-2026"
              className="group flex flex-col gap-1 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 hover:border-green-400 dark:hover:border-green-600 transition-all"
            >
              <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                Czytaj też
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors leading-snug">
                Najlepsze aplikacje do rzucania palenia 2026
              </span>
            </Link>
          </div>

        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
