"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FLOOR_SITES,
  floorWindow,
  formatDuration,
  formatTime,
  tideState,
  type TideState,
} from "@/lib/tide";

/** Everything here is clock-dependent, so it mounts empty and fills in. */
function useTide(intervalMs = 20_000) {
  const [state, setState] = useState<TideState | null>(null);
  useEffect(() => {
    const tick = () => setState(tideState(new Date()));
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return state;
}

/* ============================================================
   The dial: a cross-section of the harbour at Alma, with a boat
   that sits on the bottom at low water and floats at high.
   ============================================================ */

const VB = { w: 680, h: 400 };
const TOP_Y = 56;
const BOTTOM_Y = 348;
const MAX_M = 13;

const yFor = (m: number) =>
  BOTTOM_Y - (Math.max(0, Math.min(MAX_M, m)) / MAX_M) * (BOTTOM_Y - TOP_Y);

/** Harbour bottom: deep at the left, shelving up to the wharf. */
const BED_PATH = `M 0 ${BOTTOM_Y} C 120 ${BOTTOM_Y - 4} 240 ${BOTTOM_Y - 14} 360 ${BOTTOM_Y - 22} C 460 ${BOTTOM_Y - 29} 540 ${BOTTOM_Y - 34} 604 ${BOTTOM_Y - 36} L 604 400 L 0 400 Z`;
const BED_LINE = `M 0 ${BOTTOM_Y} C 120 ${BOTTOM_Y - 4} 240 ${BOTTOM_Y - 14} 360 ${BOTTOM_Y - 22} C 460 ${BOTTOM_Y - 29} 540 ${BOTTOM_Y - 34} 604 ${BOTTOM_Y - 36}`;

const BOAT_X = 250;
const BOAT_BED_Y = BOTTOM_Y - 14;

export function TideDial() {
  const tide = useTide();

  const waterY = tide ? yFor(tide.height) : yFor(6.5);
  const aground = !tide ? false : yFor(tide.height) > BOAT_BED_Y - 6;
  const boatY = Math.max(TOP_Y, Math.min(waterY, BOAT_BED_Y - 6));

  const highY = tide ? yFor(tide.nextHigh.height) : yFor(12);
  const lowY = tide ? yFor(tide.nextLow.height) : yFor(1);

  return (
    <figure className="dial">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        role="img"
        aria-label={
          tide
            ? `Harbour cross-section. Water at ${tide.height.toFixed(1)} metres and ${tide.rising ? "rising" : "falling"}.`
            : "Harbour cross-section, loading the tide."
        }
      >
        <defs>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sea)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--sea-deep)" stopOpacity="0.85" />
          </linearGradient>
          <clipPath id="harbourClip">
            <rect x="0" y="0" width="604" height="400" />
          </clipPath>
        </defs>

        {/* extreme-water reference lines */}
        <g className="dial-refs">
          <line x1="0" y1={highY} x2="604" y2={highY} />
          <text x="8" y={highY - 7}>
            next high {tide ? `${tide.nextHigh.height.toFixed(1)} m` : "—"}
          </text>
          <line x1="0" y1={lowY} x2="604" y2={lowY} />
          <text x="8" y={lowY - 7}>
            next low {tide ? `${tide.nextLow.height.toFixed(1)} m` : "—"}
          </text>
        </g>

        <g clipPath="url(#harbourClip)">
          {/* water */}
          <rect
            className="dial-water"
            x="0"
            y={waterY}
            width="604"
            height={400 - waterY}
            fill="url(#waterGrad)"
          />
          <line
            className="dial-surface"
            x1="0"
            y1={waterY}
            x2="604"
            y2={waterY}
          />

          {/* harbour bottom */}
          <path className="dial-bed" d={BED_PATH} />
          <path className="dial-bed-line" d={BED_LINE} />

          {/* boat */}
          <g
            className="dial-boat"
            transform={`translate(${BOAT_X} ${boatY}) rotate(${aground ? -7 : 0})`}
          >
            <path
              d="M -36 0 L 36 0 L 27 17 L -27 17 Z"
              fill="var(--accent)"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <rect x="-9" y="-13" width="18" height="13" rx="2" fill="var(--accent)" />
            <line x1="0" y1="-13" x2="0" y2="-34" stroke="var(--accent)" strokeWidth="2.5" />
          </g>
        </g>

        {/* wharf */}
        <g className="dial-wharf">
          <rect x="604" y={TOP_Y - 26} width="76" height="14" rx="2" />
          <rect x="612" y={TOP_Y - 12} width="9" height={400 - TOP_Y + 12} />
          <rect x="648" y={TOP_Y - 12} width="9" height={400 - TOP_Y + 12} />
          {/* rungs, so the drop is legible */}
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              x="621"
              y={TOP_Y + 8 + i * 32}
              width="27"
              height="4"
              rx="1.5"
            />
          ))}
        </g>

        {/* scale */}
        <g className="dial-scale">
          {[0, 4, 8, 12].map((m) => (
            <g key={m}>
              <line x1="586" y1={yFor(m)} x2="598" y2={yFor(m)} />
              <text x="580" y={yFor(m) + 4} textAnchor="end">
                {m} m
              </text>
            </g>
          ))}
        </g>
      </svg>

      <figcaption className="small faint">
        The wharf at Alma, to scale. The boat sits on the harbour bottom at low
        water and floats level with the deck at high.
      </figcaption>

      <style>{`
        .dial { margin: 0; }
        .dial svg { width: 100%; height: auto; display: block; overflow: visible; }
        .dial figcaption { margin-top: 12px; }
        .dial-water, .dial-surface, .dial-boat {
          transition: y 1.2s ease, height 1.2s ease, y1 1.2s ease, y2 1.2s ease, transform 1.2s ease;
        }
        .dial-surface { stroke: var(--sea-soft); stroke-width: 2; }
        .dial-bed { fill: var(--line-strong); opacity: 0.55; }
        .dial-bed-line { fill: none; stroke: var(--text-faint); stroke-width: 2; }
        .dial-wharf rect { fill: var(--text-faint); opacity: 0.75; }
        .dial-refs line {
          stroke: var(--text-faint);
          stroke-width: 1;
          stroke-dasharray: 3 5;
          opacity: 0.8;
        }
        .dial-refs text {
          fill: var(--text-faint);
          font-size: 12px;
          font-family: var(--font-body);
          letter-spacing: 0.04em;
        }
        .dial-scale line { stroke: var(--text-faint); stroke-width: 1.5; }
        .dial-scale text {
          fill: var(--text-faint);
          font-size: 12px;
          font-family: var(--font-body);
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </figure>
  );
}

/* ============================================================
   Numeric readout
   ============================================================ */

export function TideReadout() {
  const tide = useTide();

  if (!tide) {
    return (
      <div className="readout" aria-hidden="true">
        <div className="readout-main">
          <span className="readout-num numeric">—</span>
          <span className="readout-unit">m</span>
        </div>
      </div>
    );
  }

  return (
    <div className="readout">
      <p className="eyebrow">Right now at Alma</p>
      <div className="readout-main">
        <span className="readout-num numeric">{tide.height.toFixed(1)}</span>
        <span className="readout-unit">m</span>
        <span className={`pill ${tide.rising ? "pill-sea" : "pill-accent"}`}>
          {tide.rising ? "↑ rising" : "↓ falling"}
        </span>
      </div>
      <dl className="readout-grid">
        <div>
          <dt>Next {tide.next.kind}</dt>
          <dd className="numeric">
            {formatTime(tide.next.at)} · {tide.next.height.toFixed(1)} m
          </dd>
        </div>
        <div>
          <dt>In</dt>
          <dd className="numeric">
            {formatDuration(tide.next.at.getTime() - Date.now())}
          </dd>
        </div>
        <div>
          <dt>This swing</dt>
          <dd className="numeric">{tide.swing.toFixed(1)} m</dd>
        </div>
      </dl>

      <style>{`
        .readout-main { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .readout-num {
          font-family: var(--font-display);
          font-size: clamp(3rem, 9vw, 4.6rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .readout-unit { font-size: var(--step-2); color: var(--text-dim); margin-right: 6px; }
        .readout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 14px;
          margin: 22px 0 0;
          padding-top: 18px;
          border-top: 1px solid var(--line);
        }
        .readout-grid dt {
          font-size: var(--step--1);
          color: var(--text-faint);
          margin-bottom: 2px;
        }
        .readout-grid dd { margin: 0; font-weight: 600; font-size: var(--step-0); }
      `}</style>
    </div>
  );
}

/* ============================================================
   Sea-floor windows
   ============================================================ */

export function FloorWindows() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 30_000);
    setTick(1);
    return () => clearInterval(id);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ul className="floors">
      {FLOOR_SITES.map((site) => {
        const w = mounted ? floorWindow(site.threshold) : null;
        return (
          <li key={site.slug} className="floor">
            <div className="row-between">
              <strong>{site.name}</strong>
              {w && (
                <span className={`pill ${w.openNow ? "pill-accent" : ""}`}>
                  {w.openNow ? "Open now" : "Closed"}
                </span>
              )}
            </div>
            <p className="small dim" style={{ margin: "6px 0 10px" }}>
              {site.note}
            </p>
            <p className="small numeric" style={{ margin: 0 }}>
              {!w ? (
                <span className="faint">…</span>
              ) : w.openNow ? (
                <>
                  Closes in <strong>{formatDuration(w.msUntilChange)}</strong>, at{" "}
                  {formatTime(w.closes)}
                </>
              ) : (
                <>
                  Opens in <strong>{formatDuration(w.msUntilChange)}</strong>, at{" "}
                  {formatTime(w.opens)} until {formatTime(w.closes)}
                </>
              )}
            </p>
          </li>
        );
      })}

      <style>{`
        .floors { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        .floor {
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
        }
      `}</style>
    </ul>
  );
}

/* ============================================================
   Compact strip for the site header
   ============================================================ */

export function TideStrip() {
  const tide = useTide(30_000);

  return (
    <Link href="/tide" className="strip">
      <span className="strip-dot" aria-hidden="true" />
      {tide ? (
        <span className="numeric">
          <strong>{tide.height.toFixed(1)} m</strong>
          <span className="strip-sep">{tide.rising ? "↑" : "↓"}</span>
          <span className="strip-next">
            {tide.next.kind} {formatTime(tide.next.at)}
          </span>
        </span>
      ) : (
        <span className="faint small">tide…</span>
      )}

      <style>{`
        .strip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 13px;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: var(--bg-sunken);
          color: var(--text);
          text-decoration: none;
          font-size: var(--step--1);
          white-space: nowrap;
        }
        .strip:hover { border-color: var(--accent); }
        .strip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 var(--accent);
          animation: pulse 2.6s infinite;
          flex: none;
        }
        .strip-sep { margin: 0 6px; color: var(--accent); font-weight: 700; }
        .strip-next { color: var(--text-dim); }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); }
          70% { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        @media (max-width: 640px) { .strip-next { display: none; } }
      `}</style>
    </Link>
  );
}
