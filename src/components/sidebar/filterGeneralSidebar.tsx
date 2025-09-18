// components/SidebarFiltros.jsx
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";
import { FiltrosReporte } from "../dropdown/filterReport";
import { useSidebarStore } from "../../store/sidebar.store";

export default function SidebarFiltros({ id = "sidebarFiltros" }) {
  const { sidebars, toggle } = useSidebarStore();
  const { setFiltros } = useReporteFiltrosStore();

  const isOpen = sidebars[id]; // estado global desde zustand

  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-[rgba(0,0,0,0.6)] z-30"
          onClick={() => toggle(id)} // cierra al hacer click en el fondo
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 min-h-screen w-[300px] bg-secondary-900 p-4 pt-6 text-text-50 shadow-xl
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-xl font-bold ml-5 my-5">Filtros de Reporte</h2>
        <FiltrosReporte onAplicarFiltros={setFiltros} />
      </aside>
    </>
  );
}
