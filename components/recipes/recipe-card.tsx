import Link from "next/link";
import Image from "next/image";
import { RecipeSummary } from "@/lib/themealdb/types";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "./favorite-button";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: RecipeSummary;
  className?: string;
  priority?: boolean;
}

export function RecipeCard({
  recipe,
  className,
  priority = false,
}: RecipeCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border",
        className
      )}
    >
      {/* Visual media container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={recipe.thumbnail || "/placeholder-recipe.jpg"}
          alt={recipe.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Favorite toggle island */}
        <div className="absolute right-3 top-3 z-10">
          <FavoriteButton recipe={recipe} />
        </div>

        {/* Category & Cuisine badges */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
          {recipe.category && (
            <Badge
              variant="secondary"
              className="bg-background/90 font-medium text-xs backdrop-blur-md shadow-2xs"
            >
              {recipe.category}
            </Badge>
          )}
          {recipe.area && (
            <Badge
              variant="outline"
              className="bg-background/80 font-medium text-xs backdrop-blur-md shadow-2xs border-border/70"
            >
              {recipe.area}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link
            href={`/recipes/${recipe.id}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm after:absolute after:inset-0 after:z-0"
          >
            {recipe.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
