"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen navigation for small screens: modal, focus-trapped, closes on Escape. */
export function MobileMenu({ open, onClose, returnFocusTo }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // `onClose` is memoised by the Header, so this effect only re-runs when `open` changes.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close automatically if the viewport grows into the desktop layout.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (desktop.matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    const returnTarget = returnFocusTo.current;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      root.style.overflow = previousOverflow;
      returnTarget?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={nav.menuTitle}
      className="fixed inset-0 z-50 flex flex-col bg-bg animate-fade-in lg:hidden"
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label={nav.homeLabel} onClick={onClose} className="rounded-md text-fg">
          <Wordmark />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={nav.closeMenu}
          className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6 sm:px-8">
        <ul className="space-y-1">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className="block rounded-xl px-3 py-3 font-display text-2xl font-semibold tracking-tight text-fg transition-colors hover:bg-surface-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 px-3">
          <Button href={nav.cta.href} size="lg" className="w-full" onClick={onClose} data-event="cta_click" data-event-cta="mobile_menu">
            {nav.cta.label}
          </Button>
        </div>
      </nav>

      <p className="px-8 pb-8 text-sm text-fg-subtle">
        <a href={`mailto:${site.email}`} className="hover:text-fg">
          {site.email}
        </a>{" "}
        · {site.location}
      </p>
    </div>
  );
}
