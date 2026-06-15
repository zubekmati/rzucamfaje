import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import { articles, CATEGORY_COLORS } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Poradniki – RzucamFaje.pl",
  description:
    "Praktyczne poradniki o rzucaniu palenia. Krok po kroku przez najtrudniejsze momenty – pisane przez kogoś, kto sam przez to przechodził.",
};

const guides = articles.filter((a) => a.category === "Poradnik");

export default function PoradnikiPage() {
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
              Praktyczna wiedza
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Poradniki
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Konkretne wskazówki na konkretne sytuacje. Bez teorii, bez owijania w bawełnę –
              tylko to, co naprawdę działa w trudnych momentach.
            </p>
          </div>
        </section>

        {/* Guides grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Wszystkie poradniki –{" "}
            <strong className="text-gray-900 dark:text-white">{guides.length}</strong>
          </p>

          {guides.length > 0 ? (
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((article) => (
                <li key={article.slug}>
                  <article
                    aria-labelledby={`guide-${article.slug}`}
                    className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all duration-200 overflow-hidden"
                  >
                    <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-green-700 to-green-500" />
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span aria-hidden="true" className="text-2xl">{article.emoji}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? ""}`}>
                          {article.category}
                        </span>
                      </div>
                      <h2
                        id={`guide-${article.slug}`}
                        className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors"
                      >
                        <Link
                          href={`/artykuly/${article.slug}`}
                          className="focus:outline-none focus-visible:underline hover:underline"
                        >
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                        {article.excerpt}
                      </p>
                      <footer className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                        <time dateTime={article.dateISO}>{article.date}</time>
                        <span className="flex items-center gap-1">
                          <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime} czytania
                        </span>
                      </footer>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20">
              <p aria-hidden="true" className="text-5xl mb-4">📋</p>
              <p className="text-gray-600 dark:text-gray-400">Poradniki wkrótce.</p>
            </div>
          )}

          {/* Link to all articles */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Szukasz czegoś innego? Zajrzyj do pełnej bazy artykułów.
            </p>
            <Link
              href="/artykuly"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Wszystkie artykuły
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
