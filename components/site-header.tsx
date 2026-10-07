"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TideStrip } from "./tide";

const NAV = [
  { href: "/trails", label: "Trails" },
  { href: "/tide", label: "Tide" },
  { href: "/when", label: "When to come" },
  { href: "/tales", label: "Tales" },
  { href: "/tips", label: "Tips" },
  { href: "/dispatches", label: "Dispatches" },
  { href: "/register", label: "Register" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("fundy-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
    else
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("fundy-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={flip}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title="Switch theme"
    >
      <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
      <style>{`
        .theme-btn {
          width: 34px; height: 34px;
          display: grid; place-items: center;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: var(--bg-sunken);
          color: var(--text);
          font-size: 15px;
          cursor: pointer;
          flex: none;
        }
        .theme-btn:hover { border-color: var(--accent); color: var(--accent); }
      `}</style>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="hdr">
      <div className="wrap hdr-inner">
        <Link href="/" className="brand">
          <svg viewBox="0 0 34 34" aria-hidden="true" className="brand-mark">
            <circle cx="17" cy="17" r="16" className="bm-ring" />
            <path
              d="M3 21 C 9 17, 13 25, 19 20 C 24 15.8, 28 20, 31 18"
              className="bm-wave"
            />
            <path
              d="M3 26 C 9 22, 13 30, 19 25 C 24 20.8, 28 25, 31 23"
              className="bm-wave bm-wave-2"
            />
          </svg>
          <span className="brand-text">
            <span className="brand-name">Fundy</span>
            <span className="brand-sub">The Tide Guide</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-link is-active" : "nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hdr-right">
          <TideStrip />
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav-mobile" aria-label="Primary">
          <div className="wrap">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-mobile-link">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        .hdr {
          position: sticky; top: 0; z-index: 40;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .hdr-inner {
          display: flex; align-items: center; gap: 18px;
          min-height: 64px;
        }
        .brand {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--text); flex: none;
        }
        .brand-mark { width: 32px; height: 32px; flex: none; }
        .bm-ring { fill: none; stroke: var(--accent); stroke-width: 1.6; opacity: 0.85; }
        .bm-wave { fill: none; stroke: var(--sea); stroke-width: 2; stroke-linecap: round; }
        .bm-wave-2 { opacity: 0.5; }
        .brand-text { display: flex; flex-direction: column; line-height: 1.05; }
        .brand-name {
          font-family: var(--font-display);
          font-size: 1.18rem; font-weight: 600; letter-spacing: -0.02em;
        }
        .brand-sub {
          font-size: 0.66rem; letter-spacing: 0.13em;
          text-transform: uppercase; color: var(--text-faint);
        }
        .nav-desktop { display: none; gap: 2px; margin-inline: auto; }
        .nav-link {
          padding: 7px 11px; border-radius: 8px;
          color: var(--text-dim); text-decoration: none;
          font-size: var(--step--1); font-weight: 500;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--text); background: var(--bg-sunken); }
        .nav-link.is-active { color: var(--accent); font-weight: 600; }
        .hdr-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .menu-btn {
          width: 34px; height: 34px; display: grid; place-items: center;
          border-radius: 8px; border: 1px solid var(--line-strong);
          background: var(--bg-sunken); color: var(--text);
          font-size: 15px; cursor: pointer; flex: none;
        }
        .nav-mobile {
          border-top: 1px solid var(--line);
          background: var(--bg-raised);
          padding-block: 8px 14px;
        }
        .nav-mobile .wrap { display: flex; flex-direction: column; }
        .nav-mobile-link {
          padding: 11px 4px; color: var(--text); text-decoration: none;
          border-bottom: 1px solid var(--line); font-weight: 500;
        }
        .nav-mobile-link:last-child { border-bottom: 0; }
        @media (min-width: 1060px) {
          .nav-desktop { display: flex; }
          .menu-btn { display: none; }
          .hdr-right { margin-left: 0; }
        }
      `}</style>
    </header>
  );
}
