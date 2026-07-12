import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Allow opening the site from the LAN IP during local workshop testing.
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
