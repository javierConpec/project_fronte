import type { Inozzle, InozzleUpdate } from "../types/nozzle.type";
import { getApiManuel } from "../../config"; // importamos la función

export const nozzleService = async (): Promise<Inozzle[]> => {
  const API_MANUEL = await getApiManuel(); // obtenemos la URL
  const response = await fetch(`${API_MANUEL}/Nozzle/pivot`);
  if (!response.ok) throw new Error("Error al obtener las mangueras");
  const data = await response.json();
  return data as Inozzle[];
};

export const nozzleUpdateService = async (data: InozzleUpdate) => {
  const API_MANUEL = await getApiManuel(); // obtenemos la URL
  try {
    const response = await fetch(`${API_MANUEL}/Nozzle/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([data]),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error: ${text}`);
    }
    const result = await response.text();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en updateNozzle:", error);
    throw error;
  }
};
