import { cn } from "@/libs/utils";
import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  inputClassName?: string;
  labelClassName?: string;
  errorMessageClassName?: string;
  errorMessage?: string;
  label?: string;
}

export default function Input({
  className,
  inputClassName,
  labelClassName,
  label,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={label} className={cn("text-base text-neutral-900", labelClassName)}>
        {label}
      </label>
      <input
        id={label}
        className={cn(
          "rounded-lg border border-neutral-400 p-2 placeholder:text-base placeholder:text-neutral-400 focus:border-green-600 focus:outline-none",
          inputClassName
        )}
        {...props}
      />
      <span className={cn("text-sm text-red-500")}>{errorMessage}</span>
    </div>
  );
}
