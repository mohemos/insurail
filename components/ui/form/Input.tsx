import type { ComponentPropsWithoutRef } from "react";
import { controlClasses } from "./controls";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={controlClasses(className)} {...props} />;
}
