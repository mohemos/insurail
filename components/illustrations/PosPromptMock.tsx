import { useCases } from "@/content/site";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Illustrative agent POS screen: a one-tap cover prompt after a successful cash-out. */
export function PosPromptMock({ className }: { className?: string }) {
  const m = useCases.posMock;
  return (
    <div role="img" aria-label={m.ariaLabel} className={cn("w-full max-w-xs rounded-2xl border border-border bg-surface p-4 shadow-card", className)}>
      <div className="flex items-center justify-between text-xs text-fg-subtle">
        <span className="font-medium">{m.header}</span>
        <span className="flex gap-1">
          <span className="size-1.5 rounded-full bg-success" />
          <span className="size-1.5 rounded-full bg-border-strong/60" />
          <span className="size-1.5 rounded-full bg-border-strong/60" />
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-surface-2 p-3">
        <p className="text-xs text-fg-muted">{m.status}</p>
        <p className="mt-0.5 text-lg font-semibold tabular-nums text-fg">{formatNaira(m.amount)}</p>
      </div>

      <div className="mt-3 rounded-xl border border-primary/30 bg-primary-soft p-3">
        <p className="text-sm font-semibold text-fg">{m.prompt}</p>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted">{m.benefit}</p>
        <p className="mt-2 text-sm font-medium text-primary">{m.price}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-medium">
          <span className="rounded-lg bg-primary py-2 text-center text-primary-fg">{m.yes}</span>
          <span className="rounded-lg border border-border-strong/60 py-2 text-center text-fg">{m.no}</span>
        </div>
      </div>

      <p className="mt-3 text-[0.6875rem] leading-relaxed text-fg-subtle">{m.footer}</p>
    </div>
  );
}
