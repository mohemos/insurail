import { ArrowRight } from "lucide-react";
import { compliance } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Compliance() {
  return (
    <section id={compliance.id} aria-labelledby={`${compliance.id}-heading`} className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id={`${compliance.id}-heading`}
            eyebrow={compliance.eyebrow}
            title={compliance.title}
            lead={compliance.lead}
            align="center"
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {compliance.tiles.map((tile, index) => (
            <Reveal key={tile.title} as="li" delay={index * 0.08}>
              <Card className="h-full">
                <IconTile name={tile.icon} />
                <h3 className="mt-5 text-base font-semibold text-fg">{tile.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{tile.body}</p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong/40 px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="flex-1 text-sm leading-relaxed text-fg-muted">{compliance.partners.text}</p>
            <Button
              href={compliance.partners.cta.href}
              variant="outline"
              size="sm"
              data-event="cta_click"
              data-event-cta="partner"
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              {compliance.partners.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
