/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: true,
  },
  reactStrictMode: true,
  
}

module.exports = nextConfig
