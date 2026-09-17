"use client";

import { Suspense, lazy, type ComponentType, type ReactNode } from "react";
import { whenIdle } from "./defer";

/**
 * Lazy hydration for below-the-fold interactive components.
 *
 * The component is rendered on the server, so its HTML ships with the page.
 * On the client the module import is postponed until the browser is idle;
 * React keeps the server-rendered markup in place and hydrates it once the
 * chunk arrives, so this JavaScript never sits on the critical path.
 *
 * Keep this for content below the first viewport only: React streams these
 * boundaries and completes them at the end of the document, which would
 * register as a layout shift if the content were visible on first paint.
 *
 * `noscript` is shown to visitors with JavaScript disabled.
 */
export function lazyHydrate<P extends object = Record<string, never>>(
  load: () => Promise<ComponentType<P>>,
  options: { noscript?: ReactNode } = {},
): ComponentType<P> {
  const Lazy = lazy(() => whenIdle().then(load).then((component) => ({ default: component })));
  const fallback = options.noscript ? <noscript>{options.noscript}</noscript> : null;

  function LazyHydrated(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Lazy {...props} />
      </Suspense>
    );
  }

  return LazyHydrated;
}
