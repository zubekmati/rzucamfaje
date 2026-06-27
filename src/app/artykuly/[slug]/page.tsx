import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";
import { articles, CATEGORY_COLORS, type Block } from "@/lib/articles";

/* ─── Static generation ───────────────────────────────────── */

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} – RzucamFaje.pl`,
    description: article.excerpt,
  };
}

/* ─── Content block renderer ──────────────────────────────── */

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={index} className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={index} className="space-y-2 my-2" role="list">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
              <span aria-hidden="true" className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="space-y-2 my-2 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
              <span aria-hidden="true" className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-green-600 dark:border-green-500 pl-5 py-1 my-6">
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{block.text}</p>
          {block.author && (
            <footer className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    case "callout":
      const styles = {
        tip:     { wrap: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800", title: "text-green-800 dark:text-green-300", body: "text-green-700 dark:text-green-400", icon: "💡" },
        info:    { wrap: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",    title: "text-blue-800 dark:text-blue-300",  body: "text-blue-700 dark:text-blue-400",  icon: "ℹ️" },
        warning: { wrap: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800", title: "text-amber-800 dark:text-amber-300", body: "text-amber-700 dark:text-amber-400", icon: "⚠️" },
      }[block.variant];
      return (
        <aside key={index} className={`rounded-xl border p-4 my-6 ${styles.wrap}`} aria-label={block.title}>
          <p className={`font-bold text-sm mb-1 flex items-center gap-1.5 ${styles.title}`}>
            <span aria-hidden="true">{styles.icon}</span>
            {block.title}
          </p>
          <p className={`text-sm leading-relaxed ${styles.body}`}>{block.text}</p>
        </aside>
      );
    case "table":
      return (
        <figure key={index} className="my-6 -mx-4 sm:mx-0 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="text-left font-bold text-gray-900 dark:text-white py-2 px-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 dark:border-gray-800">
                  {row.map((cell, ci) => (
                    <td key={ci} className="text-gray-700 dark:text-gray-300 py-2 px-3 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="text-xs text-gray-500 dark:text-gray-500 mt-2 px-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return <hr key={index} className="my-8 border-gray-200 dark:border-gray-700" />;
    case "related":
      return (
        <Link
          key={index}
          href={`/artykuly/${block.slug}`}
          className="group flex items-center gap-3 my-6 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-100 dark:hover:bg-green-950/50 transition-all no-underline"
        >
          <span className="shrink-0 text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Czytaj też</span>
          <span className="flex-1 text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors leading-snug">{block.title}</span>
          <svg aria-hidden="true" focusable="false" className="shrink-0 w-4 h-4 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      );
    default:
      return null;
  }
}

/* ─── Schema.org JSON-LD ──────────────────────────────────── */

function ArticleJsonLd({ article }: { article: { slug: string; title: string; excerpt: string; dateISO: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Organization", name: "RzucamFaje.pl", url: "https://rzucamfaje.pl" },
    publisher: { "@type": "Organization", name: "RzucamFaje.pl", url: "https://rzucamfaje.pl" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rzucamfaje.pl/artykuly/${article.slug}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ─── Page ────────────────────────────────────────────────── */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const fallback = articles
    .filter((a) => a.slug !== slug && !related.find((r) => r.slug === a.slug))
    .slice(0, 3 - related.length);

  const relatedArticles = [...related, ...fallback];

  return (
    <>
      <ArticleJsonLd article={article} />
      <SkipLink />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 bg-white dark:bg-gray-950 outline-none">

        {/* ── Breadcrumbs ──────────────────────────────────── */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Ścieżka nawigacji">
              <ol role="list" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">
                    Strona główna
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">›</li>
                <li>
                  <Link href="/artykuly" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">
                    Artykuły
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">›</li>
                <li>
                  <span aria-current="page" className="text-gray-900 dark:text-white font-medium line-clamp-1">
                    {article.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── Article ──────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <article aria-labelledby="article-heading">

            {/* Article header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  aria-hidden="true"
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? ""}`}
                >
                  {article.category}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime} czytania
                </span>
              </div>

              <h1
                id="article-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-5"
              >
                {article.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm"
                  >
                    RF
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">RzucamFaje.pl</p>
                    <time
                      dateTime={article.dateISO}
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      {article.date}
                    </time>
                  </div>
                </div>

                {/* Share buttons */}
                <div className="flex items-center gap-2" aria-label="Udostępnij artykuł">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://rzucamfaje.pl/artykuly/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Udostępnij na Facebooku (otwiera się w nowej karcie)"
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://rzucamfaje.pl/artykuly/${article.slug}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Udostępnij na X (Twitter) (otwiera się w nowej karcie)"
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </header>

            {/* Article body */}
            <div className="prose-article space-y-5 text-base sm:text-[1.0625rem]">
              {article.content.map((block, i) => renderBlock(block, i))}
            </div>

            {/* Article footer */}
            <footer className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/artykuly"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Wróć do wszystkich artykułów
              </Link>
            </footer>
          </article>
        </div>

        {/* ── Related articles ─────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2
                id="related-heading"
                className="text-xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Może Cię zainteresować
              </h2>
              <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      href={`/artykuly/${rel.slug}`}
                      className="group flex flex-col h-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 hover:shadow-sm transition-all"
                    >
                      <span aria-hidden="true" className="text-2xl mb-2">{rel.emoji}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors leading-snug">
                        {rel.title}
                      </span>
                      <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        {rel.readTime} czytania
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
