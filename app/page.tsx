import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroStudy } from "@/components/hero-study";
import {
  ResearchLibrary,
  type ResearchSummary,
} from "@/components/research-library";
import { getResearchEntries } from "@/lib/source";
import { getStudyStory } from "@/lib/study-stories";
import { pageMetadata, websiteSchema } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import "./wordprints.css";
import "./home-hero.css";

export const metadata = pageMetadata({
  title: "Website Design Stories & UI/UX Research",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  const entries: ResearchSummary[] = getResearchEntries().map((page) => ({
    title: page.data.title,
    description: page.data.description ?? "",
    url: page.url,
    storyUrl: getStudyStory(page.slugs.join("/"))
      ? `/studies/${page.slugs.join("/")}/`
      : undefined,
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
      <StructuredData data={websiteSchema()} />
      <SiteHeader />
      <main id="main-content" className="home-main" tabIndex={-1}>
        <section id="home" className="bti-hero" aria-labelledby="hero-heading">
          <div className="bti-hero-topline">
            <span className="eyebrow">An open research notebook</span>
            <span className="eyebrow">By Zeyad Omran</span>
          </div>
          <div className="bti-hero-composition">
            <div className="bti-hero-copy">
              <h1 id="hero-heading">
                A closer look
                <br />
                <span>at design.</span>
              </h1>
              <div className="bti-hero-intro">
                <p>
                  I’m Zeyad. I explore the type, motion, and ideas behind
                  interesting websites, then share what I find.
                </p>
                <div className="bti-hero-actions">
                  <a className="bti-hero-link" href="#library">
                    Explore the studies{" "}
                    <ArrowRight
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
            <HeroStudy />
          </div>
          <div className="bti-hero-bottom">
            <span className="eyebrow">Observe. Question. Understand.</span>
            <div className="bti-hero-stats" aria-label="Inside the notebook">
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
              The details. <br />
              And the reasons <br />
              behind them.
            </h2>
            <div>
              <p>
                Each story lets you explore a website through five interactive
                chapters. Follow the sequence or skip to what interests you. The
                full studies keep the screenshots, measurements, and source
                references close by.
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
