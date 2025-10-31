import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/libs/utils";

const buttonVariants = cva("rounded-lg transition-colors focus:outline-none disabled:saturate-50", {
  variants: {
    variant: {
      primary: "bg-green-600 text-neutral-50 hover:bg-green-700",
      primaryOutline:
        "bg-neutral-50 text-neutral-900  border border-green-600 hover:bg-neutral-200",
      secondary: "bg-amber-300 text-neutral-50 hover:bg-amber-400",
      secondaryOutline:
        "bg-neutral-50 text-neutral-900 border border-amber-300 hover:bg-neutral-200",
      neutral: "bg-neutral-400 text-neutral-50 hover:bg-neutral-500",
      neutralOutline:
        "bg-neutral-50 text-neutral-900 border border-neutral-400 hover:bg-neutral-200",
    },
    size: {
      sm: "px-4 py-1 text-sm",
      md: "px-6 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

export default function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
