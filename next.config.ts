import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "pino-pretty": false,
      encoding: false,
      lokijs: false,
      "@react-native-async-storage/async-storage": false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding", "@react-native-async-storage/async-storage");
    return config;
  },
};

export default nextConfig;
