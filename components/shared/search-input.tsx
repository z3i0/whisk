"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
  autoFocus?: boolean;
  onSearchSubmit?: () => void;
}

export function SearchInput({
  defaultValue = "",
  placeholder = "Search recipes by name or ingredient...",
  className,
  size = "default",
  autoFocus = false,
  onSearchSubmit,
}: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      if (onSearchSubmit) {
        onSearchSubmit();
      }
    });
  };

  const handleClear = () => {
    setQuery("");
  };

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className={cn("relative flex w-full items-center", className)}
    >
      <div className="pointer-events-none absolute left-3.5 sm:left-4 z-10 flex items-center text-muted-foreground">
        {isPending ? (
          <Loader2 className={cn("animate-spin", isLarge ? "size-4.5 sm:size-5" : "size-4")} />
        ) : (
          <Search className={cn(isLarge ? "size-4.5 sm:size-5 text-primary/70" : "size-4")} />
        )}
      </div>

      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search recipes"
        className={cn(
          "w-full rounded-full border border-border/80 bg-card/90 backdrop-blur-md transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20",
          "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
          isLarge
            ? "h-12 sm:h-14 text-sm sm:text-base pl-10 pr-22 sm:pl-12 sm:pr-28 shadow-sm hover:border-border hover:shadow-md"
            : "h-9.5 text-sm pl-9 pr-9 shadow-xs"
        )}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            "absolute flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
            isLarge ? "right-19 sm:right-24 size-6 sm:size-7" : "right-2.5 size-6"
          )}
        >
          <X className="size-3.5" />
        </button>
      )}

      {isLarge && (
        <div className="absolute right-1.5 sm:right-2">
          <Button
            type="submit"
            size="sm"
            disabled={isPending || !query.trim()}
            className="rounded-full px-3.5 sm:px-5 h-9 sm:h-10 text-xs sm:text-sm font-semibold shadow-xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Search
          </Button>
        </div>
      )}
    </form>
  );
}
