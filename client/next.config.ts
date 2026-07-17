import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      
    ],
  },
  allowedDevOrigins: ['172.25.235.202', '172.25.255.94'],
};

export default nextConfig;
