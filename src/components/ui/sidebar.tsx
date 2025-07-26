import { optionsSidebar } from "../../lib/options-sidebar";
import { cn } from "../../lib/utils";
import { useSidebarStore } from "../../store/sidebar.store";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import { FiltrosReporte } from "../dropdown/filterReport";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";

export default function Sidebar() {
  const { visible, setVisible } = useSidebarStore();
  const [reportesOpen, setReportesOpen] = useState(false); //esatdo para el despligue de filtros
  const { setFiltros } = useReporteFiltrosStore();
  return (
    <>
      {visible && (
        <div
          onClick={() => setVisible(!visible)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 min-h-screen bg-gray-800 p-4 pt-4 text-white transition-all duration-300 md:static md:block",
          !visible && "md:w-16",
          visible ? "w-64" : "w-16"
        )}
      >
        <button
          onClick={() => setVisible(!visible)}
          className={cn(
            "absolute top-[75px] z-50 rounded-full bg-gray-800 p-2 text-white shadow-md transition-all duration-300",
            visible ? "left-[240px]" : "left-[40px]"
          )}
        >
          <FiChevronLeft
            size={20}
            className={cn(
              "transition-transform duration-500",
              !visible && "rotate-180"
            )}
          />
        </button>

        <div className="relative h-10 flex items-center justify-center my-5">
          {visible ? (
            <img
              src="/logo.png"
              alt="Logo completo"
              className="w-36 transition-all duration-300"
            />
          ) : (
            <img
              src="/logocompr.png"
              alt="Logo mini"
              className="w-10 transition-all duration-300"
            />
          )}
        </div>

        <nav>
          <ul className="space-y-4">
            {optionsSidebar.map((option) => {
              if (option.label === "Reportes") {
                return (
                  <li key={option.label}>
                    <div className="flex items-center hover:bg-gray-700 justify-between">
                      <a
                        href={option.href}
                        className={cn(
                          "flex items-center gap-2  rounded p-2 transition-colors   w-full ",
                          !visible && "justify-center",
                          "text-white"
                        )}
                      >
                        <span>{option.icon}</span>
                        {visible && <span>{option.label}</span>}
                      </a>
                      {visible && (
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // evitar redirección si se hace clic en el ícono
                            setReportesOpen((prev) => !prev);
                          }}
                          className="text-white pr-2 "
                        >
                          <FiChevronDown
                            className={cn(
                              "transition-transform ",
                              reportesOpen && "rotate-180"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {/* Dropdown visible si está abierto */}
                    {reportesOpen && visible && (
                      <FiltrosReporte onAplicarFiltros={setFiltros} />
                    )}
                  </li>
                );
              }

              return (
                <li key={option.label}>
                  <a
                    href={option.href}
                    className={cn(
                      "flex items-center gap-2 rounded p-2 transition-colors hover:bg-gray-700",
                      !visible && "justify-center",
                      "text-white"
                    )}
                  >
                    <span>{option.icon}</span>
                    {visible && <span>{option.label}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
