import { useNozzle } from "../../hooks/nozzleHook";
import { RiGasStationFill } from "react-icons/ri";
import { SectionTitle } from "../sectionTitle";
import type { Inozzle } from "../../types/nozzle.type";
import { useState } from "react";
import { CustomModal } from "../modal/customModal";
import { Pencil } from "lucide-react";

export function NozzlePage() {
  const { nozzle, loading, error } = useNozzle();
  const [showModal, setShowModal] = useState(false);
  const [selectNozzle, setSelectNozzle] = useState<Inozzle | null>(null);
  const openModal = (nozzle: Inozzle) => {
    setSelectNozzle(nozzle);
    setShowModal(true);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return;
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
  </>;
}
