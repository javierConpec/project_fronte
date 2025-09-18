import { useEffect, useState } from "react";
import type { Idispenser, IupdateDispenser } from "../types/dispenser.type";
import {
  DispenserLockService,
  dispenserService,
  DispenserUnlockService,
  updateDispenserService,
} from "../services/dispenserService";

export const useDispenser = () => {
  const [dispenser, setDispenser] = useState<Idispenser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fetchDispenser = async () => {
    try {
      const [dispenserData] = await Promise.all([dispenserService()]);
      setDispenser(dispenserData);
    } catch (err: any) {
      setError(err.message || "Error al obtener los Surtidores");
    } finally {
      setLoading(false);
    }
  };

  const UpdateDispenser = async (updated: IupdateDispenser) => {
    if (
      !updated.id && updated.id !== 0 ||
      updated.nozzleQuantity === undefined ||
      updated.factorVolume === undefined ||
      updated.factorAmount === undefined ||
      updated.factorContometer === undefined 
    ) {
      console.warn("Faltan datos para actualizar:", updated);
      return;
    }
    try {
      await updateDispenserService({
        id: updated.id,
        logicalNumber: updated.logicalNumber,
        physicalAddress: updated.physicalAddress,
        nozzleQuantity: updated.nozzleQuantity,
        factorVolume: updated.factorVolume,
        factorAmount: updated.factorAmount,
        factorContometer: updated.factorContometer,
        bitCConfigurationId: updated.bitCConfigurationId,
        ptsControllerId: updated.ptsControllerId,
      });
      console.log("Actualizando:", updated);

      fetchDispenser(); //Es para refrescar la lista
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
    }
  };
  useEffect(() => {
    fetchDispenser();
  }, []);


  const lock = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await DispenserLockService(id);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err.message ?? "Error al bloquear el dispenser");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unlock = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await DispenserUnlockService(id);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err.message ?? "Error al desbloquear el dispenser");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { dispenser, loading, error, fetchDispenser, UpdateDispenser,result, lock, unlock};
};


