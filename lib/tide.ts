/**
 * An illustrative harmonic tide model for Alma, New Brunswick.
 *
 * SAFETY: this is a teaching model, not a navigational product. It uses four
 * constituents and approximate amplitudes, ignores weather, barometric pressure
 * and surge, and is not referenced to a surveyed epoch. Real predictions for
 * this coast come from the Canadian Hydrographic Service. Anyone planning to be
 * below the high-water line must use the official tables.
 *
 * The model is still honest about the shape of a Fundy tide: a semidiurnal
 * cycle of 12 h 25 m, a spring/neap beat of 14.77 days from the M2/S2
 * interference, and a 27.55-day perigean swing from N2 — which together give
 * Alma a range of roughly 8 m at neaps and close to 12 m at springs.
 */

type Constituent = {
  name: string;
  /** Amplitude in metres. */
  amplitude: number;
  /** Angular speed in degrees per hour. */
  speed: number;
  /** Phase at the reference epoch, in degrees. */
  phase: number;
};

/** Mean water level above chart datum, metres. */
const MEAN_LEVEL = 6.5;

const CONSTITUENTS: Constituent[] = [
  { name: "M2", amplitude: 4.75, speed: 28.9841042, phase: 0 },
  { name: "S2", amplitude: 0.8, speed: 30.0, phase: 41 },
  { name: "N2", amplitude: 0.85, speed: 28.4397295, phase: 198 },
  { name: "K1", amplitude: 0.16, speed: 15.0410686, phase: 112 },
];

const EPOCH = Date.UTC(2026, 0, 1, 0, 0, 0);
const DEG = Math.PI / 180;

/** The full semidiurnal cycle, in milliseconds. */
export const TIDE_CYCLE_MS = (12 + 25 / 60 + 12 / 3600) * 3_600_000;

/** Height above chart datum, in metres. */
export function tideHeight(at: Date | number): number {
  const hours = ((typeof at === "number" ? at : at.getTime()) - EPOCH) / 3_600_000;
  let h = MEAN_LEVEL;
  for (const c of CONSTITUENTS) {
    h += c.amplitude * Math.cos((c.speed * hours + c.phase) * DEG);
  }
  return h;
}

export type Extreme = {
  kind: "high" | "low";
  at: Date;
  height: number;
};

/**
 * Turning points over a window, found by sampling at one-minute resolution and
 * refining each sign change of the derivative by bisection.
 */
export function findExtremes(from: Date | number, hours = 30): Extreme[] {
  const start = typeof from === "number" ? from : from.getTime();
  const end = start + hours * 3_600_000;
  const step = 60_000;
  const out: Extreme[] = [];

  const slope = (t: number) => tideHeight(t + 1000) - tideHeight(t - 1000);

  let prev = slope(start);
  for (let t = start + step; t <= end; t += step) {
    const cur = slope(t);
    if (prev === 0 || cur === 0 || prev * cur < 0) {
      let lo = t - step;
      let hi = t;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (slope(lo) * slope(mid) <= 0) hi = mid;
        else lo = mid;
      }
      const at = (lo + hi) / 2;
      out.push({
        kind: prev > 0 ? "high" : "low",
        at: new Date(at),
        height: tideHeight(at),
      });
    }
    prev = cur;
  }
  return out;
}

export type TideState = {
  height: number;
  rising: boolean;
  /** 0 at the previous turning point, 1 at the next. */
  progress: number;
  previous: Extreme;
  next: Extreme;
  nextHigh: Extreme;
  nextLow: Extreme;
  /** Range of the current half-cycle, in metres. */
  swing: number;
};

export function tideState(at: Date | number = new Date()): TideState {
  const now = typeof at === "number" ? at : at.getTime();
  const back = findExtremes(now - 14 * 3_600_000, 14);
  const fwd = findExtremes(now, 30);
  const previous = back[back.length - 1];
  const next = fwd[0];
  const nextHigh = fwd.find((e) => e.kind === "high")!;
  const nextLow = fwd.find((e) => e.kind === "low")!;
  const span = next.at.getTime() - previous.at.getTime();

  return {
    height: tideHeight(now),
    rising: next.kind === "high",
    progress: Math.min(1, Math.max(0, (now - previous.at.getTime()) / span)),
    previous,
    next,
    nextHigh,
    nextLow,
    swing: Math.abs(next.height - previous.height),
  };
}

