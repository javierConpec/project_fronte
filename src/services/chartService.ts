const API_URL = import.meta.env.PUBLIC_API_URL;
import type { IchartVenta } from "../types/chart.type";

export const obtenerVentas = async (): Promise<IchartVenta[]> => {
  const response = await fetch(`${API_URL}/chart/ventasPorFecha`);
  if (!response.ok) throw new Error("Error al obtener las ventas");
  const data = await response.json();
  return data as IchartVenta[];
};