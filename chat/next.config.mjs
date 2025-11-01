import NextFederationPlugin from '@module-federation/nextjs-mf';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'chat',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './app': './app/chat-app.tsx',
          './hooks': './lib/hooks.ts',
        },
        remotes: {
          host: isServer
            ? path.resolve(__dirname, '../.next/server/remoteEntry.js')
            : 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
