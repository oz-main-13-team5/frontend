import { useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import type { ComponentProps } from "react";
import { ChevronUp } from "lucide-react";

export interface Option {
  value: string;
  text: string;
}

interface SelectBoxProps extends Omit<ComponentProps<"div">, "onChange"> {
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option) => void;
}

export default function SelectBox({
  className,
  options,
  placeholder,
  onChange,
  ...props
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  // placeholder가 없는 경우 첫 번째 옵션을 기본 선택값으로 지정
  useEffect(() => {
    if (options.length > 0 && !selected && !placeholder) {
      setSelected(options[0]);
      onChange?.(options[0]); // 상위에 기본 선택값도 전달
    }
  }, [options, selected, placeholder, onChange]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option); // 선택 이벤트 발생 시 상위에 전달
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-neutral-400 bg-neutral-50 p-4 text-left text-neutral-900",
          "hover:bg-neutral-100 focus:outline-none"
        )}
      >
        <span className={cn(selected ? "text-neutral-900" : "text-neutral-400")}>
          {selected ? selected.text : placeholder}
        </span>

        <ChevronUp
          className={cn(
            "size-6 text-green-600 transition-transform duration-200 ease-in-out",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            "absolute right-0 left-0 z-10 mt-1 overflow-hidden rounded-lg border border-neutral-400 bg-neutral-50 p-2"
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={cn(
                "cursor-pointer rounded-lg bg-neutral-50 p-2 text-lg text-neutral-900 hover:bg-neutral-200"
              )}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
