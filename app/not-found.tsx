import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
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
        <Link className="text-link" href="/">
          Return to the library
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
