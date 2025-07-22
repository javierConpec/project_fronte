const API_URL = import.meta.env.PUBLIC_API_URL;
import type { IchartVenta,IchartVentaProducto } from "../types/chart.type";

export const obtenerVentas = async (): Promise<IchartVenta[]> => {
  const response = await fetch(`${API_URL}/chart/ventasPorFecha`);
  if (!response.ok) throw new Error("Error al obtener las ventas");
  const data = await response.json();
  return data as IchartVenta[];
};

export const obtenerVentasPorProducto = async (): Promise<IchartVentaProducto[]> => {
  const response = await fetch(`${API_URL}/chart/ventasPorProducto`);
  if (!response.ok) throw new Error("Error al obtener las ventas por producto");
  const data = await response.json();
  return data as IchartVentaProducto[];
}
