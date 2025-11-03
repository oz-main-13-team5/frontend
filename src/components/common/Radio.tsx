import type { ComponentProps } from "react";
import { cn } from "@/libs/utils";

interface RadioInputProps extends ComponentProps<"input"> {
  label?: string;
  subText?: string;
  inputClassName?: string;
  labelClassName?: string;
  subTextClassName?: string;
}

export function RadioInput({
  label,
  subText,
  className,
  inputClassName,
  labelClassName,
  subTextClassName,
  ...props
}: RadioInputProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="radio"
        className={cn(
          "w-6 h-6 bg-neutral-50 border-2 border-neutral-500 rounded-full accent-green-600 cursor-pointer",
          inputClassName
        )}
        {...props}
      />
      <div className="flex flex-col gap-1">
        {label && <label className={cn("text-lg text-neutral-900", labelClassName)}>{label}</label>}
        {subText && <span className={cn("text-sm text-neutral-600", subTextClassName)}>{subText}</span>}
      </div>
    </div>
  );
}
