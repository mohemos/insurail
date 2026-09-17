"use client";

import { useEffect } from "react";
import { analytics, trackEvent, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/**
 * One document-level click listener so that server-rendered links and buttons
 * can be tracked declaratively:
 *   <a data-event="cta_click" data-event-cta="hero_primary">
 * Outbound links (other origins) are tracked automatically.
 */
export function AnalyticsListener() {
  useEffect(() => {
    if (!analytics.enabled) return;

    const onClick = (event: MouseEvent) => {
      const origin = event.target instanceof Element ? event.target : null;
      if (!origin) return;

      const tracked = origin.closest<HTMLElement>("[data-event]");
      if (tracked) {
        const props: AnalyticsProps = {};
        for (const [key, value] of Object.entries(tracked.dataset)) {
          if (key !== "event" && key.startsWith("event") && value !== undefined) {
            props[key.slice("event".length).toLowerCase()] = value;
          }
        }
        trackEvent(tracked.dataset.event as AnalyticsEvent, props);
        return;
      }

      const link = origin.closest<HTMLAnchorElement>("a[href]");
      if (link && /^https?:/.test(link.href) && new URL(link.href).origin !== window.location.origin) {
        trackEvent("outbound_click", { url: link.href });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
