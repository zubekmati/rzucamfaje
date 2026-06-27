"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Link from "next/link";

const KEY_DAYS  = "rfj-kal-days";
const KEY_START = "rfj-kal-start";

// Parse date string as local time (not UTC) to avoid off-by-one timezone errors
function parseLocal(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00");
}

function addDays(dateStr: string, n: number): string {
  const d = parseLocal(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function fmtShort(dateStr: string): string {
  return parseLocal(dateStr).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

function fmtWeekday(dateStr: string): string {
  return parseLocal(dateStr).toLocaleDateString("pl-PL", { weekday: "short" });
}

// ── Print styles ─────────────────────────────────────────────────────────────
// We use .screen-only / .print-only class names to show/hide in print.
// These classes are defined here so they work regardless of Tailwind purging.
const PRINT_CSS = `
  @media print {
    @page { size: A4 portrait; margin: 12mm; }

    /* Show/hide helpers */
    .screen-only { display: none !important; }
    .print-only  { display: block !important; }

    /* Print header */
    .print-header { display: block !important; text-align: center; margin-bottom: 6mm; }
    .print-header-logo { font-size: 20pt; font-weight: 900; color: #000; }
    .print-header-title { font-size: 14pt; font-weight: 700; color: #000; margin: 1mm 0 2mm; }
    .print-header-meta  { font-size: 8pt; color: #555; }

    /* Grid */
    .cal-grid {
      display: grid !important;
      grid-template-columns: repeat(5, 1fr) !important;
      gap: 3mm !important;
    }

    /* Cells — <div role="checkbox"> */
    .cal-cell {
      border: 1.5px solid #333 !important;
      border-radius: 4px !important;
      background: white !important;
      color: black !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 3mm 1mm !important;
      min-height: 30mm !important;
      aspect-ratio: 1 !important;
      page-break-inside: avoid !important;
      cursor: default !important;
      box-shadow: none !important;
    }
    .cal-cell-wd   { font-size: 6pt  !important; color: #888 !important; text-transform: uppercase; letter-spacing: .3pt; }
    .cal-cell-num  { font-size: 20pt !important; font-weight: 900 !important; color: #000 !important; line-height: 1 !important; margin: 1mm 0; }
    .cal-cell-date { font-size: 6pt  !important; color: #666 !important; margin-bottom: 1mm; }
    .cal-cell-circle {
      display: block !important;
      width: 9mm !important; height: 9mm !important;
      border-radius: 50% !important;
      border: 1.5px solid #444 !important;
      background: white !important;
      margin-top: 1mm !important;
    }
    /* Hide screen-only child elements inside cells */
    .cal-cell-screen { display: none !important; }

    /* Print footer */
    .print-footer {
      display: block !important;
      text-align: center;
      font-size: 7pt;
      color: #aaa;
      border-top: 1px solid #ddd;
      padding-top: 3mm;
      margin-top: 4mm;
    }
  }
`;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KalendarzRzucaniaPage() {
  const [checked,   setChecked]   = useState<Set<number>>(new Set());
  const [startDate, setStartDate] = useState("");
  const [hydrated,  setHydrated]  = useState(false);

  // Load from localStorage once mounted
  useEffect(() => {
    try {
      const savedDays = localStorage.getItem(KEY_DAYS);
      if (savedDays) setChecked(new Set(JSON.parse(savedDays) as number[]));
    } catch {}
    const savedStart = localStorage.getItem(KEY_START);
    if (savedStart) setStartDate(savedStart);
    setHydrated(true);
  }, []);

  // Persist checked days
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY_DAYS, JSON.stringify([...checked]));
  }, [checked, hydrated]);

  // Persist start date
  useEffect(() => {
    if (!hydrated) return;
    if (startDate) localStorage.setItem(KEY_START, startDate);
    else localStorage.removeItem(KEY_START);
  }, [startDate, hydrated]);

  function toggle(day: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day); else next.add(day);
      return next;
    });
  }

  function reset() {
    if (!confirm("Zresetować cały postęp i datę startu?")) return;
    setChecked(new Set());
    setStartDate("");
    localStorage.removeItem(KEY_DAYS);
    localStorage.removeItem(KEY_START);
  }

  const today = new Date().toISOString().split("T")[0];
  const done  = checked.size;

  function dayDate(day: number): string | null {
    return startDate ? addDays(startDate, day - 1) : null;
  }

  function isPast(day: number): boolean {
    const dd = dayDate(day);
    return !!dd && dd < today;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <SkipLink />

      {/* Header hidden in print */}
      <div className="screen-only">
        <Header />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none"
      >
        {/* ── Screen page header ────────────────────────────────── */}
        <section
          aria-labelledby="page-heading"
          className="screen-only bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
              Narzędzie
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Kalendarz 30 dni bez papierosa
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Klikaj każdy dzień bez papierosa. Postęp zapisuje się automatycznie w przeglądarce.
              Wydrukuj i powieś na lodówce — fizyczny postęp motywuje.
            </p>
          </div>
        </section>

        {/* ── Print page header ─────────────────────────────────── */}
        <div className="print-header print-only" style={{ display: "none" }}>
          <div className="print-header-logo">RzucamFaje.pl</div>
          <div className="print-header-title">Moje 30 dni bez papierosa</div>
          <div className="print-header-meta">
            {startDate
              ? `Start: ${fmtShort(startDate)} — Cel: ${fmtShort(addDays(startDate, 29))}`
              : "Data startu: _______________________"}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* ── Start date + progress (screen only) ───────────── */}
          <div className="screen-only grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Start date */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
              <label
                htmlFor="start-date"
                className="block text-sm font-semibold text-gray-900 dark:text-white mb-1"
              >
                Dzień 1 — kiedy rzuciłeś/aś?
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Ustaw datę żeby zobaczyć historię i rzeczywiste daty na kalendarzu.
                Możesz ustawić datę z przeszłości.
              </p>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={today}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {startDate && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Dzień 30 wypada:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {fmtShort(addDays(startDate, 29))}
                  </strong>
                </p>
              )}
            </div>

            {/* Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Postęp</h2>
                <span
                  aria-live="polite"
                  className="text-sm font-bold text-green-700 dark:text-green-400"
                >
                  {done}/30
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={done}
                aria-valuemin={0}
                aria-valuemax={30}
                aria-label={`${done} z 30 dni`}
                className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3"
              >
                <div
                  className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${(done / 30) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {done === 0 && "Kliknij dzień żeby go zaznaczyć"}
                {done > 0 && done < 30 && `Zostało ${30 - done} dni do celu — dasz radę`}
                {done === 30 && "🎉 Gratulacje! 30 dni bez papierosa!"}
              </p>
              {hydrated && (
                <p className="mt-1.5 text-xs text-green-700 dark:text-green-400 font-medium">
                  ✓ Postęp zapisany w tej przeglądarce
                </p>
              )}
            </div>
          </div>

          {/* ── Calendar grid ─────────────────────────────────── */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
            <div
              className="cal-grid grid grid-cols-5 gap-2 sm:gap-3"
              role="group"
              aria-label="Kalendarz 30 dni"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isChecked = checked.has(day);
                const dd        = dayDate(day);
                const past      = isPast(day);

                return (
                  <div
                    key={day}
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-label={`Dzień ${day}${dd ? ` (${fmtShort(dd)})` : ""}${isChecked ? ", zaznaczony" : ""}`}
                    tabIndex={0}
                    onClick={() => toggle(day)}
                    onKeyDown={(e) => (e.key === " " || e.key === "Enter") && toggle(day)}
                    className={[
                      "cal-cell aspect-square rounded-xl border-2 flex flex-col items-center justify-center",
                      "cursor-pointer select-none transition-all duration-150 gap-0.5",
                      isChecked
                        ? "border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-500 shadow-sm"
                        : past
                          ? "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20 hover:border-green-400 dark:hover:border-green-600"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-green-400 dark:hover:border-green-600",
                    ].join(" ")}
                  >
                    {/* Weekday or "Dz." label */}
                    <span
                      className={`cal-cell-wd text-[9px] font-semibold uppercase tracking-wide leading-none ${
                        isChecked
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {dd ? fmtWeekday(dd) : "Dz."}
                    </span>

                    {/* Day number */}
                    <span
                      className={`cal-cell-num text-xl font-extrabold leading-none ${
                        isChecked
                          ? "text-green-700 dark:text-green-300"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {day}
                    </span>

                    {/* Actual date (only when start date is set) */}
                    {dd && (
                      <span
                        className={`cal-cell-date text-[8px] leading-none ${
                          isChecked
                            ? "text-green-600/70 dark:text-green-400/60"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {fmtShort(dd)}
                      </span>
                    )}

                    {/* Screen-only indicator */}
                    <span className="cal-cell-screen mt-0.5" aria-hidden="true">
                      {isChecked ? (
                        <svg
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

                    {/* Print-only circle — always empty, to fill with pencil */}
                    <div aria-hidden="true" className="cal-cell-circle" style={{ display: "none" }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Action buttons (screen only) ──────────────────── */}
          <div className="screen-only flex flex-col sm:flex-row gap-3 justify-center">
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
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Resetuj postęp
            </button>
          </div>

          {/* ── Print footer ──────────────────────────────────── */}
          <div
            className="print-footer print-only"
            style={{ display: "none" }}
          >
            rzucamfaje.pl/kalendarz-rzucania — bezpłatny do wydruku
          </div>

          {/* ── Related articles (screen only) ────────────────── */}
          <div className="screen-only grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

      {/* Footer hidden in print */}
      <div className="screen-only">
        <Footer />
      </div>
    </>
  );
}
