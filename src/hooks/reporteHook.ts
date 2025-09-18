import { useEffect, useState } from "react";
import { getReporteContometers,getTeporteTrasations,getReportProduct,getReportNozzle, filterTurno } from "../services/reportService";
import type {IproductFilter,IpointFilter,InozzleFilter,IreporteGeneral,IreporteNozzle,IreporteProducts, IreporteContometro, IDateCloseFilter} from "../types/reporte.type";
import {filterNozzle,filterPoint,filterProduct,} from "../services/reportService";

export const useTurnos = (fechaInicio?: string, fechaFin?: string) => {
  const [turnos, setTurnos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const data = await filterTurno(fechaInicio, fechaFin);
        if (!cancel) setTurnos(data);
      } catch (err: any) {
        if (!cancel) setError(err.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchTurnos();
    return () => { cancel = true; };
  }, [fechaInicio, fechaFin]);

  return { turnos, loading, error };
};



export const useReportContometer = (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number,
  turnos?: string[] // seguimos recibiendo los turnos del front
) => {
  const [data, setData] = useState<IreporteContometro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      // Convertimos turnos a un string separado por comas
      const dateClose = turnos && turnos.length > 0 ? turnos.join(",") : undefined;

      console.log("Filtros enviados a getReporteGeneral:", {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        manguera,
        puntoVenta,
        dateClose, // ya como string
      });

      try {
        const result = await getReporteContometers(
          fechaInicio,
          fechaFin,
          horaInicio,
          horaFin,
          manguera,
          puntoVenta,
          dateClose // enviamos string directamente
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
  }, [fechaInicio, fechaFin, horaInicio, horaFin, manguera, puntoVenta, turnos]);

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


export const useReportNozzle = (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
  manguera?: number,
  puntoVenta?: number
) => {
  const [data, setData] = useState<IreporteNozzle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      console.log("Filtros enviados a getReportNozzle:", {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        manguera,
        puntoVenta,
      });

      try {
        const result = await getReportNozzle(
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

export const useReportProducts = (
  fechaInicio?: string,
  fechaFin?: string,
  horaInicio?: string,
  horaFin?: string,
) => {
  const [data, setData] = useState<IreporteProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);

      console.log("Filtros enviados a getReportNozzle:", {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
      });

      try {
        const result = await getReportProduct(
          fechaInicio,
          fechaFin,
          horaInicio,
          horaFin,
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
  }, [fechaInicio,fechaFin, horaInicio, horaFin]);

  return { data, loading, error };
};