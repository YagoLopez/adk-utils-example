import { useEffect, RefObject } from "react";

/**
 * Hook to automatically scroll an element to the bottom when dependencies change.
 * @param ref - React ref of the container element that should scroll
 * @param deps - List of dependencies that should trigger the scroll
 */
export function useScrollToBottom(
  ref: RefObject<HTMLDivElement | null>,
  deps: unknown[]
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
