import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações para Netlify
  output: 'standalone',
  
  // Otimizações de imagem
  images: {
    domains: ['localhost'],
    unoptimized: true, // Para Netlify
  },
  
  // Configurações do Webpack para Prisma
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
  
  // Experimental features
  serverExternalPackages: ['@prisma/client'],
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
