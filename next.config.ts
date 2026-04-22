import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // for github pages
  basePath: process.env.NODE_ENV === 'production' ? '/playground' : '',
  images: {
    unoptimized: true, // since github pages doesn't support image optimization
  },
};

export default nextConfig;
