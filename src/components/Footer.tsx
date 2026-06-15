import Link from "next/link";

type FooterLink = { href: string; label: string; external?: boolean };

const footerNavGroups: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Nawigacja",
    links: [
      { href: "/artykuly", label: "Artykuły" },
      { href: "/poradniki", label: "Poradniki" },
      { href: "/kalkulator-zdrowia", label: "Kalkulator zdrowia" },
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
      { href: "/reklama", label: "Reklama" },
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
              <span aria-hidden="true" className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-700 text-white text-lg font-bold group-hover:bg-green-600 transition-colors">
                🌿
              </span>
              <span className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                RzucamFaje<span className="text-green-400">.pl</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Portal wsparcia dla osób rzucających palenie. Rzetelne informacje,
              ciepła społeczność, zero osądzania.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/rzucamfaje"
                rel="noopener noreferrer"
                aria-label="RzucamFaje.pl na Facebooku (otwiera się w nowej karcie)"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-green-700 hover:text-white transition-colors"
              >
                <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/rzucamfaje"
                rel="noopener noreferrer"
                aria-label="RzucamFaje.pl na Instagramie (otwiera się w nowej karcie)"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-green-700 hover:text-white transition-colors"
              >
                <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
                  <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
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
