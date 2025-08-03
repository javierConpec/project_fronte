import { useEffect, useState } from "react";
import type { Iproduct,IupdatePriceProduct} from "../types/product.type";
import { productService, updatePriceService } from "../services/productService";

export const useProduct = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const [productData] = await Promise.all([productService()]);
      setProducts(productData);
    } catch (err: any) {
      setError(err.message || "Error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };


const updateProduct = async (updated: IupdatePriceProduct) => {
  if (!updated.id || updated.currentPrice == null) {
    console.warn("Faltan datos para actualizar:", updated);
    return;
  }
  try {
    await updatePriceService({ id: updated.id, currentPrice: updated.currentPrice }); // solo pasa los campos requeridos
    console.log("Actualizando:", updated);
    fetchProduct(); //Es para refrescar la lista
  } catch (err) {
    console.error("Error al actualizar el producto:", err);
  }
};

  useEffect(() => {
    fetchProduct();
  }, []);

  return { products, loading, error, fetchProduct,updateProduct };
};
