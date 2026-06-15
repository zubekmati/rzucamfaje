import type { Metadata } from "next";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Regulamin – RzucamFaje.pl",
  description: "Regulamin serwisu RzucamFaje.pl – zasady korzystania z portalu, prawa i obowiązki użytkowników.",
};

const sections = [
  {
    id: "postanowienia-ogolne",
    heading: "1. Postanowienia ogólne",
    content: `Niniejszy Regulamin określa zasady korzystania z serwisu internetowego RzucamFaje.pl (dalej: „Serwis").\n\nOperatorem Serwisu jest jego właściciel, dalej zwany „Administratorem", dostępny pod adresem: kontakt@rzucamfaje.pl.\n\nKorzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.`,
  },
  {
    id: "charakter-serwisu",
    heading: "2. Charakter Serwisu",
    content: `Serwis RzucamFaje.pl ma charakter informacyjny i edukacyjny. Treści publikowane w Serwisie nie stanowią porady medycznej, lekarskiej ani psychologicznej.\n\nW przypadku problemów zdrowotnych związanych z nałogiem palenia Użytkownik powinien skonsultować się z lekarzem lub wykwalifikowanym specjalistą.\n\nAdministrator dokłada starań, aby publikowane treści były rzetelne i aktualne, jednak nie ponosi odpowiedzialności za decyzje podjęte na ich podstawie.`,
  },
  {
    id: "korzystanie",
    heading: "3. Zasady korzystania z Serwisu",
    content: `Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z obowiązującym prawem, postanowieniami niniejszego Regulaminu oraz dobrymi obyczajami.\n\nZabrania się:\n\n• Rozsyłania spamu i niezamówionej korespondencji handlowej.\n• Podejmowania działań mogących zakłócić działanie Serwisu.\n• Kopiowania i publikowania treści Serwisu bez zgody Administratora, z wyjątkiem przypadków dozwolonych prawem.\n• Używania Serwisu w sposób naruszający prawa osób trzecich.`,
  },
  {
    id: "prawa-autorskie",
    heading: "4. Prawa autorskie",
    content: `Wszystkie treści opublikowane w Serwisie (artykuły, grafiki, kod) są własnością Administratora lub zostały opublikowane za zgodą uprawnionych podmiotów i podlegają ochronie na podstawie ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych.\n\nKopiowanie, reprodukowanie lub inne wykorzystywanie treści Serwisu bez pisemnej zgody Administratora jest zabronione, z wyjątkiem cytowania w ramach dozwolonego użytku.\n\nW celu uzyskania zgody na publikację treści należy skontaktować się pod adresem: kontakt@rzucamfaje.pl.`,
  },
  {
    id: "odpowiedzialnosc",
    heading: "5. Ograniczenie odpowiedzialności",
    content: `Administrator nie ponosi odpowiedzialności za:\n\n• Przerwy w działaniu Serwisu wynikające z przyczyn technicznych lub czynników zewnętrznych.\n• Treści publikowane przez podmioty trzecie, do których mogą prowadzić linki w Serwisie.\n• Decyzje Użytkownika podjęte na podstawie treści Serwisu.\n• Szkody wynikłe z korzystania lub niemożności korzystania z Serwisu.\n\nSerwis może zawierać linki do zewnętrznych stron internetowych. Administrator nie kontroluje tych stron i nie ponosi odpowiedzialności za ich treść.`,
  },
  {
    id: "newsletter",
    heading: "6. Newsletter",
    content: `W przypadku zapisu na newsletter Użytkownik wyraża dobrowolną zgodę na otrzymywanie informacji e-mail związanych z tematyką rzucania palenia.\n\nZapis na newsletter odbywa się przez podanie adresu e-mail w formularzu na stronie Serwisu.\n\nUżytkownik może w każdej chwili zrezygnować z newslettera przez kliknięcie linku rezygnacji zawartego w każdej wiadomości lub kontakt pod adresem: kontakt@rzucamfaje.pl.`,
  },
  {
    id: "zmiany-regulaminu",
    heading: "7. Zmiany Regulaminu",
    content: `Administrator zastrzega sobie prawo do zmian niniejszego Regulaminu. Zmiany wchodzą w życie z dniem ich publikacji w Serwisie.\n\nDalsze korzystanie z Serwisu po opublikowaniu zmian jest równoznaczne z ich akceptacją.\n\nData ostatniej aktualizacji Regulaminu widoczna jest poniżej.`,
  },
  {
    id: "prawo-wlasciwe",
    heading: "8. Prawo właściwe",
    content: `Niniejszy Regulamin podlega prawu polskiemu.\n\nWszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sądy powszechne właściwe dla siedziby Administratora.\n\nW sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy Kodeksu cywilnego oraz inne właściwe przepisy prawa polskiego.`,
  },
];

export default function RegulamPage() {
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
              Dokumenty prawne
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Regulamin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ostatnia aktualizacja: 15 czerwca 2026
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ToC */}
          <nav aria-label="Spis treści regulaminu" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Spis treści</h2>
            <ol role="list" className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-green-700 dark:text-green-400 hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`heading-${s.id}`}>
                <h2
                  id={`heading-${s.id}`}
                  className="text-lg font-bold text-gray-900 dark:text-white mb-3"
                >
                  {s.heading}
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                  {s.content.split("\n").map((line, i) => (
                    line.trim() === "" ? (
                      <br key={i} />
                    ) : (
                      <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pytania dotyczące Regulaminu:{" "}
              <a
                href="mailto:kontakt@rzucamfaje.pl"
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                kontakt@rzucamfaje.pl
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
