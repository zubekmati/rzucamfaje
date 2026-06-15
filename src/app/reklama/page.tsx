import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reklama – RzucamFaje.pl",
  description:
    "Możliwości reklamowe i współpracy na portalu RzucamFaje.pl. Dotrzyj do tysięcy Polaków, którzy aktywnie pracują nad zdrowiem.",
};

const formats = [
  {
    emoji: "📰",
    title: "Artykuł sponsorowany",
    desc: "Treść napisana w stylu redakcyjnym portalu, oznaczona jako materiał sponsorowany. Zostaje na stronie na stałe.",
  },
  {
    emoji: "🖼️",
    title: "Baner graficzny",
    desc: "Statyczny lub animowany baner w nagłówku lub sidebarze artykułu. Formaty: 728×90 (leaderboard), 300×250 (medium rectangle).",
  },
  {
    emoji: "🤝",
    title: "Partnerstwo długoterminowe",
    desc: "Logo i wzmianka o partnerze w stopce serwisu, dedykowany boks w newsletter oraz pierwszeństwo w artykułach tematycznych.",
  },
  {
    emoji: "✉️",
    title: "Newsletter",
    desc: "Wyróżnienie produktu lub usługi w jednym wydaniu newslettera rozsyłanego do subskrybentów portalu.",
  },
];

const stats = [
  { value: "10 000+", label: "czytelników miesięcznie" },
  { value: "4,5 min", label: "średni czas na stronie" },
  { value: "85%", label: "użytkowników z Polski" },
  { value: "60%", label: "czytelniczek" },
];

export default function ReklamaPage() {
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
              Współpraca
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Reklama i partnerstwo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Dotrzyj do tysięcy Polaków, którzy aktywnie dbają o swoje zdrowie
              i chcą rzucić palenie. Prowadzimy współpracę z markami, które
              wpisują się w misję portalu.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

          {/* Zasady */}
          <section aria-labelledby="zasady-heading" className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
            <h2 id="zasady-heading" className="text-base font-bold text-green-900 dark:text-green-300 mb-2">
              Z czym współpracujemy
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              RzucamFaje.pl to portal o zdrowiu i rzucaniu palenia. Przyjmujemy reklamy produktów i usług
              zgodnych z misją serwisu: suplementy diety, aplikacje zdrowotne, ubezpieczenia zdrowotne,
              produkty NRT (plastry, gumy nikotynowe), kursy online, usługi medyczne i psychologiczne.
              Nie reklamujemy wyrobów tytoniowych, alkoholu, e-papierosów w roli produktu docelowego ani
              innych treści sprzecznych z misją portalu.
            </p>
          </section>

          {/* Stats */}
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nasza widownia
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm text-center"
                >
                  <dd className="text-2xl font-extrabold text-green-700 dark:text-green-400 mb-1">{s.value}</dd>
                  <dt className="text-xs text-gray-500 dark:text-gray-400">{s.label}</dt>
                </div>
              ))}
            </dl>
          </section>

          {/* Formats */}
          <section aria-labelledby="formats-heading">
            <h2 id="formats-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Formaty reklamowe
            </h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {formats.map((f) => (
                <li
                  key={f.title}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
                >
                  <div aria-hidden="true" className="text-3xl mb-3">{f.emoji}</div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact CTA */}
          <section
            aria-labelledby="contact-heading"
            className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 text-center"
          >
            <p aria-hidden="true" className="text-4xl mb-4">📩</p>
            <h2 id="contact-heading" className="text-xl font-bold text-white mb-3">
              Zapytaj o szczegóły i cennik
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Napisz do nas z krótkim opisem swojej marki i formatu, który Cię interesuje.
              Odpiszemy w ciągu 48 godzin roboczych z propozycją i cennikiem.
            </p>
            <a
              href="mailto:kontakt@rzucamfaje.pl"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
            >
              <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              kontakt@rzucamfaje.pl
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Możesz też skorzystać z{" "}
              <Link href="/kontakt" className="text-green-400 hover:underline">
                formularza kontaktowego
              </Link>
              .
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
