import { howItWorks } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section id={howItWorks.id} aria-labelledby={`${howItWorks.id}-heading`} className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id={`${howItWorks.id}-heading`}
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            lead={howItWorks.lead}
            align="center"
          />
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          <div aria-hidden="true" className="absolute inset-x-8 top-[3.3rem] hidden border-t border-dashed border-border-strong/40 lg:block" />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((step, index) => (
              <Reveal key={step.title} as="li" delay={index * 0.08} className="relative">
                <Card className="h-full">
                  <div className="flex items-center justify-between">
                    <IconTile name={step.icon} />
                    <span aria-hidden="true" className="font-mono text-xs tabular-nums text-fg-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
