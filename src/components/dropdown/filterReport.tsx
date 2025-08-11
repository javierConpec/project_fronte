import { useFiltrosReporte } from "../../hooks/reporteHook";
import type { PropsFilter } from "../../types/reporte.type";
import { CustomDropdown } from "./CustomDropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { useState } from "react";
import { formatDate, parseLocalDate } from "../../lib/utils";


export const FiltrosReporte = ({ onAplicarFiltros }: PropsFilter) => {
  const [selectedFuelPointId, setSelectedFuelPointId] = useState<number>(0);
  const { nozzles, points, loading, error } =
    useFiltrosReporte(selectedFuelPointId);
  const [puntoId, setPuntoId] = useState<number | null>(null);
  const [mangueraId, setMangueraId] = useState<number | null>(null);
  const [fecha, setFecha] = useState("");

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;

  const handleAplicar = () => {
    const filtros = {
      puntoId,
      mangueraId,
      fecha,
    };
    onAplicarFiltros(filtros);
  };

  return (
    <div className="flex flex-col mt-5 gap-4 ml-5 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-semibold">
            Fecha
          </label>
          <DatePicker
            showIcon
            isClearable
            startDate={fecha ? parseLocalDate(fecha) : null}
            closeOnScroll={true}
            selected={fecha ? parseLocalDate(fecha) : null}
            onChange={(date: Date | null) =>
              setFecha(date ? formatDate(date) : "")
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha"
            calendarClassName="bg-gray-500"
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 w-full"
          />
        </div>

        <CustomDropdown
          label="Punto de Venta"
          options={points.map((p) => ({
            id: p.Id,
            label: `Surtidor ${p.LogicalNumber}`,
          }))}
          onSelect={(id) => {
            setPuntoId(id);
            if (id !== null) {
              setSelectedFuelPointId(id);
            }
          }}
          variant="default"
        />

        {selectedFuelPointId !== 0  && (
          <CustomDropdown
            label="Manguera"
            options={nozzles.map((n) => ({
              id: n.id,
              label: `Manguera ${n.NozzleNumber}`,
            }))}
            onSelect={(id) => setMangueraId(id)}
            variant="default"
          />
        )}

        <button
          onClick={handleAplicar}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg mt-2 self-start w-full"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};
