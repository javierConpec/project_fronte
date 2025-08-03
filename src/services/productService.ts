const API_MANUEL = import.meta.env.PUBLIC_API_URL_2;
import type { Iproduct, IupdatePriceProduct} from "../types/product.type"

export const productService = async():Promise<Iproduct[]> => {
    const response = await fetch (`${API_MANUEL}/Product`)
    if (!response.ok) throw new Error ("Error al obtener los productos")
        const data = await response.json()
    console.log("DATA:", data);
    return data as Iproduct[];
    
}

export const updatePriceService = async (data: IupdatePriceProduct) => {
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
    console.error("Error en updatePrice:", error);
    throw error;
  }
};