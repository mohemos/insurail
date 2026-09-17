import { problem } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Problem() {
  return (
    <section id={problem.id} aria-labelledby={`${problem.id}-heading`} className="bg-surface-2 py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id={`${problem.id}-heading`} eyebrow={problem.eyebrow} title={problem.title} lead={problem.intro} />
        </Reveal>
        <ol className="space-y-8 lg:col-span-7 lg:pt-2">
          {problem.points.map((point, index) => (
            <Reveal key={point.title} as="li" delay={index * 0.08} className="flex gap-5">
              <span aria-hidden="true" className="mt-1 font-mono text-sm tabular-nums text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 text-fg">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
