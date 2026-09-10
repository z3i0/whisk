import { Metadata } from "next";
import { SearchX, Search, Sparkles } from "lucide-react";
import { searchRecipes } from "@/lib/themealdb";
import { SearchInput } from "@/components/shared/search-input";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { EmptyState } from "@/components/shared/empty-state";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q = "" } = await searchParams;
  const query = q.trim();

  return {
    title: query ? `Search: "${query}"` : "Search Recipes",
    description: query
      ? `Discover recipes matching "${query}" on Whisk.`
      : "Search thousands of authentic recipes by name or ingredient on Whisk.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const recipes = query ? await searchRecipes(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Top Search Controls */}
      <div className="mx-auto max-w-2xl text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" />
          <span>Recipe Finder</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {query ? (
            <>
              Results for <span className="text-primary">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Explore & Search Recipes"
          )}
        </h1>

        <div className="pt-2">
          <SearchInput
            defaultValue={query}
            size="lg"
            placeholder="Type chicken, arrabiata, soup, curry..."
            autoFocus={!query}
          />
        </div>

        {query && (
          <p className="text-sm text-muted-foreground">
            {recipes.length === 1
              ? "Found 1 recipe"
              : `Found ${recipes.length} recipes`}
          </p>
        )}
      </div>

      {/* Main Content Area */}
      {query && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} priorityCount={4} />
      )}

      {query && recipes.length === 0 && (
        <div className="mx-auto max-w-2xl mt-8">
          <EmptyState
            icon={SearchX}
            title={`No recipes found for "${query}"`}
            description="Try checking your spelling or searching for a broader ingredient like chicken, pasta, beef, or soup."
            suggestions={[
              { label: "Chicken", href: "/search?q=chicken" },
              { label: "Pasta", href: "/search?q=pasta" },
              { label: "Curry", href: "/search?q=curry" },
              { label: "Dessert", href: "/search?q=dessert" },
              { label: "Seafood", href: "/search?q=seafood" },
            ]}
          />
        </div>
      )}

      {!query && (
        <div className="mx-auto max-w-2xl mt-8">
          <EmptyState
            icon={Search}
            title="Start your culinary search"
            description="Looking for inspiration? Search by dish name, culinary style, or browse our popular categories."
            suggestions={[
              { label: "Pasta Dishes", href: "/categories/Pasta" },
              { label: "Seafood", href: "/categories/Seafood" },
              { label: "Italian Cuisine", href: "/cuisines/Italian" },
              { label: "Vegetarian", href: "/categories/Vegetarian" },
            ]}
          />
        </div>
      )}
    </div>
  );
}
