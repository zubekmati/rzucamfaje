import Link from "next/link";

type FooterLink = { href: string; label: string; external?: boolean };

const footerNavGroups: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Nawigacja",
    links: [
      { href: "/artykuly", label: "Artykuły" },
      { href: "/poradniki", label: "Poradniki" },
      { href: "/kalkulator-zdrowia", label: "Kalkulator zdrowia" },
      { href: "/kalendarz-rzucania", label: "Kalendarz 30 dni" },
      { href: "/o-nas", label: "O nas" },
    ],
  },
  {
    heading: "Zasoby",
    links: [
      { href: "https://jakrzucicpalenie.pl", label: "Telefon zaufania", external: true },
      { href: "https://nio.gov.pl/poradnia-pomocy-palacym-38", label: "Grupy wsparcia", external: true },
      { href: "https://www.nfz.gov.pl", label: "Leczenie NRT", external: true },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Serwis",
    links: [
      { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
      { href: "/regulamin", label: "Regulamin" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="RzucamFaje.pl – strona główna"
              className="inline-flex items-center gap-2 mb-4 group"
            >
              <span aria-hidden="true" className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-700 group-hover:bg-green-600 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" opacity="0.9"/>
                  <rect x="5" y="10.5" width="10" height="3" rx="1.5" fill="white" opacity="0.9"/>
                  <rect x="15" y="10.5" width="3" height="3" rx="1" fill="#86efac"/>
                  <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                RzucamFaje<span className="text-green-400">.pl</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal wsparcia dla osób rzucających palenie. Rzetelne informacje,
              szczere rozmowy, zero osądzania.
            </p>
          </div>

          {/* Navigation link groups */}
          {footerNavGroups.map((group) => (
            <nav key={group.heading} aria-label={`Stopka – ${group.heading}`}>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {group.heading}
              </h2>
              <ul role="list" className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-green-400 transition-colors underline-offset-2 hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-green-400 transition-colors underline-offset-2 hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 RzucamFaje.pl – wszelkie prawa zastrzeżone
          </p>
          <p className="text-xs text-gray-400 text-center sm:text-right">
            Serwis ma charakter informacyjny i nie zastępuje porady lekarskiej.
          </p>
        </div>
      </div>
    </footer>
  );
}
