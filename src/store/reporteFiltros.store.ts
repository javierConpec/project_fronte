import { create } from "zustand";
import type {FiltroStore} from  "../types/reporte.type"


export const useReporteFiltrosStore = create<FiltroStore>((set) => ({
  filtros: {
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    mangueraId:null,
    puntoId: null,
  },
  setFiltros: (nuevos) => set({ filtros: nuevos }),
}));