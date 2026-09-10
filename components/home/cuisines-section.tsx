import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { Area } from "@/lib/themealdb/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CuisinesSectionProps {
  areas: Area[];
}

export function CuisinesSection({ areas }: CuisinesSectionProps) {
  // Show popular cuisines (or top 12)
  const displayAreas = areas.slice(0, 12);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border/60">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Globe className="size-3.5" />
            <span>Global Traditions</span>
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayAreas.map((area, index) => (
          <Link
            key={`${area.name}-${index}`}
            href={`/cuisines/${encodeURIComponent(area.name)}`}
            className="group flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xs"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground mb-2">
              <Globe className="size-5" />
            </div>
            <span className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {area.name}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Cuisine
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
