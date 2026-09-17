"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { integrationSteps, languages, type LanguageId } from "@/content/code-samples";
import { developers } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TabList, TabPanel } from "@/components/ui/Tabs";

const ID_PREFIX = "dev-lang";

/** Language tabs (cURL / JavaScript / Python) × integration steps, with copy-to-clipboard. */
export function DeveloperCodeTabs() {
  const labels = developers.codeLabels;
  const [lang, setLang] = useState<LanguageId>("curl");
  const [stepId, setStepId] = useState(integrationSteps[0].id);
  const [copied, setCopied] = useState(false);

  const step = integrationSteps.find((item) => item.id === stepId) ?? integrationSteps[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(step.code[lang].code);
      setCopied(true);
      trackEvent("code_copy", { lang, step: step.id });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions). Nothing to do.
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-border bg-code-bg shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-border px-3 py-2.5 sm:px-4">
        <TabList
          tone="ink"
          tabs={languages}
          active={lang}
          onChange={(id) => setLang(id as LanguageId)}
          label={labels.languages}
          idPrefix={ID_PREFIX}
        />
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-ink-fg-muted transition-colors hover:bg-ink-surface hover:text-ink-fg"
        >
          {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
          {copied ? labels.copied : labels.copy}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? labels.copied : ""}
        </span>
      </div>

      <div className="grid lg:grid-cols-[12.5rem_minmax(0,1fr)]">
        <div
          role="group"
          aria-label={labels.steps}
          className="flex flex-wrap gap-1 border-b border-ink-border p-2 lg:flex-col lg:flex-nowrap lg:border-b-0 lg:border-r"
        >
          {integrationSteps.map((item, index) => {
            const active = item.id === step.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setStepId(item.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  active ? "bg-ink-surface text-ink-fg" : "text-ink-fg-muted hover:bg-ink-surface/60 hover:text-ink-fg",
                )}
              >
                <span aria-hidden="true" className="font-mono text-xs text-ink-primary">
                  {index + 1}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          {languages.map((language) => (
            <TabPanel key={language.id} id={language.id} idPrefix={ID_PREFIX} hidden={language.id !== lang}>
              <p className="px-4 pt-3 text-xs text-ink-fg-muted">{step.summary}</p>
              <CodeBlock
                code={step.code[language.id].code}
                lang={step.code[language.id].lang}
                label={`${step.label}, ${language.label}`}
                className="min-h-[14rem] px-4 py-3"
              />
              <div className="border-t border-ink-border">
                <p className="px-4 pt-3 text-[0.6875rem] font-semibold uppercase tracking-wider text-[var(--code-comment)]">
                  {step.resultLabel === "event" ? labels.event : labels.response}
                </p>
                <CodeBlock code={step.result.code} lang={step.result.lang} label={`${step.label}, ${labels.response}`} className="px-4 py-3" />
              </div>
            </TabPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
