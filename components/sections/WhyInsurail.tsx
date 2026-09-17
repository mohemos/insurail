import { whyInsurail } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyInsurail() {
  return (
    <section id={whyInsurail.id} aria-labelledby={`${whyInsurail.id}-heading`} className="border-t border-border py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading id={`${whyInsurail.id}-heading`} eyebrow={whyInsurail.eyebrow} title={whyInsurail.title} align="center" />
        </Reveal>
        <ul className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {whyInsurail.points.map((point, index) => (
            <Reveal key={point.title} as="li" delay={index * 0.08} className="border-t-2 border-primary pt-6">
              <IconTile name={point.icon} />
              <h3 className="mt-5 text-h3 text-fg">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
