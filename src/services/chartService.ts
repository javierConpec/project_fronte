const API_URL = import.meta.env.PUBLIC_API_URL;
import type { IchartVenta,IchartVentaProducto,IchartNozzleData} from "../types/chart.type";

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

export const obtenerPuntosDeCombustible = async (): Promise<number[]> => {
  const response = await fetch(`${API_URL}/chart/fuelPoints`);
  if (!response.ok) throw new Error("Error al obtener los puntos de combustible");
  const data = await response.json();
  return data as number[];
};

export const obtenerDatosMangueras = async (fuelPointId?: number): Promise<IchartNozzleData[]> => {
  const url = fuelPointId !== undefined
    ? `${API_URL}/chart/chartNozzleData?fuelPointId=${fuelPointId}`
    : `${API_URL}/chart/chartNozzleData`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener los datos de las mangueras");
  const data = await response.json();
  return data as IchartNozzleData[];
};
