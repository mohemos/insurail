/**
 * Resolve once the browser has painted and is idle. On the server it resolves
 * immediately so server rendering is unaffected. Used to keep non-critical
 * JavaScript (animation engine, form logic, code tabs) off the critical path.
 */
export function whenIdle(minDelayMs = 250, idleTimeoutMs = 1500): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const minimumDelay = new Promise<void>((resolve) => window.setTimeout(resolve, minDelayMs));
  const idle = new Promise<void>((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve(), { timeout: idleTimeoutMs });
    } else {
      window.setTimeout(resolve, minDelayMs);
    }
  });

  return Promise.all([minimumDelay, idle]).then(() => undefined);
}
