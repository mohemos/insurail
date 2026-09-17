import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name. */
  label: string;
  className?: string;
}

/** A native button with role="switch". Teal when on (meets the 3:1 non-text contrast rule). */
export function Switch({ checked, onChange, label, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200",
        checked ? "bg-primary" : "bg-border-strong",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out-quart",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
