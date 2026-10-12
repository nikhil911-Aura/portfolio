import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for AWS Elastic Beanstalk. Only enabled when
  // BUILD_STANDALONE=true (set in buildspec.yml), so Vercel builds are unchanged.
  ...(process.env.BUILD_STANDALONE === "true" && { output: "standalone" }),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
