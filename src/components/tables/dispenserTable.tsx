import { Pencil } from "lucide-react";
import { CiUnlock, CiLock } from "react-icons/ci";
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
  const { dispenser, error, UpdateDispenser,lock,unlock,loading} = useDispenser();
  const [showModal, setShowModal] = useState(false);
  const [selectDispenser, setSelectDispenser] = useState<Idispenser | null>(null);
  

   const [lockedDispensers, setLockedDispensers] = useState<number[]>([]);

  const toggleLock = async (id: number) => {
    try {
      if (lockedDispensers.includes(id)) {
        // desbloquear
        await unlock(id); 
        setLockedDispensers((prev) => prev.filter((x) => x !== id));
        toast.success(`Surtidor ${id} desbloqueado`);
      } else {
        // bloquear
        await lock(id); 
        setLockedDispensers((prev) => [...prev, id]);
        toast.warn(`Surtidor ${id} bloqueado`);
      }
    } catch (err) {
      toast.error(`Error al cambiar estado del surtidor ${id}`);
      console.error(err);
    }
  };


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
        factorPrice: selectDispenser?.factorPrice,
        factorVolume: selectDispenser?.factorVolume,
        factorAmount: selectDispenser?.factorAmount,
        factorContometer:selectDispenser?.factorContometer,
        bitCConfigurationId: data.bitCConfigurationId,
        factorAmountTotals: selectDispenser?.factorAmountTotals,
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
              <th className="px-6 py-3">Direccion</th>
              <th className="px-6 py-3">N° Mang.</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Volumen</th>
              <th className="px-6 py-3">Importe</th>
              <th className="px-6 py-3">Contometro</th>
              <th className="px-6 py-3">Importe Total</th>
              <th className="px-6 py-3">Config.</th>
              <th className="px-6 py-3">Controlador ID</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-100 text-center">
            {dispenser.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-6 py-2">{fila.id}</td>
                <td className="px-6 py-2">{fila.logicalNumber}</td>
                <td className="px-6 py-2">{fila.physicalAddress}</td>
                <td className="px-6 py-2">{fila.nozzleQuantity}</td>
                <td className="px-6 py-2">{fila.factorPrice}</td>
                <td className="px-6 py-2">{fila.factorVolume}</td>
                <td className="px-6 py-2">{fila.factorAmount}</td>
                <td className="px-6 py-2">{fila.factorContometer}</td>
                <td className="px-6 py-2">{fila.factorAmountTotals}</td>
                <td className="px-6 py-2">{fila.bitCConfigurationId}</td>
                <td className="px-6 py-2">{fila.ptsControllerId}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      openModal(fila);
                      setSelectDispenser(fila);
                    }}
                    className="text-accent-700 hover:text-gray-900"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  {/* Lock / Unlock */}
                  <button
                    onClick={() => toggleLock(fila.id)}
                    className="hover:opacity-60 ml-4"
                    disabled={loading} 
                    title={lockedDispensers.includes(fila.id) ? "Desbloquear" : "Bloquear"}
                  >
                    {lockedDispensers.includes(fila.id) ? (
                      <CiLock size={20} className="text-extras-rojo" />
                    ) : (
                      <CiUnlock size={20} className="text-accent-500" />
                    )}
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
              name: "factorPrice",
              customComponent: (
                <CustomDropdown
                label="Factor Price"
                options={dataCon}
                selectedValue={selectDispenser?.factorPrice ?? ""}
                onSelectValue={(option) => {
                  if (option !== null) {
                    setSelectDispenser((prev) =>
                      prev
                        ? {
                            ...prev,
                            factorPrice: Number(option),
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
            },
            {
              name: "factorAmountTotals",
              customComponent: (
                <CustomDropdown
                label="Factor Amount Totals"
                options={dataCon}
                selectedValue={selectDispenser?.factorAmountTotals ?? ""}
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
            },
          ]}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
