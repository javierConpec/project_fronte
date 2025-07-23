import { useEffect, useState } from "react";
import { getReporteGeneral } from "../services/reportService";
import type { Iproduct,Ipoint,Inozzle, IreporteGeneral } from "../types/reporte.type";
import { filterNozzle, filterPoint, filterProduct } from "../services/reportService";


export const useReporteGeneral = (
  fechaInicioParam?: string,
  fechaFinParam?: string,
  idProducto?: number,
  manguera?: number,
  puntoVenta?: number
) => {
  const [data, setData] = useState<IreporteGeneral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const defaultInicio = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  const defaultFin = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];

  const fechaInicio = fechaInicioParam || defaultInicio;
  const fechaFin = fechaFinParam || defaultFin; useEffect(() => {
    
    const fetchData = async () => {
      try {
        const result = await getReporteGeneral(fechaInicio, fechaFin, idProducto, manguera, puntoVenta);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fechaInicio, fechaFin, idProducto, manguera, puntoVenta]);

  return { data, loading, error };
};



export const useFiltrosReporte = () => {
  const [nozzles, setNozzles] = useState<Inozzle[]>([]);
  const [points, setPoints] = useState<Ipoint[]>([]);
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const [nozzleData, pointData, productData] = await Promise.all([
          filterNozzle(),
          filterPoint(),
          filterProduct(),
        ]);

        setNozzles(nozzleData);
        setPoints(pointData);
        setProducts(productData);
      } catch (err: any) {
        setError(err.message || "Error al obtener los filtros");
      } finally {
        setLoading(false);
      }
    };

    fetchFiltros();
  }, []);

  return { nozzles, points, products, loading, error };
};
