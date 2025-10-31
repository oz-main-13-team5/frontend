import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const badgeVariants = cva("px-2 py-0.5 rounded-sm text-sm text-center", {
  variants: {
    variant: {
      primary: "bg-green-600 text-neutral-50",
      primaryLight: "bg-green-300 text-neutral-900",
      primaryOutline: "bg-neutral-50 text-neutral-900  border border-green-600",
      secondary: "bg-amber-300 text-neutral-50",
      secondaryLight: "bg-amber-200 text-neutral-900",
      secondaryOutline: "bg-neutral-50 text-neutral-900 border border-amber-300",
      neutral: "bg-neutral-400 text-neutral-50",
      neutralLight: "bg-neutral-300 text-neutral-900",
      neutralOutline: "bg-neutral-50 text-neutral-900 border border-neutral-400",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

export default function Badge({ children, className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
