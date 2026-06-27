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
        {/* Top: logo + site name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" opacity="0.9"/>
              <rect x="5" y="10.5" width="10" height="3" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="15" y="10.5" width="3" height="3" rx="1" fill="#86efac"/>
              <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
            RzucamFaje<span style={{ color: "#4ade80", fontWeight: 400 }}>.pl</span>
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "46px" : "54px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.25,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>

        {/* Bottom: emoji + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderTop: "1px solid #166534",
            paddingTop: "24px",
            marginTop: "24px",
          }}
        >
          <span style={{ fontSize: "36px", lineHeight: 1 }}>{emoji}</span>
          {category ? (
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#86efac",
                background: "#166534",
                padding: "6px 18px",
                borderRadius: "999px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </span>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
