"use client";

import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { leadCapture, site } from "@/content/site";
import { HONEYPOT_FIELD, type LeadErrors } from "@/lib/lead/schema";
import { Button } from "@/components/ui/Button";
import type { SubmitStatus } from "./useLeadSubmit";

interface FormShellProps {
  id: string;
  status: SubmitStatus;
  errors: LeadErrors;
  onSubmit: (values: Record<string, string>) => void;
  onReset: () => void;
  submitLabel: string;
  submittingLabel: string;
  eventName: string;
  children: ReactNode;
}

/**
 * Shared chrome for both lead forms: honeypot, submit button, validation
 * summary, server error, and the inline success state (no page reload).
 */
export function FormShell({ id, status, errors, onSubmit, onReset, submitLabel, submittingLabel, eventName, children }: FormShellProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasErrors = Object.keys(errors).length > 0;

  // Move focus to the first invalid control after a failed submit.
  useEffect(() => {
    if (!hasErrors) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors, hasErrors]);

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success-bg p-6 text-fg">
        <CircleCheck aria-hidden="true" className="size-8 text-success" />
        <h3 className="mt-4 text-h3">{leadCapture.success.title}</h3>
        <p className="mt-2 text-fg-muted">
          {leadCapture.success.body}{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-fg underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={onReset}>
          {leadCapture.success.reset}
        </Button>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    data.forEach((value, key) => {
      values[key] = typeof value === "string" ? value : "";
    });
    onSubmit(values);
  };

  return (
    <form ref={formRef} id={id} onSubmit={handleSubmit} noValidate className="space-y-5">
      {children}

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>Website</label>
        <input id={`${id}-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status === "error" ? (
        <div role="alert" className="flex gap-3 rounded-xl border border-error/30 bg-error-bg p-4 text-sm text-fg">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-error" />
          <p>
            <span className="font-semibold">{leadCapture.error.title}</span> {leadCapture.error.body}{" "}
            <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      {hasErrors && status !== "error" ? (
        <p role="alert" className="text-sm text-error">
          {leadCapture.error.validation}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          data-event="cta_click"
          data-event-cta={eventName}
          leadingIcon={status === "submitting" ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
        >
          {status === "submitting" ? submittingLabel : submitLabel}
        </Button>
        <p className="text-xs text-fg-subtle">{leadCapture.privacyNote}</p>
      </div>
    </form>
  );
}
