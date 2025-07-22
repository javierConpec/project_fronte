import { useEffect, useState } from "react";
import { obtenerVentas,obtenerVentasPorProducto } from "../services/chartService";
import type { IchartVenta,IchartVentaProducto } from "../types/chart.type";

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