import { Pencil } from "lucide-react";
import { RiGasStationFill } from "react-icons/ri";
import { useDispenser } from "../../hooks/dispenserHook";
import { SectionTitle } from "../sectionTitle";
import type { Idispenser } from "../../types/dispenser.type";
import { CustomModal } from "../modal/customModal";
import { useState } from "react";

export function DispenserPage() {
  const { dispenser, loading, error } = useDispenser();
  const [showModal, setShowModal] = useState(false);
  const [selectispenser, setSelectDispenser] = useState<Idispenser | null>(
    null
  );

  const openModal = (dispenser: Idispenser) => {
    setSelectDispenser(dispenser);
    setShowModal(true);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Surtidores" />
        <table className="w-full">
          <thead className="bg-gray-700 text-sm uppercase font-semibold text-white text-center">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">N° Logico</th>
              <th className="px-6 py-3">Direccion</th>
              <th className="px-6 py-3">Cant. Mangueras</th>
              <th className="px-6 py-3">Volumen</th>
              <th className="px-6 py-3">Importe</th>
              <th className="px-6 py-3">Contometro</th>
              <th className="px-6 py-3">Configuration</th>
              <th className="px-6 py-3">Controlador ID</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {dispenser.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-6 py-2">{fila.id}</td>
                <td className="px-6 py-2">{fila.logicalNumber}</td>
                <td className="px-6 py-2">{fila.physicalAddress}</td>
                <td className="px-6 py-2">{fila.nozzleQuantity}</td>
                <td className="px-6 py-2">{fila.factorVolume}</td>
                <td className="px-6 py-2">{fila.factorAmount}</td>
                <td className="px-6 py-2">{fila.factorContometer}</td>
                <td className="px-6 py-2">{fila.bitCConfigurationId}</td>
                <td className="px-6 py-2">{fila.ptsControllerId}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      openModal(fila);
                      setSelectDispenser(fila);
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
    </>
  );
}