export type FloorWindow = {
  /** True when the flats are walkable right now. */
  openNow: boolean;
  opens: Date;
  closes: Date;
  /** Milliseconds until it closes (if open) or opens (if not). */
  msUntilChange: number;
};

/**
 * When the water is below `threshold` metres — i.e. when a given stretch of sea
 * floor is uncovered. Returns the current window if one is open, otherwise the
 * next one.
 */
export function floorWindow(
  threshold: number,
  at: Date | number = new Date(),
): FloorWindow {
  const now = typeof at === "number" ? at : at.getTime();
  const step = 60_000;
  const below = (t: number) => tideHeight(t) <= threshold;

  const refine = (a: number, b: number) => {
    for (let i = 0; i < 24; i++) {
      const mid = (a + b) / 2;
      if (below(a) === below(mid)) a = mid;
      else b = mid;
    }
    return (a + b) / 2;
  };

  if (below(now)) {
    let t = now;
    while (below(t)) t += step;
    const closes = refine(t - step, t);
    let s = now;
    while (below(s)) s -= step;
    const opens = refine(s, s + step);
    return {
      openNow: true,
      opens: new Date(opens),
      closes: new Date(closes),
      msUntilChange: closes - now,
    };
  }

  let t = now;
  const limit = now + 26 * 3_600_000;
  while (t < limit && !below(t)) t += step;
  const opens = refine(t - step, t);
  let e = t;
  while (below(e)) e += step;
  const closes = refine(e - step, e);
  return {
    openNow: false,
    opens: new Date(opens),
    closes: new Date(closes),
    msUntilChange: opens - now,
  };
}

/** Highest and lowest water across a calendar month. */
export function monthRange(year: number, month: number) {
  const start = new Date(year, month, 1).getTime();
  const end = new Date(year, month + 1, 1).getTime();
  const extremes = findExtremes(start, (end - start) / 3_600_000);
  const highs = extremes.filter((e) => e.kind === "high");
  const lows = extremes.filter((e) => e.kind === "low");
  const maxHigh = highs.reduce((a, b) => (b.height > a.height ? b : a), highs[0]);
  const minLow = lows.reduce((a, b) => (b.height < a.height ? b : a), lows[0]);
  return { extremes, maxHigh, minLow, range: maxHigh.height - minLow.height };
}

/** Daily maximum range, for the tide calendar. */
export function dailyRanges(year: number, month: number) {
  const days = new Date(year, month + 1, 0).getDate();
  const out: { day: number; range: number; maxHigh: number; minLow: number }[] = [];
  for (let d = 1; d <= days; d++) {
    const start = new Date(year, month, d, 0, 0, 0).getTime();
    const ex = findExtremes(start, 24);
    const highs = ex.filter((e) => e.kind === "high").map((e) => e.height);
    const lows = ex.filter((e) => e.kind === "low").map((e) => e.height);
    const maxHigh = highs.length ? Math.max(...highs) : MEAN_LEVEL;
    const minLow = lows.length ? Math.min(...lows) : MEAN_LEVEL;
    out.push({ day: d, range: maxHigh - minLow, maxHigh, minLow });
  }
  return out;
}

export const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", hour12: true });

export function formatDuration(ms: number) {
  const mins = Math.max(0, Math.round(ms / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/**
 * Locations where uncovered sea floor is the attraction, with the approximate
 * water level below which each is walkable.
 */
export const FLOOR_SITES = [
  {
    slug: "herring-cove",
    name: "Herring Cove Beach",
    threshold: 3.6,
    note: "Cobble shelf and ribbed sandstone. The classic Fundy sea-floor walk inside the park.",
  },
  {
    slug: "point-wolfe",
    name: "Point Wolfe Beach",
    threshold: 3.2,
    note: "Estuary flats below the covered bridge, backed by the old millpond.",
  },
  {
    slug: "alma-flats",
    name: "Alma Beach",
    threshold: 4.0,
    note: "A kilometre of mud and sand, with the fishing fleet sitting on the bottom.",
  },
] as const;
