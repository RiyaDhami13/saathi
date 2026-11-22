"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BigButton } from "@/components/BigButton";

interface SearchBarProps {
  placeholder: string;
  buttonLabel: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ placeholder, buttonLabel, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onSearch(trimmed);
      }}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-h-[3.5rem] w-full rounded-xl border-2 border-neutral-950 bg-white px-4 text-lg font-medium text-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-950"
      />
      <BigButton
        type="submit"
        tone="secondary"
        disabled={!trimmed}
        icon={<Search aria-hidden="true" />}
      >
        {buttonLabel}
      </BigButton>
    </form>
  );
}