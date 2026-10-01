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

# 🏗️ Architecture

> **Project:** `ashutosh.dev` Portfolio
> **Type:** Single-page application (SPA) — static, no backend
> **Last updated:** 28 Sep 2026


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md)

---

## 🧩 Stack

| Layer | Choice | Icon | Why |
|---|---|---|---|
| **UI runtime** | React 19 | ⚛️ | Concurrent features, no `ReactDOM.render` |
| **Build** | Vite 8 | 🚀 | Instant HMR, Rollup/Rolldown output |
| **Styling** | Tailwind CSS v4 | 🎨 | CSS-first `@theme`, no JS config |
| **Animation** | Framer Motion | 🎞️ | `AnimatePresence`, springs, layout |
| **Routing** | React Router 7 | 🧭 | Nested + lazy routes |
| **Smooth scroll** | Lenis | 🌊 | Desktop-only, disabled on touch |
| **Icons** | Lucide React | 🎭 | Tree-shaken, consistent stroke |
| **Lint** | Oxlint | 🔎 | Rust-native, instant |
| **Hosting** | Vercel | ▲ | Static + SPA rewrite |

> 🚫 **No backend, no database.** All content is bundled via `mockData.js`.

---

## 🗺️ Routes

| Path | Page | Chunks | Icon |
|---|---|---|---|
| `/` | `MainSite` | 11.78 kB | 🏠 |
| `/portfolio` | `Portfolio` | 33.76 kB | 🎓 |
| `/projects` | `Projects` | 7.31 kB | 📚 |
| `/notes` | `Notes` | 5.11 kB | 📝 |
| `/videos` | `Videos` | 3.24 kB | ▶️ |
| `/store` | `Store` | 8.41 kB | 🗄️ |

All pages are `React.lazy` code-split and prefetched on link hover/touch via
`prefetchRoute()` in `App.jsx`, so navigation feels instant.

---

## 📂 Folder Structure

```
src/
├── 🧩 components/        # Reusable UI
├── 📄 pages/             # Route-level screens
├── 🔌 api/               # Data access layer
├── 🧠 context/           # React context
├── 🎨 assets/            # Imported images
├── index.css             # Design tokens + all styling
├── App.jsx               # Router + lazy routes
└── main.jsx              # Entry point

public/
├── favicon.svg
├── resume.pdf            # Download target
├── icons.svg
└── contact_parallax_bg.jpg
```

> 📌 Flat by design. With six routes there is no benefit to `features/` or
> `services/` directories — depth for its own sake is not architecture.

---

## 🔄 System Flow

```
👤 User
   ↓
🧭 React Router        → resolves path, lazy-loads chunk
   ↓
📄 Page component      → fetches via api/index.js
   ↓
🔌 api/index.js        → returns bundled mockData
   ↓
🎨 Render + Framer Motion
   ↓
🌀 Lenis (desktop only) → smooth scroll
```

### ⏳ Boot sequence

| # | Step | Detail | Icon |
|---|---|---|---|
| 1 | 🚀 `main.jsx` | Mounts `<App/>` in `StrictMode` | 📦 |
| 2 | 🧭 `App.jsx` | Router, `ScrollToTop`, `PageRevealer` | 🗺️ |
| 3 | 🏗️ `Layout.jsx` | Navbar, ambient layers, scroll progress | 🏗️ |
| 4 | ⏳ `Suspense` | `PageFallback` spinner while chunk loads | 🔄 |
| 5 | 🎨 `index.css` | Tailwind v4 `@theme` → CSS variables | 🎨 |

---

## 🧠 Runtime Decisions

| Decision | Rationale | Icon |
|---|---|---|
| Lenis only when `pointer: fine` | Hijacks touch gestures; native scroll is better on phones | 📱 |
| `matchMedia` over `resize` | Fires correctly on orientation change, cheaper | 🔄 |
| `overflow-x: clip` not `hidden` | `hidden` creates a scroll container and breaks Lenis | ✂️ |
| `100dvh` over `100vh` | `vh` overflows by the browser-chrome height on mobile | 📏 |
| Inline styles removed from pages | They overrode every media query | 🚫 |
| `--stage-scale` custom property | One knob scales the entire 3D stage | 🎛️ |
| `content-visibility: auto` | Skips render work for off-screen sections | 👁️ |

