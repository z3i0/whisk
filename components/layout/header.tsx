import Link from "next/link";
import { CookingPot, Sparkles } from "lucide-react";
import { SearchInput } from "@/components/shared/search-input";
import { HeaderFavoritesBadge } from "./header-favorites-badge";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <CookingPot className="size-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              Whisk
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Discover
            </Link>
            <Link
              href="/categories"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Categories
            </Link>
            <Link
              href="/cuisines"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Cuisines
            </Link>
          </nav>
        </div>

        {/* Center / Search bar (desktop / tablet) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-2">
          <SearchInput placeholder="Search dishes, ingredients..." />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/recipes/random"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden lg:inline-flex gap-1.5 font-medium border-border/70"
            )}
            title="Discover a random recipe"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span>Surprise Me</span>
          </Link>

          <HeaderFavoritesBadge />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
