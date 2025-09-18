// hooks/useTransactionPending.ts
import { useState } from "react";
import type { ITransaccionReenvio } from "../types/transaction.type";
import { transactionPendingService } from "../services/transactionService";

export const useTransactionPending = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reenviarPendientes = async (pendientes: ITransaccionReenvio[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await transactionPendingService(pendientes);
      return result;
    } catch (err: any) {
      setError(err.message || "Error en el reenvío");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { reenviarPendientes, loading, error };
};
