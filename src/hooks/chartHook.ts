import { use, useEffect, useState } from "react";
import { obtenerVentas,obtenerVentasPorProducto,obtenerDatosMangueras,obtenerPuntosDeCombustible, filterYear, filterMonth } from "../services/chartService";
import type { IchartVenta,IchartVentaProducto,IchartNozzleData} from "../types/chart.type";

export const useVentas = (anio?: number, mes?: number) => {
  const [ventas, setVentas] = useState<IchartVenta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const data = await obtenerVentas(anio, mes);
        console.log("Ventas obtenidas con filtro:", { anio, mes }, data); // <-- debug
        setVentas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [anio, mes]);

  return { ventas, loading, error };
};



export const useVentasPorProducto = (anio?: number, mes?: number) => {
  const [ventasPorProducto, setVentasPorProducto] = useState<IchartVentaProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    obtenerVentasPorProducto(anio, mes)
      .then(setVentasPorProducto)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [anio, mes]);

  return { ventasPorProducto, loading, error };
};



export const usePuntosDeCombustible = () => {
  const [puntosDeCombustible, setPuntosDeCombustible] = useState<number[]>([]);
  const [loadingP, setLoading] = useState(true); 
  const [errorP, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerPuntosDeCombustible() 
      .then(setPuntosDeCombustible)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { puntosDeCombustible, loadingP, errorP };
};


export const useDatosMangueras = (LogicalNumber?: number, anio?: number, mes?: number) => {
  const [datosMangueras, setDatosMangueras] = useState<IchartNozzleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    obtenerDatosMangueras(LogicalNumber, anio, mes)
      .then(setDatosMangueras)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [LogicalNumber, anio, mes]);

  return { datosMangueras, loading, error };
};


export const useDatosSurtidores = (anio?: number, mes?: number) => {
  const [datosSurtidores, setDatosSurtidores] = useState<IchartNozzleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    obtenerDatosMangueras(undefined, anio, mes)
      .then(setDatosSurtidores)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [anio, mes]);

  return { datosSurtidores, loading, error };
};


export const useYearMonthFilter = () => {
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar años al montar el hook
  useEffect(() => {
    setLoading(true);
    setError(null);
    filterYear()
      .then((data) => {
        setYears(data);
        if (data.length) setSelectedYear(data[0]); // opcional: seleccionar primer año
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Cargar meses cuando cambia el año seleccionado
  useEffect(() => {
    if (selectedYear === null) {
      setMonths([]);
      return;
    }

    setLoading(true);
    setError(null);
    filterMonth(selectedYear)
      .then(setMonths)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedYear]);

  return {
    years,
    months,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    loading,
    error,
  };
};
