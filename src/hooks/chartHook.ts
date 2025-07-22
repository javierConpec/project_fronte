import { use, useEffect, useState } from "react";
import { obtenerVentas,obtenerVentasPorProducto,obtenerDatosMangueras,obtenerPuntosDeCombustible } from "../services/chartService";
import type { IchartVenta,IchartVentaProducto,IchartNozzleData} from "../types/chart.type";

export const useVentas = () => {
  const [ventas, setVentas] = useState<IchartVenta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerVentas()
      .then(setVentas)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { ventas, loading, error };
};  

export const useVentasPorProducto = () => {
  const [ventasPorProducto, setVentasPorProducto] = useState<IchartVentaProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerVentasPorProducto()
      .then(setVentasPorProducto)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { ventasPorProducto, loading, error };
}

export const usePuntosDeCombustible = () => {
  const [puntosDeCombustible, setPuntosDeCombustible] = useState<number[]>([]);
  const [loadingP, setLoading] = useState(true); 
  const [errorP, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerPuntosDeCombustible() // retorna [1, 2, 3, 4]
      .then(setPuntosDeCombustible)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { puntosDeCombustible, loadingP, errorP };
};


export const useDatosMangueras = (fuelPointId?: number) => {
    const [datosMangueras, setDatosMangueras] = useState<IchartNozzleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        

        setLoading(true);
        setError(null);

        obtenerDatosMangueras(fuelPointId)
            .then(setDatosMangueras)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [fuelPointId]);

    return { datosMangueras, loading, error };
};