# 🍳 Whisk — Culinary Recipe Discovery

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-12.3.4-orange?style=for-the-badge&logo=pnpm&logoColor=white)
![Halal Safe](https://img.shields.io/badge/Dietary-Halal_&_Pork--Free-emerald?style=for-the-badge)

<p align="center">
  <a href="https://nextjs.org" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="34" height="34" alt="Next.js" /></a>&nbsp;&nbsp;
  <a href="https://react.dev" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="34" height="34" alt="React" /></a>&nbsp;&nbsp;
  <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="34" height="34" alt="TypeScript" /></a>&nbsp;&nbsp;
  <a href="https://tailwindcss.com" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="34" height="34" alt="Tailwind CSS" /></a>&nbsp;&nbsp;
  <a href="https://pnpm.io" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pnpm/pnpm-original.svg" width="34" height="34" alt="pnpm" /></a>&nbsp;&nbsp;
  <a href="https://motion.dev" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" width="34" height="34" alt="Motion" /></a>&nbsp;&nbsp;
  <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/shadcnui" width="32" height="32" alt="shadcn/ui" /></a>&nbsp;&nbsp;
  <a href="https://lucide.dev" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/lucide" width="32" height="32" alt="Lucide" /></a>&nbsp;&nbsp;
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="34" height="34" alt="Node.js" /></a>&nbsp;&nbsp;
  <a href="https://git-scm.com" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="34" height="34" alt="Git" /></a>
</p>

**A modern, aesthetic culinary discovery app built with Next.js 16, React 19, and Tailwind CSS v4.**  
Explore thousands of recipes from around the globe, follow interactive prep checklists, save favorites offline, and browse by cuisine or category — with an automated 100% Halal & pork-free filter.

</div>

---

## 🛠️ Tech Stack

| Icon | Technology | Version | Purpose |
| :---: | :--- | :--- | :--- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="26" height="26" alt="Next.js" /> | **Next.js** | `16.3.4` | App Router, Server Components & Route Handlers |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="26" height="26" alt="React" /> | **React** | `19.2.8` | Concurrent features & `useSyncExternalStore` |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="26" height="26" alt="TypeScript" /> | **TypeScript** | `^5` | Strict end-to-end type safety |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="26" height="26" alt="Tailwind CSS" /> | **Tailwind CSS** | `v4.0` | Modern CSS variable tokens & micro-animations |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pnpm/pnpm-original.svg" width="26" height="26" alt="pnpm" /> | **pnpm** | `12.3.4` | Fast, disk-efficient package manager |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" width="26" height="26" alt="Motion" /> | **Motion** | `^13.2.0` | Fluid physics-based animations (Framer Motion) |
| <img src="https://cdn.simpleicons.org/shadcnui" width="24" height="24" alt="Base UI / shadcn" /> | **Base UI / shadcn** | `^1.8.0` | Accessible component primitives (dialogs, sheets, badges) |
| <img src="https://cdn.simpleicons.org/lucide" width="24" height="24" alt="Lucide" /> | **Lucide React** | `^1.43.0` | Consistent, lightweight SVG iconography |
| <img src="https://api.iconify.design/lucide:utensils-crossed.svg?color=%23c25e2e" width="26" height="26" alt="TheMealDB API" /> | **TheMealDB API** | v1 Public | Open recipe, category, and ingredient dataset |

---

## ✨ Key Features

- **🎨 Rich Ambient UI**: Warm culinary aesthetic featuring floating particles, dot grids, and smooth reveal transitions (Magic UI + Motion).
- **🌟 Chef's Spotlight & Random CTA**: Daily highlighted recipe with illuminated borders (`BorderBeam`) and spontaneous meal discovery.
- **📋 Interactive Prep Checklist**: Check off ingredients as you prepare them and copy formatted lists to your clipboard with one click.
- **👣 Step-by-Step Directions**: Clear instruction cards with active step indicators and embedded YouTube video walkthroughs.
- **🌍 60+ World Cuisines**: Infinite scrolling marquee with high-definition national flag icons.
- **❤️ Instant Offline Favorites**: Reactive client storage using React 19 `useSyncExternalStore` for instant multi-tab synchronization.
- **🛡️ 100% Halal & Pork-Free Filter**: Multi-layer regex sanitizer automatically stripping pork and pork derivatives across titles, tags, and all 20 ingredient slots.
- **🚀 SEO Optimized**: Dynamic OpenGraph tags and valid `Schema.org/Recipe` JSON-LD rich snippets for Google Search.

---

## 📁 Project Structure

```text
whisk/
├── app/                  # Next.js App Router (pages & layouts)
│   ├── categories/       # Category directory & recipe lists
│   ├── cuisines/         # 60+ world cuisines with flag badges
│   ├── favorites/        # Saved recipes management
│   ├── recipes/          # Recipe detail & /random redirect
│   └── search/           # Real-time search by keyword
├── components/
│   ├── home/             # Hero, Spotlight, Marquee, CTA
│   ├── layout/           # Header, Footer, MobileNav
│   ├── recipes/          # Checklist, StepCards, RecipeGrid
│   ├── shared/           # SearchInput, EmptyState
│   └── ui/               # Magic UI & shadcn design primitives
├── hooks/                # useFavorites hook (useSyncExternalStore)
└── lib/themealdb/        # API client, Pork-filter, Queries & Types
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `18.18.0` or later (LTS recommended)
- **Package Manager**: `pnpm` (recommended), `npm`, `yarn`, or `bun`

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/z3i0/whisk.git
cd whisk

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

> [!NOTE]
> **No API Key Required**: Whisk uses TheMealDB's public endpoints out of the box.

---

## ⚡ Available Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server |
| `pnpm build` | Compiles the production build & validates TypeScript |
| `pnpm start` | Runs the compiled production application |
| `pnpm lint` | Checks code quality and formatting with ESLint |

---

<div align="center">

Made with ❤️ for home cooks & food lovers worldwide.

</div>


