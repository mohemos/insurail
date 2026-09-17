"use client";

import type { ComponentType } from "react";
import { site } from "@/content/site";
import { lazyHydrate } from "@/lib/lazy-hydrate";

/** Server-rendered now, hydrated when the browser is idle. */
export const DeveloperCodeTabsLazy = lazyHydrate(
  () => import("./DeveloperCodeTabs").then((module) => module.DeveloperCodeTabs as ComponentType),
  {
    noscript: (
      <p className="rounded-2xl border border-ink-border p-6 text-sm text-ink-fg-muted">
        The code samples need JavaScript. You can read them in the docs at{" "}
        <a href={site.docsUrl} className="text-ink-fg underline underline-offset-4">
          {site.docsUrl.replace(/^https?:\/\//, "")}
        </a>
        .
      </p>
    ),
  },
);
