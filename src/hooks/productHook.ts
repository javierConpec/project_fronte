import { useEffect, useState } from "react";
import type { Iproduct, IupdateProduct } from "../types/product.type";
import {
  productService,
  updateProductService,
} from "../services/productService";

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

  const updateProduct = async (updated: IupdateProduct) => {
    if (!updated.id || updated.currentPrice == null) {
      console.warn("Faltan datos para actualizar:", updated);
      return;
    }
    try {
      await updateProductService({
        id: updated.id,
        name: updated.name,
        currentPrice: updated.currentPrice,
        internalCode: updated.internalCode,
        active: updated.active,
        needsUpdate: updated.needsUpdate,
      });
      console.log("Actualizando:", updated);

      fetchProduct(); //Es para refrescar la lista
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return { products, loading, error, fetchProduct, updateProduct };
};
