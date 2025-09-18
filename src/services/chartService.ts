import type { IchartVenta, IchartVentaProducto, IchartNozzleData } from "../types/chart.type";
import { getApiJavi } from "../../config"; // importamos la función

export const obtenerVentas = async (anio?: number, mes?: number): Promise<IchartVenta[]> => {
  const API_URL = await getApiJavi(); // ej: http://localhost:3000/api
  const params = new URLSearchParams();
  if (anio) params.append("anio", anio.toString());
  if (mes) params.append("mes", mes.toString());

  console.log(`${API_URL}/chart/ventasPorFecha?${params.toString()}`); // <--- para debug

  const response = await fetch(`${API_URL}/chart/ventasPorFecha?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener las ventas");
  const data = await response.json();
  return data as IchartVenta[];
};


export const obtenerVentasPorProducto = async (anio?: number, mes?: number): Promise<IchartVentaProducto[]> => {
  const API_URL = await getApiJavi();
  const params = new URLSearchParams();
  if (anio !== undefined) params.append("anio", anio.toString());
  if (mes !== undefined) params.append("mes", mes.toString());
  const response = await fetch(`${API_URL}/chart/ventasPorProducto?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener las ventas por producto");
  const data = await response.json();
  return data as IchartVentaProducto[];
};

export const obtenerPuntosDeCombustible = async (): Promise<number[]> => {
  const API_URL = await getApiJavi();
  const response = await fetch(`${API_URL}/chart/fuelPoints`);
  if (!response.ok) throw new Error("Error al obtener los puntos de combustible");
  const data = await response.json();
  return data as number[];
};

export const obtenerDatosMangueras = async (
  LogicalNumber?: number,
  anio?: number,
  mes?: number
): Promise<IchartNozzleData[]> => {
  const API_URL = await getApiJavi();
  const params = new URLSearchParams();
  if (anio !== undefined) params.append("anio", anio.toString());
  if (mes !== undefined) params.append("mes", mes.toString());

  let url = "";
  if (LogicalNumber !== undefined) {
    url = `${API_URL}/chart/chartNozzleData?LogicalNumber=${LogicalNumber}&${params.toString()}`;
  } else {
    url = params.toString()
      ? `${API_URL}/chart/chartNozzleData?${params.toString()}`
      : `${API_URL}/chart/chartNozzleData`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener los datos de las mangueras");
  const data = await response.json();
  return data as IchartNozzleData[];
};


export const filterYear = async (): Promise<number[]> => {
  const API_URL = await getApiJavi();
  const response = await fetch(`${API_URL}/chart/filter/anio`);
  if (!response.ok) throw new Error("Error al obtener anios de ventas");
  const data = await response.json();
  return data as number[];
};

export const filterMonth = async (anio?: number): Promise<number[]> => {
  const API_URL = await getApiJavi();
  const params = new URLSearchParams();
  if (anio) params.append("anio", anio.toString()); 
  const response = await fetch(`${API_URL}/chart/filter/mes?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener los meses de ventas");
  const data = await response.json();
  return data as number[];
};

