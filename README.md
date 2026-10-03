# Record & replay Go API tests with Keploy

A single-page documentation site with a beginner-friendly tutorial for [Keploy](https://github.com/keploy/keploy). It walks through Keploy's **Go Mux + MySQL** quickstart: record real API traffic from a Go app, then replay it as tests with the database switched off.

Written by Nancy Poonia for the Keploy DevRel candidate assignment. It is an independent tutorial, not official Keploy documentation.

## What the tutorial covers

1. What Keploy is, and why a Go developer would use it
2. Installing the open-source Keploy CLI
3. Running the `samples-go/mux-mysql` URL shortener against MySQL
4. Recording 4 test cases and 7 MySQL mocks with `keploy record`
5. Reading the generated YAML (test cases, mocks, noise, reports)
6. Replaying the tests with `keploy test` **while MySQL is stopped** (4/4 passed)
7. Catching a deliberate regression (2 failed, with a diff and exit code 1)
8. How record and replay work, based on Keploy's own logs
9. Troubleshooting problems I actually hit

Every command and output on the page comes from a real run on 3 October 2026:

| | |
| --- | --- |
| Keploy | 3.6.87, open-source build (installed with `install.sh --oss`) |
| Sample | [`keploy/samples-go`](https://github.com/keploy/samples-go) `mux-mysql` @ `2b0a034` |
| Go | 1.24.7 |
| MySQL | 8.0.46 |
| OS | Ubuntu 24.04, Linux 6.18 |

Where my environment forced a deviation from the official quickstart (no Docker Hub access, so MySQL ran natively; `keploy.io` blocked, so the installer came from its GitHub source), the tutorial says so on the page.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router), exported as a fully static site (`output: "export"`)
- [MDX](https://mdxjs.com/) through [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx). The tutorial is `content/tutorial.mdx` and mixes Markdown with React components.
- [Tailwind CSS v4](https://tailwindcss.com/) for layout and design tokens
- [rehype-pretty-code](https://rehype-pretty.pages.dev/) + [Shiki](https://shiki.style/) for build-time syntax highlighting, with separate light and dark themes
- [next-themes](https://github.com/pacocoursey/next-themes) for the light/dark toggle
- `remark-gfm` (tables) and `rehype-slug` (heading anchors)
- IBM Plex Sans and IBM Plex Mono, self-hosted with Fontsource

## MDX components

Custom components used inside the tutorial:

| Component | Purpose |
| --- | --- |
| `<RecordReplayDiagram />` | Interactive diagram that toggles between `keploy record` and `keploy test` to show where Keploy sits |
| `<Steps>` / `<Step>` | Numbered, connected step lists |
| `<Callout type="info \| tip \| warning \| note">` | Info, tip, warning and "what I actually ran" boxes |
| `<Output label result>` | Marks real terminal output (with a passed/failed/error badge) so it can't be confused with commands |
| `<FileTree />` | The files `keploy record` creates |
| `<RunFacts />` | The exact environment the tutorial was verified in |

Code blocks get a title bar, line highlighting and a copy button (`components/Pre.tsx`). The page also has a sticky table of contents with scroll-spy, a collapsible table of contents on mobile, and heading anchor links.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build (static files land in `out/`):

```bash
npm run build
npx serve out    # or any static file server
```

Lint:

```bash
npm run lint
```

## Project structure

```text
app/
  layout.tsx          # fonts, theme provider, metadata
  page.tsx            # header, sidebar TOC, article, run-facts rail, footer
  globals.css         # design tokens (light/dark), article and code styles
components/           # MDX and UI components listed above
content/
  tutorial.mdx        # the tutorial itself
lib/
  site.ts             # site metadata, tested-environment facts, TOC entries
mdx-components.tsx    # maps MDX elements (pre, h2, table, a, ...) to components
next.config.mjs       # MDX + remark/rehype plugins, static export
```

## Deployment

The site is deployed on [Vercel](https://vercel.com/). Because `next.config.mjs` sets `output: "export"`, Vercel builds it with `next build` and serves the generated static files.
