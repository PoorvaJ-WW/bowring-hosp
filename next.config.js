/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 new features

  // Workspace architecture - sites use parent's node_modules via Node.js resolution
  // No webpack config needed! Turbopack is the default bundler in Next.js 16

  // Transpile workspace packages for proper bundling in Turborepo monorepo
  transpilePackages: ['@wisdom-scribe/editor', '@wisdom-scribe/lib'],

  // Silence Turbopack warning about webpack config
  turbopack: {},

  // Output configuration
  output: 'standalone',
  serverExternalPackages: ['sharp'],

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'bfldeliverysc.blob.core.windows.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      }
    ],
    unoptimized: true
  },

  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
