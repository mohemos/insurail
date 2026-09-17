"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

interface TabListProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  /** Prefix for the generated tab / panel ids. */
  idPrefix: string;
  className?: string;
  tone?: "default" | "ink";
}

/** WAI-ARIA tabs with roving tabindex: arrow keys move, Home/End jump. */
export function TabList({ tabs, active, onChange, label, idPrefix, className, tone = "default" }: TabListProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    refs.current[next]?.focus();
    onChange(tabs[next].id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div role="tablist" aria-label={label} className={cn("flex gap-1", className)}>
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              tone === "default"
                ? selected
                  ? "bg-fg text-bg"
                  : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                : selected
                  ? "bg-ink-fg text-ink"
                  : "text-ink-fg-muted hover:bg-ink-surface hover:text-ink-fg",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

interface TabPanelProps {
  id: string;
  idPrefix: string;
  className?: string;
  /** Inactive panels stay in the DOM (so aria-controls targets exist) but are hidden. */
  hidden?: boolean;
  children: ReactNode;
}

export function TabPanel({ id, idPrefix, className, hidden = false, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${id}`}
      aria-labelledby={`${idPrefix}-tab-${id}`}
      hidden={hidden}
      className={className}
    >
      {children}
    </div>
  );
}
