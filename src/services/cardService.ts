const API_URL = import.meta.env.PUBLIC_API_URL;
import type {ItotalAmount,ItotalHoy,ItotalNozzles,ItotalVolume} from "../types/card.type";

export const obtenerTotalAmount = async (): Promise<ItotalAmount> => {
  const response = await fetch(`${API_URL}/card/totalAmount`);
  if (!response.ok) throw new Error("Error al obtener el total amount");
  const data = await response.json();
  return data as ItotalAmount;
};

export const obtenerTotalVolume = async (): Promise<ItotalVolume> => {
  const response = await fetch(`${API_URL}/card/totalVolume`);
  if (!response.ok) throw new Error("Error al obtener el total volume");
  const data = await response.json();
  return data as ItotalVolume;
};

export const obtenerTotalHoy = async (): Promise<ItotalHoy> => {
  const response = await fetch(`${API_URL}/card/totalHoy`);
  if (!response.ok) throw new Error("Error al obtener el total hoy");
  const data = await response.json();
  return data as ItotalHoy;
}

export const obtenerTotalNozzles = async (): Promise<ItotalNozzles> => {
  const response = await fetch(`${API_URL}/card/totalNozzles`);
  if (!response.ok) throw new Error("Error al obtener el total de nozzles");
  const data = await response.json();
  return data as ItotalNozzles;
};