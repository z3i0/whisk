"use client";

import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { RecipeGridSkeleton } from "@/components/recipes/recipe-skeleton";
import { EmptyState } from "@/components/shared/empty-state";

export function FavoritesView() {
  const { favorites, isLoaded, count } = useFavorites();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">Favorites</span>
      </nav>

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Heart className="size-3.5 fill-primary" />
            <span>Personal Cookbook</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Saved Favorites
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            Your saved recipes stored safely in your browser. Access your favorite dishes anytime.
          </p>
        </div>

        {isLoaded && count > 0 && (
          <div className="text-sm font-medium text-muted-foreground sm:text-right">
            <span>{count} {count === 1 ? "recipe" : "recipes"} saved</span>
          </div>
        )}
      </div>

      {/* Content */}
      {!isLoaded ? (
        <RecipeGridSkeleton count={4} />
      ) : favorites.length > 0 ? (
        <RecipeGrid recipes={favorites} priorityCount={4} />
      ) : (
        <div className="mx-auto max-w-2xl mt-4">
          <EmptyState
            icon={Heart}
            title="You haven't saved any recipes yet"
            description="Tap the heart icon on any recipe card to save it to your personal favorites collection."
            actionHref="/"
            actionLabel="Discover Delicious Recipes"
            suggestions={[
              { label: "Browse Pasta", href: "/categories/Pasta" },
              { label: "Italian Specialties", href: "/cuisines/Italian" },
              { label: "Surprise Recipe", href: "/recipes/random" },
            ]}
          />
        </div>
      )}
    </div>
  );
}
