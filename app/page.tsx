import {
  getRandomRecipe,
  getRecipeById,
  getCategories,
  getAreas,
  getDiscoveryRecipes,
} from "@/lib/themealdb";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedRecipe } from "@/components/home/featured-recipe";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularDiscoveries } from "@/components/home/popular-discoveries";
import { CuisinesMarquee } from "@/components/home/cuisines-marquee";
import { RandomRecipeCta } from "@/components/home/random-recipe-cta";

export const revalidate = 3600;

export default async function HomePage() {
  const [randomFeatured, categories, areas, discoveryRecipes] = await Promise.all([
    getRandomRecipe(),
    getCategories(),
    getAreas(),
    getDiscoveryRecipes(8),
  ]);

  // Fallback to verified recipe if random endpoint fails
  const featuredRecipe = randomFeatured || (await getRecipeById("52772"));

  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 pb-16">
      {/* 1. Spacious Minimal Hero with MagicUI DotPattern, Particles & Animated Gradient */}
      <HeroSection />

      {/* 2. Chef's Spotlight Recipe of the Day with MagicUI BorderBeam */}
      {featuredRecipe && <FeaturedRecipe recipe={featuredRecipe} />}

      {/* 4. Curated Category Collections with BlurFade Stagger */}
      {categories.length > 0 && <CategoriesSection categories={categories} />}

      {/* 5. Handpicked Popular Discoveries Grid */}
      {discoveryRecipes.length > 0 && (
        <PopularDiscoveries recipes={discoveryRecipes} />
      )}

      {/* 6. World Culinary Tour with MagicUI Marquee */}
      {areas.length > 0 && <CuisinesMarquee areas={areas} />}

      {/* 7. Spontaneous Cooking Discovery CTA with MagicUI ShimmerButton */}
      <RandomRecipeCta />
    </div>
  );
}
