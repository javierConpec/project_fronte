import type { IproductFilter,IpointFilter,InozzleFilter, IreporteGeneral } from "../types/reporte.type";
const API_URL = import.meta.env.PUBLIC_API_URL;

export const getReporteGeneral = async (
  fechaInicio?: string,
  fechaFin?: string,
  idProducto?: number,
  manguera?: number,
  puntoVenta?: number
): Promise<IreporteGeneral[]> => {
  const params = new URLSearchParams();

  if (fechaInicio) params.append("fechaInicio", fechaInicio);
  if (fechaFin) params.append("fechaFin", fechaFin);
  if (idProducto) params.append("idProducto", idProducto.toString());
  if (manguera) params.append("manguera", manguera.toString());
  if (puntoVenta) params.append("puntoVenta", puntoVenta.toString());

  const response = await fetch(`${API_URL}/report/general?${params.toString()}`);

  if (!response.ok) throw new Error("Error al obtener el reporte");

  return await response.json();
};

//*FILTROS
export const filterNozzle = async():Promise<InozzleFilter[]> => {
    const response = await fetch (`${API_URL}/filter/Nozzle`)
    if (!response.ok) throw new Error("Error al obtener las mangeueras")
      const data = await response.json();
      return data as InozzleFilter[];
}

export const filterPoint = async():Promise<IpointFilter[]> => {
    const response = await fetch (`${API_URL}/filter/Point`)
    if (!response.ok) throw new Error("Error al obtener los puntos de venta")
      const data = await response.json();
      return data as IpointFilter[];
}

export const filterProduct = async():Promise<IproductFilter[]> => {
    const response = await fetch (`${API_URL}/filter/Product`)
    if (!response.ok) throw new Error("Error al obtener los productos")
      const data = await response.json();
      return data as IproductFilter[];
}
