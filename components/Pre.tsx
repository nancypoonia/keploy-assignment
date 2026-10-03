"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

/** Code block with a copy-to-clipboard button. Replaces MDX's <pre>. */
export function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="copy-btn"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
