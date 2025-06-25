import { useState } from "react";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText } from "lucide-react";

const dummyData = [
  { id: 1, nombre: "Gasohol 90", precio: 18.5, tanque: "T1", mezcla: "70%" },
  { id: 2, nombre: "Diesel", precio: 17.25, tanque: "T3", mezcla: "50%" },
  { id: 3, nombre: "Premium", precio: 15.79, tanque: "T5", mezcla: "40%" },
  { id: 4, nombre: "Diesel Plus", precio: 13.95, tanque: "T7", mezcla: "60%" },
  { id: 5, nombre: "GLP", precio: 11.5, tanque: "T9", mezcla: "20%" },
  { id: 6, nombre: "Gasohol 95", precio: 19.8, tanque: "T11", mezcla: "80%" },
];

export default function Reportes() {
  const [data] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Reporte");
    writeFile(workbook, "reporte.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Combustibles", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["ID", "Nombre", "Precio", "Tanque", "% Mezcla"]],
      body: data.map((row) => [
        row.id,
        row.nombre,
        `S/ ${row.precio}`,
        row.tanque,
        row.mezcla,
      ]),
    });
    doc.save("reporte.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reporte de Combustibles</h2>

      <div className="flex gap-4">
        <button
          onClick={exportToExcel}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          <FileSpreadsheet size={18} />
          Descargar Excel
        </button>
        <button
          onClick={exportToPDF}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <FileText size={18} />
          Descargar PDF
        </button>
      </div>

      <table className="min-w-full bg-white shadow rounded-xl text-sm text-gray-800">
        <thead className="bg-gray-700 text-white text-xs uppercase font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Tanque</th>
            <th className="px-4 py-2 text-left">% Mezcla</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.nombre}</td>
              <td className="px-4 py-2">S/ {row.precio.toFixed(2)}</td>
              <td className="px-4 py-2">{row.tanque}</td>
              <td className="px-4 py-2">{row.mezcla}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center pt-4">
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
}
