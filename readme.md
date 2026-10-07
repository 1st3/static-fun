# Fundy — The Tide Guide

An unofficial visitor guide to Fundy National Park, New Brunswick, built around the thing no other park site has: a live read on the highest tides on Earth, and what that opens or closes.

- **Tide clock** (`lib/tide.ts`, `components/tide.tsx`): a harmonic model of Alma's tide with a boat that grounds and floats, sea-floor walk windows, and a monthly spring/neap calendar. It is a teaching model, not a navigational product; the UI points to official Canadian Hydrographic Service tables.
- **Trails**: nine trails with why-the-ground-looks-like-this notes, tide flags, km-pinned waypoints, and an interactive SVG map.
- **When to come**: pick a month, see what the park is doing.
- **Tales, Tips, Dispatches**: stories, insider tips (filterable), ranger blog.
- **Trail register**: a no-account visitor board with comments (`app/register`, `lib/board.ts`). Posts persist to `.data/register.json`, and fall back to memory on a read-only filesystem.

```
npm install
npm run dev
```

The previous static.fun app lives in `legacy/` for reference.
