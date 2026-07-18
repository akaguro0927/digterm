import type { MetadataRoute } from "next";

// PWA マニフェスト（Next が /manifest.webmanifest として配信し、自動でリンクする）
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Co-Cre — フロントエンド用語図鑑",
    short_name: "Co-Cre",
    description: "フロントエンド用語・UI部品を実物デモつきで調べて学べる図鑑。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf8f2",
    theme_color: "#1fc866",
    icons: [
      { src: "/logo_app.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo_app.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo_app.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
