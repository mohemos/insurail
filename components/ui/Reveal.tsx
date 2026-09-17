"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type RevealTag = "div" | "li" | "article" | "section";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small multiples (0.06) to stagger items in a grid. */
  delay?: number;
  /** Pixels to slide up from. */
  y?: number;
  as?: RevealTag;
}

/**
 * Fades and slides content in the first time it scrolls into view.
 * Renders a plain element when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Motion = m[as] as typeof m.div;
  return (
    <Motion
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }}
    >
      {children}
    </Motion>
  );
}
