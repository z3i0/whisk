/**
 * Raw TheMealDB API response interfaces
 */
export interface RawMealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strIngredient16?: string | null;
  strIngredient17?: string | null;
  strIngredient18?: string | null;
  strIngredient19?: string | null;
  strIngredient20?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strMeasure16?: string | null;
  strMeasure17?: string | null;
  strMeasure18?: string | null;
  strMeasure19?: string | null;
  strMeasure20?: string | null;
  strSource?: string | null;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
  [key: string]: string | null | undefined;
}

export interface RawMealDBFilterMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RawMealDBCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface RawMealDBArea {
  strArea: string;
  strCountry?: string;
}

export interface RawMealDBIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string | null;
  strType?: string | null;
}

export interface RawMealDBResponse<T> {
  meals?: T[] | null;
  categories?: T[] | null;
}

/**
 * Normalized domain models consumed by the UI
 */
export interface IngredientItem {
  ingredient: string;
  measure: string;
}

export interface RecipeSummary {
  id: string;
  title: string;
  thumbnail: string;
  category?: string;
  area?: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string[];
  rawInstructions: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string | null;
  youtubeId: string | null;
  sourceUrl: string | null;
  ingredients: IngredientItem[];
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface Area {
  name: string;
  country?: string;
}

export interface SavedFavoriteRecipe extends RecipeSummary {
  savedAt: number;
}
