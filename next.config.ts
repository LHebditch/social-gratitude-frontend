import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {},
  siteUrl: process.env.SITE_URL || 'https://gratilog.co.uk',
  generateRobotsTxt: true,
};

export default nextConfig;
