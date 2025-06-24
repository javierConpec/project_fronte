import { useState } from "react";
import combustiblesData from "../data/combustibles.json";
import { Pencil } from "lucide-react";

type Combustible = typeof combustiblesData[number];

export default function CombustiblesPage() {
    const [combustibles, setCombustibles] = useState<Combustible[]>(combustiblesData);
    const [editing, setEditing] = useState<Combustible | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(combustibles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = combustibles.slice(startIndex, startIndex + itemsPerPage);

    const handleChange = (field: keyof Combustible, value: string) => {
        if (!editing) return;
        setEditing({
            ...editing,
            [field]: field === "precio" || field === "coefExp" || field === "porcentajeMezcla"
                ? parseFloat(value)
                : value,
        });
    };

    const handleSave = () => {
        if (!editing) return;
        setCombustibles(prev =>
            prev.map(c => (c.id === editing.id ? editing : c))
        );
        setEditing(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Combustibles</h2>

            <table className="min-w-full bg-white rounded-xl shadow text-sm text-gray-700">
                <thead className="bg-blue-100 text-xs uppercase font-semibold text-center">
                    <tr>
                        <th className="px-6 py-3">No</th>
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Precio</th>
                        <th className="px-6 py-3">Coef. Exp. Temp.</th>
                        <th className="px-6 py-3">Tanque 1</th>
                        <th className="px-6 py-3">% Mezcla</th>
                        <th className="px-6 py-3">Tanque 2</th>
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                    {currentData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3">{item.nombre}</td>
                            <td className="px-6 py-3">S/ {item.precio.toFixed(2)}</td>
                            <td className="px-6 py-3">{item.coefExp}</td>
                            <td className="px-6 py-3">{item.tanque1}</td>
                            <td className="px-6 py-3">{item.porcentajeMezcla}%</td>
                            <td className="px-6 py-3">{item.tanque2}</td>
                            <td className="px-6 py-3">
                                <button
                                    onClick={() => setEditing(item)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>

            {/* Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Editar Combustible</h3>
                        <div className="space-y-3">
                            <input type="text" value={editing.nombre} onChange={e => handleChange("nombre", e.target.value)} placeholder="Nombre" className="w-full border rounded p-2" />
                            <input type="number" value={editing.precio} onChange={e => handleChange("precio", e.target.value)} placeholder="Precio" className="w-full border rounded p-2" />
                            <input type="number" value={editing.coefExp} onChange={e => handleChange("coefExp", e.target.value)} placeholder="Coef. Exp. Temp." className="w-full border rounded p-2" />
                            <input type="text" value={editing.tanque1} onChange={e => handleChange("tanque1", e.target.value)} placeholder="Tanque 1" className="w-full border rounded p-2" />
                            <input type="number" value={editing.porcentajeMezcla} onChange={e => handleChange("porcentajeMezcla", e.target.value)} placeholder="% Mezcla" className="w-full border rounded p-2" />
                            <input type="text" value={editing.tanque2} onChange={e => handleChange("tanque2", e.target.value)} placeholder="Tanque 2" className="w-full border rounded p-2" />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancelar
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
