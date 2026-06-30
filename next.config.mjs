/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` produces a fully static `out/` folder that can
  // be hosted on ANY static host (Gitee Pages, 阿里云 OSS, 腾讯云 COS, Netlify,
  // GitHub Pages, Vercel, etc.) with no Node server required.
  output: "export",
  images: {
    // Static export can't use the on-demand Image Optimization API, so images
    // are served as-is. Replace the Unsplash placeholders (see src/lib/images.ts)
    // and this remote allow-list with the brand's own CDN before launch.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
