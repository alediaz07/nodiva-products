import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
  // The project includes Cloudflare Worker-only database types that are not
  // available to the static GitHub Pages export.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
