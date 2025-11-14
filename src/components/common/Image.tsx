import useObserver from "@/hooks/useObserver";
import { useState, type ComponentProps } from "react";
import smallImage from "@/assets/images/small_image.jpg";
import { cn } from "@/libs/utils";

const ROOT_MARGIN_PX = 300;

interface ImageProps extends Omit<ComponentProps<"img">, "ref"> {
  isLazyLoading?: boolean;
}

export default function Image({ isLazyLoading = true, src, className, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(!isLazyLoading);

  const handleIntersection = () => {
    setIsLoaded(true);
  };

  const imgRef = useObserver<HTMLImageElement>(handleIntersection, {
    rootMargin: `${ROOT_MARGIN_PX}px 0px`,
  });

  return (
    <img
      src={isLoaded ? src : smallImage}
      ref={imgRef}
      className={cn(
        "transition-all duration-700 ease-in-out",
        isLoaded ? "opacity-100 blur-none" : "opacity-0 blur-lg",
        className
      )}
      {...props}
    />
  );
}
