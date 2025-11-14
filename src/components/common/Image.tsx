import useObserver from "@/hooks/useObserver";
import { useState, type ComponentProps } from "react";

interface ImageProps extends Omit<ComponentProps<"img">, "ref"> {
  isLazyLoading?: boolean;
}

export default function Image({ isLazyLoading = true, src, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(!isLazyLoading);

  const handleIntersection = () => {
    setIsLoaded(true);
  };

  const imgRef = useObserver<HTMLImageElement>(handleIntersection, {
    rootMargin: "200px 0px",
  });

  return <img {...props} src={isLoaded ? src : "#"} ref={imgRef} />;
}
