import { designedFor } from "@/content/site";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function DesignedFor() {
  return (
    <section aria-label={designedFor.label} className="border-y border-border bg-surface/60">
      <Container className="flex flex-col items-center gap-4 py-6 md:flex-row md:justify-center md:gap-6">
        <p className="text-eyebrow uppercase text-fg-subtle">{designedFor.label}</p>
        <ul className="flex flex-wrap justify-center gap-2">
          {designedFor.categories.map((category) => (
            <li key={category.label}>
              <Chip>
                <Icon name={category.icon} className="size-3.5 text-primary" />
                {category.label}
              </Chip>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
