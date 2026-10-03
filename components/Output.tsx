import type { ReactNode } from "react";

/**
 * Wraps a code fence that shows real terminal output from the verified run,
 * so readers can tell "what you type" apart from "what you should see".
 */
export function Output({
  label = "Output",
  result,
  wrap = true,
  children,
}: {
  label?: string;
  result?: "pass" | "fail" | "error";
  /** Wrap long log lines. Turn off for wide ASCII tables. */
  wrap?: boolean;
  children: ReactNode;
}) {
  const badge =
    result === "pass" ? (
      <span className="rounded-full bg-pass-soft px-2 py-0.5 text-[0.72rem] font-medium text-pass">
        passed
      </span>
    ) : result === "fail" || result === "error" ? (
      <span className="rounded-full bg-fail-soft px-2 py-0.5 text-[0.72rem] font-medium text-fail">
        {result === "fail" ? "failed" : "error"}
      </span>
    ) : null;

  return (
    <div data-wrap={wrap ? "true" : "false"} className="output not-prose mt-[1.1em] overflow-hidden rounded-[10px] border border-dashed border-line bg-canvas">
      <div className="flex items-center gap-3 border-b border-dashed border-line py-2 pl-[0.95rem] pr-20">
        <span className="flex items-center gap-2 text-[0.78rem] text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m4 17 6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {label}
        </span>
        {badge}
      </div>
      {children}
    </div>
  );
}
