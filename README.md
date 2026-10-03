# 🌌 ashutosh.dev — Portfolio

> **Dark-mode-first personal portfolio SPA.** React 19 + Vite 8 + Tailwind CSS v4.
> Static build, client-side routing, no backend.

[![Build](https://img.shields.io/badge/build-passing-31d39a?style=flat-square)](#-scripts)
[![Lint](https://img.shields.io/badge/lint-0%20errors-31d39a?style=flat-square)](#-scripts)
[![License](https://img.shields.io/badge/license-MIT-6c7590?style=flat-square)](#-license)

---

## 📸 What it is

A single-page portfolio presenting engineering capability through a 3D hero
stage, verified credentials and a sellable code vault.

| Route | Page | What it does | Icon |
|---|---|---|---|
| `/` | `MainSite` | Hero, 3D orbit stage, skills marquee, contact drawer | 🏠 |
| `/portfolio` | `Portfolio` | Resume, experience, education, certificates | 🎓 |
| `/projects` | `Projects` | Project index with expandable cards | 📚 |
| `/notes` | `Notes` | Snippets and reference library | 📝 |
| `/videos` | `Videos` | Curated video tutorials | ▶️ |
| `/video/<playlist_name>` | `PlaylistVideo` | Numbered episode list for one series | 🎞️ |
| `/store` | `Store` | Code Vault — purchasable architecture bundles | 🗄️ |

All routes are `React.lazy` code-split and prefetched on link hover.

---

## 🛠️ Tech stack

| Layer | Choice |
|---|---|
| UI runtime | React 19 |
| Build | Vite 8 (Rollup/Rolldown) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no JS config) |
| Animation | Framer Motion |
| Routing | React Router 7 |
| Icons | Lucide React |
| Lint | Oxlint |
| Hosting | Vercel (static + SPA rewrites) |

> 🌊 **Smooth scrolling** is native — Lenis was removed in v2.1 so the document
> is the single scroll owner and `overflow-x: clip` behaves predictably.

---

## 🚀 Scripts

```bash
npm install       # install dependencies
npm run dev       # start the dev server (HMR)
npm run lint      # oxlint — must report 0 errors
npm run build     # vite build → dist/
npm run preview   # serve the production build locally
```

> ✅ **Verification gate:** every change must pass `npm run lint` (0 errors)
> **and** `npm run build` before it is considered done.

---

## 📂 Project structure

```
src/
├── components/     Reusable UI (Navbar, HeroSection, TiltCard, …)
├── pages/          Route-level screens (lazy loaded)
├── api/            Data access layer + bundled mockData.js
├── context/        React context (ContactContext)
├── assets/         Imported images
├── index.css       Design tokens + all styling
├── App.jsx         Router + lazy routes + prefetchRoute()
└── main.jsx        Entry point

public/             Static assets (favicon, resume.pdf, icons.svg)
DOCS/               Product & engineering documentation
```

> 📌 Flat by design — six routes do not justify `features/` or `services/`
> directory depth.

---

## 📚 Documentation

Full documentation lives in [`DOCS/`](DOCS/). Each file answers one question:

| Doc | Answers | Icon |
|---|---|---|
| [PRD.md](DOCS/PRD.md) | **What** we are building and **why** | 📄 |
| [DESIGN.md](DOCS/DESIGN.md) | **How it should look and feel** | 🎨 |
| [ARCHITECTURE.md](DOCS/ARCHITECTURE.md) | **How** it is built | 🏗️ |
| [RULES.md](DOCS/RULES.md) | The contract — how we work | 📏 |
| [TASKS.md](DOCS/TASKS.md) | What ships next | ✅ |
| [TEST.md](DOCS/TEST.md) | What was verified, and what was not | 🧪 |
| [MEMORY.md](DOCS/MEMORY.md) | Current state + decision log | 🧠 |
| [OPTIMIZATION_HISTORY.md](DOCS/OPTIMIZATION_HISTORY.md) | Every optimisation, with before/after numbers | ⚡ |
| [HISTORY.md](DOCS/HISTORY.md) | Every change shipped, and why | 📜 |

> 💡 `src/index.css` is the source of truth for the theme; every doc carries an
> embedded stylesheet using the same dark palette.

---

## ☀️ Light theme

Not implemented, and intentionally so — the portfolio is dark-first. A light
variant would dilute the identity. See [PRD.md](DOCS/PRD.md#-out-of-scope).

---

## 📄 License

MIT © Ashutosh Prasad
