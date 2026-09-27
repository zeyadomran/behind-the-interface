import Link from "@/components/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLibraryEntries } from "@/lib/library";

export const metadata = {
  title: { absolute: "Page not found | Behind the Interface" },
  description: "This page is not in the Behind the Interface research library.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const studies = getLibraryEntries().filter((entry) => entry.kind === "study");
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <span className="eyebrow">404 / A missing page</span>
        <h1>
          This page isn’t
          <br />
          in the notebook.
        </h1>
        <p>The study may have moved, or this link may be incomplete.</p>
        <nav aria-label="Studies" className="not-found-studies">
          {studies.map((entry) => (
            <Link
              key={entry.slug}
              href={entry.storyUrl ?? entry.url}
              data-site={entry.slug}
            >
              {entry.title}
            </Link>
          ))}
        </nav>
        <Link className="text-link" href="/">
          Return to the library
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
