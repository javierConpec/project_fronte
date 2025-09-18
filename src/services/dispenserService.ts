import type { Idispenser, IupdateDispenser } from "../types/dispenser.type";
import { getApiManuel } from "../../config"; // importamos la función

export const dispenserService = async (): Promise<Idispenser[]> => {
  const API_MANUEL = await getApiManuel(); // obtenemos la URL desde config
  const response = await fetch(`${API_MANUEL}/Dispenser/list`);
  if (!response.ok) 
    throw new Error("Error al obtener las mangueras");
  const data = await response.json();
  return data as Idispenser[];
};

export const updateDispenserService = async (data: IupdateDispenser) => {
  const API_MANUEL = await getApiManuel(); 
  try{
    const respoonse = await fetch(`${API_MANUEL}/Dispenser/update`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify([data]),
  });
  if (!respoonse.ok) {
    const text = await respoonse.text();
    throw new Error(`Error: ${text}`);
  }
  const result = await respoonse.text();
  console.log("Respuesta del servidor:", result);
  return result;
  } catch (error) {
    console.error("Error en updateDispenserService:", error);
    throw error;
  }
}

export const DispenserLockService = async (id: number) => {
  const API_MANUEL = await getApiManuel();
  try {
    const respoonse = await fetch(`${API_MANUEL}/Dispenser/lock/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respoonse.ok) {
      const text = await respoonse.text();
      throw new Error(`Error: ${text}`);
    }
    const result = await respoonse.text();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en DispenserLockService:", error);
    throw error;
  }
};

export const DispenserUnlockService = async (id: number) => {
  const API_MANUEL = await getApiManuel();
  try {
    const respoonse = await fetch(`${API_MANUEL}/Dispenser/unlock/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respoonse.ok) {
      const text = await respoonse.text();
      throw new Error(`Error: ${text}`);
    }
    const result = await respoonse.text();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en DispenserUnlockService:", error);
    throw error;
  }
};