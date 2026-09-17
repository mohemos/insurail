import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "outline-inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,transform,box-shadow,border-color] duration-200 ease-out-quart motion-safe:hover:-translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg shadow-sm hover:bg-accent-hover",
  secondary: "bg-primary text-primary-fg hover:bg-primary-hover",
  outline: "border border-border-strong/60 bg-transparent text-fg hover:border-border-strong hover:bg-surface-2",
  ghost: "bg-transparent text-fg hover:bg-surface-2",
  "outline-inverse": "border border-ink-border bg-transparent text-ink-fg hover:bg-ink-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

type AnchorButtonProps = CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;

type NativeButtonProps = CommonProps & { href?: undefined; external?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * Pass `data-event` / `data-event-*` attributes to have clicks tracked (see AnalyticsListener).
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, leadingIcon, trailingIcon, children, ...rest } = props;
    return (
      <a
        href={href}
        className={buttonClasses(variant, size, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }

  const { variant, size, className, leadingIcon, trailingIcon, children, type, href: _href, external: _external, ...rest } = props;
  return (
    <button type={type ?? "button"} className={buttonClasses(variant, size, className)} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
