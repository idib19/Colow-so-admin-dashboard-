/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  onDemandEntries: {
    // Prevent the server from keeping pages in memory
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

module.exports = nextConfig;
