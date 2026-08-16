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
    {
      source: '/trust-profile',
      destination: 'https://digital-trust-profile.vercel.app/',
    },
    {
      source: '/trust-profile/:path*',
      destination: 'https://digital-trust-profile.vercel.app/:path*',
    },
      {
      source: '/digital-footprint',
      destination: 'https://footprint.checkascam.co.za/',
    },
    {
      source: '/digital-footprint/:path*',
      destination: 'https://footprint.checkascam.co.za/:path*',
    },
    ];
  }
};

module.exports = nextConfig;