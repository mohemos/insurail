import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  as?: ElementType;
  className?: string;
  /** Adds the gentle hover lift used on grids of cards. */
  interactive?: boolean;
  children: ReactNode;
}

export function Card({ as: Tag = "div", className, interactive = false, children }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-card",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out-quart hover:border-border-strong/50 hover:shadow-lift motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
