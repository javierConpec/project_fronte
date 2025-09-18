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
import { SpinnerBeat,SpinnerClip } from "../Loader/spinner";

export function ProductsPage() {
  const { products, loading, error, updateProduct } = useProduct();
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPrices, setNewPrices] = useState<{ [key: number]: string }>({});
  const [showModalPrices, setShowModalPrices] = useState(false);
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
        active: selectedProduct.active,
        needsUpdate: selectedProduct.needsUpdate,
      });
      toast.success(`${selectedProduct.name} actualizado exitosamente`);
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
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={RiGasStationFill} title="Combustibles" />
          <button
            onClick={() => setShowModalPrices(true)}
            className="bg-primary-300 rounded-lg px-4 py-2 text-background-0 hover:bg-primary-400  font-bold shadow-lg shadow-primary-400"
          >
            Cambio de precio
          </button>
        </div>

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
                          needsUpdate: true,
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
                          needsUpdate: (fila.needsUpdate = true),
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
      {showModalPrices && (
        <CustomModal
          isOpen={showModalPrices}
          title="Cambio de Precios"
          onClose={() => setShowModalPrices(false)}
          onSubmit={async () => {
            try {
              setLoadingPrices(true); // activar loader
              await Promise.all(
                Object.entries(newPrices).map(async ([id, value]) => {
                  const nuevoPrecio = parseFloat(value);
                  if (!isNaN(nuevoPrecio) && nuevoPrecio > 0) {
                    const producto = products.find((p) => p.id === Number(id));
                    if (producto) {
                      await updateProduct({
                        ...producto,
                        currentPrice: nuevoPrecio,
                      });
                    }
                  }
                })
              );
              toast.success("Precios actualizados correctamente");
              setNewPrices({});
              setShowModalPrices(false);
            } catch (error) {
              toast.error("Error al actualizar precios");
            } finally {
              setLoadingPrices(false); // desactivar loader
            }
          }}
        >
          <div className="space-y-4 relative">
            {products
              .filter((p) => p.active === true)
              .map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between gap-4 border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{prod.name}</p>
                    <p className="text-sm text-text-500">
                      Actual: S/ {Number(prod.currentPrice).toFixed(2)}
                    </p>
                  </div>

                  <input
                    type="number"
                    step="0.10"
                    placeholder="Nuevo precio"
                    className="border border-accent-500 rounded px-2 py-1 w-[150px] text-right"
                    value={newPrices[prod.id] || ""}
                    onChange={(e) =>
                      setNewPrices((prev) => ({
                        ...prev,
                        [prod.id]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
          </div>
        </CustomModal>
      )}
      {loadingPrices && (
        <div className="fixed inset-0  bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
          <SpinnerClip />
          <p className="text-text-50 ml-3 font-semibold">
            Actualizando precios...
          </p>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
