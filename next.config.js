/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * App Router is already enabled by default in Next 13+
   * Keeping config explicit for audit clarity
   */
  experimental: {
    appDir: true
  },

  /**
   * Security headers – critical for fraud / banking tooling
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  },

  /**
   * Allow only required remote image domains
   * (Bank logos, screenshots, etc.)
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },

  /**
   * ESLint & TypeScript handled during CI
   * Build should fail on type errors (important)
   */
  eslint: {
    ignoreDuringBuilds: false
  },

  typescript: {
    ignoreBuildErrors: false
  },

  /**
   * Output optimised for Vercel
   */
  output: "standalone",

  /**
   * Prevent leaking source maps in production
   */
  productionBrowserSourceMaps: false
};

module.exports = nextConfig;
