/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Temporary editorial imagery is served from Unsplash. Replace the remote
    // patterns (and the centralized image config in src/lib/images.ts) with the
    // brand's own CDN before launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
