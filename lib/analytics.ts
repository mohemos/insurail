import { publicEnv } from "@/lib/env";

/** Names of the events the site sends. Keep them stable: dashboards depend on them. */
export type AnalyticsEvent =
  | "cta_click"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "code_copy"
  | "outbound_click";

export type AnalyticsProps = Record<string, string | number | boolean>;

export const analytics = {
  plausible: publicEnv.plausibleDomain
    ? { domain: publicEnv.plausibleDomain, host: publicEnv.plausibleHost }
    : null,
  vercel: publicEnv.vercelAnalytics,
  get enabled() {
    return Boolean(this.plausible) || this.vercel;
  },
} as const;

type PlausibleFn = (event: string, options?: { props?: AnalyticsProps }) => void;
type VercelFn = (command: "event", payload: { name: string; data?: AnalyticsProps }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    va?: VercelFn;
  }
}

/**
 * Send a custom event to whichever providers are enabled.
 * Safe to call anywhere on the client; a no-op on the server and when disabled.
 */
export function trackEvent(name: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined" || !analytics.enabled) return;
  try {
    window.plausible?.(name, props ? { props } : undefined);
    window.va?.("event", { name, data: props });
  } catch {
    // Analytics must never break the page.
  }
}
