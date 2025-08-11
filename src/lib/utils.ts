import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Inozzle } from "../types/nozzle.type";




// Utilidad para combinar clases de Tailwind CSS
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
// ✅ Formatea la fecha como yyyy-MM-dd sin cambiar el día por la zona horaria
export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// ✅ Convierte un string "yyyy-MM-dd" a Date en local
export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};




//funcion para traer todoas las mangueras en lista con su producto
export function getValidNozzles(fuelPointId: number | null, nozzleList: Inozzle[]) {
  const fuelPoint = nozzleList.find((n) => n.fuelPointId === fuelPointId);
  if (!fuelPoint) return [];

  const result: { id: number; label: string }[] = [];
// Iteramos sobre las propiedades de mangueras del objeto fuelPoint
  for (let i = 1; i <= 6; i++) {
    const id = fuelPoint[`idNozzle${i}` as keyof typeof fuelPoint];
    const name = fuelPoint[`nozzle${i}` as keyof typeof fuelPoint];
    // Verificamos que id y name sean válidos
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


//Agrupar surtidores 
export function agruparPorSurtidor<T extends { surtidor: string }>(data: T[]) {
  const grupos: { surtidor: string; rows: T[] }[] = [];
// Iteramos sobre los datos y agrupamos por surtidor
  let i = 0;
  while (i < data.length) {
    const surtidorActual = data[i].surtidor;
    const grupo: T[] = [];
// Recolectamos todos los elementos con el mismo surtidor
    while (i < data.length && data[i].surtidor === surtidorActual) {
      grupo.push(data[i]);
      i++;
    }
// Añadimos el grupo al array de grupos
    if (grupo.length > 0)// Aseguramos que el grupo no esté vacío
    grupos.push({ surtidor: surtidorActual, rows: grupo });
  }

  return grupos;
}
