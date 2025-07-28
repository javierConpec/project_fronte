import { useNozzle } from "../../hooks/nozzleHook";
import { RiGasStationFill } from "react-icons/ri";
import { SectionTitle } from "../sectionTitle";
import type { Inozzle } from "../../types/nozzle.type";
import { useState } from "react";
import { CustomModal } from "../modal/customModal";
import { Pencil } from "lucide-react";
import { CustomDropdown } from "../dropdown/CustomDropDown";
import { useFiltrosReporte } from "../../hooks/reporteHook";

export function NozzlePage() {
  const { nozzle, loading, error, udpateNozzle} = useNozzle();
  const { nozzles, points, products } = useFiltrosReporte();
 const [productoId, setProductoId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectNozzle, setSelectNozzle] = useState<Inozzle | null>(null);
  const openModal = (nozzle: Inozzle) => {
    setSelectNozzle(nozzle);
    setShowModal(true);
  };

   const handleModalSubmit = async (data: any) => {
    try {
      if (!selectNozzle) return;

      await udpateNozzle({
        ...selectNozzle,
        id: data.id,
        fuelPointId: data.currentPrice,
        nozzleNumber: data.nozzleNumber,
        product: data.product,
      });

      setShowModal(false);
    } catch (error) {
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
              <th className="px-6 py-3">N° Surtidor</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">N° Tanque</th>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Acciones</th>
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
          ]}
          optionalComponent={
            <CustomDropdown
              label="Producto"
              options={products.map((p) => ({ id: p.id, label: p.name }))}
              onSelect={(id) => setProductoId(id)}
            />
          }
        />
      )}
    </>
  );
}
