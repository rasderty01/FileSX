/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "elated-nightingale-196.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
