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
}

module.exports = nextConfig 