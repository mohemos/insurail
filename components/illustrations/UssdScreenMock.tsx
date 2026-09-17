import { useCases } from "@/content/site";
import { cn } from "@/lib/utils";

/** Illustrative USSD session on a basic phone: enrol in cover with no smartphone. */
export function UssdScreenMock({ className }: { className?: string }) {
  const m = useCases.ussdMock;
  return (
    <div
      role="img"
      aria-label={m.ariaLabel}
      className={cn("w-full max-w-[16rem] rounded-[1.75rem] bg-fg p-2.5 shadow-lift", className)}
    >
      <div className="rounded-[1.25rem] bg-surface px-3 pb-4 pt-3">
        <div className="mx-auto h-1 w-10 rounded-full bg-border" />
        <div className="mt-3 rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-xs font-semibold text-fg">{m.title}</p>
          <ul className="mt-2 space-y-1 font-mono text-[0.6875rem] leading-4 text-fg-muted">
            {m.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-3 rounded-md border border-border-strong/60 bg-surface px-2 py-1.5 font-mono text-xs text-fg">
            {m.input}
            <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-fg" />
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium">
            <span className="text-fg-muted">{m.cancel}</span>
            <span className="text-primary">{m.send}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
