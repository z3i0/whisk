import { Skeleton } from "@/components/ui/skeleton";

export default function CuisinesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 pb-20">
      <div className="mb-10 max-w-xl space-y-3">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/60 p-6 flex flex-col items-center space-y-3">
            <Skeleton className="size-14 rounded-2xl" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
