import { useEffect, useState } from "react";
import { getReporteContometers,getTeporteTrasations } from "../services/reportService";
import type {IproductFilter,IpointFilter,InozzleFilter,IreporteGeneral,} from "../types/reporte.type";
import {filterNozzle,filterPoint,filterProduct,} from "../services/reportService";

// Hook principal para traer reporte
export const useReportContometer = (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
) => {
  const [data, setData] = useState<IreporteGeneral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      console.log("Filtros enviados a getReporteGeneral:", {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        manguera,
        puntoVenta,
      });

      try {
        const result = await getReporteContometers(
          fechaInicio,
          fechaFin,
          horaInicio,
          horaFin,
          manguera,
          puntoVenta
        );
        if (!cancel) setData(result);
      } catch (err: any) {
        if (!cancel) setError(err.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [fechaInicio,fechaFin, horaInicio, horaFin, manguera, puntoVenta]);

  return { data, loading, error };
};

export const useReportTransactions = (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
) => {
  const [data, setData] = useState<IreporteGeneral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      console.log("Filtros enviados a getTeporteTrasations:", {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        manguera,
        puntoVenta,
      });

      try {
        const result = await getTeporteTrasations(
          fechaInicio,
          fechaFin,
          horaInicio,
          horaFin,
          manguera,
          puntoVenta
        );
        if (!cancel) setData(result);
      } catch (err: any) {
        if (!cancel) setError(err.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancel = true;
    };
  }, [fechaInicio,fechaFin, horaInicio, horaFin, manguera, puntoVenta]);
  return { data, loading, error };
};

// Hook para traer filtros de puntos, productos y mangueras
export const useFiltrosReporte = (fuelpointId: number) => {
  const [nozzles, setNozzles] = useState<InozzleFilter[]>([]);
  const [product, setProduct] = useState<IproductFilter[]>([]);
  const [points, setPoints] = useState<IpointFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Puntos y productos
  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const [pointData, productData] = await Promise.all([
          filterPoint(),
          filterProduct(),
        ]);
        setPoints(pointData);
        setProduct(productData);

        // Log de lo que se recibe como filtros base
        console.log("Puntos cargados:", pointData);
        console.log("Productos cargados:", productData);
      } catch (err: any) {
        setError(err.message || "Error al obtener los filtros");
      } finally {
        setLoading(false);
      }
    };

    fetchFiltros();
  }, []);

  // Mangueras según surtidor
  useEffect(() => {
    if (fuelpointId == null) return;

    const fetchNozzles = async () => {
      try {
        const data = await filterNozzle(fuelpointId);
        setNozzles(data);

        // Log de lo que se recibe según el punto
        console.log(" Mangueras cargadas para surtidor", fuelpointId, data);
      } catch (error) {
        console.error(" Error al cargar mangueras:", error);
        setNozzles([]);
      }
    };

    fetchNozzles();
  }, [fuelpointId]);

  return { nozzles, points, product, loading, error };
};
