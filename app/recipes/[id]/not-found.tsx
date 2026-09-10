import { UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export default function RecipeNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <EmptyState
        icon={UtensilsCrossed}
        title="Recipe Not Found"
        description="We couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect."
        actionHref="/"
        actionLabel="Explore Recipes"
        suggestions={[
          { label: "Pasta Dishes", href: "/categories/Pasta" },
          { label: "Chicken Recipes", href: "/search?q=chicken" },
          { label: "Italian Cuisine", href: "/cuisines/Italian" },
        ]}
      />
    </div>
  );
}
