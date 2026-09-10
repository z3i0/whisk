import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-16 space-y-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-3/4 max-w-xl" />
      </div>

      {/* Hero Media skeleton */}
      <Skeleton className="aspect-16/10 sm:aspect-21/9 w-full rounded-3xl" />

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left col */}
        <div className="lg:col-span-5 space-y-4 rounded-3xl border border-border/60 p-6">
          <Skeleton className="h-7 w-40" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="lg:col-span-7 space-y-4 rounded-3xl border border-border/60 p-6">
          <Skeleton className="h-7 w-48" />
          <div className="space-y-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border border-border/40 rounded-2xl">
                <Skeleton className="size-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
