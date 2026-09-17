import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { Brand } from "@/components/brand";

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: <Brand compact />, url: "/" }}
      links={[
        { text: "Library", url: "/" },
        { text: "Portfolio", url: "https://zeyadomran.com", external: true },
      ]}
      themeSwitch={{ enabled: false }}
      sidebar={{ collapsible: false }}
      containerProps={{ className: "research-docs" }}
    >
      {children}
    </DocsLayout>
  );
}
