import { useFiltrosReporte } from "../../hooks/reporteHook";
import type { PropsFilter } from "../../types/reporte.type";
import { CustomDropdown } from "./CustomDropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { useState } from "react";

export const FiltrosReporte = ({ onAplicarFiltros }: PropsFilter) => {
  const [selectedFuelPointId, setSelectedFuelPointId] = useState<number>(0);
  const { nozzles, points, products, loading, error } =
    useFiltrosReporte(selectedFuelPointId);
  const [productoId, setProductoId] = useState<number | null>(null);
  const [puntoId, setPuntoId] = useState<number | null>(null);
  const [mangueraId, setMangueraId] = useState<number | null>(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;

  const handleAplicar = () => {
    const filtros = {
      productoId,
      puntoId,
      mangueraId,
      fechaInicio,
      fechaFin,
    };
    onAplicarFiltros(filtros);
  };
  return (
    <div className="flex flex-col mt-5 gap-4 ml-5 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-semibold">
            Fecha Inicio
          </label>
          <DatePicker
            showIcon
            isClearable
            startDate={fechaInicio ? new Date(fechaInicio) : null}
            endDate={fechaFin ? new Date(fechaFin) : null}
            closeOnScroll={true}
            selected={fechaInicio ? new Date(fechaInicio) : null}
            onChange={(date: Date | null) =>
              setFechaInicio(date ? date.toISOString().split("T")[0] : "")
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha"
            calendarClassName="bg-gray-500"
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 w-full"
          />
        </div>

        {fechaInicio && (
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-semibold">
              Fecha Fin
            </label>
            <DatePicker
              showIcon
              isClearable
              startDate={fechaInicio ? new Date(fechaInicio) : null}
              endDate={fechaFin ? new Date(fechaFin) : null}
              minDate={fechaInicio ? new Date(fechaInicio) : undefined}
              closeOnScroll={true}
              selected={fechaFin ? new Date(fechaFin) : null}
              onChange={(date: Date | null) =>
                setFechaFin(date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccionar fecha"
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 w-full"
            />
          </div>
        )}
      </div>
      <CustomDropdown
        label="Producto"
        options={products.map((p) => ({ id: p.id, label: p.name }))}
        onSelect={(id) => setProductoId(id)}
        variant="default"
      />

      <CustomDropdown
        label="Punto de Venta"
        options={points.map((p) => ({
          id: p.Id,
          label: `Surtidor ${p.LogicalNumber}`,
        }))}
        onSelect={(id) => {
          setPuntoId(id);
          setSelectedFuelPointId(id);
        }}
        variant="default"
      />
      {selectedFuelPointId !== 0 && (
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
  );
};
