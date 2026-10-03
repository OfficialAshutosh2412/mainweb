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


# 📄 Product Requirements Document

> **Product:** `ashutosh.dev` — Software Engineer Portfolio
> **Version:** 2.1 · **Status:** 🟢 Shipped
> **Owner:** Ashutosh Prasad · **Updated:** 1 Oct 2026


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md) · [Optimization History](OPTIMIZATION_HISTORY.md) · [History](HISTORY.md)

---

## 🎯 Product

A **dark-mode-first, motion-rich personal portfolio** presenting engineering
capability through a 3D hero stage, verified credentials and a sellable code
vault — deployed as a static SPA.

| | |
|---|---|
| 🏷️ **Category** | Developer Portfolio / Personal Brand |
| 📱 **Platforms** | Web — mobile-first, responsive 320px → 4K |
| 🧩 **Stack** | React 19 · Vite 8 · Tailwind v4 · Framer Motion |
| 🎨 **Theme** | 🌙 Dark mode only (dark-first, no light variant) |
| 🌍 **Hosting** | Vercel — static build + SPA rewrites |
| 🔤 **Language** | JavaScript (JSX) — no TypeScript |

> 🌊 Scrolling is **native**. Lenis was removed in v2.1 — the portfolio keeps one
> scroll owner and lets the browser handle the rest.

---

## 😩 Problem

Most developer portfolios fail on **one of three axes**:

| ❌ Failure mode | 💥 Consequence |
|---|---|
| 🎨 No visual identity | Blends into a thousand identical templates |
| 📱 Not responsive | Dead on mobile — where hiring traffic actually lands |
| 🐌 Slow / janky | 3D flourishes that drop frames, or motion that fights the user |

### The specific gaps this project solves

- 🖼️ **Generic hero** — needs a distinctive, memorable first impression
- 📐 **Broken layouts** — hard-coded px sizes that overflow on a 360px phone
- 🌀 **Scroll chaos** — dual scrollbars, rubber-band overscroll below the footer
- 🕸️ **Dead weight** — unused components, an inert scroll library, and a 1.2 MB
  image shipped to every visitor
- 🧭 **No path to contact** — visitors can't act on what they just read

---

## 👥 Target Users

| 🎓 Audience | 💼 Context | 🧠 What they need to see |
|---|---|---|
| **Recruiter** | 30-second phone scan | Proof of skill, above the fold |
| **Hiring Manager** | Deep read of Portfolio | Verified credentials + real projects |
| **Peer Developer** | Reads the source | Clean architecture, obvious intent |
| **Client** | Code Vault page | Buyable, well-scoped bundles |
| **Student** | Notes & Videos pages | Learn something concrete |

> 💡 **Primary journey:** land on `/` → read hero → open **Portfolio** →
> scan credentials → open the **Contact** drawer.

---

## 🎯 Goals


---

## ✨ Core Features

| # | Feature | Icon | Route | Status | Priority |
|---|---|---|---|---|---|
| 1 | **3D Hero Stage** | 🌀 | `/` | ✅ Live | 🔴 Critical |
| 2 | **Responsive Shell** | 📐 | all | ✅ Live | 🔴 Critical |
| 3 | **Resume Portfolio** | 🎓 | `/portfolio` | ✅ Live | 🔴 Critical |
| 4 | **Contact Drawer** | 📬 | all | ✅ Live | 🔴 Critical |
| 5 | **Animated Mobile Nav** | ☰ | all | ✅ Live | 🔴 Critical |
| 6 | **Route Transitions** | 🎞️ | all | 🚫 Removed | ⚪ N/A |
| 7 | **Code Vault** | 🗄️ | `/store` | ✅ Live | 🟡 High |
| 8 | **Developer Notes** | 📝 | `/notes` | ✅ Live | 🟢 Medium |
| 9 | **YouTube Showcase** | ▶️ | `/videos` | ✅ Live | 🟢 Medium |
| 10 | **Skills Marquee** | 🎠 | `/portfolio` | ✅ Live | 🟢 Medium |
| 11 | **Projects Index** | 📚 | `/projects` | ✅ Live | 🟢 Medium |
| 12 | **Playlist Episode Pages** | 🎞️ | `/video/:slug` | ✅ Live | 🟢 Medium |
| 13 | **Light/Dark Toggle** | 🌗 | — | ❌ Dropped | ⚪ N/A |

---

## 🚀 v2.0 Scope — Responsive Overhaul

The current release. Shipped.

### 📐 Responsive system
- [x] 🔍 8-tier breakpoint ladder (1280 → 360px)
- [x] 🔍 `100dvh` height chain — kills footer overscroll
- [x] 🔍 Single scroll container — no dual scrollbars
- [x] 🔍 `overflow-x: clip` — zero horizontal overflow
- [x] 🔍 `minmax(0, 1fr)` grids — children can shrink
- [x] 🔍 Mobile hero reorder — 3D stage leads on small screens
- [x] 🔍 Centred hero / stats / section titles on mobile
- [x] 🔍 Stacked footer links on phones

