"use client";

import { useSyncExternalStore } from "react";

/**
 * Which tutorial steps the reader has marked as done. Kept in localStorage so
 * progress survives a reload; every access is guarded because storage can be
 * unavailable (private windows, blocked site data). Without storage the
 * checkboxes still work for the current visit.
 */
const KEY = "keploy-go-tutorial:done";
const listeners = new Set<() => void>();
let memory: string[] = [];
let loaded = false;

function load(): string[] {
  if (!loaded) {
    loaded = true;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) memory = JSON.parse(raw);
    } catch {
      /* storage unavailable: keep in-memory state only */
    }
  }
  return memory;
}

function save(next: string[]) {
  memory = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function toggleDone(id: string) {
  const cur = load();
  save(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
}

export function resetDone() {
  save([]);
}

const EMPTY: string[] = [];

export function useDone(): string[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    load,
    () => EMPTY,
  );
}
