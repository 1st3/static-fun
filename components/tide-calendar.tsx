"use client";

import { useEffect, useState } from "react";
import { dailyRanges } from "@/lib/tide";
import { Card, Heading, Row, Text } from "@/ui";
import styles from "./tide-calendar.module.css";

export function TideCalendar() {
  const [data, setData] = useState<{ label: string; first: number; days: ReturnType<typeof dailyRanges> } | null>(null);

  useEffect(() => {
    const now = new Date();
    const days = dailyRanges(now.getFullYear(), now.getMonth());
    const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const label = now.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
    setData({ label, first, days });
  }, []);

  if (!data) return <Card style={{ minHeight: 320 }} aria-busy="true" />;

  const min = Math.min(...data.days.map((d) => d.range));
  const max = Math.max(...data.days.map((d) => d.range));
  const today = new Date().getDate();

  return (
    <Card>
      <Row variant="between">
        <Heading level={3} size="card">{data.label}</Heading>
        <Text as="span" size="sm" tone="faint">Daily tidal range · bigger = more sea floor</Text>
      </Row>
      <div className={styles.grid} role="grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className={styles.dow}>{d}</span>
        ))}
        {Array.from({ length: data.first }, (_, i) => <span key={`b${i}`} />)}
        {data.days.map((d) => {
          const t = (d.range - min) / Math.max(0.01, max - min);
          return (
            <div
              key={d.day}
              className={d.day === today ? `${styles.day} ${styles.today}` : styles.day}
              style={{ ["--t" as string]: t }}
              title={`${d.range.toFixed(1)} m range`}
            >
              <span className={styles.num}>{d.day}</span>
              <span className={styles.range}>{d.range.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      <Text size="sm" tone="faint" mt={14}>
        The two-week beat between small neap tides and big spring tides comes from the Sun and
        Moon pulling together, then apart.
      </Text>
    </Card>
  );
}
