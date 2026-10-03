import Tutorial from "@/content/tutorial.mdx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toc, MobileToc } from "@/components/Toc";
import { RunFacts } from "@/components/RunFacts";
import { site } from "@/lib/site";

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/75">
        <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 font-semibold text-ink">
            <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center" aria-hidden="true">
              <span className="absolute h-3 w-3 rounded-full bg-accent/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="truncate text-[0.95rem]">
              Keploy + Go <span className="font-normal text-muted">tutorial</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            {site.repoUrl ? (
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:text-ink"
              >
                <GitHubIcon />
                <span className="hidden sm:inline">Source</span>
              </a>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
        <div className="border-t border-line lg:hidden">
          <MobileToc />
        </div>
      </header>

      <div
        id="top"
        className="mx-auto grid max-w-[88rem] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[13.5rem_minmax(0,1fr)] xl:grid-cols-[13.5rem_minmax(0,1fr)_15rem]"
      >
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] max-h-[calc(100vh-var(--header-h)-3rem)] overflow-y-auto pb-8 pt-10">
            <Toc />
          </div>
        </aside>

        <main id="content" className="min-w-0 pb-24 pt-8 sm:pt-12">
          <article className="doc mx-auto max-w-[46rem]">
            <Tutorial />
          </article>
        </main>

        <aside className="hidden xl:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] pt-10">
            <RunFacts />
            <p className="mt-4 px-1 text-[0.8rem] leading-relaxed text-muted">
              Every command and output on this page comes from this run.
            </p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-[60ch]">
            Written by {site.author} for the Keploy DevRel assignment. An independent tutorial, not official Keploy documentation.
            Built with Next.js and MDX.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-ink" href="https://keploy.io/docs/" target="_blank" rel="noopener noreferrer">
              Keploy docs
            </a>
            <a className="hover:text-ink" href="https://github.com/keploy/keploy" target="_blank" rel="noopener noreferrer">
              keploy/keploy
            </a>
            {site.repoUrl ? (
              <a className="hover:text-ink" href={site.repoUrl} target="_blank" rel="noopener noreferrer">
                Source for this page
              </a>
            ) : null}
          </nav>
        </div>
      </footer>
    </>
  );
}
