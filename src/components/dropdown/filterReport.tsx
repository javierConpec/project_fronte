import { useFiltrosReporte } from "../../hooks/reporteHook";
import type { PropsFilter } from "../../types/reporte.type";
import { CustomDropdown } from "./CustomDropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { useState } from "react";
import { formatDate, parseLocalDate } from "../../utils/functionsGen";
import { useReporteFiltrosStore, useTurnoStore } from "../../store/reporteFiltros.store";

export const FiltrosReporte = ({ onAplicarFiltros }: PropsFilter) => {
  // Estado de surtidor, manguera y filtros
  const [selectedFuelPointId, setSelectedFuelPointId] = useState<number | null>(null);
  const { nozzles, points, loading, error } = useFiltrosReporte(selectedFuelPointId ?? 0);
  const [puntoId, setPuntoId] = useState<number | null>(null);
  const [mangueraId, setMangueraId] = useState<number | null>(null);

  // Fechas y horas
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState<Date | null>(null);
  const [horaFin, setHoraFin] = useState<Date | null>(null);

  if (loading) return <p>Cargando filtros...</p>;
  if (error) return <p>{error}</p>;

  const handleAplicar = () => {
  const { resetTurnos } = useTurnoStore.getState();
  const { setModo } = useReporteFiltrosStore.getState();

  // Limpiamos turnos porque acá solo aplican filtros generales
  resetTurnos();
  setModo("general");

  const filtros = {
    puntoId,
    mangueraId,
    fechaInicio,
    fechaFin,
    horaInicio: horaInicio
      ? `${horaInicio.getHours().toString().padStart(2, "0")}:${horaInicio
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : undefined,
    horaFin: horaFin
      ? `${horaFin.getHours().toString().padStart(2, "0")}:${horaFin
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : undefined,
  };

  onAplicarFiltros(filtros);
};

  return (
    <div className="flex flex-col mt-5 gap-4 ml-5 text-text-50">
      <div className="flex flex-col gap-4">
        {/* Fecha inicial */}
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-semibold">Fecha Inicial</label>
          <DatePicker
            showIcon
            isClearable
            selected={fechaInicio ? parseLocalDate(fechaInicio) : null}
            onChange={(date: Date | null) => setFechaInicio(date ? formatDate(date) : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha"
            className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* Fecha final */}
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-semibold">Fecha Final</label>
          <DatePicker
            showIcon
            isClearable
            selected={fechaFin ? parseLocalDate(fechaFin) : null}
            onChange={(date: Date | null) => setFechaFin(date ? formatDate(date) : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha"
            className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* Hora inicio y fin */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-semibold">Hora inicio</label>
            <DatePicker
              selected={horaInicio}
              onChange={(date) => setHoraInicio(date)}
              showTimeSelect
              isClearable
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Hora"
              dateFormat="HH:mm"
              placeholderText="Selecciona hora de inicio"
              className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
              calendarClassName="text-text-800"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-semibold">Hora fin</label>
            <DatePicker
              selected={horaFin}
              onChange={(date) => setHoraFin(date)}
              showTimeSelect
              isClearable
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Hora"
              dateFormat="HH:mm"
              placeholderText="Selecciona hora de fin"
              className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
              calendarClassName="text-text-800"
            />
          </div>
        </div>

        {/* Punto de venta */}
        <CustomDropdown
          label="Punto de Venta"
          options={points.map((p) => ({ id: p.Id, label: `Surtidor ${p.LogicalNumber}` }))}
          onSelectId={(id) => {
            setPuntoId(id);
            setSelectedFuelPointId(id);
            setMangueraId(null);
          }}
          variant="default"
        />

        {/* Mangueras */}
        {selectedFuelPointId !== null && (
          <CustomDropdown
            label="Manguera"
            options={nozzles.map((n) => ({ id: n.id, label: `Manguera ${n.NozzleNumber}` }))}
            selectedId={mangueraId}
            onSelectId={(id) => setMangueraId(id)}
            variant="default"
          />
        )}

        <button
          onClick={handleAplicar}
          className="bg-accent-600 hover:bg-accent-700 px-4 py-2 rounded-lg mt-2 self-start w-full"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};
