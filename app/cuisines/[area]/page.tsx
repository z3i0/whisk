import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Globe, UtensilsCrossed } from "lucide-react";
import { getRecipesByArea, getAreaFlagUrl } from "@/lib/themealdb";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { EmptyState } from "@/components/shared/empty-state";

interface CuisineDetailPageProps {
  params: Promise<{ area: string }>;
}

export async function generateMetadata({
  params,
}: CuisineDetailPageProps): Promise<Metadata> {
  const { area } = await params;
  const decoded = decodeURIComponent(area);

  return {
    title: `${decoded} Cuisine Recipes`,
    description: `Discover authentic and traditional ${decoded} recipes on Whisk.`,
  };
}

export default async function CuisineDetailPage({
  params,
}: CuisineDetailPageProps) {
  const { area } = await params;
  const decodedArea = decodeURIComponent(area);

  const recipes = await getRecipesByArea(decodedArea);
  const flagUrl = getAreaFlagUrl(decodedArea);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/cuisines" className="hover:text-foreground transition-colors">
          Cuisines
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">{decodedArea}</span>
      </nav>

      {/* Cuisine Header */}
      <div className="mb-10 rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {flagUrl ? (
            <div className="relative w-20 h-13 sm:w-24 sm:h-16 shrink-0 overflow-hidden rounded-xl border border-black/10 dark:border-white/20 shadow-xs bg-muted/40">
              <Image
                src={flagUrl}
                alt={`${decodedArea} flag`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              <Globe className="size-10 sm:size-12" />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Globe className="size-3.5" />
              <span>Cuisine</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {decodedArea} Recipes
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore beloved and traditional dishes from {decodedArea} cuisine,
              crafted with authentic ingredients and regional cooking traditions.
            </p>

            <p className="text-xs font-medium text-muted-foreground pt-1">
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
          title={`No recipes found for "${decodedArea}"`}
          description="TheMealDB does not currently have any cataloged recipes for this regional cuisine. Explore our most popular international cuisines below."
          actionHref="/cuisines"
          actionLabel="Explore All Cuisines"
          suggestions={[
            { label: "Italian", href: "/cuisines/Italian" },
            { label: "Mexican", href: "/cuisines/Mexican" },
            { label: "Japanese", href: "/cuisines/Japanese" },
            { label: "French", href: "/cuisines/French" },
            { label: "Indian", href: "/cuisines/Indian" },
          ]}
        />
      )}
    </div>
  );
}
