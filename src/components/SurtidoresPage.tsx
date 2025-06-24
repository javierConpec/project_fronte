import React from "react";

export default function SurtidoresPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Surtidores</h1>
            <table className="min-w-full bg-white rounded-xl shadow text-sm text-gray-700">
                <thead className="bg-blue-100 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-1 text-gray-400 italic" colSpan={3}>
                            No hay datos disponibles.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
