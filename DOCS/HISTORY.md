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
> **Purpose:** Append-only record of every change shipped — *what*, *why*, *how it was verified*
> **Base commit at time of writing:** `e7a934a`

> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md) · [Optimization History](OPTIMIZATION_HISTORY.md) · [History](HISTORY.md) · [Optimisation History](OPTIMIZATION_HISTORY.md) · **History** ·

---

## 📌 How to read this file

This is a **changelog**, not a status board. It records work that has actually
landed. Forward-looking work lives in [`TASKS.md`](TASKS.md); per-optimisation
performance detail lives in [`OPTIMIZATION_HISTORY.md`](OPTIMIZATION_HISTORY.md).

| Field | Meaning |
|---|---|
| 🗓️ **Date** | When the change landed |
| 🎯 **Intent** | The problem being solved, stated before the solution |
| 🔧 **Change** | Files touched and what actually changed |
| 🧪 **Verified** | The concrete check that proves it works |
| ⚖️ **Trade-off** | What was given up, or what remains unproven |

---

## 🗓️ 10 Oct 2026 — v2.2 · YouTube Series Integration

The `/videos` page shipped with three placeholder embeds, all pointing at the
same Rick Astley video (`dQw4w9WgXcQ`). It claimed to be a "curated directory
of video tutorials" while containing nothing real. This release replaced that
demonstrative content with the owner's actual project walkthroughs.

### 🎯 Intent
- Replace every placeholder video with **real** project content
- Let a visitor watch a **whole series** on-site, not just one clip
- Stop shipping dead CTAs that navigate nowhere

### 🔧 Change — data layer

| File | Change | Icon |
|---|---|---|
| `src/api/mockData.js` | Replaced `youtubeVideos` (3 fake entries) with `youtubeShowcase` — 5 real series | 🗂️ |
| `src/api/mockData.js` | Added `slug` per series + `getShowcaseBySlug()` for the route param | 🔑 |
| `src/api/mockData.js` | Added `videoEmbedUrl()`, `playlistEmbedUrl()`, `getShowcaseById()` | 🧩 |
| `src/api/playlistEpisodes.js` | **New.** 27 episodes across 5 playlists | 🎞️ |

### 🔧 Change — pages

| File | Change | Icon |
|---|---|---|
| `src/pages/Videos.jsx` | Episode 1 embedded per card; playlist card with **View** button | ▶️ |
| `src/pages/PlaylistVideo.jsx` | **New.** `/video/:slug` — numbered `EP 01…EP 13` embed cards | 🎬 |
| `src/pages/MainSite.jsx` | Home section 03 embeds the first 3 real series + playlist link | 🏠 |
| `src/pages/Store.jsx` | Dead **Demo** button became a real playlist link | 🗄️ |
| `src/pages/Projects.jsx` | Added **Watch Playlist** link on purchasable projects | 📚 |
| `src/App.jsx` | Registered `/video/:slug`, lazy-loaded + prefetched | 🧭 |
| `src/components/Navbar.jsx` | `isNavActive()` — Videos tab stays lit on nested routes | 🧭 |
| `src/index.css` | `.playlist-card`, `.episode-card` rules | 🎨 |
| `src/components/Navbar.jsx` | Replaced mobile nav title with brand lockup — **ashutosh.dev** as the menu header | 🔗 |
| `src/components/Navbar.jsx` | Hamburger toggle now opens the navigation menu with brand name | 🔗 |

### 🔧 Change — series now live

| Route | Series | Episodes |
|---|---|---|
| `/video/quality-management-system` | Quality Management System (QMS) | 1 |
| `/video/live-location-tracker-management` | Live Location Tracker Management | 3 |
| `/video/fusionmart` | FusionMart | 5 |
| `/video/sunrise-infotech-solution` | Sunrise Infotech Solution | 5 |
| `/video/crime-tracking-system` | Crime Tracking System (CTS) | 13 |

### 🧪 Verified
- ✅ `npm run build` — passes
- ✅ `npm run lint` — **0 errors**, 28 warnings (baseline held)
- ✅ **27/27 episodes** confirmed in the *shipped bundle*, not just source
- ✅ Every series `videoId` pinned to `EP 01`
- ✅ Numbering sequential `1..N`; all IDs unique + valid 11-char
- ✅ All 5 slugs have a matching index — **no orphans**

### ⚖️ Trade-offs & limits
- ⚠️ **Episodes are baked static data.** YouTube's RSS feed returns
  `Access-Control-Allow-Origin: null`, so a browser cannot fetch it; the
  project is a static SPA with no backend, and `RULES.md` forbids API keys in
  client code. The feeds were read once at authoring time. **New uploads will
  not appear** until the data file is refreshed.
- ⚠️ **QMS has only 1 published episode.** That is the real playlist state,
  not a fetch failure.
- ⚠️ **Two series have no store bundle** (Live Location Tracker, FusionMart),
  so they appear on `/videos` but carry no "Watch Playlist" button on
  `/projects`. No bundle was invented — pricing is the owner's call.
- ⚠️ **A test, not the code, was wrong once.** An early episode-count script
  reported 28 episodes; a loose `n:` regex matched inside a video *title*.
  Record-level parsing confirmed the correct 27.

