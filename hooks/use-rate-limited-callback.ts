import { useRef, useEffect } from "react";
import { rateLimit, RateLimiterOptions } from "@tanstack/pacer";

export function useRateLimitedCallback<T extends (...args: any[]) => any>(
  fn: T,
  options: RateLimiterOptions<T>
) {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const rateLimitedRef = useRef(
    rateLimit(((...args: Parameters<T>) => {
      return fnRef.current(...args);
    }) as T, options)
  );

  return rateLimitedRef.current;
}
