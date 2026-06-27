"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Link from "next/link";

const BUTT_WEIGHT_G = 0.25; // avg weight of one cigarette butt in grams
const DECOMPOSE_YEARS = 10; // estimated decomposition time in years

function fmt(n: number): string {
  return n.toLocaleString("pl-PL");
}

function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
  return many;
}

export default function KalkulatorPetowPage() {
  const [perDay, setPerDay] = useState(20);
  const [years, setYears] = useState(10);

  const stats = useMemo(() => {
    const perYear = perDay * 365;
    const totalLifetime = perDay * 365 * years;
    const weightYearG = perYear * BUTT_WEIGHT_G;
    const weightLifetimeKg = (totalLifetime * BUTT_WEIGHT_G) / 1000;
    const decomposeYear = new Date().getFullYear() + DECOMPOSE_YEARS;
    return { perYear, totalLifetime, weightYearG, weightLifetimeKg, decomposeYear };
  }, [perDay, years]);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none">

        {/* Page header */}
        <section
          aria-labelledby="page-heading"
          className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <p aria-hidden="true" className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
              Środowisko
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Kalkulator petów
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Ile filtrów papierosowych trafia do środowiska przez rok palenia — i przez całe życie? Sprawdź w liczbach.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Inputs */}
          <section
            aria-labelledby="inputs-heading"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
          >
            <h2 id="inputs-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Twoje dane
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="per-day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Papierosów dziennie: <strong className="text-green-700 dark:text-green-400">{perDay}</strong>
                </label>
                <input
                  id="per-day"
                  type="range"
                  min={1}
                  max={60}
                  value={perDay}
                  onChange={(e) => setPerDay(Number(e.target.value))}
                  className="w-full accent-green-700"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span><span>60</span>
                </div>
              </div>
              <div>
                <label htmlFor="years" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Od ilu lat palisz: <strong className="text-green-700 dark:text-green-400">{years}</strong>
                </label>
                <input
                  id="years"
                  type="range"
                  min={1}
                  max={50}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-green-700"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span><span>50</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats cards */}
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Twoje statystyki petów</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  emoji: "🚬",
                  value: fmt(stats.perYear),
                  unit: plural(stats.perYear, "pet", "pety", "petów"),
                  label: "rocznie trafia do środowiska",
                  color: "text-orange-700 dark:text-orange-400",
                },
                {
                  emoji: "⚖️",
                  value: stats.weightYearG >= 1000
                    ? `${(stats.weightYearG / 1000).toFixed(1).replace(".", ",")} kg`
                    : `${Math.round(stats.weightYearG)} g`,
                  unit: "waga filtrów",
                  label: "wyrzuconych w ciągu roku",
                  color: "text-amber-700 dark:text-amber-400",
                },
                {
                  emoji: "📦",
                  value: fmt(stats.totalLifetime),
                  unit: plural(stats.totalLifetime, "pet", "pety", "petów"),
                  label: `przez ${years} ${plural(years, "rok", "lata", "lat")} palenia`,
                  color: "text-red-700 dark:text-red-400",
                },
                {
                  emoji: "⏳",
                  value: String(stats.decomposeYear),
                  unit: "rok",
                  label: "kiedy pet z tego roku się rozłoży",
                  color: "text-gray-700 dark:text-gray-300",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm text-center"
                >
                  <div aria-hidden="true" className="text-3xl mb-2">{stat.emoji}</div>
                  <div className={`text-2xl font-extrabold ${stat.color} mb-0.5`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {stat.unit}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lifetime weight context */}
          <section
            aria-labelledby="context-heading"
            className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6"
          >
            <h2 id="context-heading" className="text-base font-bold text-orange-900 dark:text-orange-300 mb-2">
              Co to znaczy w praktyce?
            </h2>
            <p className="text-sm text-orange-800 dark:text-orange-400 mb-1">
              Przez {years} {plural(years, "rok", "lata", "lat")} palenia wypaliłeś/aś papierosy
              o łącznej wadze filtrów <strong>{stats.weightLifetimeKg.toFixed(1).replace(".", ",")} kg</strong>.
            </p>
            <p className="text-sm text-orange-800 dark:text-orange-400">
              Filtr papierosowy to plastik (octan celulozy) — nie rozkłada się w glebie przez wiele lat.
              W wodzie uwalnia nikotynę, metale ciężkie i mikrowłókna do ekosystemu.
            </p>
          </section>

          {/* Info about filters */}
          <section
            aria-labelledby="info-heading"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
          >
            <h2 id="info-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Przybliżony czas rozkładu składników papierosa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Składnik</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Czas rozkładu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    ["Bibułka papierosowa", "kilka tygodni"],
                    ["Karton paczki", "2–5 miesięcy"],
                    ["But / filtr (octan celulozy)", "kilka – ponad 10 lat"],
                    ["Celofan paczki", "10–30 lat"],
                    ["Sreberko (folia aluminiowa)", "80–200 lat"],
                  ].map(([item, time]) => (
                    <tr key={item}>
                      <td className="py-2.5 pr-4 text-gray-900 dark:text-white">{item}</td>
                      <td className="py-2.5 text-gray-600 dark:text-gray-400">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
              Czasy rozkładu są szacunkowe i zależą od warunków środowiskowych (wilgotność, nasłonecznienie, gleba, woda).
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/artykuly/z-czego-jest-zrobiony-papieros"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Z czego jest zrobiony papieros?
            </Link>
            <Link
              href="/artykuly/jak-rzucic-palenie-przewodnik"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-700 dark:bg-green-600 text-white text-sm font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Jak rzucić palenie — przewodnik
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
