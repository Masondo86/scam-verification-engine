/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  },

  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  output: "standalone",
  productionBrowserSourceMaps: false,

  async rewrites() {
    return [
      // ✅ STATIC ASSETS – MUST COME FIRST
      {
        source: '/_next/static/:path*',
        destination: 'https://digital-trust-profile.vercel.app/_next/static/:path*',
      },
      {
        source: '/_next/:path*',                // 👈 CATCH‑ALL – ESSENTIAL
        destination: 'https://digital-trust-profile.vercel.app/_next/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://digital-trust-profile.vercel.app/images/:path*',
      },

      // ✅ MAIN ROUTES – COME AFTER STATIC ASSETS
      {
        source: '/trust-profile',
        destination: 'https://digital-trust-profile.vercel.app/',
      },
      {
        source: '/trust-profile/:path*',
        destination: 'https://digital-trust-profile.vercel.app/:path*',
      },
      {
        source: '/test-dtp',
        destination: 'https://digital-trust-profile.vercel.app/',
      },
      // Add DFS rewrites later when ready
    ];
  }
};

module.exports = nextConfig;