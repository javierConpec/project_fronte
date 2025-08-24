import { useEffect, useState } from "react";

export function UseLoading(loading: boolean, delay = 2000) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [loading, delay]);

  return showLoader;
}
