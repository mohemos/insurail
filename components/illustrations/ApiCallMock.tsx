"use client";

import { useEffect, useRef, useState } from "react";
import { heroSample } from "@/content/code-samples";
import { hero } from "@/content/site";
import { sliceTokens, tokenize } from "@/lib/code/tokenize";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useTypewriter } from "@/lib/hooks/use-typewriter";
import { cn } from "@/lib/utils";
import { CodeTokens } from "@/components/ui/CodeBlock";

const LINE_HEIGHT_REM = 1.25;

function reservedHeight(code: string): string {
  return `${code.split("\n").length * LINE_HEIGHT_REM}rem`;
}

/**
 * The hero's API call: the request "types" itself once it scrolls into view,
 * then the response fades in. Screen readers get the complete code up front.
 */
export function ApiCallMock({ className }: { className?: string }) {
  const labels = hero.apiCall;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const requestTokens = tokenize(heroSample.request.code, heroSample.request.lang);
  const responseTokens = tokenize(heroSample.response.code, heroSample.response.lang);
  const animate = inView && !reduced;
  const { count, done } = useTypewriter(heroSample.request.code, { enabled: animate });

  const visibleCount = reduced ? heroSample.request.code.length : count;
  const showResponse = reduced || done;
  const fullCode = `${heroSample.method} ${heroSample.path}\n${heroSample.request.code}\n\n${heroSample.responseStatus}\n${heroSample.response.code}`;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={labels.ariaLabel}
      className={cn("w-full max-w-md overflow-hidden rounded-2xl bg-code-bg text-code-fg shadow-lift ring-1 ring-white/10", className)}
    >
      <pre className="sr-only">{fullCode}</pre>

      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-xs">
          <span className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <span className="ml-1">
              <span className="tok-verb">{heroSample.method}</span> {heroSample.path}
            </span>
          </span>
          <span
            className={cn(
              "rounded-full bg-white/10 px-2 py-0.5 text-[0.6875rem] font-medium tok-verb transition-opacity duration-500",
              showResponse ? "opacity-100" : "opacity-0",
            )}
          >
            {heroSample.responseStatus}
          </span>
        </div>

        <div className="px-4 py-3">
          <p className="text-[0.6875rem] uppercase tracking-wider text-[var(--code-comment)]">{labels.requestLabel}</p>
          <pre
            className="mt-1 overflow-x-auto whitespace-pre font-mono text-[0.75rem] leading-5 sm:text-[0.8125rem]"
            style={{ minHeight: reservedHeight(heroSample.request.code) }}
          >
            <code>
              <CodeTokens tokens={sliceTokens(requestTokens, visibleCount)} />
              {animate && !done ? <span className="animate-caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-code-fg/80" /> : null}
            </code>
          </pre>

          <p className="mt-3 text-[0.6875rem] uppercase tracking-wider text-[var(--code-comment)]">{labels.responseLabel}</p>
          <pre
            className={cn(
              "mt-1 overflow-x-auto whitespace-pre font-mono text-[0.75rem] leading-5 transition-opacity duration-700 sm:text-[0.8125rem]",
              showResponse ? "opacity-100" : "opacity-0",
            )}
            style={{ minHeight: reservedHeight(heroSample.response.code) }}
          >
            <code>
              <CodeTokens tokens={responseTokens} />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
