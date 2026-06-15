"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import Link from "next/link";

const faqItems = [
  {
    id: "ile-czasu",
    q: "Ile czasu zajmuje rzucenie palenia?",
    a: "Fizyczne objawy odstawienne (głód nikotynowy, drażliwość, problemy ze snem) szczytują przez pierwsze 3 dni i w większości ustępują po 2–4 tygodniach. Psychiczne uzależnienie – połączenie palenia z konkretnymi sytuacjami (kawa, stres, przerwa) – ustępuje wolniej, zwykle po 3–6 miesiącach. Wiele osób opisuje rok jako moment, gdy myśl o papierosie przestaje być stałym gościem.",
  },
  {
    id: "plastry-czy-gumy",
    q: "Czy plastry nikotynowe i gumy naprawdę pomagają?",
    a: "Tak – terapia zastępowania nikotyny (NRT) podwaja szanse na skuteczne rzucenie w porównaniu do prób bez żadnego wsparcia. Badania kliniczne są tu jednoznaczne. Najlepsze efekty daje kombinacja dwóch form NRT – np. plastry (stały poziom nikotyny) plus gumy lub pastylki na momenty silnego głodu. W aptece możesz kupić wszystko bez recepty.",
  },
  {
    id: "waga",
    q: "Czy po rzuceniu palenia na pewno przytyję?",
    a: "Nie na pewno, ale jest to możliwe. Średnia wynosi 2–5 kg w ciągu pierwszego roku – i to nie u wszystkich. Nikotyna przyspiesza metabolizm i zmniejsza apetyt; bez niej może on lekko spaść lub apetyt wzrosnąć. Dobrą wiadomością jest to, że te kilogramy są o wiele mniej szkodliwe niż kontynuowanie palenia. Ruch fizyczny i unikanie podjadania zamiast papierosa znacząco ograniczają przyrost masy.",
  },
  {
    id: "wpadka",
    q: "Co zrobić, jeśli mi się zdarzyło zapalić?",
    a: "Jeden papieros to potknięcie, nie upadek. Nie traktuj tego jako sygnał do rezygnacji – wielu ludzi rzuca palenie kilkanaście razy, zanim uda im się na dłużej. Wróć do swojego planu następnego ranka, zidentyfikuj co zawiodło i wyciągnij wnioski. \"Skoro już jeden, to może paczka\" to klasyczne kłamstwo nałogu – znaj je i nie daj mu się.",
  },
  {
    id: "e-papieros",
    q: "Czy przejście na e-papierosy to dobry pomysł?",
    a: "E-papierosy mogą pomóc w przejściu z tradycyjnych papierosów – przegląd Cochrane z 2023 r. wskazuje, że są skuteczniejsze niż plastry nikotynowe u osób, które ich próbowały. Jednak długoterminowe skutki wdychania par e-papierosów nie są jeszcze dobrze poznane. Większość pulmonologów traktuje e-papierosy jako narzędzie pomostowe: zamiast papierosów, ale z celem całkowitego rzucenia nikotyny.",
  },
  {
    id: "silna-wola",
    q: "Czy bez silnej woli nie ma szans?",
    a: "To jest jeden z najbardziej szkodliwych mitów o paleniu. Uzależnienie nikotynowe jest chorobą – taką samą jak alkoholizm czy uzależnienie od leków. Nie pokonuje się ich wyłącznie silną wolą. Najskuteczniejsze metody łączą wsparcie farmakologiczne (NRT, wareniklinę) z planowaniem i wsparciem społecznym. \"Silna wola\" bez żadnej strategii to najsłabsza metoda rzucania, jaką znamy.",
  },
  {
    id: "wareniklist",
    q: "Czym jest wareniklinę i czy warto ją wziąć?",
    a: "Wareniklinę (Champix/Chantix) to lek na receptę, który działa dwuetapowo: zmniejsza głód nikotynowy i blokuje przyjemność z zapalenia. Metaanalizy pokazują, że może 2–3 razy zwiększyć szanse na powodzenie w porównaniu z placebo. Wymaga wizyty u lekarza i nie jest dla każdego (są przeciwwskazania). Jeśli wcześniej próbowałeś/aś rzucić bez skutku – zdecydowanie warto zapytać lekarza.",
  },
  {
    id: "jak-dlugo-glod",
    q: "Jak długo trwa atak głodu nikotynowego?",
    a: "Pojedynczy atak głodu nikotynowego trwa zazwyczaj 3–5 minut. Po osiągnięciu szczytu fala naturalnie opada – niezależnie od tego, czy zapalisz, czy nie. To kluczowa wiedza: jeśli przetrwasz te 5 minut, głód mija sam. Techniki oddechowe, zmiana miejsca lub aktywność fizyczna pomagają skrócić ten czas subiektywnie.",
  },
  {
    id: "kiedy-lekarz",
    q: "Kiedy warto pójść do lekarza przed rzuceniem?",
    a: "Jeśli palisz więcej niż paczkę dziennie, palisz od ponad 10 lat lub wcześniej próbowałeś/aś rzucić bez skutku – rozmowa z lekarzem przed datą rzucenia to dobry pomysł. Lekarz może przepisać wareniklinę lub bupropion (skuteczniejsze od NRT), ocenić Twój stan zdrowia i dostosować plan do Twoich potrzeb. W Polsce porady antytytoniowe są częściowo finansowane przez NFZ.",
  },
  {
    id: "kiedy-latwiej",
    q: "Kiedy naprawdę robi się łatwiej?",
    a: "Większość osób opisuje następujący przebieg: pierwsze 3 dni – najtrudniejsze fizycznie, pierwszy tydzień – psychiczne walki z wyzwalaczami, po 3–4 tygodniach – wyraźna poprawa, ataki głodu rzadsze i słabsze. Po 3 miesiącach większość receptorów nikotynowych w mózgu wraca do normy. Po roku – dla większości rzucenie jest normą, a nie walką.",
  },
  {
    id: "co-zamiast",
    q: "Czym zastąpić gest sięgania po papierosa?",
    a: "Uzależnienie od palenia ma wymiar fizyczny (nikotyna) i behawioralny (gest, rytuał). Na tę drugą część pomagają: słonecznik do łuskania, patyczki cynamonowe, guma bez cukru, wykałaczki, zimna woda. Dla osób, którym szczególnie brakuje gestu – inhalatory nikotynowe (trzymasz jak papierosa) lub nawet samo trzymanie długopisu. Absurdalne? Działa.",
  },
  {
    id: "kontakt",
    q: "Nie znalazłem/am odpowiedzi na moje pytanie. Co zrobić?",
    a: "Napisz do nas – czytamy każdą wiadomość i staramy się odpowiadać. Adres e-mail: kontakt@rzucamfaje.pl. Możesz też skorzystać z formularza kontaktowego.",
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

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
              Pytania i odpowiedzi
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Najczęstsze pytania
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Zebraliśmy pytania, które słyszymy najczęściej. Odpowiedzi opieramy na badaniach –
              nie na mitach i nie na marketingu.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <dl className="space-y-3">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                  <dt>
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      onClick={() => toggle(item.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-gray-900 dark:text-white font-semibold text-sm hover:text-green-800 dark:hover:text-green-400 transition-colors"
                    >
                      <span>{item.q}</span>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className={`flex-shrink-0 w-4 h-4 text-green-700 dark:text-green-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </dt>
                  <dd
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    hidden={!isOpen}
                  >
                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
                      <p className="pt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nie znalazłeś/aś odpowiedzi? Napisz do nas.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Formularz kontaktowy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
