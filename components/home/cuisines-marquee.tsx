"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, ArrowRight } from "lucide-react";
import { Area } from "@/lib/themealdb/types";
import { getAreaFlagUrl } from "@/lib/themealdb";
import { Marquee } from "@/components/ui/marquee";
import { buttonVariants } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

interface CuisinesMarqueeProps {
  areas: Area[];
}

export function CuisinesMarquee({ areas }: CuisinesMarqueeProps) {
  // Use first 20 active cuisines
  const firstRow = areas.slice(0, 10);
  const secondRow = areas.slice(10, 20);

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <BlurFade delay={0.1} inView>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Globe className="size-3.5" />
                <span>Culinary Traditions</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Explore by Cuisine
              </h2>
            </div>

            <Link
              href="/cuisines"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              <span>All Cuisines</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* Marquee Wrapper with smooth edge fade masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Row 1 */}
        <Marquee pauseOnHover className="[--duration:40s] py-1.5">
          {firstRow.map((area, index) => {
            const flagUrl = getAreaFlagUrl(area.name);
            return (
              <Link
                key={`${area.name}-${index}`}
                href={`/cuisines/${encodeURIComponent(area.name)}`}
                className="group/item flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/70 bg-card/80 px-3.5 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md hover:text-primary shrink-0"
              >
                {flagUrl ? (
                  <div className="relative w-7 h-4.5 sm:w-8 sm:h-5 overflow-hidden rounded-[3px] border border-black/10 dark:border-white/20 shadow-2xs shrink-0 transition-transform duration-200 group-hover/item:scale-110 bg-muted/40">
                    <Image
                      src={flagUrl}
                      alt={`${area.name} flag`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground shrink-0">
                    <Globe className="size-3.5 sm:size-4" />
                  </div>
                )}
                <span className="whitespace-nowrap">{area.name}</span>
              </Link>
            );
          })}
        </Marquee>

        {/* Row 2 (Reversed direction) */}
        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:40s] py-1.5">
            {secondRow.map((area, index) => {
              const flagUrl = getAreaFlagUrl(area.name);
              return (
                <Link
                  key={`${area.name}-${index}`}
                  href={`/cuisines/${encodeURIComponent(area.name)}`}
                  className="group/item flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/70 bg-card/80 px-3.5 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md hover:text-primary shrink-0"
                >
                  {flagUrl ? (
                    <div className="relative w-7 h-4.5 sm:w-8 sm:h-5 overflow-hidden rounded-[3px] border border-black/10 dark:border-white/20 shadow-2xs shrink-0 transition-transform duration-200 group-hover/item:scale-110 bg-muted/40">
                      <Image
                        src={flagUrl}
                        alt={`${area.name} flag`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground shrink-0">
                      <Globe className="size-3.5 sm:size-4" />
                    </div>
                  )}
                  <span className="whitespace-nowrap">{area.name}</span>
                </Link>
              );
            })}
          </Marquee>
        )}
      </div>
    </section>
  );
}
