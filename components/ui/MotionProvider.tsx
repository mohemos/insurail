"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { whenIdle } from "@/lib/defer";

/**
 * Animation features load after the page has painted and the browser is idle.
 * Until then `m` components simply sit in their initial state.
 */
const loadFeatures = () => whenIdle().then(() => import("./motion-features")).then((module) => module.default);

/**
 * Loads only the animation features we use, off the critical path
 * (LazyMotion + deferred import). MotionConfig honours reduced-motion settings.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
