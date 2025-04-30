import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ignore lint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
