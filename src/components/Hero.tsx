import Link from "next/link";

const stats = [
  { value: "42 000+", label: "osób rzuciło palenie" },
  { value: "380+", label: "artykułów i poradników" },
  { value: "7 lat", label: "wsparcia online" },
];

export default function Hero() {
  return (
    /*
     * Gradient from green-900 → green-800: white text contrast ≥ 7:1 (WCAG AAA).
     * Darker than original green-600 which failed 4.5:1 for body-size white text.
     */
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700"
    >
      {/* Decorative — hidden from assistive tech */}
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
      <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">

          {/* Badge — visual only */}
          <p aria-hidden="true" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-sm font-medium mb-6">
            {/* motion-safe keeps pulse only for users without reduce-motion preference */}
            <span className="w-2 h-2 rounded-full bg-green-300 motion-safe:animate-pulse" />
            #1 portal o rzucaniu palenia w Polsce
          </p>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            Rzuć fajki.
            <br />
            {/* green-200 on green-900: contrast ≈ 5.4:1 ✓ WCAG AA */}
            <span className="text-green-200">Odzyskaj życie.</span>
          </h1>

          <p className="text-lg sm:text-xl text-green-100 leading-relaxed mb-10 max-w-xl">
            Dołącz do tysięcy Polaków, którzy odżyli po rzuceniu palenia.
            Znajdziesz tu rzetelne wsparcie, porady ekspertów i motywację na
            każdy trudny dzień.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/zacznij"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-green-900 font-bold text-base hover:bg-green-50 transition-colors shadow-lg shadow-green-950/30"
            >
              Zacznij teraz – bezpłatnie
            </Link>
            <Link
              href="/artykuly"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border-2 border-white/60 text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              Czytaj artykuły
              <svg aria-hidden="true" focusable="false" className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <dl className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-green-200 mt-0.5">{s.label}</dt>
                <dd className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
