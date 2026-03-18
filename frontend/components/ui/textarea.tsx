import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

