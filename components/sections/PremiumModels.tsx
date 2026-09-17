import { premiumModels, type PremiumSplit } from "@/content/site";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const splitLayout: Record<PremiumSplit, { business: string; customer: string; blended?: boolean; note: string }> = {
  business: { business: "w-full", customer: "w-0", note: "Business pays" },
  "customer-optional": { business: "w-0", customer: "w-full", note: "Customer opts in" },
  "customer-included": { business: "w-0", customer: "w-full", note: "Included in the price" },
  blended: { business: "w-1/2", customer: "w-1/2", blended: true, note: "Folded into pricing" },
};

/** Illustrative bar: who funds the premium. No numbers, just the shape of the model. */
function PremiumSplitBar({ split }: { split: PremiumSplit }) {
  const layout = splitLayout[split];
  return (
    <div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-subtle">{premiumModels.whoPaysLabel}</p>
      <div aria-hidden="true" className="mt-2 flex h-2 overflow-hidden rounded-full bg-border">
        {layout.blended ? (
          <span className="w-full bg-linear-to-r from-primary to-accent" />
        ) : (
          <>
            <span className={cn("bg-primary transition-all", layout.business)} />
            <span className={cn("bg-accent transition-all", layout.customer)} />
          </>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-fg-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          {premiumModels.legend.business}
        </span>
        <span className="font-medium text-fg">{layout.note}</span>
        <span className="flex items-center gap-1.5">
          {premiumModels.legend.customer}
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        </span>
      </div>
    </div>
  );
}

export function PremiumModels() {
  return (
    <section id={premiumModels.id} aria-labelledby={`${premiumModels.id}-heading`} className="bg-surface-2 py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id={`${premiumModels.id}-heading`}
            eyebrow={premiumModels.eyebrow}
            title={premiumModels.title}
            lead={premiumModels.lead}
            align="center"
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {premiumModels.models.map((model, index) => (
            <Reveal key={model.name} as="li" delay={index * 0.08}>
              <Card interactive className="flex h-full flex-col">
                <IconTile name={model.icon} />
                <h3 className="mt-5 text-lg font-semibold text-fg">{model.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{model.how}</p>
                <div className="mt-6">
                  <PremiumSplitBar split={model.split} />
                </div>
                <p className="mt-5 border-t border-border pt-4 text-sm">
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-subtle">{premiumModels.bestForLabel}</span>
                  <span className="mt-1 block text-fg">{model.bestFor}</span>
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lead text-fg">{premiumModels.closing}</p>
        </Reveal>
      </Container>
    </section>
  );
}
