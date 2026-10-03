"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A condensed, animated replay of the real run documented on this page.
 * Every line is taken (shortened) from the actual Keploy 3.6.87 logs.
 */
type Line =
  | { t: "cmd"; text: string; term?: string }
  | { t: "log"; text: string }
  | { t: "app"; text: string }
  | { t: "cap"; text: string }
  | { t: "pass"; text: string }
  | { t: "sum"; text: string }
  | { t: "gap" };

type Phase = "record" | "replay";

const SCRIPT: { phase: Phase; line: Line; effect?: "mysqlOff" | "mysqlOn" }[] = [
  { phase: "record", line: { t: "cmd", text: 'sudo -E PATH=$PATH keploy record -c "./main"' } },
  { phase: "record", line: { t: "log", text: "Proxy started at port:16789" } },
  { phase: "record", line: { t: "log", text: "Keploy agent is ready to record test cases and mocks." } },
  { phase: "record", line: { t: "app", text: "*** DB Initiated at ***" } },
  { phase: "record", line: { t: "app", text: "Server is running on port:8080" } },
  { phase: "record", line: { t: "cmd", term: "2", text: "curl … /create, /links/1, /create, /all" } },
  { phase: "record", line: { t: "cap", text: "post-create-1" } },
  { phase: "record", line: { t: "cap", text: "get-links-by-id-1" } },
  { phase: "record", line: { t: "cap", text: "post-create-2" } },
  { phase: "record", line: { t: "cap", text: "get-all-1" } },
  { phase: "record", line: { t: "log", text: "Stopping Keploy recording..." } },
  { phase: "record", line: { t: "gap" } },
  { phase: "replay", line: { t: "cmd", text: "service mysql stop" }, effect: "mysqlOff" },
  { phase: "replay", line: { t: "cmd", text: 'sudo -E PATH=$PATH keploy test -c "./main" --delay 10' } },
  { phase: "replay", line: { t: "log", text: "recovered MySQL ports from recorded mocks" } },
  { phase: "replay", line: { t: "app", text: "*** DB Initiated at ***" } },
  { phase: "replay", line: { t: "pass", text: "post-create-1" } },
  { phase: "replay", line: { t: "pass", text: "get-links-by-id-1" } },
  { phase: "replay", line: { t: "pass", text: "post-create-2" } },
  { phase: "replay", line: { t: "pass", text: "get-all-1" } },
  { phase: "replay", line: { t: "sum", text: "Total tests: 4   passed: 4   failed: 0" } },
];

const REPLAY_START = SCRIPT.findIndex((s) => s.phase === "replay");

function delayFor(line: Line) {
  switch (line.t) {
    case "cmd":
      return 900;
    case "gap":
      return 700;
    case "cap":
    case "pass":
      return 380;
    default:
      return 420;
  }
}

function stateAt(count: number) {
  const shown = SCRIPT.slice(0, count);
  const mysqlOff = shown.some((s) => s.effect === "mysqlOff");
  return {
    captured: shown.filter((s) => s.line.t === "cap").length,
    passed: shown.filter((s) => s.line.t === "pass").length,
    mysqlOff,
    phase: (count > REPLAY_START ? "replay" : "record") as Phase,
  };
}

