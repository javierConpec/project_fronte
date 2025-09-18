import type { ITransaccionReenvio } from "../types/transaction.type";
import { getApiManuel } from "../../config"; 


export const transactionPendingService = async (data: ITransaccionReenvio[]) => {
  const API_MANUEL = await getApiManuel();
  try {
    const response = await fetch(`${API_MANUEL}/PendingTransactionsById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error: ${text}`);
    }

    const result = await response.text(); 
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en reenviar pendientes:", error);
    throw error;
  }
};