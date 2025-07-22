import { useEffect, useState } from "react";
import { obtenerVentas } from "../services/chartService";
import type { IchartVenta } from "../types/chart.type";

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