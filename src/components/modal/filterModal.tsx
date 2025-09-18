import type { FC } from "react";
import { useReporteFiltrosStore, useTurnoStore } from "../../store/reporteFiltros.store";
import type { FiltroModalProps } from "../../types/modal.type";



export const FiltroModal: FC<FiltroModalProps> = ({
  isOpen,
  onClose,
  toggleSidebarFiltros,
  toggleSidebarTurnos,
}) => {
  if (!isOpen) return null;

  const { resetFiltros, setModo } = useReporteFiltrosStore.getState();
  const { resetTurnos } = useTurnoStore.getState();

  const handleFiltroGeneral = () => {
    resetTurnos(); // limpia turnos
    setModo("general");
    toggleSidebarFiltros();
    onClose();
  };

  const handleFiltroTurnos = () => {
    resetFiltros(); // limpia filtros generales
    setModo("turnos");
    toggleSidebarTurnos();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-lg p-6 w-auto flex flex-col gap-4">
        <h3 className="text-3xl uppercase font-extrabold text-center text-text-50 mb-5">
          Seleccione un filtro
        </h3>

        <button
          onClick={handleFiltroGeneral}
          className="bg-accent-100 hover:bg-accent-300 font-bold px-4 py-2 rounded-lg text-text-700"
        >
          Filtro General
        </button>

        <button
          onClick={handleFiltroTurnos}
          className="bg-secondary-100 hover:bg-secondary-300 font-bold px-4 py-2 rounded-lg text-text-700"
        >
          Filtro por Turnos
        </button>

        <button
          onClick={onClose}
          className="mt-2 bg-primary-800 hover:bg-primary-600 p-2 font-bold rounded-lg w-60 m-auto text-md text-text-50 hover:text-text-100"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
