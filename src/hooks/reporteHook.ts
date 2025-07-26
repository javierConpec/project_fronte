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



export const useFiltrosReporte = () => {
  const [nozzles, setNozzles] = useState<InozzleFilter[]>([]);
  const [points, setPoints] = useState<IpointFilter[]>([]);
  const [products, setProducts] = useState<IproductFilter[]>([]);
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
