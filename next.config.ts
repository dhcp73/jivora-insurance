import type { NextConfig } from "next";
import path from "node:path";

const demoBuild =
  process.env.VERCEL === "1" ||
  process.env.STORAGE_MODE === "demo" ||
  process.env.STORAGE_MODE === "memory" ||
  process.env.STORAGE_MODE === "browser";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: demoBuild ? [] : ["better-sqlite3"],
  webpack: (config, { webpack }) => {
    if (demoBuild) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "better-sqlite3": path.resolve(__dirname, "src/lib/stubs/better-sqlite3.ts"),
      };
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /src[\\/]lib[\\/]db-sqlite(\.ts)?$/,
          path.resolve(__dirname, "src/lib/db-sqlite-stub.ts"),
        ),
      );
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_STORAGE_MODE: demoBuild ? "demo" : process.env.STORAGE_MODE || "sqlite",
  },
};

export default nextConfig;
