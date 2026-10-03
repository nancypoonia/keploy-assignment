type Item = { name: string; depth: number; note?: string };

export function FileTree({ items }: { items: Item[] }) {
  return (
    <ul
      className="not-prose mt-[1.1em] list-none overflow-x-auto rounded-[10px] border border-line bg-surface px-4 py-3 font-mono text-[0.84rem] leading-7"
      aria-label="Files created by keploy record"
    >
      {items.map((item) => {
        const isDir = item.name.endsWith("/");
        return (
          <li
            key={`${item.depth}-${item.name}`}
            className="!mt-0 flex max-w-none items-baseline gap-2 whitespace-nowrap"
            style={{ paddingLeft: `${item.depth * 1.25}rem` }}
          >
            <span aria-hidden="true" className={isDir ? "text-accent" : "text-muted"}>
              {isDir ? "▸" : "·"}
            </span>
            <span className={isDir ? "font-medium text-ink" : "text-ink"}>{item.name}</span>
            {item.note ? (
              <span className="font-sans text-[0.8rem] text-muted">{item.note}</span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
