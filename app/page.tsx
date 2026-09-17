import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ResearchLibrary,
  type ResearchSummary,
} from "@/components/research-library";
import { getResearchEntries } from "@/lib/source";
import "./wordprints.css";

export default function HomePage() {
  const entries: ResearchSummary[] = getResearchEntries().map((page) => ({
    title: page.data.title,
    description: page.data.description ?? "",
    url: page.url,
    date: page.data.date!,
    tags: page.data.tags,
    sites: page.data.sites,
    visual: page.data.visual,
    kind: page.data.kind === "study" ? "study" : "report",
  }));
  const websiteCount = new Set(entries.flatMap((entry) => entry.sites)).size;
  const studyCount = entries.filter((entry) => entry.kind === "study").length;
  const reportCount = entries.filter((entry) => entry.kind === "report").length;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="home-main" tabIndex={-1}>
        <section className="library-hero" aria-labelledby="hero-heading">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="tiny-square" /> An open research notebook
            </span>
            <span className="eyebrow hero-byline">By Zeyad Omran</span>
          </div>
          <div className="hero-grid">
            <h1 id="hero-heading">
              A closer look
              <br />
              at digital <span>design.</span>
            </h1>
            <div className="hero-aside">
              <span className="eyebrow">Observe. Question. Understand.</span>
              <p>
                A growing collection of website studies, interaction details,
                and the decisions that make an experience work.
              </p>
              <Link className="text-link" href="/docs/methodology/">
                The approach <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero-bottom">
            <a className="browse-link" href="#library">
              Explore the notebook <ArrowDown size={18} aria-hidden="true" />
            </a>
            <div className="library-stats">
              <span>
                <b>{String(studyCount).padStart(2, "0")}</b> Studies
              </span>
              <span>
                <b>{String(reportCount).padStart(2, "0")}</b> Reports
              </span>
              <span>
                <b>{String(websiteCount).padStart(2, "0")}</b> Websites
              </span>
            </div>
          </div>
        </section>
        <ResearchLibrary entries={entries} />
        <section
          className="approach-section"
          aria-labelledby="approach-heading"
        >
          <span className="eyebrow">
            <span className="tiny-square" /> 02 / How to read these notes
          </span>
          <div className="approach-grid">
            <h2 id="approach-heading">
              The details.
              <br />
              And the reasons
              <br />
              behind them.
            </h2>
            <div>
              <p>
                Each study looks at how a website communicates, how it behaves,
                and what changes on a smaller screen. Screenshots and source
                references keep the observations grounded.
              </p>
              <div className="evidence-grid">
                <div>
                  <span>01</span>
                  <h3>What I observed</h3>
                  <p>
                    Pages explored, controls exercised, and layouts measured.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <h3>What the source shows</h3>
                  <p>
                    Public code that explains a behavior or design decision.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <h3>What I take from it</h3>
                  <p>Interpretations, tradeoffs, and ideas worth applying.</p>
                </div>
              </div>
              <Link className="text-link" href="/docs/methodology/">
                Read the research method{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
