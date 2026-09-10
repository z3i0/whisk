import Link from "next/link";
import { CookingPot, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <CookingPot className="size-4.5" />
              </div>
              <span>Whisk</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Discover curated recipes from around the world. Follow clear
              step-by-step cooking directions and keep track of your personal
              kitchen favorites.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Featured Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="transition-colors hover:text-foreground"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/cuisines"
                  className="transition-colors hover:text-foreground"
                >
                  World Cuisines
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="transition-colors hover:text-foreground"
                >
                  Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Culinary Sources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Data & API
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powered by{" "}
              <a
                href="https://www.themealdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                TheMealDB API
              </a>
              . Recipe images and instructions courtesy of their respective
              creators.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Whisk. Crafted for food lovers everywhere.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1">
            <span>Built with passion &</span>
            <Heart className="size-3.5 fill-primary text-primary inline mx-0.5" />
            <span>for great food by</span>
            <a
              href="https://github.com/z3i0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              z3i0
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
