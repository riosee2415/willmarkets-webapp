import { useEffect, useState } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(0);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  return width;
};

export default useWidth;
