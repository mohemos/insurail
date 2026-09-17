"use client";

import { leadCapture } from "@/content/site";
import { Field, fieldA11y } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { FormShell } from "./FormShell";
import { useLeadSubmit } from "./useLeadSubmit";

const ID = "developer";
const f = leadCapture.developer.fields;

/** Secondary conversion: developer early access. */
export function DeveloperForm() {
  const { status, errors, submit, reset } = useLeadSubmit("developer");

  return (
    <>
      <p className="mb-5 text-sm text-fg-muted">{leadCapture.developer.intro}</p>
      <FormShell
        id={ID}
        status={status}
        errors={errors}
        onSubmit={submit}
        onReset={reset}
        submitLabel={leadCapture.developer.submit}
        submittingLabel={leadCapture.developer.submitting}
        eventName="form_developer"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <Field id={`${ID}-name`} label={f.name.label} error={errors.name}>
            <Input name="name" placeholder={f.name.placeholder} autoComplete={f.name.autoComplete} required {...fieldA11y(`${ID}-name`, errors.name)} />
          </Field>
          <Field id={`${ID}-email`} label={f.email.label} error={errors.email}>
            <Input
              name="email"
              type="email"
              inputMode="email"
              placeholder={f.email.placeholder}
              autoComplete={f.email.autoComplete}
              required
              {...fieldA11y(`${ID}-email`, errors.email)}
            />
          </Field>
          <Field id={`${ID}-company`} label={f.company.label} error={errors.company} className="sm:col-span-2">
            <Input name="company" placeholder={f.company.placeholder} autoComplete={f.company.autoComplete} required {...fieldA11y(`${ID}-company`, errors.company)} />
          </Field>
        </div>
        <Field id={`${ID}-useCase`} label={f.useCase.label} error={errors.useCase}>
          <Textarea name="useCase" placeholder={f.useCase.placeholder} required {...fieldA11y(`${ID}-useCase`, errors.useCase)} />
        </Field>
      </FormShell>
    </>
  );
}
