import { useEffect, useRef } from "react";

export function useFocusOnLoad(isLoading: boolean) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && ref.current) {
      ref.current.focus();
    }
  }, [isLoading]);

  return ref;
}
