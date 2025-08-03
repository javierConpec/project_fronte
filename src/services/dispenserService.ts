const API_MANUEL = import.meta.env.PUBLIC_API_URL_2;
import type { Idispenser } from "../types/dispenser.type";

export const dispenserService = async (): Promise<Idispenser[]> => {
  const response = await fetch(`${API_MANUEL}/Dispenser/list`);
  if (!response.ok) throw new Error("Error al obtener las mangueras");
  const data = await response.json();
  return data as Idispenser[];
};
