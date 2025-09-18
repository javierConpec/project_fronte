import { create } from "zustand";
import type { FiltroStore, TurnoStore } from "../types/reporte.type";

type Modo = "general" | "turnos" | null

// Store para filtros generales
export const useReporteFiltrosStore = create<
  FiltroStore & {
    modo: Modo;
    setModo: (m: Modo) => void;
    resetFiltros: () => void;  
  }
>((set) => ({
  filtros: {
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    mangueraId: null,
    puntoId: null,
  },
  setFiltros: (nuevos) => set({ filtros: nuevos }),
  resetFiltros: () =>
    set({
      filtros: {
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        mangueraId: null,
        puntoId: null,
      },
    }),
  modo: null,
  setModo: (m) => set({ modo: m }),
}));

// Store para turnos
export const useTurnoStore = create<TurnoStore>((set) => ({
  turnosSeleccionados: [],
  setTurnos: (seleccionados) => set({ turnosSeleccionados: seleccionados }),
  resetTurnos: () => set({ turnosSeleccionados: [] }),
}));
