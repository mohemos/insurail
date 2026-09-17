"use client";

import { useState } from "react";
import { hero } from "@/content/site";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/Switch";

/** Illustrative checkout with a working "add cover" toggle that updates the total. */
export function CheckoutMock({ className }: { className?: string }) {
  const c = hero.checkout;
  const [covered, setCovered] = useState(true);

  const subtotal = c.items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + (covered ? c.cover.premium : 0);

  return (
    <div
      role="group"
      aria-label={c.ariaLabel}
      className={cn("w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lift", className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-fg">{c.title}</span>
        <span className="text-xs text-fg-subtle">{c.orderRef}</span>
      </div>

      <ul className="mt-4 divide-y divide-border text-sm">
        {c.items.map((item) => (
          <li key={item.label} className="flex items-center justify-between py-2.5">
            <span className="text-fg-muted">{item.label}</span>
            <span className="tabular-nums text-fg">{formatNaira(item.amount)}</span>
          </li>
        ))}
        {covered ? (
          <li className="flex items-center justify-between py-2.5 text-primary">
            <span>{c.cover.lineItem}</span>
            <span className="tabular-nums">{formatNaira(c.cover.premium)}</span>
          </li>
        ) : null}
      </ul>

      <div
        className={cn(
          "mt-3 rounded-xl border p-3.5 transition-colors duration-200",
          covered ? "border-primary/30 bg-primary-soft" : "border-border bg-surface-2",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-fg">
              {c.cover.labelPrefix} {formatNaira(c.cover.premium)} {c.cover.labelSuffix}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{c.cover.description}</p>
          </div>
          <Switch checked={covered} onChange={setCovered} label={c.cover.switchLabel} className="mt-0.5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-fg-muted">{c.totalLabel}</span>
        <span className="text-base font-semibold tabular-nums text-fg">{formatNaira(total)}</span>
      </div>

      <div aria-hidden="true" className="mt-4 rounded-full bg-fg py-2.5 text-center text-sm font-medium text-bg">
        {c.payLabel} {formatNaira(total)}
      </div>
      <p className="mt-3 text-center text-[0.6875rem] text-fg-subtle">{c.disclosure}</p>
    </div>
  );
}
