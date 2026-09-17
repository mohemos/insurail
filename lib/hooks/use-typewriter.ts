"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  /** When false, the full text is shown immediately (reduced motion, not yet in view, etc.). */
  enabled?: boolean;
  /** Base milliseconds per character; a little random jitter is added. */
  charDelay?: number;
  /** Extra pause after a line break. */
  lineDelay?: number;
  /** Delay before the first character. */
  startDelay?: number;
}

/** Reveals `text` one character at a time. Returns how many characters are visible. */
export function useTypewriter(
  text: string,
  { enabled = true, charDelay = 10, lineDelay = 90, startDelay = 500 }: TypewriterOptions = {},
): { count: number; done: boolean } {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let index = 0;
    let timer = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setCount(index);
      if (index < text.length) {
        const previous = text[index - 1];
        const jitter = Math.random() * charDelay;
        timer = window.setTimeout(tick, (previous === "\n" ? lineDelay : charDelay) + jitter);
      }
    };

    timer = window.setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text, enabled, charDelay, lineDelay, startDelay]);

  return { count, done: count >= text.length };
}
