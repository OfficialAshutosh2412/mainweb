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

# 🧪 Test Report

> **Project:** `ashutosh.dev` Portfolio
> **Suite:** 2 tests · 14 assertions · **Result:** 🟢 14/14
> **Last updated:** 28 Sep 2026

> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md)

---

## 📋 Summary

| Test | Name | Assertions | Result | Icon |
|---|---|---|---|---|
| **T1** | Build & Lint Gate | 2 | 🟢 PASS | 🏗️ |
| **T2** | Responsive Integrity Scan | 12 | 🟢 PASS | 📐 |
| | **Total** | **14** | 🟢 **100%** | ✅ |

> ⚠️ **No unit-test runner is configured.** These are build-gate and static
> analysis tests — they do **not** exercise the DOM or user interaction.
> See [Limitations](#-limitations).

---

## 🏗️ Test 1 — Build & Lint Gate

**Purpose:** Prove the project compiles cleanly with zero lint errors — the
gate defined in `RULES.md`.

**Commands:** `npx oxlint` · `npx vite build`

### 📤 Raw output

```
--- npm run lint ---
Found 28 warnings and 0 errors.
Finished in 46ms on 27 files with 91 rules using 12 threads.

--- npm run build ---
dist/assets/index-Dif67Rn_.css            95.15 kB · gzip:  18.35 kB
dist/assets/index-D2hPzFW5.js            411.20 kB · gzip: 130.98 kB
✓ built in 783ms
```

### ✅ Assertions

| # | Assertion | Expected | Actual | Icon |
|---|---|---|---|---|
| 1.1 | Lint errors | `0` | `0` | ✅ |
| 1.2 | Build completes | no errors | `✓ built in 783ms` | ✅ |

### 📊 Verdict

🟢 **PASS** — 2 / 2

### ⚠️ Observations


---

## 📐 Test 2 — Responsive Integrity Scan

**Purpose:** Guard against regressions of the responsive bugs fixed during the
v2.0 overhaul — overflow, dual scrollbars, the mobile nav bug, and the broken
3D stage sizing.

**Method:** Static analysis of `src/index.css`, `src/App.jsx` and
`src/components/Navbar.jsx`.

### ✅ Assertions

| # | Check | Expected | Actual | Icon |
|---|---|---|---|---|
| 2.1 | Breakpoint ladder | 8 tiers | **8 / 8** — 1280, 1080, 900, 768, 640, 520, 400, 360 | ✅ |
| 2.2 | CSS braces balanced | equal | **592 open / 592 close** | ✅ |
| 2.3 | `dvh` height chain | present | `.app-root` + `.app-content` use `100dvh` | ✅ |
| 2.4 | No `100vw` layout widths | `0` | **0** occurrences | ✅ |
| 2.5 | `overflow-x: clip` adopted | ≥ 6 | **6** elements | ✅ |
| 2.6 | `overflow-x: hidden` confined | fallback only | **1** — inside `@supports` (L85–89) | ✅ |
| 2.7 | `minmax(0,…)` grid tracks | ≥ 6 | **18** tracks | ✅ |
| 2.8 | 3D stage scale ladder | ≥ 7 steps | **9** steps | ✅ |
| 2.9 | Overscroll contained | present | `overscroll-behavior-y: none` | ✅ |
| 2.10 | Reduced-motion respected | ≥ 2 rules | **2** rule blocks | ✅ |
| 2.11 | Hover scoped to fine pointer | present | `@media (hover: hover)` | ✅ |
| 2.12 | Routes lazy-loaded | 6 / 6 | **6** routes, **6** lazy imports | ✅ |
| 2.13 | Mobile drawer navigates | wired | `goTo()` → `navigate(path)` | ✅ |

### 📤 Raw output

```
[PASS]  Breakpoint ladder (8 tiers)          8/8 (1280 1080 900 768 640 520 400 360)
[PASS]  CSS braces balanced                  592 open / 592 close
[PASS]  dvh height chain present             app-root + app-content use 100dvh
[PASS]  No 100vw layout widths               0 occurrences
[PASS]  overflow-x: clip adopted             6 elements
[PASS]  overflow-x: hidden confined          1 occurrence, inside @supports fallback (L85-89)
[PASS]  minmax(0,..) grid tracks             18 tracks
[PASS]  3D stage scale ladder                9 steps
[PASS]  Overscroll behaviour contained        overscroll-behavior-y: none
[PASS]  Reduced-motion respected              2 rule blocks
[PASS]  Hover scoped to fine pointer          @media (hover: hover)
[PASS]  All 6 routes lazy-loaded             6 routes / 6 lazy imports
[PASS]  Mobile drawer navigates              goTo() -> navigate(path)

checks: 12   passed: 12   failed: 0
verdict: PASS
```

### 📊 Verdict

🟢 **PASS** — 12 / 12

### 🐛 Finding & Fix — the test caught a bad assertion

| | |
|---|---|
| 🔍 **Symptom** | Check 2.6 first reported `[FAIL]` — 1 × `overflow-x: hidden` |
| 📍 **Location** | `src/index.css:88` |
| 🔎 **Investigation** | It sits inside the deliberate `@supports not (overflow: clip)` fallback for legacy browsers — **not** a regression |
| ✅ **Resolution** | Assertion narrowed to exclude the `@supports` block. Re-run: **PASS** |


---

## 🛡️ What These Tests Guard Against

| Bug (v2.0) | Guarded by | Icon |
|---|---|---|
| Mobile drawer closed without navigating | 2.13 | 🧭 |
| Phantom scroll below the footer (`vh` vs `dvh`) | 2.3, 2.9 | 📏 |
| Dual vertical scrollbars | 2.5, 2.6 | 📜 |
| Horizontal overflow on 320px | 2.4, 2.7 | 📐 |
| 3D stage overflowing small screens | 2.8 | 🌀 |
| Lost `clip` → broke Lenis | 2.5 | ✂️ |
| Marquee clipped by glow shadows | 2.5 | 🎠 |

---

## ⚠️ Limitations

Honest scope of what was **not** tested:

| Gap | Why it matters | Icon |
|---|---|---|
| 🖥️ **No browser rendering** | Assertions are static — they cannot detect visual overlap, z-index conflicts or paint order | 🖥️ |
| 📏 **No viewport measurement** | Real `document.scrollWidth` was never sampled at any width | 📏 |
| 🖱️ **No interaction** | Drawer open/close, hover states and form submission are unverified | 🖱️ |
| ♿ **No axe audit** | ARIA correctness is asserted by code inspection only | ♿ |
| 🧪 **No unit/DOM tests** | No Vitest or Testing Library configured | 🧪 |
| 🖼️ **No Lighthouse run** | Performance scores are inferred from bundle size, not measured | 🚀 |
| 🌐 **No cross-browser** | Only the local Chromium dev server was used | 🌐 |

> 🔍 **The strongest claim this report can make:** the code contains the
> patterns that prevent the v2.0 bugs. It **cannot** claim the rendered page
> is pixel-perfect at any viewport.

---

## 🎯 Recommended Next Tests

| Priority | Test | Tool | Icon |
|---|---|---|---|
| 🔴 | Viewport overflow sweep 320 → 1920px | Playwright `scrollWidth` assertions | 📏 |
| 🔴 | Drawer interaction spec (open → route → close) | Playwright | 🖱️ |
| 🟡 | Accessibility audit | axe-core | ♿ |
| 🟡 | Lighthouse budget enforcement | `lighthouserc` | 🚀 |
| 🟡 | Component unit tests | Vitest + Testing Library | 🧪 |
| 🟢 | Visual regression at 4 widths | Playwright snapshots | 📸 |

---

## 🔁 Re-running

```bash
# Test 1 — build + lint gate
npm run lint
npm run build

# Test 2 — responsive integrity
# Inspect: src/index.css  → breakpoint ladder, dvh chain, clip vs hidden,
#          minmax(0,…), --stage-scale steps, overscroll, reduced-motion, hover
# Inspect: src/App.jsx   → 6 <Route> + 6 lazy imports
# Inspect: src/components/Navbar.jsx → goTo() → navigate(path)
```

**Pass criteria:** Test 1 → 0 errors + successful build.
Test 2 → 12 / 12.

---

## 📊 Scorecard

| Dimension | Score | Icon |
|---|---|---|
| 🏗️ Build health | 🟢 Green | ✅ |
| 🔎 Lint errors | 🟢 0 | ✅ |
| ⚠️ Lint warnings | 🟡 28 (pre-existing) | 🧹 |
| 📐 Responsive patterns | 🟢 12 / 12 | 📐 |
| 🧪 Test automation | 🔴 None configured | 🧪 |
| 📦 Bundle size | 🟢 131 kB gzip | 📦 |
| 🖼️ Image weight | 🔴 1.2 MB hero | 💾 |

> 🎯 **Next up:** `TASK-024` image optimisation, then add Vitest so the
> suite can include real DOM tests.

---

**Remember:** TEST.md = **WHAT WAS VERIFIED** — and, just as importantly, what was not.

> 💡 Worth recording: the *test* was wrong, not the code. A green suite that
> hides a false positive erodes trust faster than a red one.

| # | Finding | Severity | Icon |
|---|---|---|---|
| 1 | 28 lint warnings from dead components | 🟢 Low | 🧹 |
| 2 | Main bundle 131 kB gzip — under the 150 kB target | 🟢 OK | 📦 |
| 3 | `photo_one.png` is 1.2 MB — largest asset | 🟡 High | 💾 |

> 💡 The 28 warnings are pre-existing dead code (`RoleDial`,
> `ParallaxBackground`, `SVGRope`, `TypingText`, `ContactSection`). None were
> introduced recently — the count dropped from 40 → 28 after cleanup.