### �� Ordering decision
The RSS feed returns **newest-first**, but the owner's designated "1st video"
is the *oldest* entry in 4 of 5 playlists — and the *newest* for CTS. Rather
than trust feed order, each series' `videoId` is pinned to `n: 1` and the
remainder sorted oldest-first, so numbering reads in intended watch order.

---

## 🗓️ 1 Oct 2026 — v2.1 · Simplification & Store Redesign

Removed decorative overhead and made Store cards content-first. Full detail in
[`OPTIMIZATION_HISTORY.md`](OPTIMIZATION_HISTORY.md#️-v21--simplification--store-redesign).

### 🎯 Intent
- Cut bundle weight from decoration that cost bytes but earned nothing
- Stop hiding Store card content behind hover reveals
- Remove motion that delayed content the visitor came to read

### 🔧 Change
- [x] 🌊 **Lenis removed** from `Layout.jsx` — native scroll is the single owner
- [x] 📉 Main bundle **411 kB → 389 kB** (131 → 125 kB gzip)
- [x] 🎞️ **`PageRevealer` removed** from the `App.jsx` render tree
- [x] 🎬 Header entrance animations removed on `Notes`, `Videos`, `Store`
- [x] 🚫 `overscroll-behavior-x/y` removed from `html`/`body`
- [x] 📏 `height: 100%` → `min-height: 100%` — tall content no longer clipped
- [x] 🗄️ Store cards `height: 300px` → `auto`; CTAs permanently below a divider
- [x] 🌀 Hero stage fixed at `480px` with scale-compensating `margin-block`
- [x] 🖼️ Portfolio avatar `340px` → `330px`, capped at `82vw`
- [x] 🌙 Dark theme applied to `README.md` and all `DOCS/*.md`

### 🧪 Verified
- ✅ Build passing · **0 lint errors**
- ⚠️ Warnings rose `28 → 30` — removing the header animations left `motion`
  imported-but-unused in `Notes.jsx`, `Videos.jsx`, `Store.jsx`

---

## 🗓️ Earlier — v2.0 → v2.1 · Responsive Overhaul & Foundations

| Phase | Scope | Icon |
|---|---|---|
| Phase 0 | Vite + React 19, Tailwind v4, Framer Motion, Router, Lucide, Oxlint, Vercel SPA rewrites | 🧱 |
| Phase 1 | All six original pages + contact drawer + footer | 📄 |
| Phase 2 | 8-tier breakpoint ladder, `dvh` chain, single scroll container, `overflow-x: clip`, `minmax(0, 1fr)`, animated drawer, card fixes, centring | 📐 |
| Phase 2.5 | Simplification + Store redesign (see v2.1 above) | ✂️ |

### 🧭 Real bugs found and fixed
- [x] 🧭 Mobile drawer buttons closed the menu but **never routed** → added `goTo(path)`
- [x] 🔒 Scroll lock leaked on iOS → locked `html` *and* `body`
- [x] ▶️ Video play badge was clipped by `overflow: hidden`
- [x] �� Certificate carousel clipped at the top edge on hover
- [x] 🖼️ `img` styling fought the hero on small screens

### 🧪 Test suite introduced
- [x] ��️ Test 1 — Build & Lint Gate (2 assertions)
- [x] 📐 Test 2 — Responsive Integrity Scan (12 assertions)
- [x] 📝 Results published to [`TEST.md`](TEST.md) including limitations
- [x] 🐛 Caught a **false-positive assertion** on the `@supports` fallback —
      the *test* was fixed, not the code

---

## 🔗 Commit Trail

| Commit | Message | Icon |
|---|---|---|
| `e7a934a` | Few changes *(base for v2.2)* | 📌 |
| `bb7f7ff` | Optimization, smooth animation, remove animations, reposition buttons, redesign cards, certificate redesigned | ⚡ |
| `78ef87a` | Vercel config added to fix direct endpoint opening in production | 🚀 |
| `ddb53d4` | Few tweaks | 🔧 |
| `438b588` | Redesigned completely | 🎨 |

> 💡 `78ef87a` is why `/video/<slug>` works on a hard refresh: the
> `vercel.json` catch-all rewrite serves `index.html` for client routes.

---

## 🧭 Standing Constraints

Decisions that keep recurring, recorded so they are not re-litigated:

| Constraint | Reason | Icon |
|---|---|---|
| �� No API keys in client code | `RULES.md` § Security | 🔑 |
| 🚫 No backend / serverless functions | `vercel.json` rewrites everything to `index.html` | 🏗️ |
| 🚫 No real payments | Store CTAs are presentational | 💳 |
| 🚫 No second scroll container | iOS rubber-banding + phantom space | 📜 |
| 🚫 No page-header entrance animations | They delay the content the visitor came to read | 🎬 |
| 🚫 No route-transition overlays | A curtain hides the page it covers | 🎞️ |
| ✅ `target="_blank"` requires `rel="noopener noreferrer"` | Tabnabbing prevention | 🔗 |
| ✅ Verification gate | `npm run lint` **and** `npm run build` must both pass | 🚦 |
