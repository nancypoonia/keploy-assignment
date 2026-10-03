"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const COLLAPSED_PX = 248;

/**
 * Wraps a code fence that shows real terminal output from the verified run,
 * so readers can tell "what you type" apart from "what you should see".
 * Long output is folded behind a "Show full output" button.
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
  const body = useRef<HTMLDivElement>(null);
  const [tall, setTall] = useState(false);
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const measure = () => {
      setTall(el.scrollHeight > COLLAPSED_PX + 40);
      setLines(el.querySelectorAll("[data-line]").length);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const badge =
    result === "pass" ? (
      <span className="badge badge-pass">passed</span>
    ) : result === "fail" ? (
      <span className="badge badge-fail">failed</span>
    ) : result === "error" ? (
      <span className="badge badge-fail">error</span>
    ) : null;

  const collapsed = tall && !open;

  return (
    <div data-wrap={wrap ? "true" : "false"} className="output not-prose">
      <div className="output-bar">
        <span className="flex items-center gap-2">
          <span className="output-dot" aria-hidden="true" />
          {label}
        </span>
        {badge}
      </div>
      <div
        ref={body}
        className={collapsed ? "output-body is-collapsed" : "output-body"}
        style={collapsed ? { maxHeight: COLLAPSED_PX } : undefined}
      >
        {children}
      </div>
      {tall ? (
        <button type="button" className="output-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Show less" : `Show full output${lines ? ` (${lines} lines)` : ""}`}
        </button>
      ) : null}
    </div>
  );
}
