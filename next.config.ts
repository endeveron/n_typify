import type { NextConfig } from 'next';
import { BASE_URL } from '@/core/constants';

const nextConfig: NextConfig = {
  /* Client Environment variables */
  env: {
    API_URL: BASE_URL,
  },
  // Import SVG as React components. https://react-svgr.com/docs/next/
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  // reactStrictMode: false, // Uncomment to prevent components to render twice intentionally to detect side effects.
};

export default nextConfig;
