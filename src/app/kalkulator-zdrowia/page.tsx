"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
  return many;
}

const HEALTH_MILESTONES = [
  { days: 0,    label: "Właśnie zacząłeś/aś", desc: "Każda minuta bez papierosa to zmiana." },
  { days: 1,    label: "1 dzień",              desc: "Ciśnienie krwi i tętno wróciły do normy. Tlenek węgla znika z organizmu." },
  { days: 2,    label: "2 dni",                desc: "Receptory węchu i smaku zaczynają się regenerować. Jedzenie zaczyna smakować." },
  { days: 3,    label: "3 dni",                desc: "Nikotyna opuszcza organizm. Szczyt objawów odstawiennych – najtrudniejszy moment." },
  { days: 7,    label: "Tydzień",              desc: "Płuca zaczynają się oczyszczać. Oddychasz głębiej." },
  { days: 14,   label: "2 tygodnie",           desc: "Krążenie się poprawia. Wchodzenie po schodach przestaje być wyczynem." },
  { days: 30,   label: "Miesiąc",              desc: "Kaszel ustępuje. Rzęski w oskrzelach działają. Energia rośnie." },
  { days: 90,   label: "3 miesiące",           desc: "Płuca pracują o kilkanaście procent wydajniej. Ryzyko infekcji spada." },
  { days: 180,  label: "Pół roku",             desc: "Skóra wygląda zdrowiej. Krew dotlenia tkanki jak należy." },
  { days: 365,  label: "Rok",                  desc: "Ryzyko chorób serca zmniejszyło się o połowę w porównaniu do palacza." },
  { days: 1825, label: "5 lat",               desc: "Ryzyko udaru mózgu – jak u osoby, która nigdy nie paliła." },
  { days: 3650, label: "10 lat",              desc: "Ryzyko raka płuca spadło o połowę." },
];

export default function KalkulatorZdrowiaPage() {
  const today = new Date().toISOString().split("T")[0];
  const [quitDate, setQuitDate] = useState(today);
  const [cigarettesPerDay, setCigarettesPerDay] = useState(20);
  const [pricePerPack, setPricePerPack] = useState(18);

  const stats = useMemo(() => {
    const quit = new Date(quitDate);
    const now = new Date();
    const diffMs = now.getTime() - quit.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
    const cigarettesNotSmoked = Math.round(diffDays * cigarettesPerDay);
    const moneySaved = ((diffDays * cigarettesPerDay) / 20) * pricePerPack;
    const minutesSaved = cigarettesNotSmoked * 7; // avg 7 min per cigarette
    const hoursSaved = Math.floor(minutesSaved / 60);

    const reachedMilestones = HEALTH_MILESTONES.filter((m) => diffDays >= m.days);
    const nextMilestone = HEALTH_MILESTONES.find((m) => diffDays < m.days);
    const daysToNext = nextMilestone ? nextMilestone.days - diffDays : null;

    return { diffDays, diffMinutes, cigarettesNotSmoked, moneySaved, hoursSaved, reachedMilestones, nextMilestone, daysToNext };
  }, [quitDate, cigarettesPerDay, pricePerPack]);

  const isInFuture = new Date(quitDate) > new Date();

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
              Twój postęp
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Kalkulator zdrowia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Podaj datę rzucenia palenia i zobacz, ile już zyskałeś – w pieniądzach, zdrowiu i czasie.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Input form */}
          <section aria-labelledby="inputs-heading" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 id="inputs-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Twoje dane
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="quit-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Data rzucenia palenia
                </label>
                <input
                  id="quit-date"
                  type="date"
                  value={quitDate}
                  max={today}
                  onChange={(e) => setQuitDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="cigarettes-per-day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Papierosów dziennie
                </label>
                <input
                  id="cigarettes-per-day"
                  type="number"
                  min={1}
                  max={100}
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="price-per-pack" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Cena paczki (20 szt.) w zł
                </label>
                <input
                  id="price-per-pack"
                  type="number"
                  min={1}
                  step={0.5}
                  value={pricePerPack}
                  onChange={(e) => setPricePerPack(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors text-sm"
                />
              </div>
            </div>
            {isInFuture && (
              <p role="alert" className="mt-4 text-sm text-amber-700 dark:text-amber-400 font-medium">
                Wybrana data jest w przyszłości. Kalkulator pokaże wartości po osiągnięciu tej daty.
              </p>
            )}
          </section>

          {/* Stats */}
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Twoje statystyki</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  emoji: "📅",
                  value: stats.diffDays.toLocaleString("pl-PL"),
                  unit: plural(stats.diffDays, "dzień", "dni", "dni"),
                  label: "bez papierosa",
                  color: "text-green-700 dark:text-green-400",
                },
                {
                  emoji: "🚬",
                  value: stats.cigarettesNotSmoked.toLocaleString("pl-PL"),
                  unit: plural(stats.cigarettesNotSmoked, "papieros", "papierosy", "papierosów"),
                  label: "nie wypalonych",
                  color: "text-blue-700 dark:text-blue-400",
                },
                {
                  emoji: "💰",
                  value: stats.moneySaved.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                  unit: "zł",
                  label: "zaoszczędzonych",
                  color: "text-amber-700 dark:text-amber-400",
                },
                {
                  emoji: "⏳",
                  value: stats.hoursSaved.toLocaleString("pl-PL"),
                  unit: plural(stats.hoursSaved, "godzina", "godziny", "godzin"),
                  label: "życia odzyskanych",
                  color: "text-purple-700 dark:text-purple-400",
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

          {/* Next milestone */}
          {stats.nextMilestone && stats.daysToNext !== null && (
            <section
              aria-labelledby="next-milestone-heading"
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
            >
              <h2 id="next-milestone-heading" className="text-base font-bold text-green-900 dark:text-green-300 mb-1">
                Następny kamień milowy – {stats.nextMilestone.label}
              </h2>
              <p className="text-sm text-green-800 dark:text-green-400 mb-2">
                {stats.nextMilestone.desc}
              </p>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                Zostało{" "}
                <strong>
                  {stats.daysToNext} {plural(stats.daysToNext, "dzień", "dni", "dni")}
                </strong>
                .
              </p>
            </section>
          )}

          {/* Health milestones timeline */}
          <section aria-labelledby="milestones-heading" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 id="milestones-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Kamienie milowe zdrowia
            </h2>
            <ol role="list" className="space-y-3">
              {HEALTH_MILESTONES.filter((m) => m.days > 0).map((m) => {
                const reached = stats.diffDays >= m.days;
                return (
                  <li
                    key={m.days}
                    className={`flex gap-3 items-start p-3 rounded-xl transition-colors ${
                      reached
                        ? "bg-green-50 dark:bg-green-900/20"
                        : "opacity-50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        reached
                          ? "border-green-600 bg-green-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {reached && (
                        <svg aria-hidden="true" className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <span className={`text-sm font-bold ${reached ? "text-green-800 dark:text-green-300" : "text-gray-500 dark:text-gray-400"}`}>
                        {m.label}
                        {reached && <span className="sr-only"> – osiągnięty</span>}
                      </span>
                      <p className={`text-sm mt-0.5 ${reached ? "text-green-700 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}>
                        {m.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
