import { useCallback, useEffect, useRef } from "react";

export default function useObserver<T extends HTMLElement = HTMLDivElement>(
  onIntersection: () => void,
  observerOptions?: IntersectionObserverInit
) {
  const observerRef = useRef<T | null>(null);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        onIntersection();
      }
    },
    [onIntersection]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection, observerOptions]);

  return observerRef;
}
