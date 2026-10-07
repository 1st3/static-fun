import Link from "next/link";
import { park } from "@/content/park";

export function SiteFooter() {
  return (
    <footer className="ftr">
      <hr className="tideline" />
      <div className="wrap ftr-inner">
        <div className="ftr-col ftr-about">
          <p className="ftr-name">{park.name}</p>
          <p className="small dim">{park.landAcknowledgement}</p>
        </div>

        <nav className="ftr-col" aria-label="Footer">
          <p className="ftr-head">Plan</p>
          <Link href="/trails">Trails</Link>
          <Link href="/tide">Tide</Link>
          <Link href="/when">When to come</Link>
        </nav>

        <nav className="ftr-col" aria-label="Footer">
          <p className="ftr-head">Read</p>
          <Link href="/tales">Tales</Link>
          <Link href="/tips">Insider tips</Link>
          <Link href="/dispatches">Dispatches</Link>
          <Link href="/register">Trail register</Link>
        </nav>
      </div>

      <div className="wrap ftr-legal">
        <p className="small faint">
          An independent, unofficial visitor guide built as a demonstration
          project. Not affiliated with Parks Canada. The tide readings shown
          throughout are an illustrative model, not a navigational product —
          plan any trip below the high-water line using the official{" "}
          <a
            href="https://www.tides.gc.ca/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Canadian Hydrographic Service
          </a>{" "}
          tide tables.
        </p>
      </div>

      <style>{`
        .ftr { margin-top: clamp(48px, 8vw, 96px); }
        .ftr-inner {
          display: grid;
          gap: clamp(22px, 4vw, 48px);
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
          padding-block: clamp(32px, 5vw, 56px) 28px;
        }
        .ftr-about { grid-column: span 1; max-width: 46ch; }
        .ftr-name {
          font-family: var(--font-display);
          font-size: var(--step-1);
          font-weight: 600;
          margin: 0 0 10px;
        }
        .ftr-col { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
        .ftr-head {
          font-size: var(--step--1); font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-faint); margin: 0 0 4px;
        }
        .ftr-col a {
          color: var(--text-dim); text-decoration: none; font-size: var(--step--1);
        }
        .ftr-col a:hover { color: var(--accent); }
        .ftr-legal {
          padding-block: 20px 36px;
          border-top: 1px solid var(--line);
        }
        .ftr-legal p { max-width: 80ch; margin: 0; }
      `}</style>
    </footer>
  );
}
