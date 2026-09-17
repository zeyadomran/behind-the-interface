"use client";

import { lazy, type ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";

const ResearchSearch = lazy(() => import("@/components/research-search"));

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      theme={{ enabled: false }}
      search={{ SearchDialog: ResearchSearch }}
    >
      {children}
    </RootProvider>
  );
}
