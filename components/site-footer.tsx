import Link from "next/link";
import { park } from "@/content/park";
import { Container, Text, TideLine } from "@/ui";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <TideLine />
      <Container className={styles.inner}>
        <div className={`${styles.col} ${styles.about}`}>
          <p className={styles.name}>{park.name}</p>
          <Text size="sm" tone="dim">{park.landAcknowledgement}</Text>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <p className={styles.head}>Plan</p>
          <Link href="/trails">Trails</Link>
          <Link href="/tide">Tide</Link>
          <Link href="/when">When to come</Link>
        </nav>

        <nav className={styles.col} aria-label="Footer">
          <p className={styles.head}>Read</p>
          <Link href="/tales">Tales</Link>
          <Link href="/tips">Insider tips</Link>
          <Link href="/dispatches">Dispatches</Link>
          <Link href="/register">Trail register</Link>
        </nav>
      </Container>

      <Container className={styles.legal}>
        <Text size="sm" tone="faint">
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
        </Text>
      </Container>
    </footer>
  );
}
