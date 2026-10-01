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

# 📏 Development Rules

> **Project:** `ashutosh.dev` Portfolio
> **Enforcement:** `npm run lint` (Oxlint) + `npm run build`
> **Last updated:** 28 Sep 2026


> 📚 **Docs:** [PRD](PRD.md) · [Design](DESIGN.md) · [Architecture](ARCHITECTURE.md) · [Rules](RULES.md) · [Tasks](TASKS.md) · [Tests](TEST.md) · [Memory](MEMORY.md)

---

## 🧭 General

| Rule | Rationale | Icon |
|---|---|---|
| 📝 **JSX, not TSX** | This project is plain JavaScript — match it | 🔤 |
| ♻️ **Reuse before writing** | Check `components/` first | ♻️ |
| 🚫 **No duplicated logic** | Extract, don't copy-paste | 🚫 |
| 🪶 **Small functions** | One concern per function | 🪶 |
| 🎯 **Scoped changes** | Don't touch unrelated files | 🎯 |

> ⚠️ `RULES.md` in earlier drafts demanded TypeScript. That was a different
> project. **This codebase is JavaScript** — do not migrate it unasked.

---

## 🔎 Before Coding

| # | Step | Icon |
|---|---|---|
| 1 | 📚 Read the relevant doc in `docs/` | 📚 |
| 2 | 🔍 Grep for existing implementation | 🔍 |
| 3 | ♻️ Reuse what already works | ♻️ |
| 4 | 🗺️ Plan anything touching layout | 🗺️ |
| 5 | 📐 Identify the breakpoint tier affected | 📐 |

---

## 🎨 UI Rules

### 🖌️ Styling
- ✅ Use tokens from `src/index.css` — never a literal hex
- ✅ Use Tailwind utilities or semantic classes, not new one-off CSS
- ✅ Prefer existing classes: `.card-body`, `.card-title`, `.card-meta-row`,
  `.card-footer`, `.card-actions`, `.page-stack`, `.app-content`
- 🚫 No inline `style` on layout properties — it defeats media queries
- 🚫 No new breakpoints outside the 8-tier ladder

### 📐 Responsiveness
- ✅ Size with `clamp()`, `%`, `fr`, `dvh` — not fixed `px`
- ✅ Grid tracks use `minmax(0, 1fr)` so children can shrink
- ✅ Verify at 360px, 768px, 1024px and 1440px before committing
- 🚫 Never introduce horizontal overflow
- 🚫 Never create a second scroll container

### 🧠 UX
- ✅ Every data view has loading, empty and error states
- ✅ Touch targets ≥ 44px
- ✅ Icon **and** text for every status — never colour alone
- ✅ `aria-label` on icon-only buttons
- 🚫 No content hidden behind an animation

### 🪫 Motion
- ✅ Respect `prefers-reduced-motion`
- ✅ Pause loops when off-screen
- 🚫 Nothing over 400ms
- 🚫 Scroll-hijacking on touch devices

---

## 🔒 Security

| Rule | Detail | Icon |
|---|---|---|
| 🚫 **No secrets in the client** | No API keys, tokens or `.env` values in `src/` | 🔑 |
| 🚫 **No `dangerouslySetInnerHTML`** | Untrusted HTML is an XSS vector | ☠️ |
| ✅ **Validate any input** | Even client-side | ✅ |
| ✅ **`target="_blank"` needs `rel="noopener noreferrer"`** | Prevent tabnabbing | 🔗 |
| ✅ **External links declare their type** | Mark clearly for users | 🏷️ |

---

## 🧪 Verification Gate

Every change must pass both before it is considered done:

```bash
npm run lint    # must report 0 errors
npm run build   # must complete without error
```

Results are recorded in [`TEST.md`](TEST.md) — see the [latest run](TEST.md).

| Check | Target | Icon |
|---|---|---|
| 🧹 Lint errors | `0` | ✅ |
| ⚠️ Lint warnings | Don't increase | ⚠️ |
| 📦 Build | Succeeds | 🏗️ |
| 🌐 Routes | All return `200` | 🧭 |
| 📏 Overflow | `0px` at 320px | 📐 |

> 🧪 No test runner is configured. Today the gate is **Test 1** (build + lint)
> and **Test 2** (static responsive scan) — both run manually. Adding Vitest
> is on the roadmap; see [Phase 3](TASKS.md).

---

## 📸 Git

| Rule | Icon |
|---|---|
| 🧩 Small, focused commits | 🧩 |
| ✍️ Descriptive messages | ✍️ |
| 🚫 No secrets, no `.env` | 🚫 |
| 🚫 No committed `dist/` or `node_modules/` | 🚫 |
| ✅ Lint before every push | ✅ |

**Commit style:** `type(scope): summary`
`fix(navbar): route on mobile drawer tap`

---

## 🗂️ Documentation

| When | Update | Icon |
|---|---|---|
| Ship a feature | `PRD.md` ✅ checkboxes | 📄 |
| Change the theme | `DESIGN.md` tokens | 🎨 |
| Add/remove a route | `ARCHITECTURE.md` route table | 🏗️ |
| Finish a task | `TASKS.md` + `MEMORY.md` | ✅ |
| Run a test | `TEST.md` report | 🧪 |
| Decide something permanent | `MEMORY.md` → Decisions Log | 🧠 |

> 📌 `MEMORY.md` = current state **+** the permanent Decisions Log.
> There is no separate `DECISIONS.md` — permanent *why* decisions live in
> the Decisions Log table, so there is exactly one place to look.

---

**Remember:** RULES.md = **THE CONTRACT**

