import type { NextConfig } from "next";

// На GitHub Pages сайт живёт по подпути /ptashka — в CI включаем basePath,
// локальная разработка остаётся на чистом localhost:3000/
const isPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isPages ? "/ptashka" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
