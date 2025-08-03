import { useEffect, useState } from "react";
import { getReporteGeneral } from "../services/reportService";
import type { IproductFilter,IpointFilter,InozzleFilter, IreporteGeneral } from "../types/reporte.type";
import { filterNozzle, filterPoint, filterProduct } from "../services/reportService";


export const useReporteGeneral = (
  fechaInicio?: string,
  fechaFin?: string,
  idProducto?: number,
  manguera?: number,
  puntoVenta?: number
) => {
  const [data, setData] = useState<IreporteGeneral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
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



export const useFiltrosReporte = (fuelpointId: number) => {
  const [nozzles, setNozzles] = useState<InozzleFilter[]>([]);
  const [points, setPoints] = useState<IpointFilter[]>([]);
  const [products, setProducts] = useState<IproductFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const [pointData, productData] = await Promise.all([
          filterPoint(),
          filterProduct(),
        ]);

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

 
  useEffect(() => {
    if (fuelpointId === null || fuelpointId === undefined) return;

    const fetchNozzles = async () => {
      try {
        const data = await filterNozzle(fuelpointId);
        setNozzles(data);
      } catch (error) {
        console.error("Error al cargar mangueras:", error);
        setNozzles([]);
      }
    };

    fetchNozzles();
  }, [fuelpointId]);

  return { nozzles, points, products, loading, error };
};
