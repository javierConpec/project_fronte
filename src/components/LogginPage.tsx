import React, { useState } from "react";

export default function LogginPage() {
    const [fecha, setFecha] = useState("");
    const [tipo, setTipo] = useState("servidores");

    const handleDescargar = () => {
        const contenido = `Log generado\nFecha: ${fecha}\nTipo: ${tipo.toUpperCase()}\n---\nEste es un archivo de log de prueba generado desde el frontend.`;
        const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = `log-${tipo}-${fecha}.log`;
        enlace.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 max-w-xl bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Descargar Logs</h2>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de log</label>
                    <select
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="servidores">Log de Servidores</option>
                        <option value="general">Log General</option>
                    </select>
                </div>

                <button
                    onClick={handleDescargar}
                    className="px-6 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-900 transition"
                >
                    Descargar
                </button>
            </div>
        </div>
    );
}
