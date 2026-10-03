<!--
  🌙 Dark theme — renders these docs in the portfolio's dark palette.
  Honoured by VS Code preview, Typora, Obsidian, mdBook, VitePress, Docusaurus
  and most dev markdown viewers. GitHub strips style tags, so it falls back to
  the site theme there — content is unaffected either way.
-->
<style>
:root { color-scheme: dark; }

body {
  background: #090a0f !important;
  color: #c3c9d8 !important;
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  line-height: 1.75 !important;
  max-width: 1000px !important;
  margin: 0 auto !important;
  padding: 2.5rem 1.5rem 6rem !important;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  color: #f7f8fb !important;
  font-family: "Space Grotesk", "DM Sans", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -.02em !important;
  padding-bottom: .4em !important;
  margin-top: 2em !important;
  border-bottom: 1px solid rgba(255, 255, 255, .09) !important;
}
h1 { font-size: 2.05em !important; color: #9c87ff !important; border-bottom-color: rgba(156, 135, 255, .32) !important; }
h2 { font-size: 1.5em !important; }
h3 { font-size: 1.18em !important; color: #b9c0d0 !important; }
h4, h5, h6 { font-size: 1em !important; color: #98a2b7 !important; }

p, li, td { color: #c3c9d8 !important; }
strong { color: #f7f8fb !important; }
em { color: #b9a6ff !important; }

a { color: #22d3ee !important; text-decoration: none !important; border-bottom: 1px solid rgba(34, 211, 238, .35) !important; }
a:hover { color: #9c87ff !important; border-bottom-color: #9c87ff !important; }

hr { border: 0 !important; border-top: 1px solid rgba(255, 255, 255, .09) !important; margin: 2.6em 0 !important; }

blockquote {
  background: rgba(156, 135, 255, .08) !important;
  border-left: 3px solid #9c87ff !important;
  color: #b9c0d0 !important;
  padding: .9em 1.2em !important;
  margin: 1.6em 0 !important;
  border-radius: 0 8px 8px 0 !important;
}

code {
  background: rgba(156, 135, 255, .14) !important;
  color: #c4b5fd !important;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace !important;
  font-size: .88em !important;
  padding: .18em .45em !important;
  border-radius: 5px !important;
  border: 1px solid rgba(156, 135, 255, .18) !important;
}

pre {
  background: #0d1018 !important;
  border: 1px solid rgba(255, 255, 255, .1) !important;
  border-radius: 12px !important;
  padding: 1.1em 1.3em !important;
  overflow-x: auto !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .45) !important;
}
pre code {
  background: none !important; border: 0 !important; padding: 0 !important;
  color: #d6deeb !important; font-size: .86em !important; line-height: 1.65 !important;
}

table {
  border-collapse: collapse !important;
  width: 100% !important;
  margin: 1.7em 0 !important;
  font-size: .92em !important;
  display: block !important;
  overflow-x: auto !important;
}
th {
  background: #171b27 !important;
  color: #9c87ff !important;
  font-family: "JetBrains Mono", ui-monospace, monospace !important;
  font-size: .8em !important;
  letter-spacing: .06em !important;
  text-transform: uppercase !important;
  text-align: left !important;
  padding: .8em 1em !important;
  border: 1px solid rgba(255, 255, 255, .1) !important;
  white-space: nowrap !important;
}
td { padding: .7em 1em !important; border: 1px solid rgba(255, 255, 255, .08) !important; vertical-align: top !important; }
tr:nth-child(even) td { background: rgba(255, 255, 255, .02) !important; }
tr:hover td { background: rgba(156, 135, 255, .06) !important; }

ul, ol { padding-left: 1.5em !important; }
li { margin: .35em 0 !important; }
li::marker { color: #9c87ff !important; }

input[type="checkbox"] {
  accent-color: #9c87ff !important;
  margin-right: .55em !important;
  vertical-align: middle !important;
  width: 1em !important; height: 1em !important;
}
li:has(> input[type="checkbox"]:checked) {
  color: #657087 !important;
  text-decoration: line-through;
  text-decoration-color: rgba(101, 112, 135, .55) !important;
}

img { border-radius: 10px !important; max-width: 100% !important; box-shadow: 0 10px 34px rgba(0, 0, 0, .5) !important; }

::selection { background: rgba(156, 135, 255, .35) !important; color: #fff !important; }
</style>
> **Project:** `ashutosh.dev` Portfolio
> **Last updated:** 10 Oct 2026
> **Purpose:** Every performance, size and correctness optimisation — with the number before and after
> **Baseline commit for v2.2:** `e7a934a`

> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md) · [Optimization History](OPTIMIZATION_HISTORY.md) · [History](HISTORY.md) · **Optimization History** · [History](HISTORY.md)

---

## 📌 Scope

[History](HISTORY.md) records *what changed and why*. This file records only
**optimisations**, and only where a number moved. An entry without a
measurable before/after does not belong here.

| Metric | v2.1 baseline | **Current** | Δ | Icon |
|---|---|---|---|---|
| Main bundle (raw) | `389 kB` | `389.61 kB` | +0.61 kB | �� |
| Main bundle (gzip) | `125 kB` | `125.32 kB` | +0.32 kB | 🗜️ |
| CSS bundle (raw) | `91.7 kB` | `93.07 kB` | +1.37 kB | 🎨 |
| CSS bundle (gzip) | `17.9 kB` | `18.08 kB` | +0.18 kB | 🎨 |
| Lint errors | `0` | `0` | — | ✅ |
| Lint warnings | `30` | `28` | **−2** | ⚠️ |
| Routes live | `6` | `7` | **+1** | 🧭 |
| Scroll owners | `1` | `1` | — | 📜 |
| Build time | `735ms` | `740ms` | +5ms | ��️ |

> ✅ **The main bundle did not regress.** v2.2 added a 7th route, 27 episode
> records and a new page — and the initial JS still sits at ~389 kB. The new
> work is **fully code-split**: `playlistEpisodes` (3.88 kB) and
> `PlaylistVideo` (5.80 kB) load **only** when a visitor reaches `/videos`
> and then `/video/:slug`. None of it touches first paint.

---

## 🗓️ 10 Oct 2026 — v2.2 · Route & Data Layer Additions

### 🎯 Intent
Add a new page and 27 data records **without** growing the initial bundle.

### 🔧 Optimisations applied

| # | Optimisation | Effect | Icon |
|---|---|---|---|
| 1 | `PlaylistVideo` registered via `React.lazy` | Page ships as its own 5.80 kB chunk (1.92 kB gzip) | ✂️ |
| 2 | `playlistEpisodes` in a **separate module** | 3.88 kB (1.62 kB gzip) loads only on the video routes | ✂️ |
| 3 | `prefetchRoute()` extended to `path.startsWith('/video/')` | Hovering **View** preloads the chunk — navigation feels instant | ⚡ |
| 4 | `loading="lazy"` on **every** YouTube `<iframe>` | Off-screen players never load until scrolled near | 🚀 |
| 5 | `referrerPolicy="strict-origin-when-cross-origin"` | Hardens embeds against referrer leakage | 🔒 |
| 6 | Embed URLs derived, never hand-written | One link change propagates everywhere; no drift | 🧩 |
| 7 | `min-width: 0` on `.episode-card` / `.playlist-card` | Titles truncate instead of forcing grid overflow | 📐 |
| 8 | `padStart(2, '0')` for episode numbers | `EP 01…EP 13` — visual order matches numeric order | 🔢 |

### 🧹 Dead-code sweep performed

| Finding | Action | Icon |
|---|---|---|
| `getShowcaseById` imported but unused in `Videos.jsx` | Import removed | 🧹 |
| `playlistEmbedUrl` exported but used nowhere | Given a **real job** — fallback player when an index is missing | ♻️ |
| `motion` imported but unused in `Store.jsx` | Import removed | 🧹 |
| Navbar active-state used exact match, went dark on `/video/*` | Replaced with shared `isNavActive()` | 🧭 |

> 📉 **Lint warnings: `30 → 28`.** Four dead imports removed, zero new ones.
> This is the first reduction below the v2.1 baseline.

### 🧪 Verified
- ✅ Audited the **built bundle**, not the source — confirmed 27/27 episodes
  actually ship, with `1..N` numbering, unique valid IDs, and every series
  `videoId` pinned to `EP 01`
- ✅ `npm run build` passes; `npm run lint` reports **0 errors**
- ✅ Both new chunks confirmed present and separately addressable in `dist/`

### ⚖️ Limits
- ⚠️ **Static episode data.** New uploads need a data refresh; nothing is
  fetched at runtime. See [History](HISTORY.md#️-v22--youtube-series-integration).
- ⚠️ **13 iframes on one page** for the CTS series. `loading="lazy"` keeps
  this acceptable, but a future "click to load" facade would cut it further.
- ⚠️ **No browser measurement.** Bundle sizes are real; viewport overflow and
  paint order remain unverified per [`TEST.md`](TEST.md#️-limitations).

---

## 🗓️ 1 Oct 2026 — v2.1 · Simplification & Store Redesign

The largest single reduction in the project's history.

### 🎯 Intent
Remove decoration that cost bytes and delayed reading, without breaking layout.

### 📉 Bundle impact

| Asset | Before | After | Δ | Icon |
|---|---|---|---|---|
| Main bundle (raw) | `411 kB` | `389 kB` | **−22 kB** | 📦 |
| Main bundle (gzip) | `131 kB` | `125 kB` | **−6 kB** | 🗜️ |

### 🔧 Removals

| # | Optimisation | Effect | Icon |
|---|---|---|---|
| 1 | 🌊 **Lenis removed** from `Layout.jsx` | Native scroll becomes the single owner | ✂️ |
| 2 | ��️ **`PageRevealer` removed** from render tree | No route curtain hiding the page it covers | ✂️ |
| 3 | 🎬 Header entrance animations removed | Content paints immediately on `Notes`/`Videos`/`Store` | ⚡ |
| 4 | 🚫 `overscroll-behavior-x/y` removed | No scroll wrapper left to contain | ✂️ |
| 5 | 📏 `height: 100%` → `min-height: 100%` | Tall content no longer clipped | 📐 |
| 6 | 🧹 CSS comments referencing the deleted Lenis gate | Dead documentation removed | 🧹 |

### 🔧 Layout optimisations

| # | Optimisation | Effect | Icon |
|---|---|---|---|
| 7 | 🌀 Hero stage fixed to a `480px` box + negative `margin-block` | Reclaims whitespace left by `transform: scale()` | 📐 |
| 8 | 🗄️ Store cards `height: 300px` → `auto` | Cards grow with content; no internal clipping | 📐 |
| 9 | 🖼️ Portfolio avatar `340px` → `330px`, capped `82vw` | Correct at the smallest tier | 📐 |

### 🧪 Verified
- ✅ Build passing · **0 lint errors**
- ⚠️ Warnings `28 → 30`: removing header animations left `motion`
  imported-but-unused in three files. **Partially resolved in v2.2** —
  `Store.jsx` and `Videos.jsx` cleaned, `Notes.jsx` still outstanding.

---

## 🗓️ Earlier — v2.0 · Responsive Overhaul

### 🔧 Optimisations

| # | Optimisation | Effect | Icon |
|---|---|---|---|
| 1 | 🔍 8-tier breakpoint ladder (1280 → 360px) | Replaced 2 crude queries | 📐 |
| 2 | 📏 `100dvh` height chain | Kills phantom space below the footer | 📏 |
| 3 | ✂️ All `overflow-x: hidden` → `clip` | No unintended scroll container | ✂️ |
| 4 | 🧱 `minmax(0, 1fr)` grid tracks | Children shrink instead of forcing width | �� |
| 5 | 🚀 Removed the fake 500ms API delay | Loading state no longer stalls perception | 🚀 |
| 6 | 📦 `contain: layout paint` on the 3D stage | Isolates repaints | ⚡ |
| 7 | 🖱️ Hover states scoped to fine pointers | No sticky hover states on touch | 📱 |
| 8 | 🎠 Marquee moved off `100vw` + translate | Prevents horizontal overflow | 📐 |
| 9 | 🧹 Removed 12 unused imports | **40 → 28** lint warnings | 🧹 |

---

## 🚧 Queued Optimisations

Not yet done. Tracked in [`TASKS.md`](TASKS.md).

| # | Optimisation | Impact | Priority | Icon |
|---|---|---|---|---|
| 1 | 📦 `photo_one.png` (1.2 MB) → WebP/AVIF | **Largest single asset win** | 🔴 | 💾 |
| 2 | 📦 3 vault thumbnails → WebP/AVIF | Meaningful | 🔴 | 💾 |
| 3 | 📦 Remove `lenis` from `package.json` | Nothing imports it | 🔴 | 📦 |
| 4 | 🌊 Remove `data-lenis-prevent*` from `ContactDrawer` | Stale attribute | 🔴 | 🌊 |
| 5 | 🎬 Strip unused `motion` from `Notes.jsx` | Last of the v2.1 trio | 🟡 | 🎬 |
| 6 | 🖼️ Responsive `srcset` + `sizes` on hero images | Mobile bandwidth | �� | 🖼️ |
| 7 | 📏 Explicit `width`/`height` on images | Kills CLS | 🟡 | 📏 |
| 8 | 🎞️ Click-to-load facade for `/video/:slug` iframes | Cuts 13 simultaneous embeds | 🟡 | 🎞️ |
| 9 | 🕸️ Delete 6 unused components | Dead weight | 🟢 | 🧹 |
| 10 | 📦 Rename `package.json` → real project name | Correctness | 🟢 | 📦 |
| 11 | 🔢 Bundle-size budget in CI | Prevents regression | 🟢 | 🔢 |

---

## �� Measurement Method

So these numbers stay trustworthy:

| Metric | How it was captured | Icon |
|---|---|---|
| 📦 Bundle sizes | `vite build` output in `dist/assets/` | 🏗️ |
| 🗜️ Gzip sizes | Reported by Vite alongside raw size | 🏗️ |
| ⚠️ Warnings | `npx oxlint src` → final summary line | 🔎 |
| 🧪 Data integrity | Scripts run against the **built** bundle, not source | 🔬 |

> 🔍 **Why verify the bundle, not the source:** tree-shaking and chunking can
> change what actually ships. A source-level check can pass while the artifact
> differs. Every v2.2 data claim was confirmed against `dist/`.

> ⚠️ **Known measurement gaps:** no Lighthouse run, no real `scrollWidth`
> sampling, no cross-browser pass. Sizes are exact; *runtime* performance is
> inferred. Full list in [`TEST.md`](TEST.md#️-limitations).
