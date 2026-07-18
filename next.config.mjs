/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // External packages that shouldn't be bundled
  experimental: {
    serverComponentsExternalPackages: ["@opentelemetry/api"],
  },
};

export default nextConfig;
