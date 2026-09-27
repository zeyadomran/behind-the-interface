"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

export function SearchButton() {
  const { setOpenSearch } = useSearchContext();
  return (
    <button
      type="button"
      className="search-button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search all research"
      aria-haspopup="dialog"
      title="Search all research (/)"
    >
      <Search size={17} strokeWidth={1.5} aria-hidden="true" />
      <span>Search</span>
      <kbd>/</kbd>
    </button>
  );
}