---

## ⚖️ Layer Rules

| Rule | Detail | Icon |
|---|---|---|
| 🎨 **Tokens only** | No hard-coded hex in components | 🎨 |
| 📐 **Fluid sizing** | `clamp()` / `%` / `dvh`, not fixed `px` | 📐 |
| 🧱 **No layout in data** | `mockData.js` holds content, not styling | 📦 |
| 🔗 **Single scroll owner** | Only the document scrolls; everything else `clip` | 📜 |
| ♿ **ARIA on interaction** | Every button has a label or `aria-expanded` | ♿ |
| 🪫 **Motion is optional** | Every loop respects `prefers-reduced-motion` | 🪫 |
| 🧹 **No dead imports** | Oxlint flags them; strip before commit | 🧹 |

---

## 🚀 Build & Deploy

| Script | Command | Icon |
|---|---|---|
| 💻 Dev | `npm run dev` | ▶️ |
| 📦 Build | `npm run build` → `dist/` | 🏗️ |
| 🔎 Lint | `npm run lint` | 🔍 |
| 👀 Preview | `npm run preview` | 🔭 |

**Vercel:** `vercel.json` rewrites all paths to `/index.html` so client-side
routing survives a hard refresh on `/portfolio`, `/store`, etc.

### 📊 Current bundle

| Asset | Raw | Gzip | Icon |
|---|---|---|---|
| Main JS | 411 kB | 131 kB | 📦 |
| CSS | 95 kB | 18 kB | 🎨 |
| Portfolio chunk | 34 kB | 8.5 kB | 🎓 |

> ⚠️ Largest remaining cost is imagery — `photo_one.png` alone is 1.2 MB.

---

## 🗂️ Component Map

| Component | Responsibility | Status | Icon |
|---|---|---|---|
| `Layout` | Shell, Lenis gate, ambient layers | ✅ Active | 🏗️ |
| `Navbar` | Desktop nav + animated mobile drawer | ✅ Active | ☰ |
| `HeroSection` | Copy, CTAs, 3D orbit stage | ✅ Active | 🌀 |
| `Footer` | Brand, links, scroll-to-top | ✅ Active | 🔻 |
| `ContactDrawer` | Slide-in contact form | ✅ Active | 📬 |
| `SkillsMarquee` | Infinite skill ticker | ✅ Active | 🎠 |
| `PageRevealer` | Curtain transition between routes | ✅ Active | 🎞️ |
| `ScrollProgress` | Top scroll bar | ✅ Active | 📊 |
| `TiltCard` | Card wrapper (currently no tilt) | ✅ Active | 🃏 |
| `ContactContext` | Drawer open/close state | ✅ Active | 🧠 |
| `RoleDial` | Wave-text role cycler | ⚫ Unused | 💬 |
| `ParallaxBackground` | Mouse-parallax shapes | ⚫ Unused | 🌌 |
| `SVGRope` | Scroll-linked rope path | ⚫ Unused | 🪢 |
| `TypingText` | Typewriter effect | ⚫ Unused | ⌨️ |
| `ContactSection` | Inline contact block | ⚫ Unused | ✉️ |

> ⚠️ Four components are imported nowhere. They cost nothing at runtime
> (tree-shaken) but they are dead code — delete or wire in.

---

## 📚 Document Set

| Doc | Answers | Icon |
|---|---|---|
| [`PRD.md`](PRD.md) | **What** + **Why** | 📄 |
| [`DESIGN.md`](DESIGN.md) | **How it should look and feel** | 🎨 |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **How** it is built | 🏗️ |
| [`RULES.md`](RULES.md) | The contract — how we work | 📏 |
| [`TASKS.md`](TASKS.md) | What ships next | ✅ |
| [`TEST.md`](TEST.md) | What was verified, and what was not | 🧪 |
| [`MEMORY.md`](MEMORY.md) | Current state + decision log | 🧠 |

> 💡 Source of truth for the theme is `src/index.css`; every doc carries an
> embedded stylesheet using the same dark palette.

---

**Remember:** ARCHITECTURE.md = **HOW**

