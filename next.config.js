/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: false,
    runtimeCaching,
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'none'",
                    },
                ],
            },
        ];
    },
});
const nextConfig = withPWA({});

module.exports = nextConfig;