"use client";

import { sections } from "@/lib/site";
import { toggleDone, useDone } from "@/lib/progress";

/** "Mark step done" control placed at the end of each numbered step. */
export function StepDone({ id }: { id: string }) {
  const done = useDone().includes(id);
  const section = sections.find((s) => s.id === id);
  const next = section ? sections[sections.indexOf(section) + 1] : undefined;

  return (
    <div className="stepdone not-prose flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <button
        type="button"
        onClick={() => toggleDone(id)}
        aria-pressed={done}
        className={[
          "inline-flex items-center gap-2.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
          done ? "border-play bg-play text-white" : "border-line bg-paper text-ink hover:border-ink/40",
        ].join(" ")}
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border ${done ? "border-white bg-white text-play" : "border-muted"}`}
          aria-hidden="true"
        >
          {done ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          ) : null}
        </span>
        {done ? `Step ${section?.step} done` : `Mark step ${section?.step} done`}
      </button>
      {next ? (
        <a href={`#${next.id}`} className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
          Next: {next.step ? `Step ${next.step}, ` : ""}
          {next.title}
        </a>
      ) : null}
    </div>
  );
}
