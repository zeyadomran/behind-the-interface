import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Behind the Interface" },
  description: "This page is not in the Behind the Interface research library.",
  robots: { index: false, follow: true },
};

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
