"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useTransition } from "react";
import { articles, CATEGORIES, CATEGORY_COLORS, type Article } from "@/lib/articles";

function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      aria-labelledby={`article-${article.slug}`}
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
          id={`article-${article.slug}`}
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
  );
}

export default function ArticlesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const kategoria = searchParams.get("kategoria") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  const filtered = articles.filter((a) => {
    const matchesCategory = !kategoria || a.category === kategoria;
    const query = q.toLowerCase();
    const matchesSearch =
      !query ||
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const hasFilters = !!q || !!kategoria;

  return (
    <div>
      {/* Search + filters bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">

          {/* Search */}
          <search aria-label="Szukaj artykułów">
            <div className="relative max-w-lg">
              <label htmlFor="search-input" className="sr-only">
                Szukaj artykułów
              </label>
              <svg
                aria-hidden="true"
                focusable="false"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-input"
                type="search"
                value={q}
                onChange={(e) => updateParam("q", e.target.value)}
                placeholder="Szukaj artykułów…"
                autoComplete="off"
                className="
                  w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent
                  transition-colors text-sm
                "
              />
            </div>
          </search>

          {/* Category filters */}
          <div role="group" aria-label="Filtruj po kategorii" className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateParam("kategoria", "")}
              aria-pressed={!kategoria}
              className={[
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                !kategoria
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
              ].join(" ")}
            >
              Wszystkie
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => updateParam("kategoria", kategoria === cat ? "" : cat)}
                aria-pressed={kategoria === cat}
                className={[
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  kategoria === cat
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Results count — announced to screen readers */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-gray-600 dark:text-gray-400 mb-6"
        >
          {isPending ? (
            "Szukam…"
          ) : filtered.length === articles.length ? (
            <>Wszystkie artykuły – <strong className="text-gray-900 dark:text-white">{filtered.length}</strong></>
          ) : (
            <>
              Znaleziono <strong className="text-gray-900 dark:text-white">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "artykuł" : filtered.length < 5 ? "artykuły" : "artykułów"}
              {kategoria && <> w kategorii <strong className="text-gray-900 dark:text-white">{kategoria}</strong></>}
              {q && <> dla frazy <strong className="text-gray-900 dark:text-white">„{q}"</strong></>}
            </>
          )}
        </p>

        {/* Article grid */}
        {filtered.length > 0 ? (
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          /* Empty state */
          <div
            role="status"
            className="text-center py-20"
          >
            <p aria-hidden="true" className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Nic nie znalazłem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Spróbuj innego słowa albo usuń filtry – na pewno coś tu dla Ciebie jest.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  updateParam("q", "");
                  updateParam("kategoria", "");
                }}
                className="px-5 py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
              >
                Wyczyść filtry
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
