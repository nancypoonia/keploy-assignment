import { runFacts } from "@/lib/site";

/** The exact environment the tutorial was verified in. */
export function RunFacts({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Tested setup"
      className={`not-prose rounded-xl border border-line bg-surface p-4 text-sm ${className}`}
    >
      <p className="flex items-center gap-2 font-semibold text-ink">
        <span className="inline-block h-2 w-2 rounded-full bg-pass" aria-hidden="true" />
        Tested setup
      </p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
        {runFacts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
