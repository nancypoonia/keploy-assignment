"use client";

import { useEffect, useState } from "react";
import { sections, stepIds } from "@/lib/site";
import { useDone, resetDone } from "@/lib/progress";

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const offset = window.innerWidth < 1024 ? 130 : 110;
      let current = els[0]?.id ?? sections[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = els[els.length - 1]?.id ?? current;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

function Marker({ step, done, active, passed }: { step?: number; done: boolean; active: boolean; passed: boolean }) {
  if (step) {
    return (
      <span
        className={[
          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[0.7rem] font-semibold transition-colors",
          done
            ? "border-play bg-play text-white"
            : active
              ? "border-rec bg-rec text-white"
              : passed
                ? "border-ink/30 bg-surface text-ink"
                : "border-line bg-surface text-muted",
        ].join(" ")}
        aria-hidden="true"
      >
        {done ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          step
        )}
      </span>
    );
  }
  return (
    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
      <span className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? "bg-rec" : passed ? "bg-ink/40" : "bg-line"}`} />
    </span>
  );
}

function TrackList({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  const done = useDone();
  const activeIdx = sections.findIndex((s) => s.id === active);
  // Height of the "played" part of the track, in rows.
  const fill = activeIdx <= 0 ? 0 : activeIdx / (sections.length - 1);

  return (
    <div className="relative">
      {/* tape track: grey rail with a red fill up to the current section */}
      <span className="absolute bottom-3 left-[11px] top-3 w-[2px] rounded bg-line" aria-hidden="true" />
      <span
        className="absolute left-[11px] top-3 w-[2px] rounded bg-rec transition-[height] duration-300"
        style={{ height: `calc((100% - 1.5rem) * ${fill})` }}
        aria-hidden="true"
      />
      <ul className="relative space-y-0.5">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          const isDone = done.includes(s.id);
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={onNavigate}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "group flex items-center gap-3 rounded-lg py-1.5 pr-2 text-[0.92rem] leading-snug transition-colors",
                  isActive ? "font-semibold text-ink" : "text-muted hover:text-ink",
                ].join(" ")}
              >
                <Marker step={s.step} done={isDone} active={isActive} passed={i < activeIdx} />
                <span>
                  {s.title}
                  {isDone ? <span className="sr-only"> (marked done)</span> : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepCount() {
  const done = useDone();
  const n = stepIds.filter((id) => done.includes(id)).length;
  return (
    <div className="mt-6 rounded-xl border border-line bg-surface p-3.5">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-ink">Your progress</p>
        <p className="font-mono text-xs text-muted">
          {n}/{stepIds.length} steps
        </p>
      </div>
      <div className="mt-2.5 flex gap-1" aria-hidden="true">
        {stepIds.map((id) => (
          <span key={id} className={`h-1.5 flex-1 rounded-full ${done.includes(id) ? "bg-play" : "bg-line"}`} />
        ))}
      </div>
      <p className="mt-2.5 text-[0.8rem] leading-snug text-muted">
        {n === stepIds.length
          ? "All six steps done. Nice work."
          : "Tick “Mark step done” at the end of each step as you follow along."}
      </p>
      {n > 0 ? (
        <button type="button" onClick={resetDone} className="mt-2 text-[0.8rem] text-muted underline underline-offset-2 hover:text-ink">
          Reset progress
        </button>
      ) : null}
    </div>
  );
}

export function TrackNav() {
  const active = useActiveSection();
  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-[0.78rem] font-semibold text-muted">On this page</p>
      <TrackList active={active} />
      <StepCount />
    </nav>
  );
}

export function MobileTrackNav() {
  const active = useActiveSection();
  const done = useDone();
  const [open, setOpen] = useState(false);
  const cur = sections.find((s) => s.id === active);
  const n = stepIds.filter((id) => done.includes(id)).length;

  return (
    <nav aria-label="On this page" className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-track"
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-rec" aria-hidden="true" />
          <span className="truncate font-medium text-ink">
            {cur?.step ? `Step ${cur.step}: ` : ""}
            {cur?.title}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-muted">
          <span className="font-mono text-xs">
            {n}/{stepIds.length} done
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open ? (
        <div
          id="mobile-track"
          className="absolute inset-x-0 top-full max-h-[65vh] overflow-y-auto border-y border-line bg-paper px-4 py-4 shadow-[0_18px_30px_-18px_rgba(10,15,25,0.35)] sm:px-6"
        >
          <TrackList active={active} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </nav>
  );
}
