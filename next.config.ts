import type {NextConfig} from "next";

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
            {
                protocol: 'https',
                hostname: 'mosaic.scdn.co',
                pathname: '**'
            }
        ],
    },
    pageExtensions: [
        "page.tsx",
        "page.ts",
        // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
        // Instead, use `not-found.ts` as a workaround
        // "ts" is required to resolve `not-found.ts`
        // https://github.com/vercel/next.js/issues/65447
        "ts"
    ],
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;