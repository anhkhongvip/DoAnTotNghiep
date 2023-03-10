import { RefObject, useEffect, useState } from "react";
function useResize<T extends HTMLElement = HTMLElement>(nodeRef: RefObject<T>) {
  const [coords, setCoords] = useState<DOMRect>();
  useEffect(() => {
    function handleResize() {
      if (nodeRef?.current) {
        setCoords(nodeRef?.current?.getBoundingClientRect());
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ coords, setCoords ] as const;
}

export default useResize;
