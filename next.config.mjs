/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` produces a fully static `out/` folder that can
  // be hosted on ANY static host (Gitee Pages, 阿里云 OSS, 腾讯云 COS, Netlify,
  // GitHub Pages, Vercel, etc.) with no Node server required.
  output: "export",
  images: {
    // Static export can't use the on-demand Image Optimization API, so images
    // are served as-is. Imagery is self-hosted in /public/img (see
    // src/lib/images.ts). If you later serve real photos from a CDN, add its
    // domain to `remotePatterns` here.
    unoptimized: true,
  },
};

export default nextConfig;
