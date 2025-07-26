import { useEffect, useState } from "react";
import type {AnimatedCounterProps} from "../types/card.type";

export const AnimatedCounter = ({
  value,
  duration = 2100,
  prefix = "",
  isMoney = false,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

   useEffect(() => {
    const start = performance.now();
    const startValue = displayValue;
    const change = value - startValue;

    const step = (timestamp: number) => {
        
      const progress = Math.min((timestamp - start) / duration, 1);
      const newValue = startValue + change * progress;
      setDisplayValue(newValue);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value]);

  const formatted = isMoney
    ? new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
      }).format(displayValue)
    : Math.round(displayValue).toString();

  return <span>{prefix + formatted}</span>;
};

