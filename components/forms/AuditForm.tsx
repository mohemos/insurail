"use client";

import { leadCapture } from "@/content/site";
import { BUSINESS_TYPES, VOLUME_RANGES } from "@/lib/lead/schema";
import { Field, fieldA11y } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import { Textarea } from "@/components/ui/form/Textarea";
import { FormShell } from "./FormShell";
import { useLeadSubmit } from "./useLeadSubmit";

const ID = "audit";
const f = leadCapture.audit.fields;

const businessTypeOptions = BUSINESS_TYPES.map((value) => ({ value, label: leadCapture.businessTypeLabels[value] }));
const volumeOptions = VOLUME_RANGES.map((value) => ({ value, label: leadCapture.volumeLabels[value] }));

/** Primary conversion: request a risk audit. */
export function AuditForm() {
  const { status, errors, submit, reset } = useLeadSubmit("audit");

  return (
    <FormShell
      id={ID}
      status={status}
      errors={errors}
      onSubmit={submit}
      onReset={reset}
      submitLabel={leadCapture.audit.submit}
      submittingLabel={leadCapture.audit.submitting}
      eventName="form_audit"
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
        <Field id={`${ID}-company`} label={f.company.label} error={errors.company}>
          <Input name="company" placeholder={f.company.placeholder} autoComplete={f.company.autoComplete} required {...fieldA11y(`${ID}-company`, errors.company)} />
        </Field>
        <Field id={`${ID}-role`} label={f.role.label} error={errors.role}>
          <Input name="role" placeholder={f.role.placeholder} autoComplete={f.role.autoComplete} required {...fieldA11y(`${ID}-role`, errors.role)} />
        </Field>
        <Field id={`${ID}-businessType`} label={f.businessType.label} error={errors.businessType}>
          <Select
            name="businessType"
            options={businessTypeOptions}
            placeholder={f.businessType.placeholder}
            defaultValue=""
            required
            {...fieldA11y(`${ID}-businessType`, errors.businessType)}
          />
        </Field>
        <Field id={`${ID}-volume`} label={f.volume.label} error={errors.volume}>
          <Select name="volume" options={volumeOptions} placeholder={f.volume.placeholder} defaultValue="" required {...fieldA11y(`${ID}-volume`, errors.volume)} />
        </Field>
      </div>
      <Field id={`${ID}-goal`} label={f.goal.label} error={errors.goal} optionalLabel={f.goal.optionalLabel}>
        <Textarea name="goal" placeholder={f.goal.placeholder} {...fieldA11y(`${ID}-goal`, errors.goal)} />
      </Field>
    </FormShell>
  );
}
