import type { Metadata } from "next";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Hero from "@/components/Hero";
import ArticleGrid from "@/components/ArticleGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RzucamFaje.pl",
  url: "https://rzucamfaje.pl",
  logo: "https://rzucamfaje.pl/favicon.ico",
  description: "Portal wsparcia dla osób rzucających palenie. Rzetelne informacje, porady i narzędzia.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "kontakt@rzucamfaje.pl",
    contactType: "customer support",
    availableLanguage: "Polish",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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
