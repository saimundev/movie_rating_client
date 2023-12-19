/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

module.exports = nextConfig;
