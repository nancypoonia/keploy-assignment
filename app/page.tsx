import Tutorial from "@/content/tutorial.mdx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrackNav, MobileTrackNav } from "@/components/TrackNav";
import { HeroConsole } from "@/components/HeroConsole";
import { ReadingProgress } from "@/components/ReadingProgress";
import { runFacts, site } from "@/lib/site";

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function Brand() {
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5 text-chrome-ink">
      <span className="flex h-7 items-center gap-1.5 rounded-md border border-chrome-line bg-chrome-chip px-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-rec shadow-[0_0_8px_var(--rec)]" />
        <svg width="8" height="9" viewBox="0 0 10 11">
          <path d="M0 0l10 5.5L0 11z" fill="var(--play)" />
        </svg>
      </span>
      <span className="font-display truncate text-[0.95rem] font-bold tracking-[-0.01em]">
        Keploy Go tutorial
      </span>
    </a>
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

      <header className="sticky top-0 z-40 border-b border-chrome-line bg-chrome">
        <div className="relative">
          <div className="mx-auto flex h-[var(--header-h)] max-w-[76rem] items-center justify-between gap-4 px-4 sm:px-6">
            <Brand />
            <div className="flex items-center gap-2">
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-chrome-line bg-chrome-chip px-3 text-sm text-chrome-ink transition-colors hover:bg-chrome-chip-hover"
              >
                <GitHubIcon />
                <span className="hidden sm:inline">Source</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
          <ReadingProgress />
        </div>
        <div className="border-t border-line bg-paper lg:hidden">
          <MobileTrackNav />
        </div>
      </header>

      {/* Hero: the console band */}
      <section id="top" className="relative overflow-hidden bg-hero text-chrome-body">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[76rem] gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:pb-20 lg:pt-20">
          <div className="flex flex-col justify-center">
            <p className="flex w-fit items-center gap-2 rounded-full border border-chrome-line bg-chrome-chip px-3 py-1 text-[0.8rem] text-chrome-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-play" aria-hidden="true" />
              Tested end to end on 3 October 2026
            </p>
            <h1 className="font-display mt-5 text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-chrome-ink sm:text-[3.4rem] lg:text-[3.9rem]">
              Record real traffic. Replay it as tests.
            </h1>
            <p className="mt-5 max-w-[36rem] text-[1.08rem] leading-relaxed text-chrome-body sm:text-[1.15rem]">
              A beginner&apos;s guide to Keploy&apos;s <strong className="text-chrome-ink">Go Mux + MySQL</strong> quickstart.
              You let Keploy watch a Go API handle a few real requests, turn that traffic into tests and mocks, and then
              replay those tests <strong className="text-chrome-ink">with the database switched off</strong>.
            </p>
            <p className="mt-3 max-w-[36rem] text-[0.95rem] leading-relaxed text-chrome-muted">
              Everything below comes from a run I actually did. The commands are the ones I typed, and the output blocks
              are copied from my terminal (trimmed where marked).
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#what-youll-build"
                className="inline-flex items-center gap-2 rounded-lg bg-rec px-4 py-2.5 text-sm font-bold text-white transition-[filter] hover:brightness-110"
              >
                <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
                Start the tutorial
              </a>
              <a
                href="#step-5-replay-the-tests-without-mysql"
                className="inline-flex items-center gap-2 rounded-lg border border-chrome-line bg-chrome-chip px-4 py-2.5 text-sm font-bold text-chrome-ink transition-colors hover:bg-chrome-chip-hover"
              >
                <svg width="9" height="10" viewBox="0 0 10 11" aria-hidden="true">
                  <path d="M0 0l10 5.5L0 11z" fill="var(--play)" />
                </svg>
                Skip to the replay
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <HeroConsole />
            <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-[0.8rem] sm:grid-cols-3">
              {runFacts.map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-chrome-muted">{k}</dt>
                  <dd className="truncate font-mono text-[0.78rem] text-chrome-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[76rem] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[15.5rem_minmax(0,1fr)] xl:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.75rem)] max-h-[calc(100vh-var(--header-h)-2.5rem)] overflow-y-auto pb-8 pt-12">
            <TrackNav />
          </div>
        </aside>

        <main id="content" className="min-w-0 pb-28 pt-4 sm:pt-6">
          <article className="doc max-w-[46rem]">
            <Tutorial />
          </article>
        </main>
      </div>

      <footer className="border-t border-chrome-line bg-chrome text-chrome-muted">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-4 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <Brand />
            <p className="mt-3 max-w-[60ch]">
              Written by {site.author} for the Keploy DevRel assignment. An independent tutorial, not official Keploy
              documentation. Built with Next.js and MDX.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-chrome-ink" href="https://keploy.io/docs/" target="_blank" rel="noopener noreferrer">
              Keploy docs
            </a>
            <a className="hover:text-chrome-ink" href="https://github.com/keploy/keploy" target="_blank" rel="noopener noreferrer">
              keploy/keploy
            </a>
            <a className="hover:text-chrome-ink" href={site.repoUrl} target="_blank" rel="noopener noreferrer">
              Source for this page
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