### ☰ Navigation
- [x] 🍔 Animated drawer (`AnimatePresence`, spring, staggered rows)
- [x] 🧭 Drawer links actually navigate *(was closing without routing)*
- [x] 🔒 Scroll lock on both `html` and `body`
- [x] ⌨️ Escape to close
- [x] 🔄 Auto-close on route change and breakpoint change
- [x] ♿ `aria-expanded` / `aria-controls` / `aria-current`

### 🎴 Card responsiveness
- [x] 🗄️ Vault hover panel — scrollable body + pinned CTA bar
- [x] 🎓 Portfolio cards — meta rows wrap, footers stack
- [x] 🔘 "See more" matched to "Repository" styling
- [x] 📜 Certificate carousel — no top-edge clipping on hover
- [x] ▶️ Video cards — play badge no longer cut off

### ⚡ Performance
- [x] 🚀 Removed 500 ms fake API delay
- [x] 📦 `contain: layout paint` on the 3D stage
- [x] 🎯 Hover states scoped to fine pointers only
- [x] 🧹 Dead imports removed (40 → 28 lint warnings)

> ✅ **Exit Criteria** — builds clean · 0 lint errors · 0 horizontal scroll
> at 320px · single scrollbar · no overscroll below footer

---

## 🚀 v2.1 Scope — Simplification & Store Redesign

Shipped. Removes decorative overhead and makes Store cards content-first.

### ✂️ Removals
- [x] 🌊 **Lenis smooth scroll removed** — native scrolling is the single
      scroll owner; main bundle **411 kB → 389 kB**
- [x] 🎞️ **Page-reveal curtain removed** — `PageRevealer` disconnected from the
      render tree; routes swap instantly
- [x] 🎬 **Page header entrance animations removed** on `/notes`, `/videos`,
      `/store`
- [x] 🚫 `overscroll-behavior` removed — no scroll wrapper left to contain
- [x] 📏 `height: 100%` → `min-height: 100%` on `html`/`body` so tall content
      is never clipped

### 🗄️ Store redesign
- [x] 📐 Cards are `height: auto` — they grow with their content instead of a
      fixed `300px` frame
- [x] 📝 Description, feature list and tech badges are **always visible**
- [x] 🔘 CTAs sit permanently below a divider — no hover-reveal, nothing hidden

### 📐 Layout refinements
- [x] 🌀 3D hero stage is a fixed `480px` box with negative `margin-block`
      compensating for the scale
- [x] 🖼️ Portfolio avatar `340px` → `330px`, capped at `82vw`

> ⚠️ **Exit Criteria** — builds clean · 0 lint errors. Lint warnings rose
> `28 → 30`: removing the header animations left `motion` imported-but-unused
> in `Notes.jsx`, `Videos.jsx` and `Store.jsx`. Harmless, but worth a sweep.

---

## 🚀 v2.2 Scope — YouTube Series Integration

Shipped. Replaces demonstrative video content with the owner's real project
walkthroughs and adds on-site playlist browsing.

### 🎥 Content
- [x] 🎥 Replaced 3 placeholder embeds (`dQw4w9WgXcQ`) with **5 real project series**
- [x] 📺 Episode 1 of every series plays inline on `/videos`
- [x] 🎞️ `/video/<playlist_name>` lists every episode as a **numbered** embed card
- [x] 📚 **27 episodes** across all 5 playlists (QMS 1 · Location 3 · FusionMart 5 · Sunrise 5 · CTS 13)
- [x] 🔗 Every episode links out to YouTube as a fallback

### 🧭 Navigation
- [x] 🧭 **View** button routes internally instead of leaving the site
- [x] ⚡ `prefetchRoute()` extended to `/video/*` — chunk preloads on hover
- [x] 🧭 Navbar `isNavActive()` keeps the Videos tab lit on nested routes
- [x] ♿ Unknown slugs render a proper not-found state, never a blank page

### 🗄️ Commerce linkage
- [x] 🗄️ Dead "Demo" button on Store cards now opens the real playlist
- [x] 📚 "Watch Playlist" link on purchasable Projects
- [x] 🚫 Projects with no series show an inert slot, not a broken button

### 📦 Performance
- [x] ✂️ `PlaylistVideo` lazy-loaded — own 5.80 kB chunk (1.92 kB gzip)
- [x] ✂️ `playlistEpisodes` isolated — 3.88 kB, loads only on video routes
- [x] 📦 **Main bundle unchanged** at `389.61 kB` despite 27 new records
- [x] 📉 Lint warnings **30 → 28**, zero new

