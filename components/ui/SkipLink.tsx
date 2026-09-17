import { nav } from "@/content/site";

/** First focusable element on the page; visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-fg focus:shadow-lift"
    >
      {nav.skipToContent}
    </a>
  );
}
