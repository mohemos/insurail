import type { ComponentPropsWithoutRef } from "react";
import { controlClasses } from "./controls";

export function Textarea({ className, rows = 4, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea rows={rows} className={controlClasses(`resize-y min-h-24 ${className ?? ""}`)} {...props} />;
}
