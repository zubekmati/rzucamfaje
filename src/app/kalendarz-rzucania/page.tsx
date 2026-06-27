"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Link from "next/link";

const KEY_DAYS  = "rfj-kal-days";
const KEY_START = "rfj-kal-start";
const KEY_TOTAL = "rfj-kal-total";

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

function fmtMonthLong(dateStr: string): string {
  return parseLocal(dateStr).toLocaleDateString("pl-PL", { month: "long" });
}

function daysInMonth(dateStr: string): number {
  const d = parseLocal(dateStr);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

// ── Print styles ─────────────────────────────────────────────────────────────
// @page { margin: 0 } removes the browser's built-in date/URL header/footer.
// We add our own padding via .print-page wrapper.
const PRINT_CSS = `
  @media print {
    @page { size: A4 portrait; margin: 0; }

    .screen-only { display: none !important; }
    .print-only  { display: block !important; }

    /* Outer wrapper that replaces @page margins */
    .print-page {
      padding: 12mm;
      box-sizing: border-box;
      width: 210mm;
    }

    /* Print header */
    .print-header { display: block !important; text-align: center; margin-bottom: 5mm; }
    .print-logo   { font-size: 18pt; font-weight: 900; color: #000; }
    .print-title  { font-size: 13pt; font-weight: 700; color: #000; margin: 1mm 0 2mm; }
    .print-meta   { font-size: 8pt;  color: #555; }

    /* Grid */
    .cal-grid {
      display: grid !important;
      grid-template-columns: repeat(5, 1fr) !important;
      gap: 2.5mm !important;
    }

    /* Cells */
    .cal-cell {
      border: 1.5px solid #333 !important;
      border-radius: 3px !important;
      background: white !important;
      color: black !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 2.5mm 1mm !important;
      min-height: 27mm !important;
      aspect-ratio: unset !important;
      page-break-inside: avoid !important;
      cursor: default !important;
      box-shadow: none !important;
    }
    .cal-wd     { font-size: 6pt  !important; color: #888 !important; text-transform: uppercase; letter-spacing: .3pt; }
    .cal-num    { font-size: 18pt !important; font-weight: 900 !important; color: #000 !important; line-height: 1 !important; margin: 0.8mm 0; }
    .cal-date   { font-size: 6pt  !important; color: #666 !important; margin-bottom: 0.5mm !important; }
    .cal-circle {
      display: block !important;
      width: 8mm !important; height: 8mm !important;
      border-radius: 50% !important;
      border: 1.5px solid #444 !important;
      background: white !important;
      margin-top: 1mm !important;
    }
    .cal-screen { display: none !important; }

    /* Print footer */
    .print-footer {
      display: block !important;
      text-align: center;
      font-size: 7pt;
      color: #bbb;
      border-top: 1px solid #e5e5e5;
      padding-top: 3mm;
      margin-top: 3mm;
    }
  }
`;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KalendarzRzucaniaPage() {
  const [checked,    setChecked]    = useState<Set<number>>(new Set());
  const [startDate,  setStartDate]  = useState("");
  const [totalDays,  setTotalDays]  = useState(30);
  const [hydrated,   setHydrated]   = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const d = localStorage.getItem(KEY_DAYS);
      if (d) setChecked(new Set(JSON.parse(d) as number[]));
    } catch {}
    const s = localStorage.getItem(KEY_START);
    if (s) setStartDate(s);
    const t = localStorage.getItem(KEY_TOTAL);
    if (t) setTotalDays(Number(t));
    setHydrated(true);
  }, []);

  // Persist checked days
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY_DAYS, JSON.stringify([...checked]));
  }, [checked, hydrated]);

  // Persist start date; auto-update totalDays to match the month
  useEffect(() => {
    if (!hydrated) return;
    if (startDate) {
      localStorage.setItem(KEY_START, startDate);
      setTotalDays(daysInMonth(startDate));
    } else {
      localStorage.removeItem(KEY_START);
    }
  }, [startDate, hydrated]);

  // Persist totalDays
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY_TOTAL, String(totalDays));
  }, [totalDays, hydrated]);

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
    setTotalDays(30);
    localStorage.removeItem(KEY_DAYS);
    localStorage.removeItem(KEY_START);
    localStorage.removeItem(KEY_TOTAL);
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

      <div className="screen-only"><Header /></div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none"
      >
        {/* ── Screen page header ───────────────────────────── */}
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
              Kalendarz rzucania palenia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Klikaj każdy dzień bez papierosa. Postęp zapisuje się automatycznie.
              Wydrukuj i powieś na lodówce.
            </p>
          </div>
        </section>

        {/* ── Outer print wrapper (replaces @page margins) ──── */}
        <div className="print-page">

          {/* Print header */}
          <div className="print-header print-only" style={{ display: "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3mm", marginBottom: "1mm" }}>
              {/* Logo icon — B&W version for print */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#222" strokeWidth="2"/>
                <rect x="5" y="10.5" width="10" height="3" rx="1.5" fill="#222"/>
                <rect x="15" y="10.5" width="3" height="3" rx="1" fill="#555"/>
                <line x1="5" y1="5" x2="19" y2="19" stroke="#222" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              <div className="print-logo">RzucamFaje.pl</div>
            </div>
            <div className="print-title">Moje {totalDays} dni bez papierosa</div>
            <div className="print-meta">
              {startDate
                ? `Start: ${fmtShort(startDate)} — Koniec: ${fmtShort(addDays(startDate, totalDays - 1))}`
                : "Data startu: _______________________"}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* ── Controls: start date + days + progress ──── */}
            <div className="screen-only grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Start date + days selector */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-4">

                {/* Date input */}
                <div>
                  <label
                    htmlFor="start-date"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Dzień 1 — kiedy rzuciłeś/aś?
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Możesz ustawić datę z przeszłości — pokaże historię.
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
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      Koniec:{" "}
                      <strong className="text-gray-900 dark:text-white">
                        {fmtShort(addDays(startDate, totalDays - 1))}
                      </strong>
                    </p>
                  )}
                </div>

                {/* Days selector */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Liczba dni{" "}
                    {startDate && (
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        — {fmtMonthLong(startDate)} ma{" "}
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          {daysInMonth(startDate)}
                        </span>{" "}
                        dni (wykryto automatycznie)
                      </span>
                    )}
                  </p>
                  <div className="flex gap-2" role="group" aria-label="Liczba dni">
                    {[28, 29, 30, 31].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setTotalDays(n)}
                        aria-pressed={totalDays === n}
                        className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                          totalDays === n
                            ? "bg-green-700 dark:bg-green-600 text-white"
                            : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-600"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Postęp</h2>
                  <span aria-live="polite" className="text-sm font-bold text-green-700 dark:text-green-400">
                    {done}/{totalDays}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={done}
                  aria-valuemin={0}
                  aria-valuemax={totalDays}
                  aria-label={`${done} z ${totalDays} dni`}
                  className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3"
                >
                  <div
                    className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((done / totalDays) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {done === 0 && "Kliknij dzień żeby go zaznaczyć"}
                  {done > 0 && done < totalDays && `Zostało ${totalDays - done} dni do celu`}
                  {done >= totalDays && "🎉 Gratulacje — cel osiągnięty!"}
                </p>
                {hydrated && (
                  <p className="mt-1.5 text-xs text-green-700 dark:text-green-400 font-medium">
                    ✓ Postęp zapisany w tej przeglądarce
                  </p>
                )}
              </div>
            </div>

            {/* ── Calendar grid ──────────────────────────────── */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
              <div
                className="cal-grid grid grid-cols-5 gap-2 sm:gap-3"
                role="group"
                aria-label={`Kalendarz ${totalDays} dni`}
              >
                {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
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
                      <span className={`cal-wd text-[9px] font-semibold uppercase tracking-wide leading-none ${
                        isChecked ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {dd ? fmtWeekday(dd) : "Dz."}
                      </span>

                      <span className={`cal-num text-xl font-extrabold leading-none ${
                        isChecked ? "text-green-700 dark:text-green-300" : "text-gray-900 dark:text-white"
                      }`}>
                        {day}
                      </span>

                      {dd && (
                        <span className={`cal-date text-[8px] leading-none ${
                          isChecked ? "text-green-600/70 dark:text-green-400/60" : "text-gray-400 dark:text-gray-500"
                        }`}>
                          {fmtShort(dd)}
                        </span>
                      )}

                      {/* Screen indicator */}
                      <span className="cal-screen mt-0.5" aria-hidden="true">
                        {isChecked ? (
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </span>

                      {/* Print-only circle — always empty */}
                      <div aria-hidden="true" className="cal-circle" style={{ display: "none" }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Action buttons + print tip (screen only) ─── */}
            <div className="screen-only space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-700 dark:bg-green-600 text-white text-sm font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
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
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                Jeśli widzisz datę lub URL u góry wydruku — w oknie drukowania wyłącz opcję{" "}
                <strong className="text-gray-500 dark:text-gray-400">&bdquo;Nagłówki i stopki&rdquo;</strong>.
              </p>
            </div>

            {/* Print footer */}
            <div className="print-footer print-only" style={{ display: "none" }}>
              rzucamfaje.pl/kalendarz-rzucania — bezpłatny do wydruku
            </div>

            {/* ── Related links (screen only) ─────────────── */}
            <div className="screen-only grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Link
                href="/artykuly/pierwsze-30-dni-bez-papierosa-plan"
                className="group flex flex-col gap-1 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 hover:border-green-400 dark:hover:border-green-600 transition-all"
              >
                <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Czytaj też</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors leading-snug">
                  Pierwsze 30 dni bez papierosa — plan tygodniowy
                </span>
              </Link>
              <Link
                href="/artykuly/aplikacje-do-rzucania-palenia-ranking-2026"
                className="group flex flex-col gap-1 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 hover:border-green-400 dark:hover:border-green-600 transition-all"
              >
                <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Czytaj też</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors leading-snug">
                  Najlepsze aplikacje do rzucania palenia 2026
                </span>
              </Link>
            </div>
          </div>

        </div>{/* end .print-page */}
      </main>

      <div className="screen-only"><Footer /></div>
    </>
  );
}
