import type { NextConfig } from "next";

const API_URL =
    process.env.API_URL || "http://production-backend-kv2dl2:3000";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${API_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
