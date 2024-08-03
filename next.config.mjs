/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/components/effects/full-size-skeleton-loader.tsx",
  },
};

export default nextConfig;
