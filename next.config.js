/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p16-sign.tiktokcdn-us.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p16-sign.tiktokcdn.com',
        pathname: '/**',
      },
    ],
    domains: ['p16-sign-sg.tiktokcdn.com'],
  },
  // Disable ESLint during production builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Optionally, also ignore TypeScript errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig