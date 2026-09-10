"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/10">
        <AlertCircle className="size-8" />
      </div>

      <h1 className="mt-6 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h1>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        We encountered an unexpected issue while preparing your recipes. This
        could be caused by a temporary network connection issue.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="size-4" />
          <span>Try Again</span>
        </Button>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          <Home className="size-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
