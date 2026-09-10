import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Grid, UtensilsCrossed } from "lucide-react";
import { getCategories, getRecipesByCategory, isPorkCategory } from "@/lib/themealdb";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { EmptyState } from "@/components/shared/empty-state";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  if (isPorkCategory(decoded)) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${decoded} Recipes`,
    description: `Explore delicious and easy-to-cook ${decoded} recipes on Whisk.`,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  if (isPorkCategory(decodedCategory)) {
    notFound();
  }

  const [recipes, allCategories] = await Promise.all([
    getRecipesByCategory(decodedCategory),
    getCategories(),
  ]);

  const categoryInfo = allCategories.find(
    (c) => c.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (recipes.length === 0 && !categoryInfo) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/categories" className="hover:text-foreground transition-colors">
          Categories
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">{decodedCategory}</span>
      </nav>

      {/* Category Hero / Header */}
      <div className="mb-10 rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {categoryInfo?.thumbnail && (
            <div className="relative size-28 sm:size-32 shrink-0 overflow-hidden rounded-2xl bg-muted p-2">
              <Image
                src={categoryInfo.thumbnail}
                alt={decodedCategory}
                fill
                priority
                sizes="128px"
                className="object-contain"
              />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Grid className="size-3.5" />
              <span>Category</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {decodedCategory} Recipes
            </h1>

            {categoryInfo?.description && (
              <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                {categoryInfo.description}
              </p>
            )}

            <p className="text-xs font-medium text-muted-foreground pt-2">
              Showing {recipes.length} recipes
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {recipes.length > 0 ? (
        <RecipeGrid recipes={recipes} priorityCount={4} />
      ) : (
        <EmptyState
          icon={UtensilsCrossed}
          title={`No recipes found for "${decodedCategory}"`}
          description="We couldn't find any recipes in this category right now. Browse other categories or try a search."
          actionHref="/categories"
          actionLabel="View All Categories"
        />
      )}
    </div>
  );
}
