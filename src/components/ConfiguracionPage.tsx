import { useState } from "react";
import {DispenserPage} from "./tables/dispenserTable";
import {ProductsPage} from "./tables/productTable";
import { NozzlePage } from "./tables/nozzleTable";

const tabs = [
    { name: "Surtidores", id: "surtidores" },
    { name: "Combustibles", id: "combustibles" },
    { name: "Mangueras", id: "mangueras" },
];

export default function ConfiguracionPage() {
    const [activeTab, setActiveTab] = useState("surtidores");

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>

            <div className="flex gap-2 mb-8 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeTab === tab.id
                            ? "bg-gray-700 text-white shadow"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
