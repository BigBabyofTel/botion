import type { NextConfig } from 'next';
import { env } from './lib/env';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  async headers() {
    const allowedOrigins = env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ];
    return [
      {
        source: '/api/:path*',
        headers: allowedOrigins.map((origin) => ({
          key: 'Access-Control-Allow-Origin',
          value: origin.trim(),
        })),
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS,PUT,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },
};

export default nextConfig;
