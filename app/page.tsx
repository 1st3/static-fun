import Link from "next/link";
import { park } from "@/content/park";
import { trails } from "@/content/trails";
import { tales } from "@/content/tales";
import { tips } from "@/content/tips";
import { dispatches } from "@/content/dispatches";
import { PostList } from "@/components/register-view";
import { FloorWindows, TideDial, TideReadout } from "@/components/tide";
import { ParkMap } from "@/components/park-map";

export default function Home() {
  const tip = tips[new Date().getDate() % tips.length];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{park.name} · {park.province}</p>
            <h1 className="h-hero">{park.tagline}</h1>
            <p className="lede" style={{ marginTop: 18, maxWidth: "52ch" }}>
              {park.blurb}
            </p>
            <div className="spread" style={{ marginTop: 26 }}>
              <Link className="btn" href="/tide">Read today&rsquo;s tide</Link>
              <Link className="btn btn-ghost" href="/trails">Browse {trails.length} trails</Link>
            </div>
          </div>
          <div className="card hero-card">
            <TideReadout />
            <div style={{ marginTop: 18 }}><TideDial /></div>
          </div>
        </div>
        <style>{`
          .hero { padding-block: clamp(36px, 7vw, 88px); }
          .hero-grid { display: grid; gap: clamp(28px, 5vw, 60px); grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); align-items: center; }
          .hero-card { box-shadow: var(--shadow-lg); }
        `}</style>
      </section>

      <hr className="tideline" />

      <section className="section">
        <div className="wrap grid-2">
          <div>
            <p className="eyebrow">The sea floor</p>
            <h2 className="h-sect">Is it open right now?</h2>
            <p className="dim" style={{ marginTop: 12 }}>
              Three places where the bay hands back its floor, and when each one is walkable.
              Plan to be back above the wrack line well before the turn.
            </p>
          </div>
          <FloorWindows />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <p className="eyebrow">Park map</p>
          <h2 className="h-sect" style={{ marginBottom: 20 }}>{trails.length} trails, one coast</h2>
          <ParkMap />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <p className="eyebrow">Insider tip · today</p>
            <p className="prose" style={{ fontSize: "var(--step-1)" }}>&ldquo;{tip.text}&rdquo;</p>
            <p className="small dim" style={{ marginTop: 14 }}>
              {tip.author}, {tip.role} · {tip.seasons} seasons
            </p>
            <Link href="/tips" className="small">All tips →</Link>
          </div>
          <div className="stack" style={{ ["--gap" as string]: "12px" }}>
            <p className="eyebrow">From the register</p>
            <PostList limit={3} />
            <Link href="/register" className="small">Open the register →</Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="row-between" style={{ marginBottom: 20 }}>
            <h2 className="h-sect">Tales &amp; dispatches</h2>
          </div>
          <div className="grid">
            {tales.slice(0, 2).map((t) => (
              <Link key={t.slug} href={`/tales/${t.slug}`} className="card card-link">
                <p className="eyebrow">Tale · {t.era}</p>
                <h3 className="h-card">{t.title}</h3>
                <p className="small dim" style={{ marginTop: 8 }}>{t.excerpt}</p>
              </Link>
            ))}
            {dispatches.slice(0, 1).map((d) => (
              <Link key={d.slug} href={`/dispatches/${d.slug}`} className="card card-link">
                <p className="eyebrow">{d.tag} · {d.readingMinutes} min</p>
                <h3 className="h-card">{d.title}</h3>
                <p className="small dim" style={{ marginTop: 8 }}>{d.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
