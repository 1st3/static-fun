"use client";

import { useEffect, useState } from "react";
import { dailyRanges } from "@/lib/tide";

export function TideCalendar() {
  const [data, setData] = useState<{ label: string; first: number; days: ReturnType<typeof dailyRanges> } | null>(null);

  useEffect(() => {
    const now = new Date();
    const days = dailyRanges(now.getFullYear(), now.getMonth());
    const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const label = now.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
    setData({ label, first, days });
  }, []);

  if (!data) return <div className="card" style={{ minHeight: 320 }} aria-busy="true" />;

  const min = Math.min(...data.days.map((d) => d.range));
  const max = Math.max(...data.days.map((d) => d.range));
  const today = new Date().getDate();

  return (
    <div className="card">
      <div className="row-between">
        <h3 className="h-card">{data.label}</h3>
        <span className="small faint">Daily tidal range · bigger = more sea floor</span>
      </div>
      <div className="cal" role="grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="cal-h">{d}</span>
        ))}
        {Array.from({ length: data.first }, (_, i) => <span key={`b${i}`} />)}
        {data.days.map((d) => {
          const t = (d.range - min) / Math.max(0.01, max - min);
          return (
            <div
              key={d.day}
              className={`cal-d${d.day === today ? " is-today" : ""}`}
              style={{ ["--t" as string]: t }}
              title={`${d.range.toFixed(1)} m range`}
            >
              <span className="cal-n">{d.day}</span>
              <span className="cal-r numeric">{d.range.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      <p className="small faint" style={{ marginTop: 14 }}>
        The two-week beat between small neap tides and big spring tides comes from the Sun and
        Moon pulling together, then apart.
      </p>
      <style>{`
        .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 16px; }
        .cal-h { text-align: center; font-size: var(--step--1); color: var(--text-faint); font-weight: 600; }
        .cal-d {
          border-radius: 8px; padding: 6px 4px; text-align: center;
          background: color-mix(in srgb, var(--sea) calc(var(--t) * 70% + 8%), var(--bg-sunken));
          border: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 1px; min-height: 52px;
        }
        .cal-d.is-today { outline: 2px solid var(--accent); outline-offset: 1px; }
        .cal-n { font-size: 11px; color: var(--text-dim); }
        .cal-r { font-weight: 600; font-size: 13px; }
      `}</style>
    </div>
  );
}
