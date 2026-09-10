import { Skeleton } from "@/components/ui/skeleton";
import { RecipeGridSkeleton } from "@/components/recipes/recipe-skeleton";

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      <div className="mx-auto max-w-2xl text-center space-y-4 mb-10">
        <Skeleton className="mx-auto h-6 w-32 rounded-full" />
        <Skeleton className="mx-auto h-10 w-3/4" />
        <Skeleton className="mx-auto h-13 w-full rounded-full" />
        <Skeleton className="mx-auto h-4 w-28" />
      </div>

      <RecipeGridSkeleton count={8} />
    </div>
  );
}
