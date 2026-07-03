# Backup Design Snapshot - 2026-06-30

This file serves as a reference point for the current design and functional state of the application.

## Core Design Components:
- **Theme**: Royal Navy Dark (900-950) with Champagne Gold accents.
- **Typography**: Inter (UI), Playfair Display (Headings), JetBrains Mono (Mono).
- **Navigation**: Responsive design with toggle functionality (`.menu-toggle`, `.menu`).
- **Language Support**: English/Arabic switcher integrated into the Header and persisted via `localStorage`.

## Key Files for Reversion:
- `/src/index.css` (Contains the main styling and navigation media queries)
- `/src/components/Header.tsx` (Contains the navigation logic)
- `/src/App.tsx` (Contains the main component layout)
- `/index.html` (Contains meta tags and language settings)

If any future visual modifications are unsuccessful, please ask to "revert to the backup design" and I will restore the state based on this snapshot.
