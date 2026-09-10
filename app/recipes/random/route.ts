import { redirect } from "next/navigation";
import { getRandomRecipe } from "@/lib/themealdb/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const recipe = await getRandomRecipe({ noCache: true });
  if (!recipe) {
    redirect("/");
  }
  redirect(`/recipes/${recipe.id}`);
}
