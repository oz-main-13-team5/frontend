import { cn } from "@/libs/utils";

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return <div className={cn("inline", className)}>Loading</div>;
}
