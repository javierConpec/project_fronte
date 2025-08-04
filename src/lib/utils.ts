import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Inozzle } from "../types/nozzle.type";





export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Funcion para darle un buen formato de precio
export function formatPrice(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "S/ 0.00";
  return `${num.toFixed(2)}`;
}


//funcion para darle formate de fecha reducida
export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toISOString().split("T")[0];
};


//funcion para traer todoas las mangueras en lista con su producto
export function getValidNozzles(fuelPointId: number | null, nozzleList: Inozzle[]) {
  const fuelPoint = nozzleList.find((n) => n.fuelPointId === fuelPointId);
  if (!fuelPoint) return [];

  const result: { id: number; label: string }[] = [];

  for (let i = 1; i <= 6; i++) {
    const id = fuelPoint[`idNozzle${i}` as keyof typeof fuelPoint];
    const name = fuelPoint[`nozzle${i}` as keyof typeof fuelPoint];
    if (
      typeof id === "number" &&
      id !== 0 &&
      typeof name === "string" &&
      name !== ""
    ) {
      result.push({ id, label: `Manguera ${i} - ${name}` });
    }
  }

  return result;
}