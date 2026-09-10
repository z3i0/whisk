import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      <div className="mb-10 max-w-xl space-y-3">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-border/60 p-6 space-y-4">
            <Skeleton className="mx-auto size-36 rounded-2xl" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
