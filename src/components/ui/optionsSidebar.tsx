import { optionsSidebar } from "../../lib/options-sidebar";
import { PiGasPumpThin, PiGasCanThin } from "react-icons/pi";
import { SiAmazondynamodb } from "react-icons/si";
import { GrTransaction } from "react-icons/gr";
import { cn } from "../../utils/functionsGen";
import { useSidebarStore } from "../../store/sidebar.store";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { CiUnlock, CiLock } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";

export default function SidebarOptions({ id = "sidebarOptions" }) {
  const { sidebars, toggle } = useSidebarStore();
  const [reportesOpen, setReportesOpen] = useState(false);

  const { role, logout } = useAuthStore(); // 👈 usamos logout

  const filteredOptions = optionsSidebar.filter(
    (option) => !option.roles || option.roles.includes(role)
  );

  const [pinned, setPinned] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarPinned") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarPinned", String(pinned));
  }, [pinned]);

  let visible = sidebars[id] ?? false;
  if (pinned) visible = true;

  const handleToggle = () => {
    if (!pinned) toggle(id);
  };

  return (
    <>
      {/* Fondo oscuro solo en mobile */}
      {!pinned && visible && (
        <div
          onClick={handleToggle}
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
        {/* BOTÓN DE FIJAR/DESFIJAR */}
        {visible && (
          <button
            onClick={() => setPinned((prev) => !prev)}
            className="absolute top-2 right-2 z-50 rounded-full bg-secondary-800 p-2 text-text-50 hover:bg-secondary-700 transition-colors"
            title={pinned ? "Desbloquear sidebar" : "Bloquear sidebar"}
          >
            {pinned ? <CiLock size={22} /> : <CiUnlock size={22} />}
          </button>
        )}

        {/* BOTÓN DE CERRAR */}
        {!pinned && (
          <button
            onClick={handleToggle}
            className={cn(
              "absolute top-[75px] z-50 rounded-full bg-secondary-900 p-2 text-text-50 transition-all duration-300",
              visible ? "left-[250px]" : "left-[40px]"
            )}
          >
            <FiChevronLeft
              size={20}
              className={cn("transition-transform duration-500", !visible && "rotate-180")}
            />
          </button>
        )}

        {/* LOGO */}
        <div className="relative h-10 flex items-center justify-center mt-8 mb-6">
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

        {/* BOTÓN CERRAR SESIÓN */}
        {visible && (
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="w-[90%] rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-text-50 hover:bg-accent-700 transition"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        {/* NAV */}
        <nav>
          <ul className="space-y-4 text-[18px]">
            {filteredOptions.map((option) => {
              if (option.label === "Reportes") {
  return (
    <li key={option.label}>
      <div
        className="flex items-center rounded hover:bg-text-800 justify-between cursor-pointer"
        onClick={() => {
          setReportesOpen((prev) => !prev);
          // Abrir sidebar si está colapsado
          if (!visible) toggle(id);
        }}
      >
        <div className={cn("flex items-center gap-2 p-2 w-full", !visible && "justify-center")}>
          <span>{option.icon}</span>
          {visible && <span>{option.label}</span>}
        </div>
        {visible && (
          <FiChevronDown
            className={cn("transition-transform mr-2", reportesOpen && "rotate-180")}
          />
        )}
      </div>

      {reportesOpen && visible && (
        <div className="pl-6 space-y-2 mt-2 text-[16px] text-text-50 ml-8">
          <a href="/reporteContometers" className="flex rounded hover:bg-text-700 px-3 py-2 ">
            <SiAmazondynamodb className="mr-2" size={20} /> Contometros
          </a>
          <a href="/reporteTransactions" className="flex rounded hover:bg-text-700 px-3 py-2 ">
            <GrTransaction className="mr-2" size={20} /> Transacciones
          </a>
          <a href="/reporteNozzle" className="flex rounded hover:bg-text-700 px-3 py-2 ">
            <PiGasPumpThin className="mr-2" size={20} /> Mangueras
          </a>
          <a href="/reporteProducts" className="flex rounded hover:bg-text-700 px-3 py-2 ">
            <PiGasCanThin className="mr-2" size={20} /> Productos
          </a>
        </div>
      )}
    </li>
  );
}


              return (
                <li key={option.label}>
                  <a
                    href={option.href}
                    onClick={() => { if (!pinned) handleToggle(); }}
                    title={option.alt}
                    className={cn(
                      "flex items-center gap-2 rounded p-2 transition-colors hover:bg-text-800",
                      !visible && "justify-center",
                      "text-text-50 text-[18px]"
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
