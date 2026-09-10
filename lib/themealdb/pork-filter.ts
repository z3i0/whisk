import { Recipe, RecipeSummary, RawMealDBMeal } from "./types";

/**
 * Regular expression matching pork and pork-derived meat products using word boundaries
 */
export const PORK_REGEX =
  /\b(pork|bacon|ham|hams|prosciutto|pancetta|lard|lardo|guanciale|gammon|chorizo|spam|carnitas|pigs in blankets|pigs in a blanket)\b/i;

/**
 * Check if a raw meal from TheMealDB contains pork in its category, title, tags, or ingredients
 */
export function isPorkRawMeal(meal: RawMealDBMeal): boolean {
  if (!meal) return false;

  if (meal.strCategory?.toLowerCase() === "pork") {
    return true;
  }

  if (meal.strMeal && PORK_REGEX.test(meal.strMeal)) {
    return true;
  }

  if (meal.strTags && PORK_REGEX.test(meal.strTags)) {
    return true;
  }

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    if (typeof ing === "string" && PORK_REGEX.test(ing.trim())) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a normalized Recipe contains pork
 */
export function isPorkRecipe(recipe: Recipe): boolean {
  if (!recipe) return false;

  if (recipe.category.toLowerCase() === "pork") {
    return true;
  }

  if (PORK_REGEX.test(recipe.title)) {
    return true;
  }

  if (recipe.tags.some((tag) => PORK_REGEX.test(tag))) {
    return true;
  }

  if (recipe.ingredients.some((item) => PORK_REGEX.test(item.ingredient))) {
    return true;
  }

  return false;
}

/**
 * Check if a RecipeSummary or card preview contains pork
 */
export function isPorkSummary(summary: RecipeSummary): boolean {
  if (!summary) return false;

  if (summary.category?.toLowerCase() === "pork") {
    return true;
  }

  if (PORK_REGEX.test(summary.title)) {
    return true;
  }

  return false;
}

/**
 * Check if a category name is "Pork"
 */
export function isPorkCategory(categoryName: string): boolean {
  if (!categoryName) return false;
  return categoryName.trim().toLowerCase() === "pork";
}
