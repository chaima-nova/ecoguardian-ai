# EcoGuardian AI — City Intelligence & Early-Warning System

A desktop-first UI/UX prototype for EcoGuardian AI, a research/experimental
city intelligence system. **No fabricated data is used anywhere** — every
screen shows real data (once connected), an honest loading state, or a
clearly labeled illustrative example.

## Stack

- React + TypeScript + Vite
- React Router (client-side navigation between the 7 product screens)
- Tailwind CSS (Deep Aurora Glass / dark glassmorphism visual system)

## Architecture

```
src/
  types/models.ts        Typed domain models (CityObservation, Discovery,
                          EvidenceItem, WarningSignal, HistoricalPeriod,
                          DataSource, CityMemoryEvent, CityArea, ...)
  api/dataClient.ts       The ONLY place that talks to a backend. Every
                          function returns a Result<T> = { state, data,
                          message, isLive }. Today, with no backend
                          configured, everything resolves to an honest
                          empty state.
  state/useCityData.ts    React hooks wrapping the data layer, giving
                          components a consistent loading/empty/error/ok
                          contract.
  components/
    ui/                   Reusable primitives: GlassPanel, StatusBadge,
                           EpistemicTag (OBSERVED/DISCOVERED/INFERRED/
                           HYPOTHESIZED/VALIDATED), EmptyState, etc.
    layout/                Sidebar, TopBar, PageShell (app chrome).
    visualization/         SystemFlowDiagram, MapCanvas, RelationshipDiagram,
                           MemoryTimeline — all render analytically, never
                           inventing observations.
  pages/                  One file per product screen (Overview, City Watch,
                           City Memory, Discoveries, Early Warnings, Evidence,
                           Data).
```

## Connecting a real backend

1. Set `VITE_ECOGUARDIAN_API_URL` in a `.env.local` file (see `.env.example`)
   to point at your GitHub-hosted backend/API.
2. Implement REST endpoints matching the paths already called in
   `src/api/dataClient.ts` (`/observations`, `/discoveries`, `/evidence`,
   `/warnings`, `/city-memory/events`, `/city-memory/periods`,
   `/data-sources`, `/city-areas`), returning JSON shaped like the types in
   `src/types/models.ts`.
3. No UI component needs to change — pages already render real data,
   loading, empty, and error states through the same hooks.

## Running locally

```bash
npm install
npm run dev
```

## Critical data rule

This project intentionally avoids inventing dashboard numbers, confidence
scores, timestamps, or alerts. If you are extending this UI, keep following
that rule: prefer an honest empty state over a good-looking fake one.
