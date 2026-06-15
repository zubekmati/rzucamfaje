import type { Metadata } from "next";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Polityka prywatności – RzucamFaje.pl",
  description: "Polityka prywatności serwisu RzucamFaje.pl – zasady przetwarzania danych osobowych i plików cookies.",
};

const sections = [
  {
    id: "administrator",
    heading: "1. Administrator danych",
    content: `Administratorem danych osobowych jest operator serwisu RzucamFaje.pl, dostępny pod adresem kontakt@rzucamfaje.pl.\n\nW sprawach dotyczących ochrony danych osobowych możesz skontaktować się z nami pod adresem e-mail: kontakt@rzucamfaje.pl.`,
  },
  {
    id: "dane-zbierane",
    heading: "2. Jakie dane zbieramy",
    content: `Serwis może zbierać następujące dane:\n\n• Dane podane dobrowolnie w formularzu kontaktowym: imię lub pseudonim, adres e-mail, treść wiadomości.\n• Dane techniczne: adres IP, typ przeglądarki, system operacyjny, czas odwiedzin – zbierane automatycznie przez serwer lub narzędzia analityczne.\n• Dane z plików cookies – opisane szczegółowo w sekcji 6.`,
  },
  {
    id: "cel-przetwarzania",
    heading: "3. Cel i podstawa prawna przetwarzania",
    content: `Dane osobowe przetwarzamy w celu:\n\n• Odpowiedzi na wiadomości przesłane za pomocą formularza kontaktowego (art. 6 ust. 1 lit. f RODO – uzasadniony interes administratora).\n• Analizy statystyk odwiedzin serwisu w celu jego ulepszania (art. 6 ust. 1 lit. f RODO).\n• Wysyłki newslettera, jeśli wyraziłeś/aś na to zgodę (art. 6 ust. 1 lit. a RODO).\n\nPodanie danych jest dobrowolne, jednak niezbędne do skorzystania z formularza kontaktowego lub zapisu na newsletter.`,
  },
  {
    id: "przechowywanie",
    heading: "4. Okres przechowywania danych",
    content: `Dane przechowujemy przez okres niezbędny do realizacji celu, dla którego zostały zebrane:\n\n• Korespondencja e-mailowa – do 2 lat od ostatniego kontaktu.\n• Dane analityczne – zgodnie z zasadami dostawcy narzędzi analitycznych (standardowo do 14 miesięcy).\n• Newsletter – do momentu wycofania zgody.`,
  },
  {
    id: "prawa",
    heading: "5. Twoje prawa",
    content: `Masz prawo do:\n\n• Dostępu do swoich danych osobowych.\n• Sprostowania danych, jeśli są nieprawidłowe.\n• Usunięcia danych (prawo do bycia zapomnianym).\n• Ograniczenia przetwarzania.\n• Przenoszenia danych.\n• Wniesienia sprzeciwu wobec przetwarzania.\n• Wycofania zgody w dowolnym momencie (nie wpływa to na zgodność z prawem przetwarzania dokonanego przed wycofaniem zgody).\n\nAby skorzystać z tych praw, skontaktuj się z nami: kontakt@rzucamfaje.pl.\n\nMasz również prawo do złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa.`,
  },
  {
    id: "cookies",
    heading: "6. Pliki cookies",
    content: `Serwis używa plików cookies w następujących celach:\n\n• Niezbędne – zapewniają prawidłowe działanie serwisu (np. zapamiętanie wyboru motywu kolorystycznego).\n• Analityczne – pomagają nam zrozumieć, jak użytkownicy korzystają z serwisu (Google Analytics lub podobne narzędzie). Dane zbierane są w sposób zanonimizowany.\n\nMożesz zarządzać ustawieniami cookies w przeglądarce internetowej. Wyłączenie cookies może ograniczyć funkcjonalność serwisu.`,
  },
  {
    id: "przekazywanie",
    heading: "7. Przekazywanie danych podmiotom trzecim",
    content: `Twoje dane mogą być przekazywane wyłącznie:\n\n• Dostawcom usług hostingowych i technicznych niezbędnych do działania serwisu.\n• Dostawcom narzędzi analitycznych (np. Google LLC) – wyłącznie dane statystyczne, w sposób zanonimizowany.\n\nNie sprzedajemy danych osobowych podmiotom trzecim w celach marketingowych.`,
  },
  {
    id: "zmiany",
    heading: "8. Zmiany polityki prywatności",
    content: `Zastrzegamy sobie prawo do zmian niniejszej polityki prywatności. O wszelkich istotnych zmianach poinformujemy poprzez zamieszczenie zaktualizowanej wersji w serwisie. Data ostatniej aktualizacji widoczna jest poniżej.`,
  },
];

export default function PolitykaPrywatnosciPage() {
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
              Polityka prywatności
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ostatnia aktualizacja: 15 czerwca 2026
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ToC */}
          <nav aria-label="Spis treści polityki prywatności" className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-8 shadow-sm">
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
              Pytania dotyczące polityki prywatności:{" "}
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
