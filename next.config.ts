import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '/photo/**',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;