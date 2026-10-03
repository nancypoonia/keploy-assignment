"use client";

import { useId, useState } from "react";

type Mode = "record" | "replay";

type Node = { title: string; sub: string; off?: boolean; keploy?: boolean };
type Link = { label: string };

const content: Record<
  Mode,
  { nodes: [Node, Node, Node]; links: [Link, Link]; caption: string }
> = {
  record: {
    nodes: [
      { title: "Your requests", sub: "curl → localhost:8080" },
      { title: "Go app", sub: "./main (mux + database/sql)" },
      { title: "MySQL", sub: "localhost:3306, running" },
    ],
    links: [{ label: "saved as tests/*.yaml" }, { label: "saved as mocks.yaml" }],
    caption:
      "keploy record starts your app and sits on both sides of it. Each incoming request and its response become a test case; each query the app sends to MySQL, with MySQL's reply, becomes a mock.",
  },
  replay: {
    nodes: [
      { title: "Keploy", sub: "re-sends tests/*.yaml", keploy: true },
      { title: "Go app", sub: "same ./main, no code changes" },
      { title: "mocks.yaml", sub: "MySQL is stopped", off: true, keploy: true },
    ],
    links: [{ label: "compared to the recording" }, { label: "answered from mocks" }],
    caption:
      "keploy test starts your app again and replays the recorded requests. The app's database calls are answered from mocks.yaml, so MySQL doesn't need to run. Any difference from the recorded response fails the test.",
  },
};

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-1 md:px-1 md:py-0">
      <span className="rounded-full border border-rec/50 bg-rec-soft px-2 py-0.5 text-center text-[0.7rem] font-medium leading-tight text-rec-ink">
        {label}
      </span>
      {/* horizontal on desktop, vertical on mobile */}
      <svg className="hidden md:block" width="56" height="12" viewBox="0 0 56 12" aria-hidden="true">
        <path d="M0 6h50M44 1l6 5-6 5" fill="none" stroke="var(--rec)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="md:hidden" width="12" height="28" viewBox="0 0 12 28" aria-hidden="true">
        <path d="M6 0v22M1 16l5 6 5-6" fill="none" stroke="var(--rec)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Box({ node, mode }: { node: Node; mode: Mode }) {
  return (
    <div
      className={[
        "rounded-lg border px-3 py-3 text-center transition-colors duration-300",
        node.keploy ? (mode === "record" ? "border-rec/60 bg-rec-soft" : "border-play/60 bg-play-soft") : "border-line bg-paper",
      ].join(" ")}
    >
      <p className={`font-semibold ${node.off ? "text-ink" : "text-ink"}`}>{node.title}</p>
      <p className="mt-0.5 text-[0.8rem] leading-snug text-muted">
        {node.off ? (
          <>
            <span className="line-through decoration-rec/70">MySQL</span> is stopped
          </>
        ) : (
          node.sub
        )}
      </p>
    </div>
  );
}

export function RecordReplayDiagram() {
  const [mode, setMode] = useState<Mode>("record");
  const id = useId();
  const c = content[mode];

  return (
    <figure className="not-prose mt-6 rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption className="text-sm font-semibold text-ink">How Keploy fits around your app</figcaption>
        <div role="tablist" aria-label="Keploy mode" className="inline-flex rounded-lg border border-line bg-paper p-0.5">
          {(["record", "replay"] as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              id={`${id}-${m}`}
              aria-selected={mode === m}
              aria-controls={`${id}-panel`}
              onClick={() => setMode(m)}
              className={[
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[0.8rem] transition-colors",
                mode === m ? (m === "record" ? "bg-rec text-white" : "bg-play text-white") : "text-muted hover:text-ink",
              ].join(" ")}
            >
              {m === "record" ? (
                <span className={`inline-block h-2 w-2 rounded-full ${mode === m ? "bg-white" : "bg-rec"}`} aria-hidden="true" />
              ) : (
                <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true">
                  <path d="M0 0l9 5-9 5z" fill="currentColor" />
                </svg>
              )}
              keploy {m === "record" ? "record" : "test"}
            </button>
          ))}
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${mode}`} className="mt-5">
        <div className="grid grid-cols-1 items-center md:grid-cols-[minmax(0,1fr)_6.75rem_minmax(0,1fr)_6.75rem_minmax(0,1fr)]">
          <Box node={c.nodes[0]} mode={mode} />
          <Arrow label={c.links[0].label} />
          <Box node={c.nodes[1]} mode={mode} />
          <Arrow label={c.links[1].label} />
          <Box node={c.nodes[2]} mode={mode} />
        </div>
        <p key={mode} className="diagram-caption mt-4 text-[0.94rem] leading-relaxed text-muted" aria-live="polite">
          {c.caption}
        </p>
      </div>
    </figure>
  );
}
