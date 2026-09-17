import { cn } from "@/lib/utils";

type Tone = "default" | "ink" | "cta";

interface SectionHeadingProps {
  /** id for the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}

const eyebrowTone: Record<Tone, string> = {
  default: "text-primary",
  ink: "text-ink-primary",
  cta: "text-cta-fg-muted",
};

const titleTone: Record<Tone, string> = {
  default: "text-fg",
  ink: "text-ink-fg",
  cta: "text-cta-fg",
};

const leadTone: Record<Tone, string> = {
  default: "text-fg-muted",
  ink: "text-ink-fg-muted",
  cta: "text-cta-fg-muted",
};

export function SectionHeading({ id, eyebrow, title, lead, align = "left", tone = "default", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("text-eyebrow uppercase", eyebrowTone[tone])}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("mt-3 text-h2", titleTone[tone])}>
        {title}
      </h2>
      {lead ? <p className={cn("mt-5 text-lead", leadTone[tone])}>{lead}</p> : null}
    </div>
  );
}
