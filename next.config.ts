import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["construct-wasting-undermost.ngrok-free.dev"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "ngrok-skip-browser-warning",
            value: "1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
