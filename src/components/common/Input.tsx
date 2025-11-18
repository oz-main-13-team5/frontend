import { cn } from "@/libs/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  inputClassName?: string;
  labelClassName?: string;
  errorMessageClassName?: string;
  errorMessage?: string;
  label?: string;
}

/**
 * 공용 인풋 컴포넌트
 * label prop에 원하는 label 텍스트 넣기
 * errorMessage prop에 원하는 에러 메세지 넣기
 * 기본 className은 전체를 감싸는 wrapper에 할당
 * input, label, errorMessage에 개별 스타일 적용 원할시 해당 요소+ClassName prop에 전달
 * 모든 rest 파라미터는 input에 할당
 */
export default function Input({
  className,
  inputClassName,
  labelClassName,
  label,
  errorMessage,
  errorMessageClassName,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("flex flex-col gap-1 text-neutral-900", className)}>
      <label htmlFor={label} className={cn("text-base", labelClassName)}>
        {label}
      </label>
      <div className="relative">
        <input
          id={label}
          type={inputType}
          className={cn(
            "w-full rounded-lg border border-neutral-400 p-2 placeholder:text-base placeholder:text-neutral-400 focus:border-green-600 focus:outline-none",
            inputClassName
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-green-600"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      <span className={cn("text-sm text-red-500", errorMessageClassName)}>{errorMessage}</span>
    </div>
  );
}
