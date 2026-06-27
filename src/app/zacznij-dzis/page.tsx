import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zacznij dziś – RzucamFaje.pl",
  alternates: { canonical: "/zacznij-dzis" },
  description:
    "Chcesz rzucić palenie, ale nie wiesz od czego zacząć? Oto konkretny plan krok po kroku – sprawdzony, bez moralizowania.",
};

const steps = [
  {
    number: 1,
    emoji: "🗓️",
    title: "Wyznacz datę",
    body: "Wybierz konkretny dzień – nie \"kiedyś\", nie \"od przyszłego miesiąca\". Najlepiej za 1–2 tygodnie. Tyle, żeby zdążyć się przygotować, ale nie tyle, żeby odwlekać. Zapisz tę datę i powiedz ją komuś bliskiemu.",
    tip: "Badania pokazują, że osoby, które ogłaszają swoją datę rzucenia, częściej ją dotrzymują.",
  },
  {
    number: 2,
    emoji: "🧠",
    title: "Zrozum swój nałóg",
    body: "Palenie to uzależnienie fizyczne i psychiczne. Twój mózg jest uzależniony od nikotyny – to nie kwestia słabości charakteru. Im lepiej zrozumiesz mechanizm, tym łatwiej go pokonasz.",
    tip: "Zapisz, kiedy najczęściej palisz i co jest wyzwalaczem. Kawa? Stres? Przerwa w pracy? To Twoja mapa walki.",
  },
  {
    number: 3,
    emoji: "💊",
    title: "Zdecyduj o wsparciu farmakologicznym",
    body: "Nie musisz rzucać sam. Plastry nikotynowe, gumy, pastylki, inhalatory (NRT) – wszystkie dostępne bez recepty – podwajają szanse sukcesu. Wareniklinę i bupropion dostaniesz na receptę u lekarza – to najskuteczniejsze metody.",
    tip: "Jeśli palisz ponad 10 papierosów dziennie, zdecydowanie warto porozmawiać z lekarzem przed datą rzucenia.",
  },
  {
    number: 4,
    emoji: "🏠",
    title: "Przygotuj otoczenie",
    body: "W dniu D: wyrzuć wszystkie papierosy, zapalniczki i popielniczki. Wyczyść mieszkanie z zapachu dymu. Miej pod ręką zamienniki – gumy, patyczki cynamonowe, orzechy, zimną wodę.",
    tip: "Nie zostawiaj \"zapasu na wszelki wypadek\". Jeden papieros w szufladzie to błąd.",
  },
  {
    number: 5,
    emoji: "🤝",
    title: "Powiedz bliskim",
    body: "Powiedz rodzinie i znajomym o swojej decyzji. Nie musisz prosić o wsparcie – wystarczy, że wiedzą. Poproś, żeby nie oferowali Ci papierosa, nawet jeśli masz \"tylko jeden\".",
    tip: "Jeden szczery rozmówca – ktoś, kto sam rzucił albo bardzo chce, żebyś rzucił – jest wart więcej niż dziesięć aplikacji.",
  },
  {
    number: 6,
    emoji: "📱",
    title: "Zainstaluj aplikację",
    body: "Aplikacja do liczenia czasu bez papierosa (np. Smoke Free, Kwit, Quitnow!) robi coś ważnego: pokazuje Ci w czasie rzeczywistym, co zyskujesz. Pieniądze, minuty życia, poprawę zdrowia. To działa.",
    tip: "Skonfiguruj aplikację dzień przed datą rzucenia. Nie szukaj idealnej – zainstaluj pierwszą lepszą dobrze ocenianą.",
  },
  {
    number: 7,
    emoji: "🌬️",
    title: "Naucz się jednej techniki oddechowej",
    body: "Kiedy dopadnie Cię głód, potrzebujesz czegoś do zrobienia przez te 3–5 minut. Technika pudełka (wdech 4 sek., zatrzymanie 4, wydech 4, zatrzymanie 4) działa – i możesz ją ćwiczyć zanim rzucisz.",
    tip: "Ćwicz ją rano przez tydzień przed datą. Kiedy przyjdzie głód, ciało będzie wiedzieć, co robić.",
  },
  {
    number: 8,
    emoji: "🎯",
    title: "Pierwszy dzień – skup się na jednej godzinie",
    body: "Nie myśl \"muszę nie palić przez rok\". Myśl \"nie zapalę w tej godzinie\". Potem następna godzina. Potem przeżyjesz dzień. A potem będzie łatwiej.",
    tip: "Pierwszy tydzień jest najtrudniejszy. Naprawdę. Drugi jest łatwiejszy. Czwarty tygodień – całkiem normalny.",
  },
];

export default function ZacznijDzisPage() {
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
              Twój plan
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Zacznij dziś
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Nie ma jednej dobrej chwili na rzucenie palenia. Jest tylko ta – teraz.
              Oto konkretny plan, który działa.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Intro callout */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 mb-10">
            <p className="text-green-800 dark:text-green-300 text-sm leading-relaxed">
              <strong>Ważne:</strong> Rzucanie palenia to leczenie uzależnienia, nie test silnej woli.
              Jeśli wcześniej próbowałeś/aś i nie wyszło – to dlatego, że nałóg jest silny, nie dlatego, że Ty jesteś słaby/a.
              Ta lista kroków opiera się na tym, co naprawdę działa – badaniach klinicznych i doświadczeniu tysięcy ludzi.
            </p>
          </div>

          {/* Steps */}
          <ol role="list" className="space-y-6" aria-label="Kroki do rzucenia palenia">
            {steps.map((step) => (
              <li
                key={step.number}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div
                    aria-hidden="true"
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-sm"
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span aria-hidden="true" className="text-xl">{step.emoji}</span>
                      <h2 className="text-base font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                      {step.body}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-l-2 border-green-500">
                      <strong className="text-green-700 dark:text-green-400">Wskazówka:</strong>{" "}
                      {step.tip}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <p aria-hidden="true" className="text-4xl mb-4">🌿</p>
            <h2 className="text-xl font-bold text-white mb-3">
              Gotowy/a na kolejny krok?
            </h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              Sprawdź kalkulator zdrowia – zobaczysz na żywo, co zyskujesz z każdym dniem bez papierosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/kalkulator-zdrowia"
                className="px-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
              >
                Kalkulator zdrowia
              </Link>
              <Link
                href="/artykuly"
                className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:text-white transition-colors"
              >
                Baza artykułów
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
