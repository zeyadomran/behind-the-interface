import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        Interesting Designs <span className="footer-divider">/</span> A research
        notebook by Zeyad Omran
      </span>
      <div>
        <Link href="/docs/methodology/">How I research</Link>
        <a href="https://zeyadomran.com">
          Back to portfolio <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
