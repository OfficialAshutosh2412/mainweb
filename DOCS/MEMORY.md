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

# 🧠 Project Memory

> **Project:** `ashutosh.dev` Portfolio
> **Last updated:** 1 Oct 2026
> **Purpose:** Current state of the build — *not* permanent decisions


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md) · [Optimization History](OPTIMIZATION_HISTORY.md) · [History](HISTORY.md)

---

## 📍 Current Status

**v2.2 — YouTube Series Integration: shipped.** The `/videos` page no longer
shows three copies of a placeholder video. Five real project series now play
inline, and `/video/<playlist_name>` lists every episode as a numbered embed
card. Episode data is baked static — YouTube's playlist RSS sends no CORS
header, so a browser cannot fetch it, and this is a static SPA with no backend.

| Metric | Value | Icon |
|---|---|---|
| 🟢 Build | Passing (`740ms`) | ✅ |
| 🟢 Lint errors | `0` | ✅ |
| 🟢 Lint warnings | `28` (**−2** vs v2.1 baseline) | ✅ |
| 🟢 Routes live | `7 / 7` | 🧭 |
| 🟢 Main bundle | `389.61 kB` / `125.32 kB` gzip (**no regression**) | 📦 |
| 🟢 CSS bundle | `93.07 kB` / `18.08 kB` gzip | 🎨 |
| 🟢 Scroll owners | `1` (document only) | 📜 |
| 🟢 Episodes shipped | `27 / 27` | 🎞️ |

> ✅ **Warnings finally dropped to `28`.** Four dead imports removed across
> `Videos.jsx`, `Store.jsx` and the Navbar — and `playlistEmbedUrl`, previously
> an unused export, was given a real job as the fallback player.
>
> ⚠️ **The main bundle did not grow.** A 7th route plus 27 data records added
> **0 kB** to initial JS — `playlistEpisodes` (3.88 kB) and `PlaylistVideo`
> (5.80 kB) are code-split and load only on the video routes.

---

## ✅ Recently Completed

### 🎬 v2.2 — YouTube Series Integration
- [x] 🎥 Replaced 3 placeholder `dQw4w9WgXcQ` embeds with 5 real project series
- [x] 🎞️ Added `/video/:slug` — numbered `EP 01…EP 13` embed cards
- [x] 📚 Baked 27 episodes across all 5 playlists into `playlistEpisodes.js`
- [x] 🧭 Navbar `isNavActive()` — Videos tab stays lit on nested routes
- [x] 🗄️ Dead "Demo" button on Store cards now opens a real playlist
- [x] 📚 "Watch Playlist" link added to purchasable Projects
- [x] 📉 Lint warnings **30 → 28**; zero new ones
- [x] 🧹 Removed dead `getShowcaseById` and `motion` imports
- [x] ♻️ `playlistEmbedUrl` repurposed as the no-index fallback player
- [x] 📜 Added [`HISTORY.md`](HISTORY.md) and [`OPTIMIZATION_HISTORY.md`](OPTIMIZATION_HISTORY.md)

> 📌 Full narrative: [HISTORY.md](HISTORY.md) · Numbers: [OPTIMIZATION_HISTORY.md](OPTIMIZATION_HISTORY.md)

### ✂️ v2.1 — Simplification
- [x] 🌊 **Removed Lenis** from `Layout.jsx` — native scroll is the only owner
- [x] 📉 Main bundle **411 kB → 389 kB** (131 → 125 kB gzip)
- [x] 🎞️ **Removed `PageRevealer`** from `App.jsx` — no more route curtain
- [x] 🎬 **Removed header entrance animations** on `Notes`, `Videos`, `Store`
- [x] 🚫 Removed `overscroll-behavior-x/y` from `html`/`body`
- [x] 📏 `height: 100%` → `min-height: 100%` — tall content is no longer clipped
- [x] ➕ `.app-content` is now an explicit flex column
- [x] 🧹 Trimmed the explanatory comments that referenced the deleted Lenis

### 🗄️ Store cards
- [x] 📐 `height: 300px` → `auto` — cards grow with their content
- [x] 📝 Description, feature list and tech badges are always visible
- [x] 🔘 CTAs permanently below a divider — no hover-reveal

### 📐 Layout
- [x] 🌀 Hero stage is a fixed `480px` box; negative `margin-block` reclaims the
      whitespace left behind by `transform: scale()`
- [x] 🖼️ Portfolio avatar `340px` → `330px`, capped at `82vw`

### 📐 Responsive system — v2.0
- [x] 🔍 Replaced 2 crude media queries with an 8-tier ladder
- [x] 📏 Introduced the `100dvh` height chain
- [x] ✂️ Switched all `overflow-x: hidden` → `clip`
- [x] 🌀 Added the `--stage-scale` ladder for the 3D hero
- [x] 🎨 Defined the missing theme tokens and utility classes
- [x] 🔤 Moved the skills marquee off `100vw` + translate

### ☰ Navigation
- [x] 🍔 Animated drawer with spring + staggered rows
- [x] 🧭 **Fixed the real bug** — drawer buttons closed the menu but never
      routed. Added a `goTo(path)` handler.
- [x] 🔒 Locked scroll on `html` *and* `body` (iOS leaks otherwise)
- [x] ⌨️ Escape to close · 🔄 auto-close on route/breakpoint change
- [x] 🚫 Removed the Portfolio link from the nav

