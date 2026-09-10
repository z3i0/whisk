"use client";

import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { RecipeSummary } from "@/lib/themealdb/types";
import { RecipeGrid } from "@/components/recipes/recipe-grid";
import { buttonVariants } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface PopularDiscoveriesProps {
  recipes: RecipeSummary[];
}

export function PopularDiscoveries({ recipes }: PopularDiscoveriesProps) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BlurFade delay={0.1} inView>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Compass className="size-3.5" />
              <span>Handpicked for You</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Popular Discoveries
            </h2>
          </div>

          <Link
            href="/categories/Pasta"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            <span>Explore More</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <RecipeGrid recipes={recipes} priorityCount={4} />
      </BlurFade>
    </section>
  );
}
