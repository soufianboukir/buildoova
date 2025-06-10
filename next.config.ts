/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", 
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", 
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
};

export default nextConfig;
