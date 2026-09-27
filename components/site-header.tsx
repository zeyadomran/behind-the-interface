import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { SearchButton } from "./search-button";
import { StudiesMenu } from "./studies-menu";
import { StudyModeSwitch } from "./study-mode-switch";
import { InspectToggle } from "./inspect-mode";
import { NotebookButton } from "./notebook";
import "@/app/site-header.css";

/**
 * One header for the library and the stories. A story passes its subject so
 * the header can offer the Story / Research switch; its colors come from the
 * story theme.
 */
export function SiteHeader({
  study,
}: {
  study?: { slug: string; name: string };
}) {
  return (
    <header className="site-header" data-variant={study ? "story" : "site"}>
      <div className="site-header-inner">
        <Link
          href="/"
          className="site-header-brand"
          aria-label="Behind the Interface, home"
        >
          <Brand compact={Boolean(study)} />
        </Link>
        <StudiesMenu />
        {study ? (
          <div className="site-header-study">
            <span className="site-header-subject">{study.name}</span>
            <StudyModeSwitch
              slug={study.slug}
              name={study.name}
              current="story"
            />
          </div>
        ) : (
          <nav aria-label="Main navigation" className="site-navigation">
            <Link href="/docs/research-findings/">Findings</Link>
            <Link href="/docs/methodology/">Method</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        )}
        <div className="site-header-tools">
          <SearchButton />
          <InspectToggle compact />
          <NotebookButton compact />
          <a href="https://zeyadomran.com" className="portfolio-link">
            Portfolio <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
