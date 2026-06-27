import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p aria-hidden="true" className="text-8xl font-extrabold text-green-700 dark:text-green-500 mb-4">
            404
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Strona nie istnieje
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Przepraszamy — ta strona została usunięta lub nigdy nie istniała.
            Może szukasz artykułów o rzucaniu palenia?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
            >
              Strona główna
            </Link>
            <Link
              href="/artykuly"
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
