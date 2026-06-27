import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "O nas – RzucamFaje.pl",
  alternates: { canonical: "/o-nas" },
  description:
    "RzucamFaje.pl założył Adam — palacz z 25-letnim stażem, który raz już rzucił i chce rzucić znowu. Strona powstała dla niego i dla Ciebie.",
};

const values = [
  {
    emoji: "🤝",
    title: "Bez osądzania",
    desc: "Rzucanie palenia to walka z uzależnieniem, nie kwestia silnej woli. Bez oceniania, bez presji — piszę o tym jak jest, nie jak powinno być.",
  },
  {
    emoji: "🔬",
    title: "Bez pseudonauki",
    desc: "Opieram się na dostępnych badaniach i sprawdzonych metodach — ale nie jestem lekarzem. Punkt wyjścia do myślenia, nie ostateczna prawda.",
  },
  {
    emoji: "🙋",
    title: "Głos palacza, nie eksperta",
    desc: "Nie jestem kliniką ani instytutem zdrowia. Jestem osobą, która przez to przechodzi — i która szuka odpowiedzi razem z Tobą.",
  },
  {
    emoji: "🌱",
    title: "Długofalowe wsparcie",
    desc: "Rzucenie palenia to proces, nie jednorazowe wydarzenie. Jestem tu na każdym etapie — od pierwszego dnia do pierwszego roku.",
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
              RzucamFaje.pl to portal pisany przez palacza dla palaczy. Bez lukrowania,
              bez moralizowania, bez udawania że jest łatwo.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

          {/* Origin story */}
          <section aria-labelledby="story-heading">
            <h2 id="story-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              Skąd się wzięła ta strona
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Palę od 21 lat — zacząłem w wieku siedemnastu lat, jak większość, czyli przez przypadek
                i przez towarzystwo. Paczka dziennie. Miałem półtora roku przerwy. Naprawdę — poza
                dwoma papierosami po 3 miesiącach, których żałowałem już w trakcie.
              </p>
              <p>
                Wróciłem przez zmianę pracy. Nowe miejsce, nowi ludzie, stres i — co gorsza — spora
                część nowych kolegów paliła. Nie złamał mnie jeden papieros u znajomych na imprezie
                (to przeżyłem po 3 miesiącach i przez kolejny rok dalej nie paliłem). Złamała mnie
                codzienność — przerwy papierosowe, dym przy wejściu do biura, rozmowy przy zapalniczce.
                Tydzień i wróciłem do nałogu.
              </p>
              <p>
                Kiedy szukałem w internecie czegoś po polsku o rzucaniu palenia, trafiałem albo na
                suche artykuły medyczne, albo na reklamy plastrów, albo na fora sprzed dekady.
                Nikt nie pisał tak jak ja myślę o papierosach — że niektóre momenty po prostu
                lubię, że papieros ze słuchawkami i muzyką to coś więcej niż nikotyna,
                że po jedzeniu chcę ten smak i to podrażnienie w gardle, i że doskonale wiem
                że to bez sensu, ale i tak chcę.
              </p>
              <p>
                Więc zbuduję stronę, której szukałem. I może dla Ciebie, jeśli też tutaj trafiłeś
                szukając czegoś prawdziwego.
              </p>
            </div>
          </section>

          {/* Founder */}
          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Kto za tym stoi
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex gap-5">
              <div
                aria-hidden="true"
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl"
              >
                🚬
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Adam</h3>
                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-3">Założyciel — palacz w trakcie rzucania</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  25 lat palenia, półtora roku przerwy, powrót przez stres i nowe środowisko pracy.
                  Buduje tę stronę żeby uporządkować własne myśli o nałogu — i przy okazji uczy się
                  nowych technologii. Strona powstała z pomocą AI, bez jednej linijki kodu pisanej ręcznie.
                  Jeśli kiedykolwiek rzuci definitywnie, tu o tym napisze jako pierwszy.
                </p>
              </div>
            </div>
          </section>

          {/* AI note */}
          <section aria-labelledby="ai-heading" className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 id="ai-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Strona powstała z pomocą AI
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              RzucamFaje.pl zbudowałem bez wiedzy programistycznej — z pomocą sztucznej inteligencji.
              Kod, kalkulator i kalendarz powstały w rozmowie z AI. Artykuły też — AI robi research
              i szkic, ja wybieram tematy, czytam i zatwierdzam. Nie udaję, że sprawdzam każde zdanie
              z badaniem naukowym w ręku. Ale pilnuję żeby nie było bzdur i żeby brzmiało jak człowiek,
              nie jak content farm. Przy okazji uczę się jak działa internet, SEO i nowe technologie.
              Jeśli Cię to ciekawi — możesz o tym napisać
              przez{" "}
              <Link href="/kontakt" className="text-green-700 dark:text-green-400 underline underline-offset-2 hover:text-green-800">
                formularz kontaktowy
              </Link>
              .
            </p>
          </section>

          {/* Values */}
          <section aria-labelledby="values-heading">
            <h2 id="values-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Czym się kierujemy
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

          {/* Mission */}
          <section aria-labelledby="mission-heading" className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 p-8">
            <h2 id="mission-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Po co to wszystko?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-xl mx-auto">
              Bo w internecie jest dużo informacji o rzucaniu palenia, ale mało prawdziwych historii.
              Chcę żeby ktoś, kto tu trafi o 23:00 z papierosem w ręku i myślą „może czas przestać",
              znalazł coś za czym stoi prawdziwe doświadczenie — a nie portal prowadzony przez kogoś,
              kto nigdy nie palił.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Masz pytania? Napisz.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Czytam każdą wiadomość. Serio.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Skontaktuj się
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
