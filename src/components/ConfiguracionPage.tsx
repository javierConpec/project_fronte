import { useState, useEffect } from "react";
import { DispenserPage } from "./tables/dispenserTable";
import { ProductsPage } from "./tables/productTable";
import { NozzlePage } from "./tables/nozzleTable";
import { useAuthStore } from "../store/auth";

const tabs = [
  { name: "Surtidores", id: "surtidores", roles: ["superadmin"] },
  { name: "Combustibles", id: "combustibles", roles: ["superadmin", "admin"] },
  { name: "Mangueras", id: "mangueras", roles: ["superadmin"] },
];

export default function ConfiguracionPage() {
  const { isLoggedIn, role } = useAuthStore();

  // Filtrar solo las pestañas que el rol puede ver
  const allowedTabs = tabs.filter((tab) => tab.roles.includes(role!));

  const [activeTab, setActiveTab] = useState("");

  //  Forzar tab inicial según el rol
  useEffect(() => {
    if (role === "admin") {
      setActiveTab("combustibles");
    } else if (allowedTabs.length > 0) {
      setActiveTab(allowedTabs[0].id);
    }
  }, [role]);

  return (
    <div className="p-6 bg-background-0 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-extrabold text-text-800 uppercase mb-6">
        Configuración
      </h1>

      <div className="flex gap-2 mb-8 pb-2">
        {allowedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
              activeTab === tab.id
                ? "bg-primary-900 text-text-50 shadow"
                : "bg-background-200 text-text-800 hover:bg-background-300"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        {activeTab === "surtidores" && <DispenserPage />}
        {activeTab === "combustibles" && <ProductsPage />}
        {activeTab === "mangueras" && <NozzlePage />}
      </div>
    </div>
  );
}
