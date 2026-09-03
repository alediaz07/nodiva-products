import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/nodiva-products" : "";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  ...(isGitHubPages
    ? { typescript: { ignoreBuildErrors: true } }
    : {}),
};

export default nextConfig;
