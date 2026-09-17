import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
}

/** Native <details> accordion: keyboard accessible and searchable with no JavaScript. */
export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="faq-details group">
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-fg transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-fg-subtle transition-transform duration-300 ease-out-quart group-open:rotate-180"
        />
      </summary>
      <p className="pb-6 pr-8 leading-relaxed text-fg-muted">{answer}</p>
    </details>
  );
}
