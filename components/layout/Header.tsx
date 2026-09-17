"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";

/** Sticky header: transparent at the top of the page, translucent + blurred once scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
          scrolled ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" aria-label={nav.homeLabel} className="rounded-md text-fg">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={nav.cta.href} size="sm" className="hidden sm:inline-flex" data-event="cta_click" data-event-cta="header">
              {nav.cta.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={nav.openMenu}
              className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={close} returnFocusTo={menuButtonRef} />
    </>
  );
}
