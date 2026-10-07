"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABEL, tips, type TipCategory } from "@/content/tips";
import { trails } from "@/content/trails";
import { MONTHS_LONG } from "@/content/highlights";

export default function TipsPage() {
  const [cat, setCat] = useState<TipCategory | "all">("all");
  const [trail, setTrail] = useState("all");

  const shown = useMemo(
    () => tips.filter((t) => (cat === "all" || t.category === cat) && (trail === "all" || t.trail === trail)),
    [cat, trail],
  );

  return (
    <div className="wrap section">
      <p className="eyebrow">Insider tips</p>
      <h1 className="h-page">What the people who work here tell their friends</h1>
      <p className="lede" style={{ margin: "14px 0 24px", maxWidth: "60ch" }}>
        Rangers, wardens, guides and trail crew, with their seasons on the job.
      </p>

      <div className="row" style={{ marginBottom: 14 }}>
        <div className="pill-row">
          {(["all", ...Object.keys(CATEGORY_LABEL)] as (TipCategory | "all")[]).map((c) => (
            <button key={c} className={`btn ${cat === c ? "" : "btn-ghost"}`} onClick={() => setCat(c)}>
              {c === "all" ? "All" : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="trailf">Filter by trail</label>
        <select id="trailf" className="select" style={{ width: "auto" }} value={trail} onChange={(e) => setTrail(e.target.value)}>
          <option value="all">Any trail</option>
          {trails.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
        </select>
      </div>

      <div className="grid" style={{ marginTop: 20 }}>
        {shown.map((t) => (
          <figure key={t.id} className="card" style={{ margin: 0 }}>
            <div className="pill-row">
              <span className="pill">{CATEGORY_LABEL[t.category]}</span>
              {t.months.length > 0 && (
                <span className="pill">{MONTHS_LONG[t.months[0] - 1].slice(0, 3)}–{MONTHS_LONG[t.months[t.months.length - 1] - 1].slice(0, 3)}</span>
              )}
            </div>
            <blockquote style={{ margin: "12px 0" }}>{t.text}</blockquote>
            <figcaption className="small dim">
              <strong>{t.author}</strong>, {t.role} · {t.seasons} seasons
              {t.trail && <> · <Link href={`/trails/${t.trail}`}>{trails.find((x) => x.slug === t.trail)?.name}</Link></>}
            </figcaption>
          </figure>
        ))}
        {shown.length === 0 && <p className="dim">No tips match that combination yet.</p>}
      </div>
    </div>
  );
}
