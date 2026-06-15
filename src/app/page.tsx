import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Hero from "@/components/Hero";
import ArticleGrid from "@/components/ArticleGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* WCAG 2.4.1: Skip navigation link — first focusable element on page */}
      <SkipLink />

      <Header />

      {/* id="main-content" is the SkipLink target */}
      <main id="main-content" tabIndex={-1} className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none">
        <Hero />
        <ArticleGrid />
      </main>

      <Footer />
    </>
  );
}
