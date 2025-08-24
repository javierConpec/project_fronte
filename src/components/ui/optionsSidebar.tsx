import { optionsSidebar } from "../../lib/options-sidebar";
import { SiAmazondynamodb } from "react-icons/si";
import { GrTransaction } from "react-icons/gr";
import { cn } from "../../utils/functionsGen";
import { useSidebarStore } from "../../store/sidebar.store";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { useState } from "react";

export default function SidebarOptions({ id = "sidebarOptions" }) {
  const { sidebars, toggle } = useSidebarStore();
  const [reportesOpen, setReportesOpen] = useState(false);

  const visible = sidebars[id] ?? false;

  return (
    <>
      {visible && (
        <div
          onClick={() => toggle(id)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 min-h-screen bg-secondary-900 p-4 pt-4 text-text-50 transition-all duration-300 md:static md:block",
          !visible && "md:w-16",
          visible ? "w-[280px]" : "w-16"
        )}
      >
        <button
          onClick={() => toggle(id)}
          className={cn(
            "absolute top-[75px] z-50 rounded-full bg-secondary-900 p-2 text-text-50 transition-all duration-300",
            visible ? "left-[250px]" : "left-[40px]"
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

        {/* LOGO */}
        <div className="relative h-10 flex items-center justify-center mt-8 mb-20">
          {visible ? (
            <img
              src="/logo.png"
              alt="Logo completo"
              className="w-[180px] transition-all duration-300"
            />
          ) : (
            <img
              src="/logocompr.png"
              alt="Logo mini"
              className="w-10 transition-all duration-300"
            />
          )}
        </div>

        {/* NAV */}
        <nav>
          <ul className="space-y-4">
            {optionsSidebar.map((option) => {
              if (option.label === "Reportes") {
                return (
                  <li key={option.label}>
                    <div className="flex items-center rounded hover:bg-text-800 justify-between">
                      <a
                        href={option.href}
                        className={cn(
                          "flex items-center gap-2 rounded p-2 transition-colors w-full",
                          !visible && "justify-center",
                          "text-text-50 text-[18px] font-bold"
                        )}
                      >
                        <span>{option.icon}</span>
                        {visible && <span>{option.label}</span>}
                      </a>
                      {visible && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setReportesOpen((prev) => !prev);
                          }}
                          className="text-text-50 pr-2"
                        >
                          <FiChevronDown
                            className={cn(
                              "transition-transform",
                              reportesOpen && "rotate-180"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {/* Dropdown visible si está abierto */}
                    {reportesOpen && visible && (
                      <div className="pl-6 space-y-2 mt-2 text-[16px] text-text-50 ml-8">
                        <a
                          href="/reporteContometers"
                          className="flex rounded  hover:bg-text-700 px-3 py-2 "
                        >
                          <SiAmazondynamodb className=" mr-2" size={20}/>
                          Contometros
                        </a>
                        <a
                          href="/reporteTransactions"
                          className="flex rounded  hover:bg-text-700 px-3 py-2 "
                        >
                          <GrTransaction className=" mr-2" size={20}/>
                          Transacciones
                        </a>
                      </div>
                    )}
                  </li>
                );
              }

              // Opciones normales
              return (
                <li key={option.label}>
                  <a
                    href={option.href}
                    className={cn(
                      "flex items-center gap-2 rounded p-2 transition-colors hover:bg-text-800",
                      !visible && "justify-center",
                      "text-text-50 text-[18px] font-bold"
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
