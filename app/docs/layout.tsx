import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { Brand } from "@/components/brand";
import { InspectToggle } from "@/components/inspect-mode";
import { NotebookButton } from "@/components/notebook";

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <Brand compact />,
        url: "/",
        children: (
          <div className="docs-nav-tools">
            <InspectToggle compact />
            <NotebookButton compact />
          </div>
        ),
      }}
      links={[
        { text: "Library", url: "/" },
        { text: "Portfolio", url: "https://zeyadomran.com", external: true },
      ]}
      themeSwitch={{ enabled: false }}
      sidebar={{
        collapsible: false,
        footer: (
          <div className="docs-tools">
            <InspectToggle />
            <NotebookButton />
          </div>
        ),
      }}
      containerProps={{ className: "research-docs" }}
    >
      {children}
    </DocsLayout>
  );
}
