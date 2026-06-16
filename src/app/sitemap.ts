import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE_URL = "https://rzucamfaje.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/artykuly`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/poradniki`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kalkulator-zdrowia`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/zacznij-dzis`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/o-nas`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/reklama`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/polityka-prywatnosci`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/regulamin`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/artykuly/${article.slug}`,
    lastModified: article.dateISO,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
