"use client";

import { useEffect, useState } from "react";
import { leadCapture } from "@/content/site";
import { cn } from "@/lib/utils";
import { AuditForm } from "./AuditForm";
import { DeveloperForm } from "./DeveloperForm";

type Mode = "audit" | "developer";
const MODES: Mode[] = ["audit", "developer"];

/**
 * Switches between the risk-audit form and the developer early-access form.
 * Links to #early-access open the developer form; #request-audit opens the audit form.
 */
export function LeadForms() {
  const [mode, setMode] = useState<Mode>("audit");

  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash;
      if (hash === `#${leadCapture.developerAnchor}`) setMode("developer");
      else if (hash === `#${leadCapture.id}`) setMode("audit");
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  return (
    <div className="rounded-3xl bg-surface p-5 text-fg shadow-lift sm:p-8">
      <div role="group" aria-label={leadCapture.modeLabel} className="grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1">
        {MODES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors",
              mode === item ? "bg-fg text-bg shadow-card" : "text-fg-muted hover:text-fg",
            )}
          >
            {leadCapture.modes[item]}
          </button>
        ))}
      </div>
      <div className="mt-6">{mode === "audit" ? <AuditForm key="audit" /> : <DeveloperForm key="developer" />}</div>
    </div>
  );
}
