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
import { Eyebrow, Pill, Row, Text } from "@/ui";
import styles from "./tide.module.css";

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
    <figure className={styles.dial}>
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
        <g className={styles.refs}>
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
            className={styles.water}
            x="0"
            y={waterY}
            width="604"
            height={400 - waterY}
            fill="url(#waterGrad)"
          />
          <line
            className={styles.surface}
            x1="0"
            y1={waterY}
            x2="604"
            y2={waterY}
          />

          {/* harbour bottom */}
          <path className={styles.bed} d={BED_PATH} />
          <path className={styles.bedLine} d={BED_LINE} />

          {/* boat */}
          <g
            className={styles.boat}
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
        <g className={styles.wharf}>
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
        <g className={styles.scale}>
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

      <Text as="figcaption" size="sm" tone="faint" mt={12}>
        The wharf at Alma, to scale. The boat sits on the harbour bottom at low
        water and floats level with the deck at high.
      </Text>
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
      <div aria-hidden="true">
        <div className={styles.readoutMain}>
          <span className={styles.readoutNum}>—</span>
          <span className={styles.readoutUnit}>m</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow>Right now at Alma</Eyebrow>
      <div className={styles.readoutMain}>
        <span className={styles.readoutNum}>{tide.height.toFixed(1)}</span>
        <span className={styles.readoutUnit}>m</span>
        <Pill tone={tide.rising ? "sea" : "accent"}>
          {tide.rising ? "↑ rising" : "↓ falling"}
        </Pill>
      </div>
      <dl className={styles.readoutGrid}>
        <div>
          <dt>Next {tide.next.kind}</dt>
          <dd>
            {formatTime(tide.next.at)} · {tide.next.height.toFixed(1)} m
          </dd>
        </div>
        <div>
          <dt>In</dt>
          <dd>{formatDuration(tide.next.at.getTime() - Date.now())}</dd>
        </div>
        <div>
          <dt>This swing</dt>
          <dd>{tide.swing.toFixed(1)} m</dd>
        </div>
      </dl>
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
    <ul className={styles.floors}>
      {FLOOR_SITES.map((site) => {
        const w = mounted ? floorWindow(site.threshold) : null;
        return (
          <li key={site.slug} className={styles.floor}>
            <Row variant="between">
              <strong>{site.name}</strong>
              {w && (
                <Pill tone={w.openNow ? "accent" : "default"}>
                  {w.openNow ? "Open now" : "Closed"}
                </Pill>
              )}
            </Row>
            <Text size="sm" tone="dim" mt={6} mb={10}>
              {site.note}
            </Text>
            <Text size="sm" numeric flush>
              {!w ? (
                <Text as="span" tone="faint">…</Text>
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
            </Text>
          </li>
        );
      })}
    </ul>
  );
}

/* ============================================================
   Compact strip for the site header
   ============================================================ */

export function TideStrip() {
  const tide = useTide(30_000);

  return (
    <Link href="/tide" className={styles.strip}>
      <span className={styles.stripDot} aria-hidden="true" />
      {tide ? (
        <span className={styles.stripValue}>
          <strong>{tide.height.toFixed(1)} m</strong>
          <span className={styles.stripSep}>{tide.rising ? "↑" : "↓"}</span>
          <span className={styles.stripNext}>
            {tide.next.kind} {formatTime(tide.next.at)}
          </span>
        </span>
      ) : (
        <Text as="span" size="sm" tone="faint">tide…</Text>
      )}
    </Link>
  );
}
