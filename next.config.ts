import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // picsum.photos — used for mock posters, banners, thumbnails in dev
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        // i.picsum.photos — picsum CDN redirect target
        protocol: 'https',
        hostname: 'i.picsum.photos',
      },
    ],
  },
};

export default nextConfig;
