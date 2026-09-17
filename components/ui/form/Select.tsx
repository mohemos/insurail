import type { ComponentPropsWithoutRef } from "react";
import { ChevronDown } from "lucide-react";
import { controlClasses } from "./controls";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<"select">, "children"> {
  options: SelectOption[];
  placeholder?: string;
}

/** Native <select> with a custom chevron; keeps the OS picker on mobile. Placeholder greys out via :has(). */
export function Select({ className, options, placeholder, ...props }: SelectProps) {
  return (
    <span className="relative block">
      <select
        className={controlClasses(`appearance-none pr-10 [&:has(option[value='']:checked)]:text-fg-subtle ${className ?? ""}`)}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
    </span>
  );
}
