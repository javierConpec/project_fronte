// components/SidebarTurnos.jsx
import { useTurnoStore } from "../../store/reporteFiltros.store";
import { SidebarTurnosCheckbox } from "../filterTurno";
import { useSidebarStore } from "../../store/sidebar.store";
import { useState } from "react";

export default function SidebarTurnos({ id = "sidebarTurnos" }) {
  const { sidebars, toggle } = useSidebarStore();
  const { setTurnos } = useTurnoStore();
  const isOpen = sidebars[id]; // estado global desde zustand

  const [fechaInicio, setFechaInicio] = useState(""); // puedes inicializarlo vacío o con fecha actual
  const [fechaFin, setFechaFin] = useState("");

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-30"
          onClick={() => toggle(id)} // cierra al hacer click en el fondo
        />
      )}

     
      <aside
        className={`fixed top-0 right-0 z-40 min-h-screen w-[300px] bg-secondary-900 p-4 pt-6 text-text-50 shadow-xl
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-xl font-bold ml-5 my-5">Filtros de Turnos</h2>
        <SidebarTurnosCheckbox
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          setFechaInicio={setFechaInicio}
          setFechaFin={setFechaFin}
          onChange={(seleccionados) => setTurnos(seleccionados)}
        />
      </aside>
    </>
  );
}
