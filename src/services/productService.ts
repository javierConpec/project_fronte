import type { Iproduct, IupdateProduct } from "../types/product.type";
import { getApiManuel } from "../../config"; 

export const productService = async (): Promise<Iproduct[]> => {
  const API_MANUEL = await getApiManuel();
  const response = await fetch(`${API_MANUEL}/Product`);
  if (!response.ok) throw new Error("Error al obtener los productos");
  const data = await response.json();
  console.log("DATA:", data);
  return data as Iproduct[];
};

export const updateProductService = async (data: IupdateProduct) => {
  const API_MANUEL = await getApiManuel();
  try {
    const response = await fetch(`${API_MANUEL}/Product/update`, {
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
    console.error("Error en updateProductService:", error);
    throw error;
  }
};
