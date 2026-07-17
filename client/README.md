# IndustrialOS — Next.js

Industrial factory monitoring dashboard, migrated from Vite + Express to **Next.js 14** (App Router).

## What changed from the React/Vite version

| Before (Vite + Express) | After (Next.js) |
|---|---|
| `server.ts` — custom Express server | Next.js API Routes (`app/api/**`) |
| `vite.config.ts` + `index.html` | Native Next.js bundling |
| `src/main.tsx` entry point | `app/page.tsx` (App Router) |
| `src/App.tsx` | `app/page.tsx` (same logic) |
| Global state in `server.ts` | `src/lib/store.ts` (singleton module) |
| Tailwind v4 (Vite plugin) | Tailwind v3 (PostCSS, Next.js standard) |

## Getting started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# → Add your GEMINI_API_KEY to .env.local

# Run in development
npm run dev

# Build for production
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx          ← Root HTML layout
  page.tsx            ← Main dashboard UI (was App.tsx + main.tsx)
  globals.css
  api/
    factory/
      state/route.ts         ← GET  /api/factory/state
      machine/control/route.ts ← POST /api/factory/machine/control
      maintenance/route.ts   ← POST /api/factory/maintenance
      inventory/restock/route.ts ← POST /api/factory/inventory/restock
      alerts/dismiss/route.ts ← POST /api/factory/alerts/dismiss
    reports/generate/route.ts ← POST /api/reports/generate
    ai/insights/route.ts      ← POST /api/ai/insights (Gemini)

src/
  components/          ← UI components (all "use client")
    Sidebar.tsx
    Header.tsx
    AlertCenter.tsx
    DashboardView.tsx
    SecondaryViews.tsx
  lib/
    store.ts           ← In-memory factory state (replaces server.ts globals)
  types/
    index.ts           ← Shared TypeScript interfaces
```

## Deployment

This app is ready to deploy on **Vercel** with zero config. Just connect your repo and add `GEMINI_API_KEY` as an environment variable in the Vercel dashboard.
