"use client";

import { useSyncExternalStore } from "react";
import { analyticsNotice } from "@/content/site";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY = "insurail:analytics-notice";
const CHANGE_EVENT = "insurail:analytics-notice-change";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function isDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    return false;
  }
}

/** Small, dismissible note shown only when cookie-free analytics are enabled. */
export function AnalyticsNotice() {
  // Server snapshot says "dismissed" so nothing renders during SSR/hydration; the client then re-checks.
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => true);

  if (!analytics.enabled || dismissed) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Storage unavailable: the notice will show again next visit, which is acceptable.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <div
      role="region"
      aria-label={analyticsNotice.ariaLabel}
      className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-md items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-sm text-fg-muted shadow-lift sm:left-auto sm:right-6 sm:mx-0"
    >
      <p>{analyticsNotice.text}</p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded-full bg-fg px-3.5 py-2 text-xs font-medium text-bg transition-colors hover:bg-fg/90"
      >
        {analyticsNotice.dismiss}
      </button>
    </div>
  );
}
