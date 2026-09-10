"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Clock, ChefHat } from "lucide-react";
import { Recipe } from "@/lib/themealdb/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FavoriteButton } from "@/components/recipes/favorite-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface FeaturedRecipeProps {
  recipe: Recipe;
}

export function FeaturedRecipe({ recipe }: FeaturedRecipeProps) {
  const summary = {
    id: recipe.id,
    title: recipe.title,
    thumbnail: recipe.thumbnail,
    category: recipe.category,
    area: recipe.area,
  };

  const instructionSnippet =
    recipe.instructions.length > 0
      ? recipe.instructions[0]
      : "A delicious, authentic recipe ready to delight your dinner table.";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BlurFade delay={0.1} inView>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              <span>Chef&apos;s Spotlight</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Recipe of the Day
            </h2>
          </div>

          <Link
            href="/recipes/random"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            <span>Surprise Me</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </BlurFade>

      {/* Featured Recipe Card with Magic UI BorderBeam */}
      <BlurFade delay={0.2} inView>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:shadow-xl md:grid md:grid-cols-12 group">
          {/* Subtle animated border beam */}
          <BorderBeam
            size={280}
            duration={16}
            colorFrom="oklch(0.68 0.22 42)"
            colorTo="oklch(0.55 0.20 38)"
          />

          {/* Visual Media Column */}
          <div className="relative aspect-16/10 sm:aspect-16/9 md:aspect-auto md:col-span-6 lg:col-span-7 bg-muted overflow-hidden">
            <Image
              src={recipe.thumbnail}
              alt={recipe.title}
              fill
              sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute right-3.5 top-3.5 z-10">
              <FavoriteButton recipe={summary} />
            </div>

            <div className="absolute bottom-3.5 left-3.5 z-10 flex flex-wrap gap-1.5 sm:gap-2">
              <Badge
                variant="secondary"
                className="bg-background/90 text-xs font-semibold backdrop-blur-md shadow-xs"
              >
                {recipe.category}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/85 text-xs font-medium backdrop-blur-md border-border/80 shadow-xs"
              >
                {recipe.area} Cuisine
              </Badge>
            </div>
          </div>

          {/* Info Column */}
          <div className="flex flex-col justify-center p-5 sm:p-7 md:p-8 lg:p-10 space-y-4 sm:space-y-6 md:col-span-6 lg:col-span-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <ChefHat className="size-3.5 text-primary" />
                  {recipe.ingredients.length} Ingredients
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {recipe.instructions.length} Steps
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground leading-snug">
                {recipe.title}
              </h3>
            </div>

            <p className="line-clamp-3 text-sm text-muted-foreground sm:text-base leading-relaxed">
              {instructionSnippet}
            </p>

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <Link
                href={`/recipes/${recipe.id}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "gap-2 font-semibold shadow-xs hover:shadow-md justify-center sm:h-10 sm:px-5"
                )}
              >
                <span>View Recipe & Steps</span>
                <ArrowRight className="size-4" />
              </Link>

              <div className="flex justify-center">
                <FavoriteButton recipe={summary} showLabel />
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
