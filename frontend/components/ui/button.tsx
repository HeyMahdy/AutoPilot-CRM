import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-sm",
        secondary:
          "bg-slate-900/60 text-slate-50 border border-white/10 hover:bg-slate-900",
        ghost: "bg-transparent text-slate-100 hover:bg-slate-900/60",
        outline:
          "border border-white/10 bg-slate-900/40 text-slate-50 hover:bg-slate-900"
      },
      size: {
        default: "h-9 px-4 py-1.5",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-10 px-5 text-sm",
        icon: "h-8 w-8 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

