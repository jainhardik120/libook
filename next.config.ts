import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  redirects: () => [
    {
      source: '/',
      destination: '/library',
      permanent: true,
    },
  ],
  serverExternalPackages: ['esbuild-wasm'],
};

export default nextConfig;
