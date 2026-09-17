import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centred page column: ~1200px max, 20px gutters on phones, 32px from 640px up. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-page px-5 sm:px-8", className)}>{children}</Tag>;
}
