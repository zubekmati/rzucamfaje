import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rzucamfaje.pl"),
  title: "RzucamFaje.pl – Rzuć palenie i odzyskaj życie",
  description:
    "Portal o rzucaniu palenia po polsku. Artykuły, porady i wsparcie dla osób, które chcą żyć zdrowo bez papierosów.",
  verification: {
    google: "jmI9j7ioYLEpUPY-ovy7GjYazHHiePTVLRvaAn7Vftw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning className={inter.className}>
      <head>
        {/*
         * Inline script runs synchronously during HTML parsing — before first paint.
         * Reads localStorage to apply .dark class before React hydrates,
         * preventing a flash of wrong theme. Pattern per Next.js 16 docs:
         * node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(t!=="light"&&d)){document.documentElement.classList.add("dark")}var s=parseFloat(localStorage.getItem("a11y-font-scale")||"1");if(s&&s!==1){document.documentElement.style.fontSize=(s*100)+"%"}if(localStorage.getItem("a11y-high-contrast")==="true"){document.documentElement.classList.add("high-contrast")}if(localStorage.getItem("a11y-underline-links")==="true"){document.documentElement.classList.add("underline-links")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200">
        <ScrollToTop />
        <ThemeProvider>{children}</ThemeProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
