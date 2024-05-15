/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["ecommerce-app-media.s3.amazonaws.com"],
  },
};

export default nextConfig;
