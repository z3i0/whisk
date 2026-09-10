import { Recipe } from "@/lib/themealdb/types";

export function RecipeJsonLd({ recipe }: { recipe: Recipe }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.thumbnail],
    recipeCategory: recipe.category,
    recipeCuisine: recipe.area,
    recipeIngredient: recipe.ingredients.map((item) =>
      item.measure ? `${item.measure} ${item.ingredient}` : item.ingredient
    ),
    recipeInstructions: recipe.instructions.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
    ...(recipe.youtubeUrl && {
      video: {
        "@type": "VideoObject",
        name: `${recipe.title} Cooking Tutorial`,
        description: `Video guide for preparing ${recipe.title}`,
        thumbnailUrl: [recipe.thumbnail],
        contentUrl: recipe.youtubeUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
