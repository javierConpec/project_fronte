import { Pencil, Check, X } from "lucide-react";
import { useProduct } from "../../hooks/productHook";
import { SectionTitle } from "../sectionTitle";
import { RiGasStationFill } from "react-icons/ri";
import type { Iproduct } from "../../types/product.type";
import { CustomModal } from "../modal/customModal";
import { useState } from "react";

export function ProductsPage() {
  const { products, loading, error, updateProduct } = useProduct();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Iproduct | null>(null);
  const openModal = (product: Iproduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (!selectedProduct) return;

      await updateProduct({
        ...selectedProduct,
        id: data.id,
        currentPrice: data.currentPrice,
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  /* const handleToggleActive = (products: Iproduct) => {
    toggleActive(products);
  };
*/
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Combustibles" />
        <table className="w-full">
          <thead className="bg-gray-700 text-sm uppercase font-semibold text-white text-center">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Precio Actual</th>
              <th className="px-6 py-3">Codigo.</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Update</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200  text-center">
            {products.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-6 py-2">{fila.id}</td>
                <td className="px-6 py-2">{fila.name}</td>
                <td className="px-6 py-2">
                  S/ {Number(fila.currentPrice).toFixed(2)}
                </td>
                <td className="px-6 py-2">{fila.internalCode}</td>
                <td className="px-6 py-2">
                  <button
                    //oclick -> falta habilitar endpoint
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                      fila.active ? "bg-gray-500" : "bg-gray-100 border "
                    }`}
                  >
                    <div
                      className={`w-4 h-4  rounded-full shadow transform transition-transform duration-300 ${
                        fila.active
                          ? "translate-x-6 bg-white"
                          : "translate-x-1 bg-gray-500"
                      }`}
                    ></div>
                  </button>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    {fila.needsUpdate ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      openModal(fila);
                      setSelectedProduct(fila);
                    }}
                    className="text-gray-700 hover:text-gray-900"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedProduct && (
        <CustomModal
          isOpen={showModal}
          title="Editar Producto"
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          inputs={[
            {
              name: "id",
              label: "ID",
              type: "number",
              value: selectedProduct.id,
              disabled: true,
            },
            {
              name: "name",
              label: "Nombre",
              type: "text",
              value: selectedProduct.name,
              disabled: true,
            },
            {
              name: "currentPrice",
              label: "Precio",
              type: "number",
              value: selectedProduct.currentPrice,
            },
          ]}
        />
      )}
    </>
  );
}
