# Fundy — The Tide Guide

An unofficial visitor guide to Fundy National Park, New Brunswick, built around the thing no other park site has: a live read on the highest tides on Earth, and what that opens or closes.

- **Tide clock** (`lib/tide.ts`, `components/tide.tsx`): a harmonic model of Alma's tide with a boat that grounds and floats, sea-floor walk windows, and a monthly spring/neap calendar. It is a teaching model, not a navigational product; the UI points to official Canadian Hydrographic Service tables.
- **Trails**: nine trails with why-the-ground-looks-like-this notes, tide flags, km-pinned waypoints, and an interactive SVG map.
- **When to come**: pick a month, see what the park is doing.
- **Tales, Tips, Dispatches**: stories, insider tips (filterable), ranger blog.
- **Trail register**: a no-account visitor board with comments. The site is a static export with no server, so it is seeded from `content/register-seed.ts` and new posts are saved in the visitor's own browser (localStorage) only.

```
npm install
npm run dev
```

## Deploying to GitHub Pages

`.github/workflows/pages.yml` builds a static export (`output: "export"`) and deploys it on every push to `master`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**. The site is served at `https://<user>.github.io/<repo>/`; CI sets `NEXT_PUBLIC_BASE_PATH` to `/<repo>`. To preview locally under that path, run `NEXT_PUBLIC_BASE_PATH=/static-fun npm run build` and serve `out/` from a folder named `static-fun`.

The previous static.fun app lives in `legacy/` for reference.
