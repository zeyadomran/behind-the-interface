import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { SearchButton } from "./search-button";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" aria-label="Behind the Interface research library">
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="site-navigation">
          <Link href="/#library" className="desktop-nav-link">
            Library
          </Link>
          <Link href="/docs/methodology/" className="desktop-nav-link">
            Approach
          </Link>
          <Link href="/#contact" className="desktop-nav-link">
            Contact
          </Link>
          <SearchButton />
          <a href="https://zeyadomran.com" className="portfolio-link">
            Portfolio <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
