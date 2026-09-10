import { Skeleton } from "@/components/ui/skeleton";
import { RecipeGridSkeleton } from "@/components/recipes/recipe-skeleton";

export default function GlobalLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Skeleton */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <Skeleton className="mx-auto h-6 w-36 rounded-full" />
        <Skeleton className="mx-auto h-12 w-4/5" />
        <Skeleton className="mx-auto h-5 w-3/5" />
        <Skeleton className="mx-auto h-12 w-full max-w-lg rounded-full" />
      </div>

      {/* Featured Recipe Skeleton */}
      <Skeleton className="aspect-16/10 md:aspect-21/9 w-full rounded-3xl" />

      {/* Grid Skeleton */}
      <div className="space-y-6 pt-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <RecipeGridSkeleton count={8} />
      </div>
    </div>
  );
}
