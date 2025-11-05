import type { ComponentProps } from "react";
import { cn } from "@/libs/utils";

interface CheckboxProps extends ComponentProps<"input"> {
  label?: string;
  subText?: string;
  inputClassName?: string;
  labelClassName?: string;
  subTextClassName?: string;
}

export function Checkbox({
  label,
  subText,
  className,
  inputClassName,
  labelClassName,
  subTextClassName,
  ...props
}: CheckboxProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <input
        type="checkbox"
        className={cn(
          "w-6 h-6 mt-0.5 bg-neutral-50 border-2 border-neutral-500 rounded-md cursor-pointer accent-green-600",
          "checked:border-green-600",
          inputClassName
        )}
        {...props}
      />

      {(label || subText) && (
        <div className="flex flex-col gap-1">
          {label && (
            <label className={cn("text-lg text-neutral-900", labelClassName)}>
              {label}
            </label>
          )}
          {subText && (
            <span className={cn("text-sm text-neutral-600", subTextClassName)}>
              {subText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