function Lamp({ on, color, label, value }: { on: boolean; color: "rec" | "play" | "off"; label: string; value: string }) {
  const dot =
    color === "rec" ? "bg-rec shadow-[0_0_10px_var(--rec)]" : color === "play" ? "bg-play shadow-[0_0_10px_var(--play)]" : "bg-console-muted/50";
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${on ? dot : "bg-white/15"}`} aria-hidden="true" />
      <div className="min-w-0 leading-tight">
        <p className="text-[0.68rem] text-console-muted">{label}</p>
        <p className="truncate font-mono text-[0.82rem] text-console-text">{value}</p>
      </div>
    </div>
  );
}

function Row({ line }: { line: Line }) {
  switch (line.t) {
    case "cmd":
      return (
        <p className="mt-2 first:mt-0">
          <span className="select-none text-play">{line.term ? `term ${line.term} $ ` : "$ "}</span>
          <span className="text-white">{line.text}</span>
        </p>
      );
    case "log":
      return <p className="text-console-muted">🐰 {line.text}</p>;
    case "app":
      return <p className="text-[#9fb4d4]">{line.text}</p>;
    case "cap":
      return (
        <p>
          <span className="text-rec">● captured </span>
          <span className="text-console-text">{line.text}</span>
        </p>
      );
    case "pass":
      return (
        <p>
          <span className="text-play">✓ passed </span>
          <span className="text-console-text">{line.text}</span>
        </p>
      );
    case "sum":
      return <p className="mt-1 font-semibold text-play">{line.text}</p>;
    default:
      return <p aria-hidden="true">&nbsp;</p>;
  }
}

export function HeroConsole() {
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);
  const screen = useRef<HTMLDivElement>(null);

  const stop = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const runFrom = useCallback(
    (start: number, end: number) => {
      stop();
      setCount(start);
      setPlaying(true);
      let i = start;
      const tick = () => {
        if (i >= end) {
          setPlaying(false);
          return;
        }
        const next = SCRIPT[i].line;
        i += 1;
        setCount(i);
        timer.current = window.setTimeout(tick, delayFor(next));
      };
      timer.current = window.setTimeout(tick, 350);
    },
    [stop],
  );

  // Autoplay once; with reduced motion, show the finished run straight away.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(() => setCount(SCRIPT.length), 0);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => runFrom(0, SCRIPT.length), 0);
    return () => {
      window.clearTimeout(t);
      stop();
    };
  }, [runFrom, stop]);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count]);

  const s = stateAt(count);
  const done = count >= SCRIPT.length;

  return (
    <div className="console relative overflow-hidden rounded-2xl border border-white/10 bg-console-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* status panel */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-white/10 px-4 py-3.5 sm:grid-cols-4">
        <Lamp
          on
          color={s.phase === "record" ? "rec" : "play"}
          label="Mode"
          value={s.phase === "record" ? "REC, recording" : "PLAY, replaying"}
        />
        <Lamp on={!s.mysqlOff} color="play" label="MySQL :3306" value={s.mysqlOff ? "stopped" : "running"} />
        <Lamp on={s.captured > 0} color="rec" label="Test cases" value={`${s.captured} / 4 recorded`} />
        <Lamp on={s.passed > 0} color="play" label="Replay" value={`${s.passed} / 4 passed`} />
      </div>

      {/* terminal */}
      <div
        ref={screen}
        className="h-[17.5rem] overflow-y-auto px-4 py-3.5 font-mono text-[0.8rem] leading-[1.7] sm:h-[19rem]"
        role="log"
        aria-label="Condensed replay of the real Keploy run"
        aria-live="off"
      >
        {SCRIPT.slice(0, count).map((s, i) => (
          <Row key={i} line={s.line} />
        ))}
        {!done ? <span className="caret inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-console-text/80" aria-hidden="true" /> : null}
      </div>

      {/* transport controls */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-3 py-2.5">
        <button
          type="button"
          onClick={() => runFrom(0, REPLAY_START)}
          className="transport inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[0.8rem] font-semibold text-console-text"
          aria-label="Play the record phase"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-rec" aria-hidden="true" /> Record
        </button>
        <button
          type="button"
          onClick={() => runFrom(REPLAY_START, SCRIPT.length)}
          className="transport inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[0.8rem] font-semibold text-console-text"
          aria-label="Play the replay phase"
        >
          <svg width="10" height="11" viewBox="0 0 10 11" aria-hidden="true">
            <path d="M0 0l10 5.5L0 11z" fill="var(--play)" />
          </svg>
          Replay
        </button>
        <button
          type="button"
          onClick={() => {
            if (playing) {
              stop();
              setPlaying(false);
              setCount(SCRIPT.length);
            } else {
              runFrom(0, SCRIPT.length);
            }
          }}
          className="transport inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[0.8rem] font-semibold text-console-text"
        >
          {playing ? "Skip to end" : "Play all again"}
        </button>
        <p className="ml-auto hidden text-[0.72rem] text-console-muted sm:block">Condensed from my real logs</p>
      </div>
    </div>
  );
}
