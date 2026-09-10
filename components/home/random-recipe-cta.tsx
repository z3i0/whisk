"use client";

import Link from "next/link";
import { Sparkles, UtensilsCrossed } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";

export function RandomRecipeCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BlurFade delay={0.1} inView>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-b from-primary/10 via-card to-card px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16 text-center shadow-xs">
          {/* Subtle ambient circle */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

          <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <UtensilsCrossed className="size-3.5" />
              <span>Spontaneous Cooking</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Not sure what to cook tonight?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Let our culinary engine surprise you with a hand-selected dish from
              our global recipe vault. One click, endless inspiration.
            </p>

            <div className="pt-2 sm:pt-4 flex justify-center">
              <Link href="/recipes/random">
                <ShimmerButton className="gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                  <Sparkles className="size-4 sm:size-4.5" />
                  <span>Surprise Me with a Recipe</span>
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
