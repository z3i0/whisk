"use client";

import Link from "next/link";
import { Sparkles, Utensils, ArrowRight } from "lucide-react";
import { SearchInput } from "@/components/shared/search-input";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const POPULAR_TAGS = [
  { label: "Pasta", href: "/categories/Pasta" },
  { label: "Chicken", href: "/search?q=chicken" },
  { label: "Seafood", href: "/categories/Seafood" },
  { label: "Dessert", href: "/categories/Dessert" },
  { label: "Italian", href: "/cuisines/Italian" },
  { label: "Japanese", href: "/cuisines/Japanese" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-2 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
      {/* 1. MagicUI DotPattern background with soft radial mask */}
      <DotPattern
        width={24}
        height={24}
        cx={2}
        cy={2}
        cr={1.5}
        className={cn(
          "absolute inset-0 -z-20 text-primary/15",
          "[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
        )}
      />

      {/* 2. MagicUI Particles for subtle ambient warmth */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={35}
        ease={80}
        color="#c25e2e"
        size={0.6}
        staticity={40}
      />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-30 size-[650px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center space-y-5 sm:space-y-6">
          {/* Stagger item 1: Pill Badge with AnimatedGradientText */}
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 px-3.5 py-1 text-xs shadow-xs backdrop-blur-md transition-all hover:border-primary/50">
              <Sparkles className="size-3.5 text-primary shrink-0" />
              <AnimatedGradientText>
                Curated Culinary Discovery
              </AnimatedGradientText>
              <ArrowRight className="size-3 text-muted-foreground shrink-0" />
            </div>
          </BlurFade>

          {/* Stagger item 2: Editorial H1 */}
          <BlurFade delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Discover your next{" "}
              <span className="bg-linear-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
                favorite meal.
              </span>
            </h1>
          </BlurFade>

          {/* Stagger item 3: Subtitle */}
          <BlurFade delay={0.15}>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base lg:text-lg leading-relaxed">
              Explore thousands of authentic recipes from around the globe,
              complete with exact measurements, verified step-by-step directions,
              and easy favorite saving.
            </p>
          </BlurFade>

          {/* Stagger item 4: Focused Search Bar */}
          <BlurFade delay={0.2} className="w-full max-w-xl pt-1">
            <SearchInput
              size="lg"
              placeholder="Search recipes, pasta, curry..."
            />
          </BlurFade>

          {/* Stagger item 5: Trending Search Pills */}
          <BlurFade delay={0.25} className="w-full max-w-xl">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs pt-1">
              <span className="flex items-center gap-1 font-medium text-muted-foreground mr-1">
                <Utensils className="size-3.5 text-primary shrink-0" />
                Trending:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="rounded-full border border-border/70 bg-card/80 px-3 py-0.5 sm:px-3.5 sm:py-1 font-medium text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 shadow-2xs backdrop-blur-xs"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
