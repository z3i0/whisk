"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Compass,
  Grid,
  Globe,
  Heart,
  Sparkles,
  CookingPot,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { SearchInput } from "@/components/shared/search-input";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/categories", label: "Categories", icon: Grid },
  { href: "/cuisines", label: "Cuisines", icon: Globe },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, isLoaded } = useFavorites();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open main navigation menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col w-[300px] p-6">
        <SheetHeader className="text-left pb-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <CookingPot className="size-4.5" />
            </div>
            <span>Whisk</span>
          </SheetTitle>
        </SheetHeader>

        {/* Mobile Search input */}
        <div className="py-4">
          <SearchInput onSearchSubmit={() => setOpen(false)} />
        </div>

        {/* Nav Links */}
        <nav className="flex flex-1 flex-col gap-1 py-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4.5" />
                  <span>{link.label}</span>
                </div>
                {link.href === "/favorites" && isLoaded && count > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="pt-4 border-t border-border mt-auto">
          <Link
            href="/recipes/random"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
            )}
          >
            <Sparkles className="size-4 text-primary" />
            <span>Surprise Me</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
