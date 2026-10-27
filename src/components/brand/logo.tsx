import { PlaneTakeoff } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-lg font-semibold tracking-tight",
        className
      )}
    >
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
        <PlaneTakeoff className="size-4" aria-hidden />
      </span>
      PrepPilot
    </span>
  );
}
