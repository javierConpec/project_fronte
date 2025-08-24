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
// Formatea la fecha como yyyy-MM-dd sin cambiar el día por la zona horaria
export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

//  Convierte un string "yyyy-MM-dd" a Date en local
export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};



// Obtener mangueras 
export function getValidNozzles(FuelPointId: number | null, nozzleList: Inozzle[]) {
  const fuelPoint = nozzleList.find((n) => n.FuelPointId === FuelPointId);
  if (!fuelPoint) return [];

  const result: { id: number; label: string; titulo: string }[] = [];

  for (let i = 1; i <= 6; i++) {
    const productId = fuelPoint[`ProductIdN${i}` as keyof typeof fuelPoint];
    const productName = fuelPoint[`ProductNameN${i}` as keyof typeof fuelPoint];

    if (typeof productId === "number" && productId !== 0 && typeof productName === "string" && productName !== "") {
      result.push({
        id: i, // id ficticio unicamente para indentificar la manguera
        label: `Manguera ${i} - ${productName}`, 
        titulo: `idNozzle${i}`, // sigue sirviendo como referencia interna
      });
    }
  }

  return result;
}

// ayuda a obtener el ultimo id de la manguera
export function getLastAssignedNozzle(nozzle: Inozzle): number | null {
  let last = null;
  for (let i = 1; i <= 6; i++) {
    const productId = nozzle[`ProductIdN${i}` as keyof Inozzle];
    if (typeof productId === "number" && productId !== 0) {
      last = i; // se va guardando el último asignado
    }
  }
  return last;
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
