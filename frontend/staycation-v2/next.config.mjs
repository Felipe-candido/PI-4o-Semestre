let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path(.*)',
        destination: 'http://127.0.0.1:8000/api/:path',
      },
    ]
  },


  async headers() {
    // Sempre usar ngrok quando estiver rodando em produção ou quando a variável estiver definida
    const isNgrok = process.env.NEXT_PUBLIC_NGROK_URL || process.env.NODE_ENV === 'production'
    const ngrokHost = process.env.NEXT_PUBLIC_NGROK_URL ? 
      process.env.NEXT_PUBLIC_NGROK_URL.replace('https://', '') : 
      '9b63e1766156.ngrok-free.app'
    
    console.log('🔧 Next.js headers config:', { isNgrok, ngrokHost })
    
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Forwarded-Host',
            value: isNgrok ? ngrokHost : 'localhost:3000',
          },
          {
            key: 'X-Forwarded-Proto',
            value: isNgrok ? 'https' : 'http',
          },
          {
            key: 'X-Forwarded-For',
            value: '127.0.0.1',
          },
        ],
      },
    ]
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
