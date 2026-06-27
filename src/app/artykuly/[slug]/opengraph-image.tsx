import { ImageResponse } from "next/og";
import { articles } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  const title = article?.title ?? "RzucamFaje.pl";
  const emoji = article?.emoji ?? "🚭";
  const category = article?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#14532d",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: emoji + category */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <span style={{ fontSize: "64px", lineHeight: 1 }}>{emoji}</span>
          {category ? (
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#86efac",
                background: "#166534",
                padding: "6px 16px",
                borderRadius: "999px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </span>
          ) : null}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "48px" : "56px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {title}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #166534",
            paddingTop: "24px",
            marginTop: "24px",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#4ade80" }}>
            RzucamFaje<span style={{ color: "#86efac", fontWeight: 400 }}>.pl</span>
          </span>
          <span style={{ fontSize: "18px", color: "#6ee7b7" }}>
            Rzuć palenie — nie sam
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
