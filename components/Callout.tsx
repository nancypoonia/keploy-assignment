import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning" | "note";

const styles: Record<CalloutType, { box: string; icon: string; label: string }> = {
  info: { box: "border-info/40 bg-info-soft", icon: "text-info", label: "Info" },
  tip: { box: "border-pass/40 bg-pass-soft", icon: "text-pass", label: "Tip" },
  warning: { box: "border-fail/40 bg-fail-soft", icon: "text-fail", label: "Warning" },
  note: { box: "border-accent/40 bg-accent-soft", icon: "text-accent", label: "Note" },
};

function Icon({ type }: { type: CalloutType }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (type) {
    case "tip":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
        </svg>
      );
    case "note":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
}

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <aside
      className={`callout not-prose rounded-xl border px-4 py-3.5 sm:px-5 ${s.box}`}
      role="note"
      aria-label={title ?? s.label}
    >
      <div className="flex gap-3">
        <span className={`mt-[0.2rem] shrink-0 ${s.icon}`}>
          <Icon type={type} />
        </span>
        <div className="min-w-0 flex-1 text-[0.97rem] leading-relaxed [&>*+*]:mt-3">
          {title ? <p className="font-semibold text-ink">{title}</p> : null}
          {children}
        </div>
      </div>
    </aside>
  );
}
