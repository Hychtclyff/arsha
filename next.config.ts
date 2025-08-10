import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !!! PERINGATAN: Ini akan mengabaikan SEMUA error TypeScript saat build !!!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