> ✅ **Exit Criteria** — builds clean · 0 lint errors · 27/27 episodes verified
> in the *shipped bundle* · all 5 slugs resolve · no orphaned indexes
>
> ⚠️ **Accepted limitation** — episode data is baked static. YouTube's playlist
> RSS sends no CORS header, so browsers cannot read it, and this static SPA has
> no backend. New uploads require a data refresh. See
> [`HISTORY.md`](HISTORY.md#️-v22--youtube-series-integration).

---

## 🚫 Out of Scope

| ❌ Excluded | 💭 Why |
|---|---|
| ☀️ Light theme | Dark-first identity; a light variant would dilute it |
| 📝 Blog CMS | Notes are curated content, not user-authored |
| 💳 Real payments | Store CTAs are presentational in v2 |
| 🗄️ Real database | Content is bundled via `mockData.js` |
| 🧪 Test runner | No runner configured; build + lint is the gate |
| 🔍 SEO blog engine | SPA — static metadata is sufficient |
| 🔌 YouTube Data API | Requires a key; `RULES.md` bans keys in client code |
| 🖥️ Runtime playlist fetch | RSS has no CORS header and there is no backend |

---

## 📈 Success Criteria

### ✨ Core journey

| # | Step | 🎯 Signal |
|---|---|---|
| 1 | 🚀 Land on `/` | Hero + 3D stage paint < 1.5 s |
| 2 | 📖 Read hero | H1 and lede visible without scrolling |
| 3 | 🧭 Navigate | Mobile drawer opens < 200 ms and routes |
| 4 | 🎓 Open Portfolio | Credentials render with correct layout |
| 5 | 📬 Open Contact | Drawer slides in, form reachable |
| 6 | 📥 Download resume | PDF served from `/resume.pdf` |

### 📊 Health Metrics

| Metric | Target | Icon |
|---|---|---|
| Lighthouse Performance | ≥ 90 | 🚀 |
| Lighthouse Accessibility | ≥ 95 | ♿ |
| Largest Contentful Paint | < 2.0 s | 🖼️ |
| Cumulative Layout Shift | < 0.1 | 📐 |
| Horizontal overflow | 0 px | 🚫 |
| Lint errors | 0 | ✅ |
| Main bundle (gzip) | < 150 kB | 📦 |

### 🛡️ Guardrails
- 🚫 Zero horizontal scrollbar at any width ≥ 320px
- 🚫 Exactly one vertical scrollbar, ever
- 🚫 No content clipped at the top of any container
- 🚫 All interactive targets ≥ 44 px on touch
- 🚫 Every change passes the [verification gate](RULES.md) and is recorded in [`TEST.md`](TEST.md)

---

## ⚠️ Risks & Mitigations

| ⚠️ Risk | 📊 Likelihood | 🛡️ Mitigation |
|---|---|---|
| 3D stage tanks low-end phones | High | `--stage-scale` ladder + coarse-pointer detection |
| Motion causes nausea | Medium | `prefers-reduced-motion` respected globally |
| Overscroll regresses | Medium | Single-scroll-container rule + `dvh` chain |
| 1.2 MB hero image on mobile | High | `fetchPriority="high"`, lazy below-fold assets |
| Stage locks up on orientation change | Medium | `matchMedia` listeners instead of `resize` |
| Bundle grows with dead code | Medium | Oxlint flags unused imports in CI |

---

## 🗺️ Roadmap

| 🗓️ Version | 🎯 Focus | 📦 Ships |
|---|---|---|
| **v1.0** | Initial portfolio, routes, 3D hero | Baseline |
| **v1.5** | Skills marquee, certificate carousel | Content depth |
| **v2.0** | ✅ Full responsive overhaul | Shipped |
| **v2.1** | ✅ Remove Lenis, simplify motion, Store redesign | Shipped |
| **v2.2** | Image optimisation (WebP/AVIF, `srcset`), dead-code sweep | Perf |
| **v2.3** | Test runner (Vitest + Playwright), lint budget | Quality |
| **v3.0** | Light theme, blog index, analytics | Growth |

---

## ❓ Open Questions

- ❓ WebP/AVIF conversion to cut the 1.2 MB hero payload?
- ❓ Delete the 6 unused components (incl. `PageRevealer`) or wire them in?
- ❓ Drop `lenis` from `package.json` and the `data-lenis-prevent*` attributes?
- ❓ Strip the now-unused `motion` imports to get back under 28 warnings?
- ❓ Add a test runner, or keep build + lint as the gate?
- ❓ Light theme — still off the table?

---

**Remember:** PRD = **WHAT** + **WHY**

1. ✨ **Memorable first 3 seconds** — a live 3D hero that reads as engineered
2. 📱 **Flawless on every device** — 320px → ultrawide, no horizontal scroll
3. ⚡ **Fast** — sub-second interactive, code-split routes, no jank
4. 🧭 **Clear actions** — contact drawer, resume download, code vault
5. ♿ **Accessible** — keyboard nav, ARIA, respects reduced-motion

### Non-goals
- ❌ Not a blog platform (Notes is static content, not authoring)
- ❌ Not an e-commerce backend (Store CTAs are presentational)
- ❌ Not a light-theme variant
- ❌ Not an SEO content-marketing site

