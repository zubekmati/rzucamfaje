import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "RzucamFaje.pl – Rzuć palenie i odzyskaj życie",
  description:
    "Portal o rzucaniu palenia po polsku. Artykuły, porady i wsparcie dla osób, które chcą żyć zdrowo bez papierosów.",
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
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(t!=="light"&&d)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
