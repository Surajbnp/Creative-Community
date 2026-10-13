/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.3'],
  experimental: {
    appDir: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
