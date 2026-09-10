"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstructionStepsProps {
  steps: string[];
}

export function InstructionSteps({ steps }: InstructionStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
        No cooking instructions provided for this recipe.
      </div>
    );
  }

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Flame className="size-3.5" />
            <span>Preparation & Cooking</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            Instructions ({steps.length} Steps)
          </h2>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span>
            {completedCount}/{steps.length} completed
          </span>
        </div>
      </div>

      {/* Steps List */}
      <ol className="mt-8 space-y-6">
        {steps.map((step, index) => {
          const isDone = !!completedSteps[index];
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <li
              key={index}
              onClick={() => toggleStep(index)}
              className={cn(
                "group relative flex gap-4 sm:gap-6 rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer select-none",
                isDone
                  ? "border-primary/30 bg-primary/5 text-muted-foreground"
                  : "border-border/60 bg-card hover:border-border hover:bg-muted/30"
              )}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold transition-all shadow-2xs",
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  {isDone ? <CheckCircle2 className="size-5" /> : stepNumber}
                </div>
              </div>

              {/* Step text */}
              <div className="flex-1 pt-1 sm:pt-1.5">
                <p
                  className={cn(
                    "text-sm sm:text-base leading-relaxed text-foreground transition-all",
                    isDone && "line-through opacity-70"
                  )}
                >
                  {step}
                </p>
              </div>

              {/* Status icon */}
              <div className="shrink-0 pt-1.5 opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {isDone ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : (
                  <Circle className="size-4 text-muted-foreground/40" />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
