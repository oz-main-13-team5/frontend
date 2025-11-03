import type { ComponentProps } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className={cn("flex items-start gap-2", className)}>
      <input
        type="radio"
        className={cn(
          "appearance-none w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer transition-all duration-150",
          "checked:border-green-500 checked:bg-green-500 checked:ring-2 checked:ring-green-300",
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
