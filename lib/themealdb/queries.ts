import { fetchFromMealDB } from "./api";
import {
  Category,
  Area,
  Recipe,
  RecipeSummary,
  RawMealDBMeal,
  RawMealDBFilterMeal,
  RawMealDBCategory,
  RawMealDBArea,
  RawMealDBResponse,
} from "./types";
import {
  transformRawCategory,
  transformRawMealToRecipe,
  transformToRecipeSummary,
} from "./transformers";
import {
  isPorkRecipe,
  isPorkSummary,
  isPorkRawMeal,
  isPorkCategory,
  PORK_REGEX,
} from "./pork-filter";

/**
 * Look up a recipe by its TheMealDB ID (returns null if non-existent or contains pork)
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!id || typeof id !== "string") return null;

  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBMeal>>(
      `/lookup.php?i=${encodeURIComponent(id.trim())}`,
      { next: { revalidate: 86400 } }
    );

    if (!data || !data.meals || data.meals.length === 0) {
      return null;
    }

    const recipe = transformRawMealToRecipe(data.meals[0]);

    // Ban all pork recipes
    if (isPorkRecipe(recipe)) {
      return null;
    }

    return recipe;
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a random recipe that does not contain pork (retries up to 8 times)
 */
export async function getRandomRecipe(options?: {
  noCache?: boolean;
}): Promise<Recipe | null> {
  const fetchOptions: RequestInit = options?.noCache
    ? { cache: "no-store" }
    : { next: { revalidate: 3600 } };

  try {
    for (let attempt = 0; attempt < 8; attempt++) {
      const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBMeal>>(
        "/random.php",
        fetchOptions
      );

      if (data && data.meals && data.meals.length > 0) {
        const recipe = transformRawMealToRecipe(data.meals[0]);
        if (!isPorkRecipe(recipe)) {
          return recipe;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
}

/**
 * Search recipes by name/keyword (banning pork queries and filtering out pork results)
 */
export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // If search query directly asks for pork, return empty results immediately
  if (PORK_REGEX.test(trimmed)) {
    return [];
  }

  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBMeal>>(
      `/search.php?s=${encodeURIComponent(trimmed)}`,
      { next: { revalidate: 3600 } }
    );

    if (!data || !data.meals) {
      return [];
    }

    return data.meals
      .filter((m) => !isPorkRawMeal(m))
      .map(transformToRecipeSummary)
      .filter((m) => !isPorkSummary(m));
  } catch (error) {
    console.error(`Error searching recipes for "${query}":`, error);
    return [];
  }
}

/**
 * Get all available recipe categories (completely excludes Pork category)
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBCategory>>(
      "/categories.php",
      { next: { revalidate: 86400 } }
    );

    if (!data || !data.categories) {
      return [];
    }

    return data.categories
      .map(transformRawCategory)
      .filter((c) => !isPorkCategory(c.name));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get recipes filtered by category name (returns empty if category is Pork, excludes pork recipes)
 */
export async function getRecipesByCategory(category: string): Promise<RecipeSummary[]> {
  const trimmed = category.trim();
  if (!trimmed) return [];

  if (isPorkCategory(trimmed)) {
    return [];
  }

  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBFilterMeal>>(
      `/filter.php?c=${encodeURIComponent(trimmed)}`,
      { next: { revalidate: 86400 } }
    );

    if (!data || !data.meals) {
      return [];
    }

    return data.meals
      .map((m) => ({
        ...transformToRecipeSummary(m),
        category: trimmed,
      }))
      .filter((m) => !isPorkSummary(m));
  } catch (error) {
    console.error(`Error fetching recipes for category "${category}":`, error);
    return [];
  }
}

/**
 * Exhaustive list of 63 cuisines in TheMealDB that have at least one active recipe.
 * The other 132 countries cataloged in TheMealDB list.php?a=list currently have 0 recipes.
 */
const VALID_CUISINE_AREAS = new Set([
  "afghan", "albanian", "algerian", "american", "andorran", "angolan",
  "antiguan, barbudan", "argentine", "armenian", "aruban", "australian",
  "austrian", "azerbaijani", "bahamian", "bangladeshi", "barbadian",
  "belgian", "motswana", "brazilian", "british", "bulgarian", "cambodian",
  "canadian", "caymanian", "chilean", "chinese", "colombian", "costa rican",
  "croatian", "cuban", "danish", "dominican", "dutch", "egyptian",
  "estonian", "filipino", "french", "greek", "indian", "irish", "italian",
  "jamaican", "japanese", "kenyan", "laotian", "malaysian", "mexican",
  "moroccan", "norwegian", "polish", "portuguese", "russian",
  "saudi arabian", "slovak", "spanish", "syrian", "thai", "tunisian",
  "turkish", "ukrainian", "uruguayan", "venezuelan", "vietnamese"
]);

/**
 * Get all world cuisines that actually have recipes cataloged in TheMealDB
 * (Excludes empty country listings with 0 recipes)
 */
export async function getAreas(): Promise<Area[]> {
  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBArea>>(
      "/list.php?a=list",
      { next: { revalidate: 86400 } }
    );

    if (!data || !data.meals) {
      return [];
    }

    const seen = new Set<string>();
    const areas: Area[] = [];

    for (const m of data.meals) {
      const rawName = m.strArea?.trim();
      if (!rawName) continue;

      const normalized = rawName.toLowerCase();
      if (normalized === "unknown" || seen.has(normalized)) {
        continue;
      }

      // Filter out countries that have no recipes in TheMealDB
      const countryNormalized = m.strCountry?.trim().toLowerCase() || "";
      if (!VALID_CUISINE_AREAS.has(normalized) && !VALID_CUISINE_AREAS.has(countryNormalized)) {
        continue;
      }

      seen.add(normalized);
      areas.push({
        name: rawName,
        country: m.strCountry,
      });
    }

    // Prioritize popular cuisines with rich recipe catalogs
    const POPULAR_CUISINES = new Set([
      "italian", "american", "mexican", "british", "french", "chinese",
      "japanese", "indian", "spanish", "thai", "greek", "canadian",
      "jamaican", "moroccan", "turkish", "croatian", "egyptian", "filipino",
      "irish", "kenyan", "malaysian", "polish", "portuguese", "russian",
      "saudi arabian", "tunisian", "ukrainian", "uruguayan", "vietnamese",
      "dutch", "algerian", "syrian", "australian", "brazilian", "colombian",
      "cambodian", "danish", "norwegian", "belgian", "austrian", "argentine"
    ]);

    areas.sort((a, b) => {
      const aPop = POPULAR_CUISINES.has(a.name.toLowerCase()) ? 0 : 1;
      const bPop = POPULAR_CUISINES.has(b.name.toLowerCase()) ? 0 : 1;
      if (aPop !== bPop) return aPop - bPop;
      return a.name.localeCompare(b.name);
    });

    return areas;
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
}

const AREA_COUNTRY_ALIASES: Record<string, string> = {
  afghan: "Afghanistan",
  afghanistan: "Afghan",
  albanian: "Albania",
  albania: "Albanian",
  american: "United States",
  "united states": "American",
  andorran: "Andorra",
  andorra: "Andorran",
  angolan: "Angola",
  angola: "Angolan",
  "antiguan, barbudan": "Antigua and Barbuda",
  "antigua and barbuda": "Antiguan, Barbudan",
  argentine: "Argentina",
  argentina: "Argentine",
  argentinian: "Argentina",
  armenian: "Armenia",
  armenia: "Armenian",
  aruban: "Aruba",
  aruba: "Aruban",
  austrian: "Austria",
  austria: "Austrian",
  azerbaijani: "Azerbaijan",
  azerbaijan: "Azerbaijani",
  bahamian: "Bahamas",
  bahamas: "Bahamian",
  bangladeshi: "Bangladesh",
  bangladesh: "Bangladeshi",
  barbadian: "Barbados",
  barbados: "Barbadian",
  belgian: "Belgium",
  belgium: "Belgian",
  motswana: "Botswana",
  botswana: "Motswana",
  brazilian: "Brazil",
  brazil: "Brazilian",
  bulgarian: "Bulgaria",
  bulgaria: "Bulgarian",
  cambodian: "Cambodia",
  cambodia: "Cambodian",
  caymanian: "Cayman Islands",
  "cayman islands": "Caymanian",
  chilean: "Chile",
  chile: "Chilean",
  colombian: "Colombia",
  colombia: "Colombian",
  "costa rican": "Costa Rica",
  "costa rica": "Costa Rican",
  cuban: "Cuba",
  cuba: "Cuban",
  danish: "Denmark",
  denmark: "Danish",
  dominican: "Dominica",
  dominica: "Dominican",
  dutch: "Netherlands",
  netherlands: "Dutch",
  estonian: "Estonia",
  estonia: "Estonian",
  french: "France",
  france: "French",
  indian: "India",
  india: "Indian",
  laotian: "Laos",
  laos: "Laotian",
  norwegian: "Norway",
  norway: "Norwegian",
  slovak: "Slovakia",
  slovakia: "Slovak",
  venezuelan: "Venezuela",
  venezuela: "Venezuelan",
};

/**
 * Get recipes filtered by area/cuisine, checking country aliases if needed (excludes pork)
 */
export async function getRecipesByArea(area: string): Promise<RecipeSummary[]> {
  const trimmed = area.trim();
  if (!trimmed) return [];

  try {
    const data = await fetchFromMealDB<RawMealDBResponse<RawMealDBFilterMeal>>(
      `/filter.php?a=${encodeURIComponent(trimmed)}`,
      { next: { revalidate: 86400 } }
    );

    if (data && data.meals && data.meals.length > 0) {
      return data.meals
        .map((m) => ({
          ...transformToRecipeSummary(m),
          area: trimmed,
        }))
        .filter((m) => !isPorkSummary(m));
    }

    // Check alias if demonym or country name differs in TheMealDB
    const alias = AREA_COUNTRY_ALIASES[trimmed.toLowerCase()];
    if (alias) {
      const aliasData = await fetchFromMealDB<RawMealDBResponse<RawMealDBFilterMeal>>(
        `/filter.php?a=${encodeURIComponent(alias)}`,
        { next: { revalidate: 86400 } }
      );

      if (aliasData && aliasData.meals && aliasData.meals.length > 0) {
        return aliasData.meals
          .map((m) => ({
            ...transformToRecipeSummary(m),
            area: trimmed,
          }))
          .filter((m) => !isPorkSummary(m));
      }
    }

    return [];
  } catch (error) {
    console.error(`Error fetching recipes for area "${area}":`, error);
    return [];
  }
}

/**
 * Get recipes related to a specific recipe (excluding pork)
 */
export async function getRelatedRecipes(
  recipe: Recipe,
  limit: number = 4
): Promise<RecipeSummary[]> {
  try {
    let related: RecipeSummary[] = [];

    if (recipe.category && !isPorkCategory(recipe.category)) {
      const byCategory = await getRecipesByCategory(recipe.category);
      related = byCategory.filter((item) => item.id !== recipe.id && !isPorkSummary(item));
    }

    if (related.length < limit && recipe.area) {
      const byArea = await getRecipesByArea(recipe.area);
      const additional = byArea.filter(
        (item) =>
          item.id !== recipe.id &&
          !isPorkSummary(item) &&
          !related.some((r) => r.id === item.id)
      );
      related = [...related, ...additional];
    }

    return related.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching related recipes for ${recipe.id}:`, error);
    return [];
  }
}

/**
 * Get curated discovery recipes for the homepage (excluding pork)
 */
export async function getDiscoveryRecipes(limit: number = 8): Promise<RecipeSummary[]> {
  try {
    const seafood = await getRecipesByCategory("Seafood");
    const pasta = await getRecipesByCategory("Pasta");
    const combined = [...pasta.slice(0, 4), ...seafood.slice(0, 4)].filter(
      (m) => !isPorkSummary(m)
    );
    return combined.slice(0, limit);
  } catch (error) {
    console.error("Error fetching discovery recipes:", error);
    return [];
  }
}
