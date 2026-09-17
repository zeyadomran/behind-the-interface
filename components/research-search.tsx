"use client";

import { useRef } from "react";
import { useDocsSearch } from "fumadocs-core/search/client";
import { staticClient } from "fumadocs-core/search/client/orama-static";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { withBasePath } from "@/lib/paths";

export default function ResearchSearch(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({
    client: staticClient({ from: withBasePath("/api/search.json") }),
  });
  const returnTarget = useRef<HTMLElement | null>(null);
  const openedAt = useRef<string | null>(null);
  const resultSelected = useRef(false);

  return (
    <SearchDialog
      {...props}
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      onSelect={() => {
        resultSelected.current = true;
      }}
    >
      <SearchDialogOverlay />
      <SearchDialogContent
        onOpenAutoFocus={() => {
          returnTarget.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          openedAt.current = window.location.href;
          resultSelected.current = false;
        }}
        onCloseAutoFocus={(event) => {
          // Search can open from several controls or a shortcut, without a
          // Radix DialogTrigger. Restore cancellation focus ourselves.
          event.preventDefault();
          if (
            !resultSelected.current &&
            openedAt.current === window.location.href &&
            returnTarget.current?.isConnected
          ) {
            returnTarget.current.focus({ preventScroll: true });
          }
        }}
      >
        <SearchDialogHeader>
          <SearchDialogIcon aria-hidden="true" />
          <SearchDialogInput aria-label="Search research" />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data === "empty" ? null : query.data} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
