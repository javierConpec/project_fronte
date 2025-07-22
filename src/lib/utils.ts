import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "S/ 0.00";
  return `${num.toFixed(2)}`;
}
