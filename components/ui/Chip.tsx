import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  className?: string;
  children: ReactNode;
}

export function Chip({ className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
