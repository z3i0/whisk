"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeaderFavoritesBadge() {
  const pathname = usePathname();
  const { count, isLoaded } = useFavorites();
  const isActive = pathname === "/favorites";

  return (
    <Link
      href="/favorites"
      className={cn(
        buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
        "relative gap-2 px-3 text-sm font-medium transition-colors",
        isActive && "text-primary font-semibold"
      )}
      aria-label={`Favorites, ${isLoaded ? count : 0} recipes saved`}
    >
      <Heart className={cn("size-4", isActive && "fill-primary text-primary")} />
      <span className="hidden sm:inline">Favorites</span>
      {isLoaded && count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold leading-none text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
