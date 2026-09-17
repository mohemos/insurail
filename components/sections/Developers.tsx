import { ArrowUpRight } from "lucide-react";
import { developers } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeveloperCodeTabsLazy as DeveloperCodeTabs } from "./DeveloperCodeTabs.lazy";

export function Developers() {
  return (
    <section id={developers.id} aria-labelledby={`${developers.id}-heading`} className="bg-ink py-20 text-ink-fg md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                id={`${developers.id}-heading`}
                eyebrow={developers.eyebrow}
                title={developers.title}
                lead={developers.lead}
                tone="ink"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {developers.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3 text-sm text-ink-fg-muted">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ink-surface text-ink-primary">
                      <Icon name={feature.icon} className="size-4" strokeWidth={1.75} />
                    </span>
                    {feature.label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={developers.primaryCta.href} data-event="cta_click" data-event-cta="developers_primary">
                  {developers.primaryCta.label}
                </Button>
                <Button
                  href={developers.secondaryCta.href}
                  external={developers.secondaryCta.external}
                  variant="outline-inverse"
                  data-event="cta_click"
                  data-event-cta="developers_docs"
                  trailingIcon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                >
                  {developers.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
            <DeveloperCodeTabs />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
