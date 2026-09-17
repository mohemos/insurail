"use client";

import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { HONEYPOT_FIELD, validateLead, type LeadErrors, type LeadType } from "@/lib/lead/schema";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Client-side validation + POST to /api/lead, shared by both forms. */
export function useLeadSubmit(type: LeadType) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});

  const submit = useCallback(
    async (values: Record<string, string>) => {
      const { [HONEYPOT_FIELD]: honeypot = "", ...fields } = values;
      const result = validateLead({ ...fields, type });
      if (!result.ok) {
        setErrors(result.errors);
        setStatus("idle");
        trackEvent("form_error", { form: type, kind: "validation" });
        return;
      }

      setErrors({});
      setStatus("submitting");
      trackEvent("form_submit", { form: type });

      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...result.lead, [HONEYPOT_FIELD]: honeypot }),
        });
        const data = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: LeadErrors };
        if (!response.ok || !data.ok) {
          if (data.errors) setErrors(data.errors);
          setStatus("error");
          trackEvent("form_error", { form: type, kind: "server", status: response.status });
          return;
        }
        setStatus("success");
        trackEvent("form_success", { form: type });
      } catch {
        setStatus("error");
        trackEvent("form_error", { form: type, kind: "network" });
      }
    },
    [type],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
  }, []);

  return { status, errors, submit, reset };
}
