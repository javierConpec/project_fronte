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
        <div className="p-4 max-w-lg bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Descargar Logs</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border rounded"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tipo de log</label>
                    <select
                        className="w-full px-4 py-2 border rounded"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="servidores">Log de Servidores</option>
                        <option value="general">Log General</option>
                    </select>
                </div>

                <button
                    onClick={handleDescargar}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Descargar
                </button>
            </div>
        </div>
    );
}
