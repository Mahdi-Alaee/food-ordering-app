/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
        protocol: "https",
        port: "",
      },
    ],
    loader: "default",
  },
};

export default nextConfig;
