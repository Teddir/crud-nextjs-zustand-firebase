/** @type {import('next').NextConfig} */

const production = process.env.NODE_ENV == "production";

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    removeConsole: production ? { exclude: ["error"] } : false,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGE_SENDER_ID: process.env.MESSAGE_SENDER_ID,
    APP_ID: process.env.APP_ID,
  },
};

export default nextConfig;
