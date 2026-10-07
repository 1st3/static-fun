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
import { Pill, PillRow, Text } from "@/ui";
import styles from "./park-map.module.css";

export function ParkMap({ initial }: { initial?: string }) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(initial ?? null);
  const active: Trail | null =
    trails.find((t) => t.slug === activeSlug) ?? null;

  return (
    <div className={styles.map}>
      <div className={styles.frame}>
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
          <text x="150" y="600" className={styles.seaLabel}>
            BAY OF FUNDY
          </text>

          {/* roads */}
          {mapBase.roads.map((d, i) => (
            <path key={i} d={d} className={styles.road} />
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
              <text x={l.cx} y={l.cy + l.ry + 13} className={styles.labelSm} textAnchor="middle">
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
                className={`${styles.trail}${isActive ? ` ${styles.active}` : ""}${dimmed ? ` ${styles.dim}` : ""}`}
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
                <path d={t.path} className={styles.hit} />
                <path d={t.path} className={styles.line} style={{ stroke: t.color }} />
              </a>
            );
          })}

          {/* places */}
          {mapBase.places.map((p) => (
            <g key={p.name} className={styles.place}>
              {p.kind === "centre" ? (
                <rect x={p.x - 5} y={p.y - 5} width="10" height="10" rx="1.5" />
              ) : (
                <circle cx={p.x} cy={p.y} r={p.kind === "village" ? 6 : 4.5} />
              )}
              <text
                x={p.x + (p.x > 700 ? -12 : 11)}
                y={p.y + 4}
                textAnchor={p.x > 700 ? "end" : "start"}
                className={styles.label}
              >
                {p.name}
              </text>
            </g>
          ))}

          {/* active trail label */}
          {active && (
            <g aria-hidden="true">
              <text x={active.label.x} y={active.label.y} className={styles.calloutText}>
                {active.name}
              </text>
            </g>
          )}

          {/* compass */}
          <g className={styles.compass} transform="translate(848 64)" aria-hidden="true">
            <circle cx="0" cy="0" r="17" />
            <path d="M 0 -12 L 4 3 L 0 0 L -4 3 Z" />
            <text x="0" y="-20" textAnchor="middle">N</text>
          </g>
        </svg>
      </div>

      <div className={styles.info} aria-live="polite">
        {active ? (
          <>
            <p className={styles.infoName}>{active.name}</p>
            <PillRow as="p" mt={8}>
              <Pill>{active.distanceKm} km</Pill>
              <Pill>{DIFFICULTY_LABEL[active.difficulty]}</Pill>
              <Pill>{active.hours} h</Pill>
              {active.tide !== "none" && <Pill tone="accent">{TIDE_LABEL[active.tide]}</Pill>}
            </PillRow>
            <Text size="sm" tone="dim" mt={10}>{active.summary}</Text>
          </>
        ) : (
          <Text size="sm" tone="dim" flush>
            Hover or focus a route to see what it is. Nine trails, from a
            fifteen-minute boardwalk to a sixteen-kilometre walk out to a
            wilderness beach.
          </Text>
        )}
      </div>
    </div>
  );
}
