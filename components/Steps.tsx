import type { ReactNode } from "react";

/**
 * A numbered sequence of steps. Numbering uses a CSS counter so the
 * MDX stays clean: authors only write <Step title="...">.
 */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="steps not-prose">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="step">
      <p className="step-title">{title}</p>
      <div className="step-body">{children}</div>
    </li>
  );
}
