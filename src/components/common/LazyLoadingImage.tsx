import useObserver from "@/hooks/useObserver";
import { useEffect, useState, type ComponentProps } from "react";
import smallImage from "@/assets/images/small_image.jpg";
import { cn } from "@/libs/utils";

const ROOT_MARGIN_PX = 300;

interface LazyLoadingImageProps extends Omit<ComponentProps<"img">, "ref"> {
  isLazyLoading?: boolean;
}

export default function LazyLoadingImage({
  isLazyLoading = true,
  src,
  className,
  ...props
}: LazyLoadingImageProps) {
  const [isIntersected, setIsIntersected] = useState(!isLazyLoading);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIntersection = () => {
    setIsIntersected(true);
  };

  const imgRef = useObserver<HTMLImageElement>(handleIntersection, {
    rootMargin: `${ROOT_MARGIN_PX}px 0px`,
  });

  // 실제 이미지 pre-load
  useEffect(() => {
    if (!isIntersected) return;

    const img = new window.Image();
    img.src = src!;
    img.onload = () => setIsLoaded(true);
  }, [isIntersected, src]);

  return (
    <img
      src={isLoaded ? src : smallImage}
      ref={imgRef}
      className={cn(
        "transition-all duration-700 ease-in-out",
        isIntersected ? "opacity-100 blur-none" : "opacity-0 blur-lg",
        className
      )}
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  );
}
