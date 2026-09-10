"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw, Utensils } from "lucide-react";
import { IngredientItem } from "@/lib/themealdb/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IngredientChecklistProps {
  ingredients: IngredientItem[];
}

export function IngredientChecklist({ ingredients }: IngredientChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClearAll = () => {
    setCheckedItems({});
  };

  const handleCopyIngredients = async () => {
    const text = ingredients
      .map((item) => `${item.measure ? `${item.measure} ` : ""}${item.ingredient}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy ingredients:", err);
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Utensils className="size-3.5" />
            <span>Prep Checklist</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            Ingredients ({ingredients.length})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {checkedCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClearAll}
              className="gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              <span>Reset ({checkedCount})</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="xs"
            onClick={handleCopyIngredients}
            className="gap-1 text-xs"
          >
            {copied ? (
              <>
                <Check className="size-3 text-primary" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy List</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Ingredient Items */}
      <ul className="mt-6 divide-y divide-border/50">
        {ingredients.map((item, index) => {
          const isChecked = !!checkedItems[index];

          return (
            <li
              key={`${item.ingredient}-${index}`}
              onClick={() => toggleItem(index)}
              className={cn(
                "group flex items-center justify-between gap-4 py-3.5 px-2 cursor-pointer rounded-xl transition-colors select-none hover:bg-muted/50",
                isChecked && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-md border transition-all",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 group-hover:border-primary/60"
                  )}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>

                <span
                  className={cn(
                    "text-sm font-medium text-foreground transition-all",
                    isChecked && "line-through text-muted-foreground"
                  )}
                >
                  {item.ingredient}
                </span>
              </div>

              {item.measure && (
                <span
                  className={cn(
                    "shrink-0 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground tracking-tight group-hover:bg-muted/80",
                    isChecked && "text-muted-foreground/60"
                  )}
                >
                  {item.measure}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
