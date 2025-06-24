import React, { useState } from "react";
import { Pencil } from "lucide-react"; // ✅ Agregado

import combustibles from "../data/combustibles.json";
import manguerasData from "../data/mangueras.json";
import tanques from "../data/tanques.json";

function obtenerNombreCombustible(id: number) {
    const combustible = combustibles.find((c) => c.id === id);
    if (!combustible) return "Desconocido";
    return `(${combustible.nombre}, S/ ${combustible.precio.toFixed(2)})`;
}

export default function ManguerasPage() {
    const [mangueras, setMangueras] = useState(
        manguerasData.map((item) => ({
            ...item,
            mangueras: item.mangueras.slice(0, 4),
        }))
    );
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        surtidor: "",
        mangueras: Array(4).fill({ combustibleId: 0, tanque: "" }),
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(mangueras.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = mangueras.slice(startIndex, startIndex + itemsPerPage);

    const handleEdit = (index: number) => {
        const globalIndex = startIndex + index;
        const item = mangueras[globalIndex];
        setFormData({
            surtidor: item.surtidor,
            mangueras: [...item.mangueras.slice(0, 4), ...Array(4 - item.mangueras.length).fill({ combustibleId: 0, tanque: "" })],
        });
        setEditingIndex(globalIndex);
    };

    const handleChange = (field: string, value: string, mIndex: number | null = null) => {
        if (mIndex !== null) {
            const updated = [...formData.mangueras];
            updated[mIndex] = {
                ...updated[mIndex],
                [field]: field === "combustibleId" ? Number(value) : value,
            };
            setFormData({ ...formData, mangueras: updated });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleSave = () => {
        if (editingIndex === null) return;
        const updated = [...mangueras];
        const original = mangueras[editingIndex];

        updated[editingIndex] = {
            id: original.id,
            surtidor: formData.surtidor,
            mangueras: formData.mangueras.filter((m) => m.combustibleId !== 0 || m.tanque),
        };

        setMangueras(updated);
        setEditingIndex(null);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mangueras</h1>
            <table className="min-w-full bg-white rounded-xl shadow text-sm text-gray-700 text-center">
                <thead className="bg-blue-100 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-3">Surtidor</th>
                        {[...Array(4)].map((_, i) => (
                            <React.Fragment key={i}>
                                <th className="px-6 py-3">Comb. Mang. {i + 1}</th>
                                <th className="px-6 py-3">Tanque {i + 1}</th>
                            </React.Fragment>
                        ))}
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {currentData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-3">{item.surtidor}</td>
                            {[...Array(4)].map((_, i) => {
                                const m = item.mangueras[i];
                                return (
                                    <React.Fragment key={i}>
                                        <td className="px-6 py-3">{m ? obtenerNombreCombustible(m.combustibleId) : "0"}</td>
                                        <td className="px-6 py-3">{m ? m.tanque : "0"}</td>
                                    </React.Fragment>
                                );
                            })}
                            <td className="px-6 py-3">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => handleEdit(idx)}
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginación */}
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

            {/* Modal de edición */}
            {editingIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Editar Manguera</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Surtidor</label>
                            <input
                                type="text"
                                value={formData.surtidor}
                                onChange={e => handleChange("surtidor", e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        {formData.mangueras.slice(0, 4).map((m, i) => (
                            <div key={i} className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="block text-sm">Combustible (Mang. {i + 1})</label>
                                    <select
                                        value={m.combustibleId}
                                        onChange={e => handleChange("combustibleId", e.target.value, i)}
                                        className="w-full border rounded p-2"
                                    >
                                        <option value={0}>Seleccionar...</option>
                                        {combustibles.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.id} - {c.nombre} (S/ {c.precio.toFixed(2)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm">Tanque {i + 1}</label>
                                    <select
                                        value={m.tanque}
                                        onChange={e => handleChange("tanque", e.target.value, i)}
                                        className="w-full border rounded p-2"
                                    >
                                        <option value="">Seleccionar...</option>
                                        {tanques.map((t, idx) => (
                                            <option key={idx} value={t.nombre}>
                                                {t.nombre} ({obtenerNombreCombustible(t.combustibleId)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}

                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setEditingIndex(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
