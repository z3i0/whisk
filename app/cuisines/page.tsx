import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Globe, ChevronRight } from "lucide-react";
import { getAreas, getAreaFlagUrl } from "@/lib/themealdb";

export const metadata: Metadata = {
  title: "World Cuisines",
  description:
    "Explore authentic international cuisines from around the globe on Whisk, from Italian and Mexican to Thai and Japanese.",
};

export default async function CuisinesPage() {
  const areas = await getAreas();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">Cuisines</span>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          <Globe className="size-3.5" />
          <span>International Flavors</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          World Cuisines
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Embark on a culinary journey across the globe. Explore authentic
          regional traditions, spices, and beloved recipes from over 60 active
          culinary traditions.
        </p>
      </div>

      {/* Cuisines Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {areas.map((area, index) => {
          const flagUrl = getAreaFlagUrl(area.name);
          return (
            <Link
              key={`${area.name}-${index}`}
              href={`/cuisines/${encodeURIComponent(area.name)}`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              {flagUrl ? (
                <div className="relative w-12 h-8 overflow-hidden rounded-[4px] border border-black/10 dark:border-white/20 shadow-xs transition-all duration-300 group-hover:scale-110 mb-3 bg-muted/40">
                  <Image
                    src={flagUrl}
                    alt={`${area.name} flag`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground mb-3 shadow-2xs">
                  <Globe className="size-6" />
                </div>
              )}

              <h2 className="font-heading text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {area.name}
              </h2>
              <span className="text-xs text-muted-foreground mt-1">
                Explore dishes →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
