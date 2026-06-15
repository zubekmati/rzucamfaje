import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import ArticlesClient from "@/components/ArticlesClient";

export const metadata: Metadata = {
  title: "Artykuły – RzucamFaje.pl",
  description:
    "Wszystkie artykuły o rzucaniu palenia. Porady, poradniki, historie sukcesu i sprawdzone techniki – pisane przez kogoś, kto sam przez to przechodził.",
};

function ArticlesFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="h-56 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function ArticlesPage() {
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
              Baza wiedzy
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Artykuły
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Tu piszę o tym, przez co sam przechodziłem. Bez owijania w bawełnę,
              bez medycznej sztywności. Tylko to, co naprawdę pomaga.
            </p>
          </div>
        </section>

        {/*
         * ArticlesClient uses useSearchParams — must be wrapped in Suspense.
         * Per Next.js 16 docs: components using useSearchParams need Suspense
         * to avoid blocking prerendering of the page.
         */}
        <Suspense fallback={<ArticlesFallback />}>
          <ArticlesClient />
        </Suspense>

      </main>
      <Footer />
    </>
  );
}
