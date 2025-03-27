import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Client Environment variables */
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
