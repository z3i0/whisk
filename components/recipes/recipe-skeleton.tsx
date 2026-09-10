import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function RecipeCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xs",
        className
      )}
    >
      <div className="relative aspect-4/3 w-full bg-muted/70">
        <Skeleton className="h-full w-full" />
        <div className="absolute right-3 top-3">
          <Skeleton className="size-9 rounded-full" />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function RecipeGridSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}
