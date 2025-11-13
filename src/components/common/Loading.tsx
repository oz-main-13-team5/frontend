import { cn } from "@/libs/utils";

interface LoadingProps {
  className?: string;
  spinnerClassName?: string;
}

export default function Loading({ className, spinnerClassName }: LoadingProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {/* 스피너 */}
      <div
        className={cn(
          "size-7 animate-spin rounded-full border-2 border-green-500 border-t-transparent",
          spinnerClassName
        )}
        role="status"
      />
    </div>
  );
}
