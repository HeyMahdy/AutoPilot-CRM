import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
        variant === "default"
          ? "bg-slate-800 text-slate-100"
          : "border border-white/10 bg-transparent text-slate-200",
        className
      )}
      {...props}
    />
  );
}