### 🎴 Cards
- [x] 🗄️ Vault hover panel → scrollable body + pinned CTA bar
- [x] 🗑️ Removed descriptions/features from landing + vault cards
- [x] 🔘 Unified "See more" with the "Repository" button
- [x] 📜 Certificate carousel — no top-edge clipping
- [x] ▶️ Video play badge no longer clipped by `overflow: hidden`

### 🎨 Centring
- [x] ✨ Hero copy, stat row and all section titles centred ≤900px
- [x] 🔥 Fixed the 768px rule that was overriding the centring

### ⚡ Performance
- [x] 🚀 Removed the fake 500ms API delay
- [x] 📦 `contain: layout paint` on the 3D stage
- [x] 🖱️ Hover states scoped to fine pointers
- [x] 🧹 Removed 12 unused imports (40 → 28 warnings)
- [x] 🎛️ Retuned Lenis easing — *Lenis later removed; see v2.1 above*

### 🧪 Test suite introduced
- [x] 🏗️ Test 1 — Build & Lint Gate (2 assertions)
- [x] 📐 Test 2 — Responsive Integrity Scan (12 assertions)
- [x] 📝 Report written to [`TEST.md`](TEST.md), including limitations
- [x] 🐛 Caught a false-positive assertion on the `@supports` fallback — test fixed, not the code
- [x] 📚 All 7 docs cross-linked + `DECISIONS.md` reference resolved

---

## ⚠️ Known Issues

| # | Issue | Severity | Icon |
|---|---|---|---|
| 1 | 📦 `photo_one.png` is 1.2 MB — no WebP/AVIF | 🟡 High | 💾 |
| 2 | 🧟 6 components imported nowhere (`RoleDial`, `ParallaxBackground`, `SVGRope`, `TypingText`, `ContactSection`, `PageRevealer`) | 🟢 Low | 🧹 |
| 3 | 🧪 No test runner — tests are manual, not automated | 🟡 Medium | 🧪 |
| 4 | 🖥️ No browser rendering test — overflow never measured live | 🟡 Medium | 🖥️ |
| 5 | 🏷️ `package.json` still named `new-folder` | 🟢 Low | 📦 |
| 6 | 🕸️ `RevealingCard` imported in `Portfolio.jsx` but unused | 🟢 Low | 🕸️ |
| 7 | 🌙 Light theme is not implemented | ⚪ N/A | ☀️ |
| 8 | 🛒 Store CTAs are presentational — no real checkout | 🟡 Medium | 💳 |
| 9 | 📦 `lenis` still a dependency; `data-lenis-prevent*` still on the drawer | 🟢 Low | 🌊 |
| 10 | 🎬 `motion` imported but unused in `Notes.jsx` only — `Videos`/`Store` cleaned in v2.2 | 🟢 Low | 🎞️ |
| 11 | 📺 Episode lists are baked static — new uploads need a data refresh | 🟡 Medium | 🎞️ |
| 12 | 🎞️ `/video/crime-tracking-system` mounts 13 iframes; `loading="lazy"` mitigates but a click-to-load facade would be leaner | 🟢 Low | ⚡ |
| 13 | 📚 *Live Location Tracker* and *FusionMart* have no store bundle, so no "Watch Playlist" button on `/projects` | 🟢 Low | 🗄️ |

> ⚠️ **Item 11 is a deliberate trade-off, not a bug.** YouTube's playlist RSS
> returns `Access-Control-Allow-Origin: null`, so no browser can read it. With
> no backend and `RULES.md` banning client API keys, static data is the only
> key-free option. See [HISTORY.md](HISTORY.md#️-v22--youtube-series-integration).

---

## 🎯 Current Task

**TASK-025 — Dead-code sweep.** `lenis` is no longer imported anywhere, yet it
remains a dependency and the drawer still carries `data-lenis-prevent*`
attributes that nothing reads. `PageRevealer.jsx` is now orphaned. Removing all
three should bring lint back to ≤ 28 warnings.

---

## ⏭️ Next Step

Strip `import { motion }` from `Notes.jsx`, `Videos.jsx` and `Store.jsx` where
it is now unused, delete `PageRevealer.jsx`, drop `lenis` from
`package.json` and remove the stale `data-lenis-prevent*` attributes. Then
re-run the lint + build gate and refresh [`TEST.md`](TEST.md).

---

## 📌 Decisions Logged

| Decision | Rationale | Icon |
|---|---|---|
| Lenis removed in favour of native scroll | It owned the scroll, fought `overflow-x: clip`, and cost 22 kB | 🧹 |
| No route-transition overlay | A curtain hides the page it covers; instant swap is clearer | 🎞️ |
| `clip` over `hidden` | `hidden` creates a scroll container | ✂️ |
| `dvh` over `vh` | `vh` overflows by the chrome height | 📏 |
| `min-height` over `height` on `html`/`body` | Fixed height clips content that exceeds the viewport | 📐 |
| CSS `@theme` for tokens | Single editable source | 🎨 |
| JSX over TSX | Matches the existing codebase | 🔤 |
| Flat folder structure | Six routes don't justify depth | 📂 |

> 💡 These are *why* decisions. The **Decisions Log** section above is the
> permanent record — this file tracks *what* is currently true.

---

**Distinction:**
- 📌 `MEMORY.md` → current project state + the **Decisions Log** (permanent *why*)
- 📌 `TASKS.md` → what ships next
- 📌 `TEST.md` → what was verified, and what was not

