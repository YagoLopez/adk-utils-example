import { useEffect, RefObject } from "react";

/**
 * Hook to automatically scroll an element to the bottom when dependencies change.
 * @param ref - React ref of the container element that should scroll
 * @param deps - List of dependencies that should trigger the scroll
 */
export function useScrollToBottom(
  ref: RefObject<HTMLDivElement | null>,
  deps: any[]
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, ...deps]);
}
