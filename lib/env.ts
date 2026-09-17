/**
 * Public environment (inlined at build time). Every value has a safe default so
 * the site builds and runs with no configuration at all.
 */
function flag(value: string | undefined): boolean {
  return ["1", "true", "yes", "on"].includes((value ?? "").trim().toLowerCase());
}

function trimSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export const publicEnv = {
  siteUrl: trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://insurail.io"),
  docsUrl: trimSlash(process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.insurail.io"),
  plausibleDomain: (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "").trim(),
  plausibleHost: trimSlash(process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io"),
  vercelAnalytics: flag(process.env.NEXT_PUBLIC_VERCEL_ANALYTICS),
} as const;

export const isProduction = process.env.NODE_ENV === "production";
