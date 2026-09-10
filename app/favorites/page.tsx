import { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/favorites-view";

export const metadata: Metadata = {
  title: "My Favorite Recipes",
  description: "View and manage your saved favorite recipes on Whisk.",
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
