import type { CodeLang } from "@/content/code-samples";
import { tokenize, type Token } from "@/lib/code/tokenize";
import { cn } from "@/lib/utils";

/** Renders tokens as coloured spans. Plain tokens are emitted as text to keep the DOM small. */
export function CodeTokens({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((token, index) =>
        token.type === "plain" ? (
          token.value
        ) : (
          <span key={index} className={`tok-${token.type}`}>
            {token.value}
          </span>
        ),
      )}
    </>
  );
}

interface CodeBlockProps {
  code: string;
  lang: CodeLang;
  /** Accessible name for the scrollable region. */
  label: string;
  className?: string;
}

/** Static, syntax-coloured code. Horizontal scroll on narrow screens, keyboard focusable. */
export function CodeBlock({ code, lang, label, className }: CodeBlockProps) {
  const tokens = tokenize(code, lang);
  return (
    <pre
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn("overflow-x-auto font-mono text-[0.8125rem] leading-6 text-code-fg", className)}
    >
      <code>
        <CodeTokens tokens={tokens} />
      </code>
    </pre>
  );
}
