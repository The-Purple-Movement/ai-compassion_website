/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // also removes "X-Powered-By"

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Specifically allows YouTube's image domain
        pathname: '/vi/**', // Allows any path starting with /vi/ (YouTube's thumbnail folder)
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; report-uri /csp-report;",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
