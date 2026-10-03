"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/site";

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      // The active section is the last heading that has scrolled past the header.
      const offset = window.innerWidth < 1024 ? 130 : 100;
      let current = els[0]?.id ?? sections[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el.id;
      }
      // At the very bottom, highlight the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = els[els.length - 1]?.id ?? current;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function TocList({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-0.5 border-l border-line">
      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={[
                "-ml-px block border-l-2 py-1 pl-3 text-[0.9rem] leading-snug transition-colors",
                isActive
                  ? "border-accent font-medium text-ink"
                  : "border-transparent text-muted hover:border-line hover:text-ink",
              ].join(" ")}
            >
              {s.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Sticky sidebar version (large screens). */
export function Toc() {
  const active = useActiveSection();
  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-sm font-semibold text-ink">On this page</p>
      <TocList active={active} />
    </nav>
  );
}

/** Collapsible version for small screens, shown under the header. */
export function MobileToc() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === active)?.title ?? "On this page";

  return (
    <nav aria-label="On this page" className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-toc"
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm sm:px-6"
      >
        <span className="truncate">
          <span className="text-muted">On this page: </span>
          <span className="font-medium text-ink">{current}</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div id="mobile-toc" className="absolute inset-x-0 top-full max-h-[60vh] overflow-y-auto border-t border-line bg-canvas px-4 py-3 shadow-[0_12px_24px_-12px_rgba(16,20,27,0.25)] sm:px-6">
          <TocList active={active} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </nav>
  );
}
