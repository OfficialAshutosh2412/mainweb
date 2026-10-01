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

# 🎨 Design System

> **Project:** `ashutosh.dev` Portfolio
> **Mode:** 🌙 Dark mode only — dark-first, no light variant
> **Source of truth:** `src/index.css` (`:root` + `@theme`)
> **Last updated:** 28 Sep 2026


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md)

---

## 🖌️ Style

| Pillar | Meaning | Icon |
|---|---|---|
| 🏗️ **Engineered** | Precision, grid discipline, technical honesty | 📐 |
| 🌑 **Cinematic** | Deep space, ambient glow, light in darkness | 🎬 |
| ⚡ **Alive** | Motion with purpose, never decoration for its own sake | 🎞️ |
| 🎯 **Focused** | One idea per screen, strong hierarchy | 🔍 |
| ♿ **Inclusive** | Keyboard, screen reader, reduced-motion | 🤝 |

**Anti-patterns:** ❌ neon-on-black cliché · ❌ glassmorphism everywhere ·
❌ animation that delays content · ❌ colour used decoratively

---

## 🔤 Typography

Three families, each with a distinct job.

| Role | Family | Weight | Icon |
|---|---|---|---|
| **Body** | `DM Sans` | 400 – 700 | 📝 |
| **Display / Headings** | `Space Grotesk` | 300 – 700 | 🔠 |
| **Code / Labels** | `JetBrains Mono` | 100 – 800 | 🖥️ |

### Scale (fluid)

| Element | Size | Line height | Icon |
|---|---|---|---|
| 🏆 Hero `h1` | `clamp(2.1rem, 8.4vw, 4.5rem)` | 1.04 | 🌀 |
| 📑 Section `h2` | `clamp(1.45rem, 6.8vw, 3.55rem)` | 1.0 | 📐 |
| 🏷️ Eyebrow | `9 – 10px` mono, `0.12em` tracking | 1.4 | 🔖 |
| ✏️ Body | `14 – 15px` | 1.7 | 📝 |
| 🔬 Card body | `12 – 14px` | 1.65 | 🗂️ |

> 💡 `clamp()` everywhere — headings scale with the viewport, so nothing
> overflows and nothing is unreadably small on a 320px phone.

---

## 🎨 Colour — Dark Theme

### 🌑 Surface ramp

| Token | Value | Use | Icon |
|---|---|---|---|
| `--void` | `#090a0f` | Page background | 🌌 |
| `--surface` | `#10131c` | Elevated sections | 🧊 |
| `--card` | `#171b27` | Card fill | 🗂️ |
| `--card-raised` | `#1c2130` | Hover / raised card | ⬆️ |

### ✍️ Text ramp

| Token | Value | Contrast on `--void` | Icon |
|---|---|---|---|
| `--text` | `#f7f8fb` | ~17.4:1 ✅ AAA | 🔆 |
| `--muted` | `#98a2b7` | ~7.6:1 ✅ AAA | 📉 |
| `--faint` | `#657087` | ~4.3:1 ✅ AA | ▪️ |

### 🌈 Accents

| Token | Value | Role | Icon |
|---|---|---|---|
| `--purple` | `#7654e8` | Primary brand | 🟣 |
| `--purple-bright` | `#9c87ff` | Headings, gradient text | 💜 |
| `--azure` | `#32a7ee` | Architecture / flow | 🔵 |
| `--cyan` | `#22d3ee` | Metrics, highlights | 🩵 |

---

## 🧩 Components

| Component | Radius | Icon | Notes |
|---|---|---|---|
| 🃏 Card | `12 – 16px` | ▢ | `--card` fill + `--line` border |
| 🔘 Button | `7 – 8px` | 🔵 | 44px min touch height |
| 🏷️ Pill / Badge | `100px` pill | 💊 | Mono, uppercase, letter-spaced |
| 🗄️ Vault card | `16px` | 🗃️ | Fixed frame, scrollable panel |
| 📜 Certificate | `11px` | 🖼️ | 3D carousel, spring-driven |
| 🪟 Drawer | `0` (edge) | 📬 | Slides from right, `z-50` |
| 🧭 Mobile drawer | `0` | ☰ | Height-animated, staggered rows |

### 🔘 Button variants

| Variant | Style | Icon |
|---|---|---|
| `button-primary` | Purple→azure gradient + glow | ⭐ |
| `button-quiet` | Transparent + `--line-bright` border | 🤫 |
| `btn-slide-blue` | Gradient with slide-in hover sheen | 🎢 |

