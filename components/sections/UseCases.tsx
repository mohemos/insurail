import { useCases } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PosPromptMock } from "@/components/illustrations/PosPromptMock";
import { UssdScreenMock } from "@/components/illustrations/UssdScreenMock";

export function UseCases() {
  return (
    <section id={useCases.id} aria-labelledby={`${useCases.id}-heading`} className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading id={`${useCases.id}-heading`} eyebrow={useCases.eyebrow} title={useCases.title} lead={useCases.lead} />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {useCases.items.map((item, index) => (
            <Reveal key={item.title} as="li" delay={(index % 3) * 0.08}>
              <Card interactive className="flex h-full flex-col">
                <IconTile name={item.icon} />
                <h3 className="mt-5 text-lg font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                <p className="mt-5 border-t border-border pt-4 text-sm">
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-subtle">{useCases.momentLabel}</span>
                  <span className="mt-1 block text-fg-muted">{item.moment}</span>
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 grid items-center gap-10 rounded-3xl border border-border bg-surface-2 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-12">
          <Reveal>
            <h3 className="text-h3 text-fg">{useCases.surfaces.title}</h3>
            <p className="mt-3 leading-relaxed text-fg-muted">{useCases.surfaces.body}</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-fg">{useCases.surfaces.pos.caption}</dt>
                <dd className="mt-1 text-fg-muted">{useCases.surfaces.pos.body}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fg">{useCases.surfaces.ussd.caption}</dt>
                <dd className="mt-1 text-fg-muted">{useCases.surfaces.ussd.body}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <PosPromptMock />
          </Reveal>
          <Reveal delay={0.2} className="flex justify-center">
            <UssdScreenMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
