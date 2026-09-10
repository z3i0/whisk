import { Skeleton } from "@/components/ui/skeleton";
import { RecipeGridSkeleton } from "@/components/recipes/recipe-skeleton";

export default function CuisineDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      <div className="mb-6 flex gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="mb-10 rounded-3xl border border-border/60 p-6 sm:p-8 flex gap-6">
        <Skeleton className="size-20 sm:size-24 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      <RecipeGridSkeleton count={8} />
    </div>
  );
}
