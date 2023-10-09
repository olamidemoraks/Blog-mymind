import { useRef, useEffect, useCallback } from "react";

export function useIsMounted() {
  // this function fixes quill error when mounted
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
