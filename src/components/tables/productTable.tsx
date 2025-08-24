import { Pencil, Check, X, Trash } from "lucide-react";
import { useProduct } from "../../hooks/productHook";
import { SectionTitle } from "../sectionTitle";
import { RiGasStationFill } from "react-icons/ri";
import type { Iproduct } from "../../types/product.type";
import { CustomModal } from "../modal/customModal";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseLoading } from "../../hooks/loaderHook";
import { SpinnerBeat } from "../Loader/spinner";

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
        name: data.name,
        internalCode: data.internalCode,
        currentPrice: data.currentPrice,
      });
      toast.success("Producto actualizado exitosamente");
      setShowModal(false);
    } catch (error) {
      toast.error("Error al actualizar el producto");
      console.error("Error al actualizar:", error);
    }
  };

  //Carga de la pagina
  const showLoader = UseLoading(loading, 1000);

  if (showLoader) return <SpinnerBeat />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Combustibles" />
        <table className="w-full">
          <thead className="bg-primary-900 text-sm uppercase font-semibold text-text-50 text-center">
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
          <tbody className="divide-y divide-text-100  text-center">
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
                    onClick={async () => {
                      try {
                        await updateProduct({
                          id: fila.id,
                          name: fila.name,
                          currentPrice: fila.currentPrice,
                          internalCode: fila.internalCode,
                          active: !fila.active,
                          needsUpdate: fila.needsUpdate,
                        });
                        toast.success(
                          `Estado actualizado: ${
                            !fila.active ? "Activado" : "Desactivado"
                          }`
                        );
                      } catch (error) {
                        toast.error("Error al actualizar el estado");
                      }
                    }}
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                      fila.active
                        ? "bg-extras-verde"
                        : "bg-background-50 border "
                    }`}
                  >
                    <div
                      className={`w-4 h-4  rounded-full shadow transform transition-transform duration-300 ${
                        fila.active
                          ? "translate-x-6 bg-background-0"
                          : "translate-x-1 bg-background-200"
                      }`}
                    ></div>
                  </button>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    {fila.needsUpdate ? (
                      <Check className="text-extras-verde" />
                    ) : (
                      <X className="text-extras-rojo" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      if (!fila.active) {
                        toast.warning(
                          "No se puede editar un producto inactivo"
                        );
                        return;
                      }
                      openModal(fila);
                      setSelectedProduct(fila);
                    }}
                    className="text-accent-700 hover:text-accent-900"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await updateProduct({
                          id: fila.id,
                          name: (fila.name = ""),
                          currentPrice: (fila.currentPrice = 0),
                          internalCode: (fila.internalCode = "00"),
                          active: (fila.active = false),
                          needsUpdate: (fila.needsUpdate = false),
                        });
                        toast.success(`Producto eliminado exitosamente`);
                      } catch (error) {
                        toast.error("Error al actualizar el estado");
                      }
                    }}
                    className="text-extras-rojo  ml-2"
                    title="Marcar para actualización"
                  >
                    <Trash size={18} />
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
              fullWidth: true,
            },
            {
              name: "name",
              label: "Nombre Producto",
              type: "text",
              value: selectedProduct.name,
              fullWidth: true,
            },
            {
              name: "currentPrice",
              label: "Precio",
              type: "number",
              value: selectedProduct.currentPrice,
            },
            {
              name: "internalCode",
              label: "Codigo",
              type: "number",
              value: selectedProduct.internalCode,
            },
          ]}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
