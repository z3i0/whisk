import { RecipeSummary } from "@/lib/themealdb/types";
import { RecipeCard } from "./recipe-card";
import { cn } from "@/lib/utils";

interface RecipeGridProps {
  recipes: RecipeSummary[];
  className?: string;
  priorityCount?: number;
}

export function RecipeGrid({
  recipes,
  className,
  priorityCount = 0,
}: RecipeGridProps) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4",
        className
      )}
    >
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={`${recipe.id}-${index}`}
          recipe={recipe}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
