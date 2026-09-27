import Link from "@/components/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FindingsDeck, type DeckSite } from "@/components/findings-deck";
import { ResearchLibrary } from "@/components/research-library";
import { TypeScaleLab } from "@/components/type-scale-lab";
import { InspectToggle } from "@/components/inspect-mode";
import { EvidenceBadge } from "@/components/evidence-badge";
import { getLibraryEntries, numberWord } from "@/lib/library";
import { findings } from "@/lib/findings";
import { articleVisualData, type SiteKey } from "@/lib/article-visual-data";
import { evidenceDescriptions, type EvidenceKind } from "@/lib/evidence";
import { pageMetadata, websiteSchema } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import "./wordprints.css";
import "./home.css";

export const metadata = pageMetadata({
  title: "Website Design Stories & UI/UX Research",
  description: SITE_DESCRIPTION,
  path: "/",
});

// One real example per kind of evidence, drawn from the findings deck.
const evidenceExamples: {
  kind: EvidenceKind;
  finding?: string;
  text?: string;
}[] = [
  { kind: "observed", finding: "ace-640px" },
  { kind: "mixed", finding: "neue-weights" },
  { kind: "source-confirmed", finding: "arkon-zoom" },
  { kind: "hook-only", finding: "monolog-accordion" },
  {
    kind: "interpretation",
    text: "Noho’s warm panels keep interface color quiet so the photographs supply it.",
  },
  {
    kind: "illustration",
    text: "Each story’s demonstrations, like the Lama Lama exits game, are drawn for this library.",
  },
];

export default function HomePage() {
  const entries = getLibraryEntries();
  const studies = entries.filter((entry) => entry.kind === "study");
  const websiteCount = new Set(entries.flatMap((entry) => entry.sites)).size;
  const chapterCount = studies.reduce(
    (total, entry) => total + (entry.story?.chapters.length ?? 0),
    0,
  );
  const roleCount = Object.values(articleVisualData).reduce(
    (total, data) => total + data.typography.length,
    0,
  );
  const deckSites: Record<string, DeckSite> = Object.fromEntries(
    studies.map((entry) => [
      entry.slug,
      { name: entry.title, href: entry.storyUrl ?? entry.url },
    ]),
  );
  const stats = [
    { value: websiteCount, label: "Websites" },
    { value: chapterCount, label: "Story chapters" },
    { value: roleCount, label: "Measured type roles" },
    { value: findings.length, label: "Sourced findings" },
  ];

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <SiteHeader />
      <main id="main-content" className="home-main" tabIndex={-1}>
        <section className="home-hero" aria-labelledby="hero-heading">
          <div className="home-hero-copy">
            <p className="hero-kicker">
              <span className="tiny-square" aria-hidden="true" />A research
              notebook by Zeyad Omran
            </p>
            <h1 id="hero-heading" data-inspect="Display">
              {numberWord(websiteCount)} websites,
              <br />
              <span>taken apart.</span>
            </h1>
            <p className="hero-lead" data-inspect="Lead">
              I study how distinctive websites use type, motion and structure. I
              measure what I can, test what I can reach, and keep what I saw
              apart from what I think.
            </p>
            <div className="hero-actions">
              <a className="hero-primary" href="#studies">
                Start with a study
                <ArrowDown size={19} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <InspectToggle
                label="Inspect this page"
                className="hero-inspect"
              />
            </div>
            <p className="hero-hint">
              Inspect measures this page live, the same way the research
              measured each website. Press <kbd>I</kbd> any time.
            </p>
          </div>
          <FindingsDeck findings={findings} sites={deckSites} />
          <dl className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{String(stat.value).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ResearchLibrary entries={entries} />

        <section className="type-lab-section" aria-label="Type lab">
          <TypeScaleLab />
        </section>

        <section className="method-section" aria-labelledby="method-heading">
          <div className="method-intro">
            <p className="section-eyebrow">
              <span className="tiny-square" aria-hidden="true" /> 03 · Method
            </p>
            <h2 id="method-heading">Every claim carries its evidence.</h2>
            <p>
              A screenshot shows one moment. Source code shows intent. A design
              judgment is only a judgment. Each finding here is labeled, so you
              know how much weight it can bear.
            </p>
            <Link className="text-link" href="/docs/methodology/">
              How the research works{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="evidence-guide">
            {evidenceExamples.map((example) => {
              const finding = findings.find(
                (item) => item.id === example.finding,
              );
              return (
                <li key={example.kind} data-evidence={example.kind}>
                  <EvidenceBadge kind={example.kind} />
                  <p className="evidence-guide-definition">
                    {evidenceDescriptions[example.kind]}
                  </p>
                  <p className="evidence-guide-example">
                    <span>For example</span>
                    {finding ? (
                      <>
                        {finding.text}{" "}
                        <Link
                          href={`/docs/${finding.site}/#${finding.anchor}`}
                          aria-label={`Source for the ${articleVisualData[finding.site as SiteKey].name} example`}
                        >
                          Source
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </Link>
                      </>
                    ) : (
                      example.text
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
