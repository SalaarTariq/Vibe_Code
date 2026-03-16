import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.piac.com.pk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
