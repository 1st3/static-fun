"use client";

import { useState } from "react";
import Link from "next/link";
import { MONTHS, MONTHS_LONG, KIND_LABEL, highlights } from "@/content/highlights";

export default function WhenPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const now = highlights.filter((h) => h.months.includes(month));
  const peak = now.filter((h) => h.peak.includes(month));

  return (
    <div className="wrap section">
      <p className="eyebrow">When to come</p>
      <h1 className="h-page">What the park is doing in {MONTHS_LONG[month - 1]}</h1>
      <p className="lede" style={{ margin: "14px 0 24px", maxWidth: "60ch" }}>
        Pick a month. Highlighted rows are at their best; the rest are worth planning around.
      </p>

      <div className="pill-row" role="tablist" aria-label="Month">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            role="tab"
            aria-selected={month === i + 1}
            className={`btn ${month === i + 1 ? "" : "btn-ghost"}`}
            onClick={() => setMonth(i + 1)}
          >{m}</button>
        ))}
      </div>

      <div className="grid" style={{ marginTop: 28 }}>
        {[...peak, ...now.filter((h) => !peak.includes(h))].map((h) => (
          <article key={h.slug} className="card" style={peak.includes(h) ? { borderColor: "var(--accent)" } : undefined}>
            <div className="pill-row">
              <span className="pill">{KIND_LABEL[h.kind]}</span>
              {peak.includes(h) && <span className="pill pill-accent">Peak</span>}
            </div>
            <h2 className="h-card" style={{ margin: "10px 0 6px" }}>{h.name}</h2>
            <p className="small dim"><strong>Where:</strong> {h.where}</p>
            <p className="small"><strong>How:</strong> {h.how}</p>
            <details>
              <summary className="small">Why it happens here</summary>
              <p className="small dim" style={{ marginTop: 8 }}>{h.why}</p>
            </details>
            {h.trails.length > 0 && (
              <p className="small" style={{ marginTop: 10, marginBottom: 0 }}>
                {h.trails.map((t, i) => (
                  <span key={t}>{i > 0 && " · "}<Link href={`/trails/${t}`}>{t.replace(/-/g, " ")}</Link></span>
                ))}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
