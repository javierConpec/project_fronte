import type { IproductFilter, IpointFilter, InozzleFilter, IreporteGeneral,IreporteNozzle,IreporteProducts, IreporteContometro, IDateCloseFilter } from "../types/reporte.type";
import { getApiJavi } from "../../config"; // importamos la función

export const getReporteContometers = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  dateClose?: string
): Promise<IreporteContometro[]> => {
  const API_JAVI = await getApiJavi(); // obtenemos la URL
  const params = new URLSearchParams();

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (horaInicio) params.append("horaInicio", horaInicio); 
  if (horaFin) params.append("horaFin", horaFin);
  if (manguera) params.append("manguera", manguera.toString());
  if (puntoVenta) params.append("puntoVenta", puntoVenta.toString());
  if (dateClose) params.append("dateClose", dateClose.toString());


  const response = await fetch(`${API_JAVI}/report/contometro?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener el reporte");
  const data = await response.json();
  return data;
};

export const getReportNozzle = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
):Promise<IreporteNozzle[]> =>{
  const API_JAVI = await getApiJavi();
  const params = new URLSearchParams();

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (horaInicio) params.append("horaInicio", horaInicio); 
  if (horaFin) params.append("horaFin", horaFin);
  if (manguera) params.append("manguera", manguera.toString());
  if (puntoVenta) params.append("puntoVenta", puntoVenta.toString());

   const response = await fetch(`${API_JAVI}/report/mangueras?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener el reporte");
  const data = await response.json();
  return data;
}

export const getReportProduct = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
):Promise<IreporteProducts[]> =>{
  const API_JAVI = await getApiJavi();
  const params = new URLSearchParams();

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (horaInicio) params.append("horaInicio", horaInicio); 
  if (horaFin) params.append("horaFin", horaFin);

   const response = await fetch(`${API_JAVI}/report/productos?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener el reporte");
  const data = await response.json();
  return data;
}

export const getTeporteTrasations = async (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
): Promise<IreporteGeneral[]> => {
  const API_JAVI = await getApiJavi(); // obtenemos la URL
  const params = new URLSearchParams();
  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (horaInicio) params.append("horaInicio", horaInicio);
  if (horaFin) params.append("horaFin", horaFin);
  if (manguera) params.append("manguera", manguera.toString());
  if (puntoVenta) params.append("puntoVenta", puntoVenta.toString());
  const response = await fetch(`${API_JAVI}/report/transacciones?${params.toString()}`);
  if (!response.ok) throw new Error("Error al obtener el reporte");
  const data = await response.json();
  return data;
};

//* FILTROS
export const filterNozzle = async (fuelpointId: number): Promise<InozzleFilter[]> => {
  const API_JAVI = await getApiJavi();
  const response = await fetch(`${API_JAVI}/filter/Nozzle?fuelpointId=${fuelpointId}`);
  if (!response.ok) throw new Error("Error al obtener las mangeueras");
  const data = await response.json();
  return data as InozzleFilter[];
}

export const filterPoint = async (): Promise<IpointFilter[]> => {
  const API_JAVI = await getApiJavi();
  const response = await fetch(`${API_JAVI}/filter/Point`);
  if (!response.ok) throw new Error("Error al obtener los puntos de venta");
  const data = await response.json();
  return data as IpointFilter[];
}

export const filterProduct = async (): Promise<IproductFilter[]> => {
  const API_JAVI = await getApiJavi();
  const response = await fetch(`${API_JAVI}/filter/Product`);
  if (!response.ok) throw new Error("Error al obtener los productos");
  const data = await response.json();
  return data as IproductFilter[];
}

export const filterTurno = async (fechaInicio?: string, fechaFin?: string): Promise<IDateCloseFilter> => {
  const API_JAVI = await getApiJavi();
  const params = new URLSearchParams();

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);

  const url = `${API_JAVI}/filter/DataClose?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener los turnos");
  const data = await response.json();
  return data as IDateCloseFilter;
};

