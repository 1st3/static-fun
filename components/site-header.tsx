"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, VisuallyHidden } from "@/ui";
import { TideStrip } from "./tide";
import styles from "./site-header.module.css";

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
      className={styles.themeBtn}
      onClick={flip}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title="Switch theme"
    >
      <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <svg viewBox="0 0 34 34" aria-hidden="true" className={styles.mark}>
            <circle cx="17" cy="17" r="16" className={styles.ring} />
            <path
              d="M3 21 C 9 17, 13 25, 19 20 C 24 15.8, 28 20, 31 18"
              className={styles.wave}
            />
            <path
              d="M3 26 C 9 22, 13 30, 19 25 C 24 20.8, 28 25, 31 23"
              className={`${styles.wave} ${styles.wave2}`}
            />
          </svg>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Fundy</span>
            <span className={styles.brandSub}>The Tide Guide</span>
          </span>
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? `${styles.link} ${styles.linkActive}` : styles.link}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.right}>
          <TideStrip />
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <VisuallyHidden>Menu</VisuallyHidden>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" className={styles.navMobile} aria-label="Primary">
          <Container className={styles.mobileInner}>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={styles.mobileLink}>
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