---

## 🎞️ Motion

| Property | Value | Icon |
|---|---|---|
| ⏱️ Duration | `0.18 – 0.4s` | ⏳ |
| 🌊 Easing | `cubic-bezier(.16, 1, .3, 1)` | 📈 |
| 🍔 Drawer spring | `stiffness 380, damping 34` | 🌀 |
| 🎞️ Page reveal | `~260ms` curtain | 🎬 |
| ♿ Reduced motion | Opacity fade only | 🪫 |

### Rules
- 🚫 Nothing animates longer than `400ms`
- 🚫 Content is never hidden behind an animation
- ✅ Every loop pauses when off-screen (`IntersectionObserver`)
- ✅ `prefers-reduced-motion` disables all decorative loops globally

---

## 📐 Responsive System

| Breakpoint | Target | Icon |
|---|---|---|
| `≤ 1280px` | Laptop | 💻 |
| `≤ 1080px` | Tablet landscape | 📊 |
| `≤ 900px` | Tablet portrait — hero stacks, 3D leads | 📱 |
| `≤ 768px` | Mobile nav collapses to drawer | ☰ |
| `≤ 640px` | Large phone | 📲 |
| `≤ 520px` | Standard phone | 📱 |
| `≤ 400px` | Small phone | 📱 |
| `≤ 360px` | Smallest supported (320px floor) | 📱 |
| landscape + `≤560px` height | Short viewport | ↔️ |

### 🌀 The 3D stage ladder

The stage scales as a whole via a single custom property.

| Breakpoint | `--stage-scale` | Icon |
|---|---|---|
| Desktop | `1` | 🖥️ |
| `≤ 1280px` | `.92` | 💻 |
| `≤ 1080px` | `.78` | 📊 |
| `≤ 900px` | `.86` | 📱 |
| `≤ 640px` | `.80` | 📲 |
| `≤ 520px` | `.68` | 📱 |
| `≤ 400px` | `.60` | 📱 |
| `≤ 360px` | `.54` | 📱 |

> 💡 One variable scales orbits, avatar and badges together — no per-element
> repositioning needed at each breakpoint.

---

## 🧠 UX Requirements

### 📱 Responsiveness
- [x] 📐 Zero horizontal scroll from 320px → ultrawide
- [x] 📐 Exactly one vertical scrollbar, always
- [x] 📐 No overscroll / phantom space below the footer
- [x] 📐 No content clipped at the top of any container
- [x] 📐 Touch targets ≥ 44px
- [x] 📐 Mobile hero shows the 3D stage first
- [x] 📐 Hero, stats and section titles centre on small screens

### ⏳ States — every data view needs all four

| State | Purpose | Icon |
|---|---|---|
| ⏳ **Loading** | Skeleton / spinner, no layout shift | 🔄 |
| 🗃️ **Empty** | Friendly message + primary CTA | 📭 |
| ⚠️ **Error** | Human message + retry | 🚨 |
| ✅ **Success** | Confirmation, auto-dismiss | 🎉 |

### ♿ Accessibility
- [x] ♿ Keyboard navigation — drawer closes on `Escape`
- [x] ♿ ARIA — `aria-expanded`, `aria-controls`, `aria-current`, `aria-label`
- [x] ♿ Focus-visible rings on interactive elements
- [x] ♿ Decorative glows are `aria-hidden`
- [x] ♿ Text contrast meets WCAG AA minimum
- [x] ♿ Colour is never the only signal (badges pair icon + text)

### 🖱️ Interaction states
`hover` → `focus-visible` → `active` → `disabled` → `loading` → `error`

> ⚠️ Hover lifts are scoped to `@media (hover: hover) and (pointer: fine)`
> so touch devices never get a stuck hover state.

---

**Remember:** DESIGN.md = **HOW IT SHOULD LOOK AND FEEL**

| `--green` | `#31d39a` | Success, verified, live | 🟢 |
| `--orange` | `#f3a363` | Warning, medium priority | 🟠 |

### 📏 Borders

| Token | Value | Use | Icon |
|---|---|---|---|
| `--line` | `rgba(255,255,255,.09)` | Default divider | ➖ |
| `--line-bright` | `rgba(255,255,255,.16)` | Hover / emphasis | ➕ |

> ⚠️ **Never** hard-code a hex in a component — always use a token so the
> theme stays editable from one place.

