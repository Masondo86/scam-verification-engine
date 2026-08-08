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
      // Main DTP routes → now using the subdomain
      {
        source: '/trust-profile',
        destination: 'https://trust.checkascam.co.za/',
      },
      {
        source: '/trust-profile/:path*',
        destination: 'https://trust.checkascam.co.za/:path*',
      },
      {
        source: '/test-dtp',
        destination: 'https://trust.checkascam.co.za/',
      },
      // Add DFS rewrites later when ready
    ];
  }
};

module.exports = nextConfig;