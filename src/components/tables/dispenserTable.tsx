import { Pencil } from "lucide-react";
import { RiGasStationFill } from "react-icons/ri";
import { useDispenser } from "../../hooks/dispenserHook";
import { SectionTitle } from "../sectionTitle";
import type { Idispenser } from "../../types/dispenser.type";
import { CustomModal } from "../modal/customModal";
import { CustomDropdown } from "../dropdown/CustomDropDown";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataCon from "../../data/dispenser-valores.json";


export function DispenserPage() {
  const { dispenser, loading, error, UpdateDispenser } = useDispenser();
  const [showModal, setShowModal] = useState(false);
  const [selectDispenser, setSelectDispenser] = useState<Idispenser | null>(null);

  const openModal = (dispenser: Idispenser) => {
    setSelectDispenser(dispenser);
    setShowModal(true);
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (!selectDispenser) return;

      // llamar a la función para actualizar
      await UpdateDispenser({
        ...selectDispenser,
        logicalNumber: data.logicalNumber,
        physicalAddress: data.physicalAddress,
        nozzleQuantity: data.nozzleQuantity,
        factorVolume: selectDispenser?.factorVolume,
        factorAmount: selectDispenser?.factorAmount,
        factorContometer:selectDispenser?.factorContometer,
        bitCConfigurationId: data.bitCConfigurationId,
        ptsControllerId: data.ptsControllerId,
      });
      toast.success(`Surtidor ${selectDispenser.id} actualizado exitosamente`);
      setShowModal(false);
    } catch (error) {
      toast.error(`Error al actualizar el surtidor ${selectDispenser?.id}`);
      console.error("Error al actualizar:", error);
    }
  };

   
       
// if (showLoader) return <SpinnerBeat />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Surtidores" />
        <table className="w-full">
          <thead className="bg-primary-900 text-sm uppercase font-semibold text-text-50 text-center">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">N° Logico</th>
              <th className="px-6 py-3">Cant. Mangueras</th>
              <th className="px-6 py-3">Volumen</th>
              <th className="px-6 py-3">Volumen</th>
              <th className="px-6 py-3">Importe</th>
              <th className="px-6 py-3">Contometro</th>
              <th className="px-6 py-3">Configuration</th>
              <th className="px-6 py-3">Controlador ID</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-100 text-center">
            {dispenser.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-6 py-2">{fila.id}</td>
                <td className="px-6 py-2">{fila.logicalNumber}</td>
                <td className="px-6 py-2">{fila.nozzleQuantity}</td>
                <td className="px-6 py-2">{fila.physicalAddress}</td>
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
      {showModal && selectDispenser && (
        <CustomModal
          title={`Editar Surtidor ${selectDispenser.id}`}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          variant="wide"
          onSubmit={handleModalSubmit}
          inputs={[
            {
              name: "logicalNumber",
              label: "N° Logico",
              type: "number",
              value: selectDispenser.logicalNumber,
            },
            {
              name: "physicalAddress",
              label: "Direccion",
              type: "number",
              value: selectDispenser.physicalAddress,
            },
            {
              name: "nozzleQuantity",
              label: "Cantidad de Mangueras",
              type: "number",
              value: selectDispenser.nozzleQuantity,
            },
            {
              name: "bitCConfigurationId",
              label: "Configuraion ID",
              type: "number",
              value: selectDispenser.bitCConfigurationId,
            },
            {
              name: "ptsControllerId",
              label: "Controlador ID",
              type: "number",
              value: selectDispenser.ptsControllerId,
            },
            {
              name: "factorVolume",
              customComponent:(
                <CustomDropdown
                label="Factor Volume"
                options={dataCon}
                selectedValue={selectDispenser?.factorVolume ?? ""}
                onSelectValue={(option) => {
                  if (option !== null) {
                    setSelectDispenser((prev) =>
                      prev
                        ? {
                            ...prev,
                            factorVolume: Number(option),
                          }
                        : prev
                    );
                  }
                }}
                variant="minimal"
              />
              )
            },
            {
              name: "factorAmount",
              customComponent: (
                <CustomDropdown
                label="Factor Amount"
                options={dataCon}
                selectedValue={selectDispenser?.factorAmount ?? ""}
                onSelectValue={(option) => {
                  if (option !== null) {
                    setSelectDispenser((prev) =>
                      prev
                        ? {
                            ...prev,
                            factorAmount: Number(option),
                          }
                        : prev
                    );
                  }
                }}
                variant="minimal"
              />
              ),
            },
            {
              name: "factorContometer",
              customComponent: (
                <CustomDropdown
                label="Factor Contometer"
                options={dataCon}
                selectedValue={selectDispenser?.factorContometer ?? ""}
                onSelectValue={(option) => {
                  if (option !== null) {
                    setSelectDispenser((prev) =>
                      prev
                        ? {
                            ...prev,
                            factorContometer: Number(option),
                          }
                        : prev
                    );
                  }
                }}
                variant="minimal"
              />
              ),
            }
          ]}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
