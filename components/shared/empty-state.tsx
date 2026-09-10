import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  suggestions?: { label: string; href: string }[];
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
  suggestions,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center shadow-2xs",
        className
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground ring-8 ring-muted/30">
        <Icon className="size-8" />
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {actionHref && actionLabel && (
        <div className="mt-6">
          <Link href={actionHref} className={buttonVariants()}>
            {actionLabel}
          </Link>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 flex flex-col items-center">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Popular searches
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
