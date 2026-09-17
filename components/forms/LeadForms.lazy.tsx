"use client";

import type { ComponentType } from "react";
import { site } from "@/content/site";
import { lazyHydrate } from "@/lib/lazy-hydrate";

/** Server-rendered now, hydrated when the browser is idle. */
export const LeadFormsLazy = lazyHydrate(() => import("./LeadForms").then((module) => module.LeadForms as ComponentType), {
  noscript: (
    <p className="rounded-3xl bg-surface p-6 text-sm text-fg-muted shadow-lift">
      The form needs JavaScript. Email{" "}
      <a href={`mailto:${site.email}`} className="font-medium text-fg underline underline-offset-4">
        {site.email}
      </a>{" "}
      and we will set up the call.
    </p>
  ),
});
