"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Grid } from "lucide-react";
import { Category } from "@/lib/themealdb/types";
import { buttonVariants } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Show top 8 curated categories on the homepage
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BlurFade delay={0.1} inView>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Grid className="size-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Browse by Category
            </h2>
          </div>

          <Link
            href="/categories"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            <span>All Categories</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </BlurFade>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-6">
        {displayCategories.map((category, idx) => (
          <BlurFade key={category.id} delay={0.04 * idx} inView>
            <Link
              href={`/categories/${encodeURIComponent(category.name)}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-card/70 p-3.5 sm:p-5 lg:p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg backdrop-blur-xs h-full justify-between"
            >
              <div className="relative size-20 sm:size-24 lg:size-28 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={category.thumbnail}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain drop-shadow-sm"
                />
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col items-center">
                <h3 className="font-heading text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                <span className="mt-0.5 sm:mt-1 inline-flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Explore</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
