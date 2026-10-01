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

# ✅ Tasks

> **Project:** `ashutosh.dev` Portfolio
> **Last updated:** 28 Sep 2026
> **Legend:** 🔴 blocker · 🟡 should · 🟢 could · ⚫ done


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md)

---

## ✅ Phase 0 — Foundation *(complete)*

- [x] ⚫ 🚀 Scaffold Vite + React 19
- [x] ⚫ 🎨 Wire Tailwind CSS v4 via `@tailwindcss/vite`
- [x] ⚫ 🎞️ Add Framer Motion
- [x] ⚫ 🧭 Add React Router with lazy routes
- [x] ⚫ 🌊 Add Lenis smooth scroll
- [x] ⚫ 🎭 Add Lucide icons
- [x] ⚫ 🔎 Add Oxlint
- [x] ⚫ 🔧 Configure Vercel SPA rewrites
- [x] ⚫ 🔒 Add `.gitignore`

---

## ✅ Phase 1 — Core Pages *(complete)*

- [x] ⚫ 🏠 MainSite landing
- [x] ⚫ 🌀 3D hero stage with orbit rings + tech badges
- [x] ⚫ 🎓 Portfolio — projects, skills, experience, education
- [x] ⚫ 📝 Notes index
- [x] ⚫ ▶️ YouTube showcase
- [x] ⚫ 🗄️ Code Vault store
- [x] ⚫ 📚 Projects index
- [x] ⚫ 🔻 Footer with portfolio CTA
- [x] ⚫ 📬 Contact drawer with form
- [x] ⚫ 🎞️ Page-reveal route transitions

---

## ✅ Phase 2 — Responsive Overhaul *(complete)*

### 📐 Layout
- [x] ⚫ 🔍 8-tier breakpoint ladder
- [x] ⚫ 📏 `dvh` height chain — no footer overscroll
- [x] ⚫ ✂️ `overflow-x: clip` — no dual scrollbars
- [x] ⚫ 🧱 `minmax(0, 1fr)` — children shrink correctly
- [x] ⚫ 🌀 `--stage-scale` ladder
- [x] ⚫ 🎠 Marquee off `100vw`; icons + text scale down

### ☰ Navigation
- [x] ⚫ 🍔 Animated drawer
- [x] ⚫ 🧭 **Drawer links navigate** *(real bug fixed)*
- [x] ⚫ 🔒 `html` + `body` scroll lock
- [x] ⚫ ⌨️ Escape / route / breakpoint auto-close
- [x] ⚫ ♿ Full ARIA
- [x] ⚫ 🚫 Portfolio link removed from nav

### 🎴 Cards
- [x] ⚫ 🗄️ Vault panel scroll + pinned CTAs
- [x] ⚫ 🗑️ Descriptions removed from landing + vault
- [x] ⚫ 🔘 "See more" matches "Repository"
- [x] ⚫ 📜 Certificate carousel no top clipping
- [x] ⚫ ▶️ Video badge no right clipping
- [x] ⚫ 🎓 Portfolio meta rows wrap, footers stack

### 🎨 Centring
- [x] ⚫ ✨ Hero + stat row centred ≤900px
- [x] ⚫ 📑 All section titles centred
- [x] ⚫ 🔥 768px override conflict resolved

---

## 🚧 Phase 3 — Performance & Testing *(in progress)*

### 📦 Performance
- [ ] 🔴 📦 Convert `photo_one.png` (1.2 MB) → WebP/AVIF
- [ ] 🔴 📦 Convert 3 vault thumbnails → WebP/AVIF
- [ ] 🟡 🖼️ Add responsive `srcset` + `sizes` to hero images
- [ ] 🟡 📏 Add explicit `width`/`height` to kill CLS
- [ ] 🟢 🧹 Delete 4 unused components
- [ ] 🟢 🕸️ Remove unused `RevealingCard` import
- [ ] 🟢 📦 Rename `package.json` → real project name
- [ ] 🟢 🔢 Add a bundle-size budget to CI

### 🧪 Testing
- [x] ⚫ 🏗️ Test 1 — Build & Lint Gate
- [x] ⚫ 📐 Test 2 — Responsive Integrity Scan
- [x] ⚫ 📝 Publish results to [`TEST.md`](TEST.md)
- [ ] 🔴 🧪 Add Vitest + Testing Library
- [ ] 🔴 🖥️ Playwright viewport sweep (320 → 1920px, `scrollWidth`)
- [ ] 🟡 🖱️ Playwright drawer interaction spec
- [ ] 🟡 ♿ axe-core accessibility audit
- [ ] 🟡 🚀 Lighthouse budget (`lighthouserc`)
- [ ] 🟢 📸 Visual regression snapshots at 4 widths
- [ ] 🟢 ⚙️ Wire both tests into `npm test` so they can't be skipped

### 📚 Documentation
- [x] ⚫ 🌙 Dark theme applied to all `.md` files
- [x] ⚫ 🔗 Cross-link all 7 docs
- [x] ⚫ 🧹 Resolve the dangling `DECISIONS.md` reference
- [ ] 🟢 🖼️ Add a docs index README

---

## 🌱 Phase 4 — Content *(backlog)*

- [ ] 🟢 📝 Expand Notes content
- [ ] 🟢 ▶️ Add more YouTube entries
- [ ] 🟢 🗄️ Add more Code Vault products
- [ ] 🟡 🧾 Wire the Store CTAs to a real checkout
- [ ] 🟡 📄 Add OG/Twitter meta images

---

## 🚀 Phase 5 — Growth *(future)*

- [ ] ⚪ ☀️ Light theme variant
- [ ] ⚪ 📊 Analytics (privacy-respecting)
- [ ] ⚪ 🔍 SEO: sitemap, structured data
- [ ] ⚪ 🌐 Multi-language (i18n)

---

## 🔁 Workflow

```
🔍 Pick smallest unchecked task
   ↓
🗺️ Plan (read docs/, grep existing code)
   ↓
💻 Implement — scoped, token-based, responsive
   ↓
🧪 Verify at 360 / 768 / 1024 / 1440px
   ↓
✅ npm run lint  →  0 errors
   ↓
📦 npm run build →  succeeds
   ↓
🧭 Smoke-test all 6 routes
   ↓
📝 Update PRD / MEMORY / TASKS
   ↓
👋 Small commit
```

---

## 📋 ID Convention

| Format | Meaning | Icon |
|---|---|---|
| `TASK-0NN` | Sequential task ID | 🆔 |
| `[ ] 🔴` | Blocker — do first | 🔴 |
| `[ ] 🟡` | Should do this cycle | 🟡 |
| `[ ] 🟢` | Could do when idle | 🟢 |
| `[x] ⚫` | Complete | ⚫ |

**Current task:** `TASK-024` — image optimisation

