import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ExternalLink,
  Flame,
  Globe,
  Play,
  Sparkles,
  Utensils,
} from "lucide-react";
import { getRecipeById, getRelatedRecipes, getAreaFlagUrl } from "@/lib/themealdb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FavoriteButton } from "@/components/recipes/favorite-button";
import { IngredientChecklist } from "@/components/recipes/ingredient-checklist";
import { InstructionSteps } from "@/components/recipes/instruction-steps";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { RecipeJsonLd } from "@/components/recipes/recipe-json-ld";
import { cn } from "@/lib/utils";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    };
  }

  return {
    title: recipe.title,
    description: `How to cook authentic ${recipe.title}. Complete with ${recipe.ingredients.length} ingredients and step-by-step instructions.`,
    openGraph: {
      title: `${recipe.title} | Whisk`,
      description: `Authentic ${recipe.area} ${recipe.category} recipe. Ready to cook at home with Whisk.`,
      images: [
        {
          url: recipe.thumbnail,
          width: 800,
          height: 600,
          alt: recipe.title,
        },
      ],
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = await getRelatedRecipes(recipe, 4);
  const flagUrl = getAreaFlagUrl(recipe.area);

  const recipeSummary = {
    id: recipe.id,
    title: recipe.title,
    thumbnail: recipe.thumbnail,
    category: recipe.category,
    area: recipe.area,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8 pb-20">
      {/* Schema.org Structured Data */}
      <RecipeJsonLd recipe={recipe} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link
          href={`/categories/${encodeURIComponent(recipe.category)}`}
          className="hover:text-foreground transition-colors"
        >
          {recipe.category}
        </Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <span className="truncate font-medium text-foreground max-w-[180px] sm:max-w-md">
          {recipe.title}
        </span>
      </nav>

      <article className="space-y-10 sm:space-y-12">
        {/* Split Hero Section: Proportional Media + Details */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Recipe Image Column (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full max-w-lg lg:max-w-none mx-auto overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-md group">
              <Image
                src={recipe.thumbnail}
                alt={recipe.title}
                fill
                priority
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 560px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating category badge on image */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                <Link href={`/categories/${encodeURIComponent(recipe.category)}`}>
                  <Badge className="bg-background/90 text-foreground backdrop-blur-md border border-border/60 shadow-2xs text-xs font-semibold hover:bg-background">
                    {recipe.category}
                  </Badge>
                </Link>
              </div>

              {recipe.youtubeUrl && (
                <a
                  href={recipe.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "absolute bottom-3.5 right-3.5 gap-1.5 backdrop-blur-md bg-background/90 text-xs font-semibold shadow-xs hover:bg-background hover:text-red-500"
                  )}
                >
                  <Play className="size-3.5 fill-current text-red-500" />
                  <span>Video Tutorial</span>
                </a>
              )}
            </div>
          </div>

          {/* Recipe Details & Meta Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            {/* Category, Cuisine with Flag & Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/cuisines/${encodeURIComponent(recipe.area)}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary shadow-2xs"
              >
                {flagUrl && (
                  <span className="relative w-4.5 h-3 overflow-hidden rounded-[2px] border border-black/10 dark:border-white/20 shrink-0">
                    <Image
                      src={flagUrl}
                      alt={`${recipe.area} flag`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </span>
                )}
                <span>{recipe.area} Cuisine</span>
              </Link>

              {recipe.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted/80 px-2.5 py-0.5 text-xs text-muted-foreground font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {recipe.title}
            </h1>

            {/* Quick Meta Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-2xs">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Utensils className="size-4 sm:size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-muted-foreground">Ingredients</div>
                  <div className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                    {recipe.ingredients.length} items
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-2xs">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Flame className="size-4 sm:size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-muted-foreground">Directions</div>
                  <div className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                    {recipe.instructions.length} steps
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-2xs">
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe className="size-4 sm:size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-muted-foreground">Origin</div>
                  <div className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                    {recipe.area}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <FavoriteButton recipe={recipeSummary} showLabel size="lg" className="w-full sm:w-auto justify-center" />

              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 text-xs sm:text-sm font-medium border-border/80 shadow-2xs w-full sm:w-auto justify-center"
                  )}
                >
                  <ExternalLink className="size-4" />
                  <span>Source Website</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Recipe Content: Ingredients & Instructions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-8 sm:pt-10 border-t border-border/60">
          {/* Left Column: Ingredients Checklist (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <IngredientChecklist ingredients={recipe.ingredients} />

            {/* Video preview embed if YouTube ID available */}
            {recipe.youtubeId && (
              <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs">
                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Play className="size-4 text-red-500 fill-current" />
                  <span>Video Tutorial</span>
                </h3>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${recipe.youtubeId}`}
                    title={`${recipe.title} cooking video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <InstructionSteps steps={recipe.instructions} />
          </div>
        </div>
      </article>

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="mt-16 border-t border-border/60 pt-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              <span>More In This Style</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Related Recipes
            </h2>
          </div>

          <RecipeGrid recipes={relatedRecipes} />
        </section>
      )}
    </div>
  );
}
