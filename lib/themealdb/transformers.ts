import {
  IngredientItem,
  RawMealDBMeal,
  RawMealDBFilterMeal,
  RawMealDBCategory,
  Recipe,
  RecipeSummary,
  Category,
} from "./types";

/**
 * Extracts and pairs non-empty ingredients and measures from a raw meal
 */
export function transformIngredients(rawMeal: RawMealDBMeal): IngredientItem[] {
  const items: IngredientItem[] = [];

  for (let i = 1; i <= 20; i++) {
    const rawIngredient = rawMeal[`strIngredient${i}`];
    const rawMeasure = rawMeal[`strMeasure${i}`];

    const ingredient = typeof rawIngredient === "string" ? rawIngredient.trim() : "";
    const measure = typeof rawMeasure === "string" ? rawMeasure.trim() : "";

    // Ignore empty or null ingredients
    if (ingredient && ingredient.length > 0) {
      items.push({
        ingredient,
        measure: measure || "To taste",
      });
    }
  }

  return items;
}

/**
 * Parses raw unformatted instruction text into sequential, readable steps
 */
export function parseInstructions(rawInstructions?: string | null): string[] {
  if (!rawInstructions || typeof rawInstructions !== "string") {
    return [];
  }

  // Normalize line endings
  const normalized = rawInstructions.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Check if steps are separated by paragraph breaks
  const rawBlocks = normalized
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (rawBlocks.length > 1) {
    // Blocks already represent paragraphs / steps
    return rawBlocks
      .flatMap((block) => {
        // If a block has multiple numbered lines like "1. Do X\n2. Do Y", split them
        const lines = block.split(/\n+/).map((l) => l.trim()).filter(Boolean);
        return lines;
      })
      .map(cleanStepPrefix)
      .filter((step) => step.length > 0);
  }

  // Otherwise split by single newlines
  const singleLines = normalized
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (singleLines.length > 1) {
    return singleLines.map(cleanStepPrefix).filter((s) => s.length > 0);
  }

  // Fallback: split by sentences if it's one massive monolithic block
  const sentences = normalized
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences.map(cleanStepPrefix).filter((s) => s.length > 0);
}

function cleanStepPrefix(step: string): string {
  // Strip leading "Step 1:", "1.", "1)", etc.
  return step.replace(/^(?:step\s*\d+[:.-]?|\d+[\).:-])\s*/i, "").trim();
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYoutubeId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Transforms a full raw meal into a clean, normalized Recipe domain object
 */
export function transformRawMealToRecipe(rawMeal: RawMealDBMeal): Recipe {
  const ingredients = transformIngredients(rawMeal);
  const rawInstructions = rawMeal.strInstructions || "";
  const instructions = parseInstructions(rawInstructions);
  const tags = rawMeal.strTags
    ? rawMeal.strTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    id: rawMeal.idMeal,
    title: rawMeal.strMeal || "Untitled Recipe",
    category: rawMeal.strCategory || "Uncategorized",
    area: rawMeal.strArea || "International",
    instructions,
    rawInstructions,
    thumbnail: rawMeal.strMealThumb || "/images/recipe-placeholder.jpg",
    tags,
    youtubeUrl: rawMeal.strYoutube || null,
    youtubeId: extractYoutubeId(rawMeal.strYoutube),
    sourceUrl: rawMeal.strSource || null,
    ingredients,
  };
}

/**
 * Transforms raw meal or filter meal to a lightweight RecipeSummary
 */
export function transformToRecipeSummary(
  item: RawMealDBMeal | RawMealDBFilterMeal
): RecipeSummary {
  return {
    id: item.idMeal,
    title: item.strMeal || "Untitled Recipe",
    thumbnail: item.strMealThumb || "/placeholder-recipe.jpg",
    category: "strCategory" in item ? (item.strCategory ?? undefined) : undefined,
    area: "strArea" in item ? (item.strArea ?? undefined) : undefined,
  };
}

/**
 * Transforms raw category object to normalized Category
 */
export function transformRawCategory(cat: RawMealDBCategory): Category {
  return {
    id: cat.idCategory,
    name: cat.strCategory,
    thumbnail: cat.strCategoryThumb,
    description: cat.strCategoryDescription || "",
  };
}
