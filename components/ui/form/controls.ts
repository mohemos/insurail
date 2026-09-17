import { cn } from "@/lib/utils";

/** Shared look for inputs, selects and textareas. */
export function controlClasses(className?: string) {
  return cn(
    "w-full rounded-xl border border-border-strong/70 bg-surface px-3.5 py-2.5 text-base text-fg shadow-none transition-colors",
    "placeholder:text-fg-subtle hover:border-border-strong focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "aria-invalid:border-error aria-invalid:focus:border-error",
    className,
  );
}
