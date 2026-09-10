import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Grid, ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/themealdb";

export const metadata: Metadata = {
  title: "Recipe Categories",
  description:
    "Browse all delicious recipe categories on Whisk, from seafood and pasta to desserts and vegetarian dishes.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">Categories</span>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          <Grid className="size-3.5" />
          <span>Collections</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Recipe Categories
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Select a category to discover curated meals, seasonal specialties, and
          delicious dinner ideas.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${encodeURIComponent(category.name)}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="relative mx-auto size-36 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src={category.thumbnail}
                alt={category.name}
                fill
                sizes="180px"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {category.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 pt-3 border-t border-border/50 text-xs font-semibold text-primary group-hover:underline">
                View all recipes →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
