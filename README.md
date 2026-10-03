<div align="center">

# 🔴 ▶️ Record & Replay Go API Tests with Keploy

**A beginner-friendly, tested tutorial for Keploy's Go Mux + MySQL quickstart, built as a single-page docs site with Next.js and MDX.**

[![Live site](https://img.shields.io/badge/Live_site-nancy--keploy--assignment.vercel.app-0a8f63?style=for-the-badge&logo=vercel&logoColor=white)](https://nancy-keploy-assignment.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-content-1B1F24?style=flat-square&logo=mdx&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Keploy](https://img.shields.io/badge/Keploy-3.6.87_%28open_source%29-d7263d?style=flat-square)
![Go](https://img.shields.io/badge/Go-1.24.7-00ADD8?style=flat-square&logo=go&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[**Read the tutorial**](https://nancy-keploy-assignment.vercel.app/) · [Keploy](https://github.com/keploy/keploy) · [Sample app](https://github.com/keploy/samples-go/tree/main/mux-mysql)

</div>

---

## ✨ What is this?

A documentation-style tutorial for developers who have **never used Keploy**. It walks through recording real API traffic from a Go app, turning it into tests and mocks, and replaying those tests **with the database switched off**.

Written by **Nancy Poonia** for the Keploy DevRel assignment. It is an independent tutorial, not official Keploy documentation.

> [!NOTE]
> **Every command and output on the page comes from a real run** (3 October 2026). Where my environment forced a deviation from the official quickstart, the tutorial says so right where it happens.

---

## 🎯 What the tutorial proves

| | Result from the real run |
| :-- | :-- |
| 🔴 **Record** | `keploy record` captured **4 test cases** and **7 MySQL mocks** from real `curl` traffic |
| ▶️ **Replay** | `keploy test` passed **4 / 4**, **with MySQL stopped** |
| 🧪 **Regression** | A deliberate change (`"Converted"` → `"Shortened"`) failed **2 tests** with a clear diff and exit code `1` |
| ✅ **Revert** | Back to **4 / 4** passing, exit code `0` |

<details>
<summary><b>📚 Tutorial outline</b></summary>

1. What you'll build: the Mux + MySQL URL shortener and its 3 endpoints
2. What is Keploy, and why a Go developer would care
3. Prerequisites
4. **Step 1:** Install Keploy (open-source build)
5. **Step 2:** Run the sample app and sanity-check it
6. **Step 3:** Record test cases with `keploy record`
7. **Step 4:** Read the generated YAML: test cases, MySQL mocks, noise
8. **Step 5:** Replay the tests without MySQL
9. **Step 6:** Catch a regression
10. What just happened? (based on Keploy's own logs)
11. Troubleshooting: problems I actually hit
12. Wrapping up and next steps

</details>

---

## 🖥️ Tested setup

| Tool | Version |
| :-- | :-- |
| Keploy | 3.6.87, open-source build (`install.sh --oss`) |
| Sample | [`keploy/samples-go`](https://github.com/keploy/samples-go) → `mux-mysql` @ `2b0a034` |
| Go | 1.24.7 |
| MySQL | 8.0.46 |
| OS | Ubuntu 24.04, Linux 6.18 |

---

## 🎨 Design and UX

The page is designed as a **record / replay deck**: 🔴 red means *recording*, 🟢 green means *replaying or passed*, and everything else stays neutral.

| Feature | What it does |
| :-- | :-- |
| 🎛️ **Interactive hero console** | Animated, condensed replay of the real run, with **Record / Replay** buttons and status lights for MySQL, recorded tests and passed tests |
| 📍 **Progress track** | Sticky sidebar whose line fills as you read; on mobile it becomes a bar under the header |
| ☑️ **"Mark step done"** | Ticks off each step and remembers your progress after a reload |
| 📏 **Reading progress bar** | Thin bar under the header |
| 🧾 **Folded terminal output** | Real output is labelled *passed / failed / error*, and long logs collapse behind "Show full output" |
| 📋 **Code blocks** | Syntax highlighting, titles, highlighted lines and a copy button |
| 🔀 **Record ↔ Replay diagram** | Toggle to see where Keploy sits in each mode |
| 🌗 **Light / dark theme** | Follows your system setting, with a manual toggle |
| ♿ **Accessibility** | Skip link, visible keyboard focus, reduced-motion support, readable fonts, no sideways scrolling down to 375 px |

---

## 🧱 Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router), exported as a fully **static** site (`output: "export"`)
- **[MDX](https://mdxjs.com/)** via [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx). The tutorial is [`content/tutorial.mdx`](content/tutorial.mdx), mixing Markdown with React components
- **[Tailwind CSS v4](https://tailwindcss.com/)** for layout and design tokens
- **[rehype-pretty-code](https://rehype-pretty.pages.dev/) + [Shiki](https://shiki.style/)** for build-time syntax highlighting
- **[next-themes](https://github.com/pacocoursey/next-themes)** for the theme toggle
- `remark-gfm` (tables) and `rehype-slug` (heading anchors)
- Fonts: **Archivo** (headings), **Atkinson Hyperlegible Next** (body, chosen for readability) and **JetBrains Mono** (code), self-hosted with Fontsource

### 🧩 Custom MDX components

| Component | Purpose |
| :-- | :-- |
| `<Steps>` / `<Step>` | Numbered, connected sub-steps |
| `<Callout type="info \| tip \| warning \| note">` | Info, tip, warning and "what I actually ran" boxes |
| `<Output label result wrap>` | Real terminal output, clearly separated from commands |
| `<StepDone id>` | Progress checkbox at the end of each step |
| `<FileTree />` | The files `keploy record` creates |
| `<RecordReplayDiagram />` | Record / replay mode diagram |

---

## 🚀 Run it locally

> Requires **Node.js 20.9+**

```bash
git clone https://github.com/nancypoonia/keploy-assignment.git
cd keploy-assignment
npm install
npm run dev        # → http://localhost:3000
```

Production build (static files are written to `out/`):

```bash
npm run build
npx serve out      # or any static file server
```

Lint:

```bash
npm run lint
```

---

## 📁 Project structure

```text
app/
  layout.tsx          # fonts, theme provider, metadata
  page.tsx            # header, hero console, progress track, article, footer
  globals.css         # design tokens (light/dark), article, code and callout styles
components/           # HeroConsole, TrackNav, StepDone, Output, Callout, Steps, ...
content/
  tutorial.mdx        # ← the tutorial itself
lib/
  site.ts             # site metadata, tested-environment facts, sections
  progress.ts         # "mark step done" state (localStorage with fallback)
mdx-components.tsx    # maps MDX elements (pre, h2, table, a) to components
next.config.mjs       # MDX + remark/rehype plugins, static export
```

---

## 🔍 Honest notes

> [!IMPORTANT]
> These are disclosed inside the tutorial as well.

- **Mux + MySQL, not a Postgres sample.** The open-source Keploy CLI supports **HTTP + MySQL**. PostgreSQL support is in the account-based build from keploy.io, which I couldn't reach from my environment.
- **MySQL 8.0.46 ran natively** instead of the documented `docker run … mysql:latest`, because Docker Hub was blocked where I ran it. Same port and credentials.
- **The installer came from GitHub** (`keploy/keploy/keploy.sh`, which is where `keploy.io/install.sh` redirects), run with `--oss`.
- **Not tested:** the account-based Keploy build, WSL, macOS and Windows.

---

## ☁️ Deployment

Deployed on **[Vercel](https://vercel.com/)**: **https://nancy-keploy-assignment.vercel.app/**

Because `next.config.mjs` sets `output: "export"`, Vercel runs `next build` and serves the generated static files. Every push to `main` redeploys automatically.

---

<div align="center">

Made with 🔴 and ▶️ by **Nancy Poonia**

</div>
