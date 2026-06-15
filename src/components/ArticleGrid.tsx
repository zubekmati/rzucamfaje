import Link from "next/link";
import { articles as allArticles, CATEGORY_COLORS } from "@/lib/articles";

const articles = allArticles.slice(0, 6);

export default function ArticleGrid() {
  return (
    <section
      aria-labelledby="articles-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          {/* Decorative label — hidden from SR, heading below provides structure */}
          <p aria-hidden="true" className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
            Najnowsze
          </p>
          <h2
            id="articles-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white"
          >
            Ostatnie artykuły
          </h2>
        </div>
        <Link
          href="/artykuly"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
        >
          Wszystkie artykuły
          <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Article grid */}
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article) => (
          <li key={article.slug}>
            <article
              aria-labelledby={`article-title-${article.slug}`}
              className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all duration-200 overflow-hidden"
            >
              {/* Color band — decorative */}
              <div aria-hidden="true" className="h-2 bg-gradient-to-r from-green-700 to-green-500" />

              <div className="flex flex-col flex-1 p-6">
                {/* Emoji + category */}
                <div className="flex items-center justify-between mb-4">
                  <span aria-hidden="true" className="text-3xl">{article.emoji}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? ""}`}>
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  id={`article-title-${article.slug}`}
                  className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors"
                >
                  <Link
                    href={`/artykuly/${article.slug}`}
                    className="hover:underline focus:outline-none focus-visible:underline"
                  >
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
                  {article.excerpt}
                </p>

                {/* Metadata */}
                <footer className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <time dateTime={article.dateISO}>{article.date}</time>
                  <span className="flex items-center gap-1">
                    <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.readTime} czytania</span>
                  </span>
                </footer>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* Mobile "all articles" link */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/artykuly"
          className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
        >
          Wszystkie artykuły
          <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
