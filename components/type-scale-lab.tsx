"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { RotateCcw } from "lucide-react";
import Link from "@/components/link";
import {
  articleVisualData,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import "@/app/type-lab.css";

type Sort = "site" | "size" | "change";

interface Row {
  key: string;
  site: SiteKey;
  siteName: string;
  role: string;
  family: string;
  desktop: number;
  desktopLeading: number | "normal";
  mobile: number | null;
  mobileLeading: number | "normal" | null;
  note: string;
}

const siteOrder: SiteKey[] = [
  "ace",
  "arkon-digital",
  "neue-montreal",
  "monolog",
  "lama-lama",
  "noho",
];
const scaleMax = 170;
const ticks = [0, 40, 80, 120, 160];
const sorts: { id: Sort; label: string }[] = [
  { id: "site", label: "By website" },
  { id: "size", label: "Largest first" },
  { id: "change", label: "Most changed" },
];

function roleName(label: string, site: string) {
  const words = site.split(" ");
  const trimmed = label.replace(
    new RegExp(`^(${[site, words[0]].join("|")})\\s+`, "i"),
    "",
  );
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function px(value: number) {
  return `${Number(value.toFixed(2))}`;
}

function change(row: Row) {
  return row.mobile === null ? -1 : row.mobile / row.desktop - 1;
}

function changeLabel(row: Row) {
  if (row.mobile === null) return "removed";
  const percent = Math.round(change(row) * 100);
  return percent === 0
    ? "±0%"
    : `${percent > 0 ? "+" : "−"}${Math.abs(percent)}%`;
}

function position(value: number) {
  return (value / scaleMax) * 100;
}

export function TypeScaleLab() {
  const rows = useMemo<Row[]>(
    () =>
      siteOrder.flatMap((site) =>
        articleVisualData[site].typography.map((role) => ({
          key: `${site}-${role.label}`,
          site,
          siteName: articleVisualData[site].name,
          role: roleName(role.label, articleVisualData[site].name),
          family: role.family,
          desktop: role.desktop.size,
          desktopLeading: role.desktop.lineHeight,
          mobile: role.mobile.size,
          mobileLeading: role.mobile.lineHeight,
          note: role.note,
        })),
      ),
    [],
  );
  const [sort, setSort] = useState<Sort>("site");
  const [emphasis, setEmphasis] = useState<SiteKey | null>(null);
  const [played, setPlayed] = useState(true);
  const [instant, setInstant] = useState(false);
  const [active, setActive] = useState<Row>(rows[0]);
  const chart = useRef<HTMLDivElement>(null);
  const rowElements = useRef(new Map<string, HTMLElement>());
  const offsets = useRef(new Map<string, number>());

  const sorted = useMemo(() => {
    const list = [...rows];
    if (sort === "size") list.sort((a, b) => b.desktop - a.desktop);
    if (sort === "change")
      list.sort((a, b) => Math.abs(change(b)) - Math.abs(change(a)));
    return list;
  }, [rows, sort]);

  // Rows glide to their new rank (FLIP), so a re-sort explains itself.
  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const next = new Map<string, number>();
    rowElements.current.forEach((element, key) => {
      const top = element.offsetTop;
      next.set(key, top);
      const before = offsets.current.get(key);
      if (!reduce && before !== undefined && before !== top)
        element.animate(
          [
            { transform: `translateY(${before - top}px)` },
            { transform: "none" },
          ],
          { duration: 480, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        );
    });
    offsets.current = next;
  }, [sorted]);

  // The prerendered chart shows the recorded mobile values. With motion
  // allowed, the mobile markers start from desktop and travel when seen.
  useEffect(() => {
    const element = chart.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!element || reduce || !("IntersectionObserver" in window)) return;
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight) return;
    setInstant(true);
    setPlayed(false);
    const frame = window.requestAnimationFrame(() => setInstant(false));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlayed(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  function replay() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInstant(true);
    setPlayed(false);
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        setInstant(false);
        setPlayed(true);
      }),
    );
  }

  return (
    <figure
      className="type-lab"
      aria-labelledby="type-lab-title"
      data-instant={instant || undefined}
    >
      <figcaption className="type-lab-caption">
        <p className="section-eyebrow">
          <span className="tiny-square" aria-hidden="true" /> 02 · Type lab
        </p>
        <h2 id="type-lab-title">
          {rows.length} text roles,
          <br /> one ruler.
        </h2>
        <p>
          Every measured role in the library, on the same pixel scale. The
          filled square is the desktop size at 1440 × 1000; the outlined square
          is the same role at 390 × 844. Sort them, pick a website, or replay
          the trip to mobile.
        </p>
      </figcaption>

      <div className="type-lab-controls">
        <div className="type-lab-sorts" role="group" aria-label="Sort roles">
          {sorts.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={sort === option.id}
              onClick={() => setSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div
          className="type-lab-sites"
          role="group"
          aria-label="Emphasize a website"
        >
          {siteOrder.map((site) => (
            <button
              key={site}
              type="button"
              data-site={site}
              aria-pressed={emphasis === site}
              onClick={() => setEmphasis(emphasis === site ? null : site)}
            >
              <span className="type-lab-chip-dot" aria-hidden="true" />
              {articleVisualData[site].name}
            </button>
          ))}
        </div>
        <button type="button" className="type-lab-replay" onClick={replay}>
          <RotateCcw size={15} strokeWidth={1.6} aria-hidden="true" />
          Replay desktop → mobile
        </button>
      </div>

      <div className="type-lab-legend" aria-hidden="true">
        <span>
          <i className="type-lab-legend-desktop" /> Desktop, 1440px wide
        </span>
        <span>
          <i className="type-lab-legend-mobile" /> Mobile, 390px wide
        </span>
        <span>
          <i className="type-lab-legend-removed" /> Removed on mobile
        </span>
      </div>

      <div
        className="type-lab-chart"
        ref={chart}
        data-played={played}
        data-emphasis={emphasis ?? undefined}
      >
        <div className="type-lab-axis" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick} style={{ left: `${position(tick)}%` }}>
              {tick}
              {tick === ticks[ticks.length - 1] ? "px" : ""}
            </span>
          ))}
        </div>
        <ol className="type-lab-rows">
          {sorted.map((row, index) => {
            const desktopX = position(row.desktop);
            const mobileX =
              row.mobile === null ? desktopX : position(row.mobile);
            const shownX = played ? mobileX : desktopX;
            const muted = emphasis !== null && emphasis !== row.site;
            return (
              <li
                key={row.key}
                ref={(element) => {
                  if (element) rowElements.current.set(row.key, element);
                  else rowElements.current.delete(row.key);
                }}
                data-muted={muted || undefined}
                data-site={row.site}
                style={{ "--i": index } as CSSProperties}
              >
                <Link
                  href={`/studies/${row.site}/#type`}
                  className="type-lab-row"
                  aria-label={`${row.siteName}, ${row.role}: ${px(row.desktop)} pixels on desktop, ${row.mobile === null ? "not displayed" : `${px(row.mobile)} pixels`} on mobile. Open the ${row.siteName} type chapter.`}
                  onPointerEnter={() => setActive(row)}
                  onFocus={() => setActive(row)}
                >
                  <span className="type-lab-label">
                    <span className="type-lab-site">{row.siteName}</span>
                    <span className="type-lab-role">{row.role}</span>
                  </span>
                  <span className="type-lab-track">
                    <span
                      className="type-lab-link"
                      style={{
                        left: `${Math.min(desktopX, shownX)}%`,
                        width: `${Math.abs(desktopX - shownX)}%`,
                      }}
                    />
                    <span
                      className="type-lab-dot type-lab-dot--desktop"
                      style={{ left: `${desktopX}%` }}
                    />
                    <span
                      className="type-lab-dot type-lab-dot--mobile"
                      data-removed={row.mobile === null || undefined}
                      style={{ left: `${shownX}%` }}
                    />
                  </span>
                  <span className="type-lab-value">
                    {px(row.desktop)} →{" "}
                    {row.mobile === null ? "—" : px(row.mobile)}
                    <small>{changeLabel(row)}</small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="type-lab-readout" aria-hidden="true">
        <p className="type-lab-readout-title">
          <span data-site={active.site} className="type-lab-chip-dot" />
          {active.siteName} · {active.role}
          <span>{active.family}</span>
        </p>
        <p>
          Desktop {px(active.desktop)} /{" "}
          {typeof active.desktopLeading === "number"
            ? px(active.desktopLeading)
            : active.desktopLeading}
          px · Mobile{" "}
          {active.mobile === null
            ? "not displayed"
            : `${px(active.mobile)} / ${typeof active.mobileLeading === "number" ? px(active.mobileLeading) : active.mobileLeading}px`}
        </p>
        <p className="type-lab-readout-note">{active.note}.</p>
      </div>

      <details className="type-lab-table">
        <summary>Show every value as a table</summary>
        <div
          className="type-lab-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Type measurements table"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Website and role</th>
                <th scope="col">Typeface / weight</th>
                <th scope="col">Desktop size / leading</th>
                <th scope="col">Mobile size / leading</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">
                    {row.siteName} · {row.role}
                  </th>
                  <td>{row.family}</td>
                  <td>
                    {px(row.desktop)} /{" "}
                    {typeof row.desktopLeading === "number"
                      ? px(row.desktopLeading)
                      : row.desktopLeading}
                  </td>
                  <td>
                    {row.mobile === null
                      ? "Not displayed"
                      : `${px(row.mobile)} / ${typeof row.mobileLeading === "number" ? px(row.mobileLeading) : row.mobileLeading}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="type-lab-footnote">
        Computed CSS pixels, not estimates from screenshots. Five websites were
        measured {originalResearchDate}; Noho on{" "}
        {articleVisualData.noho.researchDate}. Each row opens that study’s type
        chapter. The full tables live in the{" "}
        <Link href="/docs/research-findings/#measured-type-hierarchy">
          research findings
        </Link>
        .
      </p>
    </figure>
  );
}
