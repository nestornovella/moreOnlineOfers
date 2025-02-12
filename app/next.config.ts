import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1on8qs0xdu5jz.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "acdn.mitiendanube.com",
      },
      {
        protocol: "https",
        hostname: "maxiconsumo.com",
      },
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },

   
    ],
  },
};

export default nextConfig;
