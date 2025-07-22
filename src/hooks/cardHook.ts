import { useEffect, useState } from "react";
import {obtenerTotalAmount,obtenerTotalHoy,obtenerTotalNozzles,obtenerTotalVolume} from "../services/cardService";
import type { ItotalAmount, ItotalHoy, ItotalNozzles, ItotalVolume } from "../types/card.type"; 


export const useTotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState<ItotalAmount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerTotalAmount()
      .then(setTotalAmount)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { totalAmount, loading, error };
}

export const useTotalHoy = () => {
  const [totalHoy, setTotalHoy] = useState<ItotalHoy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerTotalHoy()
      .then(setTotalHoy)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { totalHoy, loading, error };
}

export const useTotalNozzles = () => {
  const [totalNozzles, setTotalNozzles] = useState<ItotalNozzles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerTotalNozzles()
      .then(setTotalNozzles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { totalNozzles, loading, error };
}

export const useTotalVolume = () => {
  const [totalVolume, setTotalVolume] = useState<ItotalVolume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerTotalVolume()
      .then(setTotalVolume)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { totalVolume, loading, error };
}

