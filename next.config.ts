import type { NextConfig } from "next";

/**
 * Sensible security headers for a static marketing site. Netlify's Next.js
 * runtime reads this `headers()` config and applies it for you, so no
 * separate netlify.toml [[headers]] block is needed.
 * A Content-Security-Policy is intentionally left out: Next.js inlines small
 * scripts that would need nonces (which forces dynamic rendering). Add one at
 * your host's edge config if your policy requires it.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
