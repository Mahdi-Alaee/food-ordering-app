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
      {
        hostname: "utfs.io",
        pathname: "/**",
        protocol: "https",
        port: "",
      },
    ],
    loader: "default",
  },
};

export default nextConfig;
