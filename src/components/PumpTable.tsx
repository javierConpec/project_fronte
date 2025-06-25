import React, { useEffect, useState } from "react";

type PumpData = {
    surtidor: number;
    estado: string;
    manguera: string;
    precio: number;
    volumenLlenado: number;
    montoLlenado: number;
    volumenTotal: number;
    montoTotal: number;
};

const PumpTable = () => {
    const [data, setData] = useState<PumpData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const generateMockData = (): PumpData[] => {
            return Array.from({ length: 10 }, (_, i) => ({
                surtidor: i + 1,
                estado: Math.random() > 0.5 ? "LLENANDO" : "ESPERA",
                manguera: `M${i + 1}`,
                precio: 14.5 + Math.random() * 2,
                volumenLlenado: Math.random() * 10,
                montoLlenado: Math.random() * 150,
                volumenTotal: 200 + Math.random() * 1000,
                montoTotal: 5000 + Math.random() * 10000,
            }));
        };

        setData(generateMockData());

        const interval = setInterval(() => {
            setData(generateMockData());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Control de Surtidores</h2>

            <table className="min-w-full bg-white rounded-xl shadow text-sm text-gray-700">
                <thead className="bg-gray-700 text-xs uppercase font-semibold text-white text-center">
                    <tr>
                        <th className="px-4 py-3">Surtidor</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3">Manguera</th>
                        <th className="px-4 py-3">Precio</th>
                        <th className="px-4 py-3">Volumen llenado</th>
                        <th className="px-4 py-3">Monto llenado</th>
                        <th className="px-4 py-3">Volumen total</th>
                        <th className="px-4 py-3">Monto total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                    {currentData.map((s) => (
                        <tr key={s.surtidor} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{s.surtidor}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        s.estado === "LLENANDO"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {s.estado}
                                </span>
                            </td>
                            <td className="px-4 py-3">{s.manguera}</td>
                            <td className="px-4 py-3">S/ {s.precio.toFixed(2)}</td>
                            <td className="px-4 py-3">{s.volumenLlenado.toFixed(3)}</td>
                            <td className="px-4 py-3">S/ {s.montoLlenado.toFixed(2)}</td>
                            <td className="px-4 py-3">{s.volumenTotal.toFixed(3)}</td>
                            <td className="px-4 py-3">S/ {s.montoTotal.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default PumpTable;
