"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DIFFICULTY_LABEL,
  TIDE_LABEL,
  mapBase,
  trails,
  type Trail,
} from "@/content/trails";

export function ParkMap({ initial }: { initial?: string }) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(initial ?? null);
  const active: Trail | null =
    trails.find((t) => t.slug === activeSlug) ?? null;

  return (
    <div className="map">
      <div className="map-frame">
        <svg viewBox="0 0 900 620" role="group" aria-label="Map of Fundy National Park trails">
          <defs>
            <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--sea)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--sea-deep)" stopOpacity="0.5" />
            </linearGradient>
            <pattern
              id="landTexture"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(28)"
            >
              <line x1="0" y1="0" x2="0" y2="22" stroke="var(--line)" strokeWidth="1" opacity="0.4" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="900" height="620" fill="url(#landTexture)" opacity="0.5" />

          {/* the bay */}
          <path d={mapBase.sea} fill="url(#seaGrad)" />
          <path
            d={mapBase.coast}
            fill="none"
            stroke="var(--sea-deep)"
            strokeWidth="2"
            opacity="0.7"
          />
          <text x="150" y="600" className="map-sea-label">
            BAY OF FUNDY
          </text>

          {/* roads */}
          {mapBase.roads.map((d, i) => (
            <path key={i} d={d} className="map-road" />
          ))}

          {/* lakes */}
          {mapBase.lakes.map((l) => (
            <g key={l.name}>
              <ellipse
                cx={l.cx}
                cy={l.cy}
                rx={l.rx}
                ry={l.ry}
                fill="var(--sea)"
                opacity="0.35"
                stroke="var(--sea-deep)"
                strokeWidth="1"
              />
              <text x={l.cx} y={l.cy + l.ry + 13} className="map-label-sm" textAnchor="middle">
                {l.name}
              </text>
            </g>
          ))}

          {/* trails */}
          {trails.map((t) => {
            const isActive = activeSlug === t.slug;
            const dimmed = activeSlug !== null && !isActive;
            return (
              <a
                key={t.slug}
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/trails/${t.slug}/`}
                className={`map-trail${isActive ? " is-active" : ""}${dimmed ? " is-dim" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/trails/${t.slug}`);
                }}
                onMouseEnter={() => setActiveSlug(t.slug)}
                onMouseLeave={() => setActiveSlug(initial ?? null)}
                onFocus={() => setActiveSlug(t.slug)}
                onBlur={() => setActiveSlug(initial ?? null)}
                aria-label={`${t.name}, ${t.distanceKm} km, ${DIFFICULTY_LABEL[t.difficulty]}`}
              >
                {/* fat invisible hit area */}
                <path d={t.path} className="map-hit" />
                <path d={t.path} className="map-line" style={{ stroke: t.color }} />
              </a>
            );
          })}

          {/* places */}
          {mapBase.places.map((p) => (
            <g key={p.name} className="map-place">
              {p.kind === "centre" ? (
                <rect x={p.x - 5} y={p.y - 5} width="10" height="10" rx="1.5" />
              ) : (
                <circle cx={p.x} cy={p.y} r={p.kind === "village" ? 6 : 4.5} />
              )}
              <text
                x={p.x + (p.x > 700 ? -12 : 11)}
                y={p.y + 4}
                textAnchor={p.x > 700 ? "end" : "start"}
                className="map-label"
              >
                {p.name}
              </text>
            </g>
          ))}

          {/* active trail label */}
          {active && (
            <g className="map-callout" aria-hidden="true">
              <text x={active.label.x} y={active.label.y} className="map-callout-text">
                {active.name}
              </text>
            </g>
          )}

          {/* compass */}
          <g className="map-compass" transform="translate(848 64)" aria-hidden="true">
            <circle cx="0" cy="0" r="17" />
            <path d="M 0 -12 L 4 3 L 0 0 L -4 3 Z" />
            <text x="0" y="-20" textAnchor="middle">N</text>
          </g>
        </svg>
      </div>

      <div className="map-info" aria-live="polite">
        {active ? (
          <>
            <p className="map-info-name">{active.name}</p>
            <p className="pill-row" style={{ marginTop: 8 }}>
              <span className="pill">{active.distanceKm} km</span>
              <span className="pill">{DIFFICULTY_LABEL[active.difficulty]}</span>
              <span className="pill">{active.hours} h</span>
              {active.tide !== "none" && (
                <span className="pill pill-accent">{TIDE_LABEL[active.tide]}</span>
              )}
            </p>
            <p className="small dim" style={{ marginTop: 10 }}>
              {active.summary}
            </p>
          </>
        ) : (
          <p className="small dim" style={{ margin: 0 }}>
            Hover or focus a route to see what it is. Nine trails, from a
            fifteen-minute boardwalk to a sixteen-kilometre walk out to a
            wilderness beach.
          </p>
        )}
      </div>

      <style>{`
        .map { display: grid; gap: 16px; }
        .map-frame {
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 6px;
          overflow: hidden;
        }
        .map svg { width: 100%; height: auto; display: block; }

        .map-road {
          fill: none;
          stroke: var(--line-strong);
          stroke-width: 3.5;
          stroke-linecap: round;
          opacity: 0.85;
        }
        .map-hit {
          fill: none;
          stroke: transparent;
          stroke-width: 26;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .map-line {
          fill: none;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke-width 0.18s ease, opacity 0.18s ease;
        }
        .map-trail { cursor: pointer; outline: none; }
        .map-trail.is-active .map-line { stroke-width: 6.5; }
        .map-trail.is-dim .map-line { opacity: 0.25; }
        .map-trail:focus-visible .map-line {
          stroke-width: 7;
          filter: drop-shadow(0 0 5px var(--accent));
        }

        .map-place circle, .map-place rect {
          fill: var(--bg);
          stroke: var(--text);
          stroke-width: 2;
        }
        .map-label {
          fill: var(--text);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
        }
        .map-label-sm {
          fill: var(--text-faint);
          font-family: var(--font-body);
          font-size: 11px;
        }
        .map-sea-label {
          fill: var(--sea-deep);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.22em;
          opacity: 0.75;
        }
        .map-callout-text {
          fill: var(--text);
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 600;
          paint-order: stroke;
          stroke: var(--bg-raised);
          stroke-width: 5px;
          stroke-linejoin: round;
        }
        .map-compass circle { fill: none; stroke: var(--line-strong); stroke-width: 1.5; }
        .map-compass path { fill: var(--accent); }
        .map-compass text {
          fill: var(--text-faint);
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
        }

        .map-info {
          min-height: 92px;
          background: var(--bg-sunken);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 16px 18px;
        }
        .map-info-name {
          font-family: var(--font-display);
          font-size: var(--step-1);
          font-weight: 600;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
