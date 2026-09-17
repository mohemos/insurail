import { cn } from "@/lib/utils";

/**
 * The Insurail mark: one continuous line that runs along a rail, dips into a
 * shield, and continues. Cover embedded in the flow of a transaction.
 */
export function Logomark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M4 11.5H10.5V17C10.5 21 13 23.5 16 25C19 23.5 21.5 21 21.5 17V11.5H28"
        fill="none"
        className="stroke-primary-fg"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  /** Size of the lowercase wordmark text. */
  textClassName?: string;
}

/** Mark + lowercase "insurail" wordmark. Inherits text colour from its parent. */
export function Wordmark({ className, textClassName }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Logomark />
      <span className={cn("font-display text-[1.375rem] font-semibold leading-none tracking-[-0.02em]", textClassName)}>
        insurail
      </span>
    </span>
  );
}
