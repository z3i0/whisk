"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { RecipeSummary } from "@/lib/themealdb/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  recipe: RecipeSummary;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function FavoriteButton({
  recipe,
  size = "icon",
  className,
  showLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const active = isLoaded && isFavorite(recipe.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  const label = active ? "Remove from favorites" : "Save to favorites";

  if (showLabel) {
    return (
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        size={size === "icon" ? "default" : size}
        onClick={handleClick}
        aria-label={label}
        aria-pressed={active}
        className={cn(
          "gap-2 font-medium transition-colors",
          active && "bg-primary text-primary-foreground hover:bg-primary/90",
          className
        )}
      >
        <Heart
          className={cn(
            "size-4 transition-transform active:scale-125",
            active ? "fill-current text-white" : "text-muted-foreground"
          )}
        />
        <span>{active ? "Favorited" : "Save Recipe"}</span>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "size-9 rounded-full bg-background/85 backdrop-blur-md shadow-xs border border-border/50 transition-transform active:scale-95 hover:bg-background hover:scale-105",
        active && "text-primary border-primary/30",
        className
      )}
    >
      <Heart
        className={cn(
          "size-4.5 transition-colors",
          active
            ? "fill-primary text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      />
    </Button>
  );
}
