import { useTurnos } from "../hooks/reporteHook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, parseLocalDate } from "../utils/functionsGen";
import { useReporteFiltrosStore, useTurnoStore } from "../store/reporteFiltros.store";

type PropsTurnosCheckbox = {
  fechaInicio: string;
  setFechaInicio: (fecha: string) => void;
  fechaFin: string;
  setFechaFin: (fecha: string) => void;
  onChange: (turnosSeleccionados: string[]) => void;
};

export const SidebarTurnosCheckbox = ({
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  onChange,
}: PropsTurnosCheckbox) => {
  const { turnos, loading, error } = useTurnos(fechaInicio, fechaFin);

  // Traemos el estado global de turnos
  const { turnosSeleccionados, setTurnos } = useTurnoStore();

  const handleCheck = (turno: string) => {
    const nuevos = turnosSeleccionados.includes(turno)
      ? turnosSeleccionados.filter((t) => t !== turno)
      : [...turnosSeleccionados, turno];
    setTurnos(nuevos);
  };

  const handleAplicar = () => {
    const { setModo, resetFiltros } = useReporteFiltrosStore.getState();

    // Limpiamos filtros generales porque acá solo aplican turnos
    resetFiltros();
    setModo("turnos");

    // Notificamos al padre si lo necesita
    onChange(turnosSeleccionados);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 text-white w-64">
      <h3 className="text-lg font-bold mb-2">Turnos</h3>

      {/* Datepicker inicio */}
      <DatePicker
        showIcon
        isClearable
        selected={fechaInicio ? parseLocalDate(fechaInicio) : null}
        onChange={(date: Date | null) =>
          setFechaInicio(date ? formatDate(date) : "")
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Seleccionar fecha"
        className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
      />

      {/* Datepicker fin */}
      <DatePicker
        showIcon
        isClearable
        selected={fechaFin ? parseLocalDate(fechaFin) : null}
        onChange={(date: Date | null) =>
          setFechaFin(date ? formatDate(date) : "")
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Seleccionar fecha"
        className="bg-text-800 text-text-50 border border-text-600 rounded-lg px-3 py-2 w-full"
      />

      {/* Checkboxes de turnos */}
      {turnos.map((t) => (
        <label key={t} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={turnosSeleccionados.includes(t)}
            onChange={() => handleCheck(t)}
            className="form-checkbox h-4 w-4 text-accent-600"
          />
          {t}
        </label>
      ))}

      {/* Botón aplicar */}
      <button
        onClick={handleAplicar}
        className="bg-accent-600 hover:bg-accent-700 px-4 py-2 rounded-lg mt-2 self-start w-full"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};
