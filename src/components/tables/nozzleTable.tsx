import { useNozzle } from "../../hooks/nozzleHook";
import { useProduct } from "../../hooks/productHook";
import { RiGasStationFill } from "react-icons/ri";
import { SectionTitle } from "../sectionTitle";
import type { Inozzle } from "../../types/nozzle.type";
import { useState } from "react";
import { CustomModal } from "../modal/customModal";
import { Pencil } from "lucide-react";
import { CustomDropdown } from "../dropdown/CustomDropDown";
import { getValidNozzles } from "../../lib/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NozzlePage() {
  const { nozzle, loading, error, udpateNozzle } = useNozzle();
  const { products } = useProduct();
  const [selectedFuelPointId, setSelectedFuelPointId] = useState<number>(0);
  const [productoId, setProductoId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mangueraId, setMangueraId] = useState<number | null>(null);
  const [selectNozzle, setSelectNozzle] = useState<Inozzle | null>(null);


  const openModal = (nozzle: Inozzle) => {
    setSelectNozzle(nozzle);
    setShowModal(true);
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (!selectNozzle) return;

      if (!mangueraId || productoId === null) {
        console.warn("Todos los campos deben estar seleccionados");
        return;
      }

      await udpateNozzle({
        id: mangueraId,
        fuelPointId: selectedFuelPointId,
        nozzleNumber: mangueraId,
        productId: productoId,
      });
      toast.success("Producto actualizado exitosamente");
      setShowModal(false);
    } catch (error) {
      toast.error("Error al actualizar el producto");
      console.error("Error al actualizar:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Mangueras" />
        <table className="w-full">
          <thead className="bg-gray-700 text-sm uppercase font-semibold text-white text-center">
            <tr>
              <th className="px-3 py-3">N° Surtidor</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px3 py-3">Producto</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">N° Tanque</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200  text-center">
            {nozzle.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-6 py-2">{fila.fuelPointId}</td>
                <td className="px-6 py-2">{fila.idNozzle1}</td>
                <td className="px-6 py-2">{fila.nozzle1}</td>
                <td className="px-6 py-2">{fila.idNozzle2}</td>
                <td className="px-6 py-2">{fila.nozzle2}</td>
                <td className="px-6 py-2">{fila.idNozzle3}</td>
                <td className="px-6 py-2">{fila.nozzle3}</td>
                <td className="px-6 py-2">{fila.idNozzle4}</td>
                <td className="px-6 py-2">{fila.nozzle4}</td>
                <td className="px-6 py-2">{fila.idNozzle5}</td>
                <td className="px-6 py-2">{fila.nozzle5}</td>
                <td className="px-6 py-2">{fila.idNozzle6}</td>
                <td className="px-6 py-2">{fila.nozzle6}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      openModal(fila);
                      setSelectNozzle(fila);
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
      {showModal && selectNozzle && (
        <CustomModal
          isOpen={showModal}
          title="Editar Surtidor"
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          inputs={[
            {
              name: "id",
              label: "ID",
              type: "number",
              value: selectNozzle.fuelPointId,
              disabled: true,
            },
            {
              name: "Surtidor",
              label: "Surtidor",
              type: "String",
              value: `Surtidor ${selectNozzle.fuelPointId}`,
              disabled: true,
            },
          ]}
          optionalComponent={
            <>
              <CustomDropdown
                label="Manguera"
                options={getValidNozzles(selectNozzle.fuelPointId, nozzle)}
                onSelect={(id) => setMangueraId(id)}
                variant="minimal"
              />

              {mangueraId !== null && (
                <CustomDropdown
                label="Producto"
                options={products.map((p) => ({ id: p.id, label: p.name }))}
                onSelect={(id) => setProductoId(id)}
                variant="minimal"
              />
              )}
            </>
          }
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
