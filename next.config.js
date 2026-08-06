/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Static generation timeout configuration
   */
  staticPageGenerationTimeout: 180,

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
  productionBrowserSourceMaps: false,

  /**
   * REWRITES – route /digital-footprint and /trust-profile to the other Vercel apps
   */
  async rewrites() {
    return [
      // Static assets for DTP – these MUST come first
      {
        source: '/_next/static/:path*',
        destination: 'https://digital-trust-profile.vercel.app/_next/static/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://digital-trust-profile.vercel.app/images/:path*',
      },
      // Main DTP route
      {
        source: '/trust-profile',
        destination: 'https://digital-trust-profile.vercel.app/',
      },
      {
        source: '/trust-profile/:path*',
        destination: 'https://digital-trust-profile.vercel.app/:path*',
      },
      // DFS route (add when DFS is ready)
      {
        source: '/digital-footprint',
        destination: 'https://digital-footprint-scanner.vercel.app/',
      },
      {
        source: '/digital-footprint/:path*',
        destination: 'https://digital-footprint-scanner.vercel.app/:path*',
      },
      // Test route to verify rewrites are working
      {
        source: '/test-dtp',
        destination: 'https://digital-trust-profile.vercel.app/',
      },
    ];
  }
};

module.exports = nextConfig;