import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "O nas – RzucamFaje.pl",
  description:
    "Kim jesteśmy i dlaczego powstał RzucamFaje.pl. Historia portalu i misja, którą realizujemy każdego dnia.",
};

const values = [
  {
    emoji: "🤝",
    title: "Bez osądzania",
    desc: "Rzucanie palenia to walka z uzależnieniem, nie kwestia silnej woli. Tu nie usłyszysz, że \"po prostu przestań\".",
  },
  {
    emoji: "🔬",
    title: "Rzetelne informacje",
    desc: "Piszemy o tym, co potwierdza nauka i co sprawdziło się w praktyce. Bez magicznych metod i pseudonauki.",
  },
  {
    emoji: "❤️",
    title: "Ludzki głos",
    desc: "Nie jesteśmy firmą farmaceutyczną ani instytucją zdrowotną. Jesteśmy ludźmi, którzy sami przez to przeszli.",
  },
  {
    emoji: "🌱",
    title: "Długofalowe wsparcie",
    desc: "Rzucenie palenia to proces, nie jednorazowe wydarzenie. Jesteśmy tu na każdym etapie – od pierwszego dnia do pierwszego roku.",
  },
];

const team = [
  {
    name: "Tomek",
    role: "Założyciel i autor",
    bio: "Palił przez 23 lata. Rzucił w 2023 roku z pomocą dobrego lekarza i wareniklinę. Stworzył RzucamFaje.pl, bo chciał napisać to, czego sam szukał – bez ściemy i bez moralizowania.",
    emoji: "🌿",
  },
  {
    name: "Ania",
    role: "Redaktor i korektor",
    bio: "Psycholog z wykształcenia, mama dwójki dzieci. Dba o to, żeby treści na portalu były merytoryczne, ale też ludzkie i dostępne dla każdego.",
    emoji: "📖",
  },
];

export default function ONasPage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none">

        {/* Hero */}
        <section
          aria-labelledby="page-heading"
          className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <p aria-hidden="true" className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
              Nasz projekt
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              O nas
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              RzucamFaje.pl to portal wsparcia dla osób, które chcą rzucić palenie. Piszemy o tym,
              przez co sami przeszliśmy – bez marketingowego owijania w bawełnę.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

          {/* Origin story */}
          <section aria-labelledby="story-heading">
            <h2 id="story-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              Skąd się wzięliśmy
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                W 2023 roku Tomek – założyciel portalu – rzucił palenie po 23 latach nałogu. Kiedy
                szukał w internecie wsparcia po polsku, znajdował głównie albo suche artykuły medyczne,
                albo reklamy plastrów nikotynowych, albo fora internetowe z komentarzami sprzed dekady.
              </p>
              <p>
                Brakowało czegoś prostego: strony, którą napisał ktoś, kto naprawdę przez to przeszedł.
                Kogoś, kto nie moralizuje, nie sprzedaje cudownych metod i mówi wprost, co jest trudne,
                a co naprawdę pomaga.
              </p>
              <p>
                RzucamFaje.pl powstał jako odpowiedź na tę lukę. Dziś pomagamy tysiącom osób miesięcznie
                – i każdego dnia dostajemy wiadomości od ludzi, którzy mówią, że to właśnie tu znaleźli
                wsparcie, które zadziałało.
              </p>
            </div>
          </section>

          {/* Values */}
          <section aria-labelledby="values-heading">
            <h2 id="values-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nasze wartości
            </h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <li
                  key={v.title}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
                >
                  <div aria-hidden="true" className="text-3xl mb-3">{v.emoji}</div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Team */}
          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Kto za tym stoi
            </h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {team.map((person) => (
                <li
                  key={person.name}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex gap-4"
                >
                  <div
                    aria-hidden="true"
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl"
                  >
                    {person.emoji}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{person.name}</h3>
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">{person.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{person.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Stats */}
          <section aria-labelledby="stats-heading" className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 p-8">
            <h2 id="stats-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              RzucamFaje.pl w liczbach
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { dt: "Artykułów i poradników", dd: "15+" },
                { dt: "Czytelników miesięcznie", dd: "10 000+" },
                { dt: "Rok założenia", dd: "2023" },
              ].map((stat) => (
                <div key={stat.dt}>
                  <dd className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-1">{stat.dd}</dd>
                  <dt className="text-sm text-gray-600 dark:text-gray-400">{stat.dt}</dt>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Masz pytania? Napisz do nas.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Czytamy każdą wiadomość i staramy się odpowiadać na wszystkie.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Skontaktuj się z nami
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
