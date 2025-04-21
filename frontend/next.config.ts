import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 0, // Dynamic pages will not be cached
      static: 300, // Static pages will be cached for 5 minutes
    },
  },
};

export default nextConfig;
