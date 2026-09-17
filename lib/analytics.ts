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

/**
 * Plausible is the only client-side provider wired up: it's cookie-free and
 * works on any host. Netlify Analytics is a zero-code alternative — it reads
 * server logs and is enabled entirely from the Netlify dashboard, so there is
 * nothing to configure here if you use it instead of or alongside Plausible.
 */
export const analytics = {
  plausible: publicEnv.plausibleDomain
    ? { domain: publicEnv.plausibleDomain, host: publicEnv.plausibleHost }
    : null,
  get enabled() {
    return Boolean(this.plausible);
  },
} as const;

type PlausibleFn = (event: string, options?: { props?: AnalyticsProps }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Send a custom event to Plausible (when configured).
 * Safe to call anywhere on the client; a no-op on the server and when disabled.
 */
export function trackEvent(name: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined" || !analytics.enabled) return;
  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    // Analytics must never break the page.
  }
}
