import { useState } from "react";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🟨 Datos simulados del PDF en JSON
const dummyData = [
  {
    id: 1,
    fecha: "01/06/2025",
    turno: "01",
    lado: 1,
    manguera: "1",
    galones: 41.63,
    precio: 16.3,
    nc: 0.0,
    cdInicial: 0.0,
    cdFinal: 0.0,
    cdGalones: 0.0,
    cdSoles: 0.0,
    pecGalones: 0.0,
    pecSoles: 0.0,
    producto: "DIESEL B5 S50 UV",
  },
  {
    id: 2,
    fecha: "01/06/2025",
    turno: "02",
    lado: 5,
    manguera: "1",
    galones: 106.38,
    precio: 16.3,
    nc: 3.06,
    cdInicial: 49.99,
    cdFinal: 0.3,
    cdGalones: 0.0,
    cdSoles: 4.98,
    pecGalones: 0.0,
    pecSoles: 0.0,
    producto: "DIESEL B5 S50 UV",
  },
  {
    id: 3,
    fecha: "01/06/2025",
    turno: "07",
    lado: 25,
    manguera: "1",
    galones: 17.3,
    precio: 8.3,
    nc: 0,
    cdInicial: 143.59,
    cdFinal: 17.3,
    cdGalones: 0,
    cdSoles: 143.59,
    pecGalones: 0,
    pecSoles: 0,
    producto: "GLP",
  },
  // ... puedes agregar más registros
];

// 🎨 Colores para cada producto
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B620E0", "#D43333"];

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
    writeFile(workbook, "reporte_ventas.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ventas por Producto", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [[
        "Fecha", "Turno", "Lado", "Manguera", "Galones", "Precio", "N.C.",
        "CD Inicial", "CD Final", "CD Galones", "CD Soles",
        "PEC Galones", "PEC Soles", "Producto"
      ]],
      body: data.map((row) => [
        row.fecha,
        row.turno,
        row.lado,
        row.manguera,
        row.galones.toFixed(2),
        `S/ ${row.precio.toFixed(2)}`,
        row.nc.toFixed(2),
        row.cdInicial.toFixed(2),
        row.cdFinal.toFixed(2),
        row.cdGalones.toFixed(2),
        row.cdSoles.toFixed(2),
        row.pecGalones.toFixed(2),
        row.pecSoles.toFixed(2),
        row.producto,
      ]),
    });
    doc.save("reporte_ventas.pdf");
  };

  // Datos agrupados para el gráfico de pastel
  const chartData = dummyData.reduce((acc, row) => {
    const found = acc.find((item) => item.name === row.producto);
    if (found) {
      found.value += row.galones;
    } else {
      acc.push({ name: row.producto, value: row.galones });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reporte de Ventas por Producto</h2>

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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl text-xs text-gray-800">
          <thead className="bg-gray-700 text-white uppercase font-semibold text-center">
            <tr>
              <th className="px-2 py-1">Fecha</th>
              <th className="px-2 py-1">Turno</th>
              <th className="px-2 py-1">Lado</th>
              <th className="px-2 py-1">Manguera</th>
              <th className="px-2 py-1">Galones</th>
              <th className="px-2 py-1">Precio</th>
              <th className="px-2 py-1">N.C.</th>
              <th className="px-2 py-1">CD Inicial</th>
              <th className="px-2 py-1">CD Final</th>
              <th className="px-2 py-1">CD Glns</th>
              <th className="px-2 py-1">CD Soles</th>
              <th className="px-2 py-1">PEC Glns</th>
              <th className="px-2 py-1">PEC Soles</th>
              <th className="px-2 py-1">Producto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {currentData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-1">{row.fecha}</td>
                <td className="px-2 py-1">{row.turno}</td>
                <td className="px-2 py-1">{row.lado}</td>
                <td className="px-2 py-1">{row.manguera}</td>
                <td className="px-2 py-1">{row.galones.toFixed(2)}</td>
                <td className="px-2 py-1">S/ {row.precio.toFixed(2)}</td>
                <td className="px-2 py-1">{row.nc.toFixed(2)}</td>
                <td className="px-2 py-1">{row.cdInicial.toFixed(2)}</td>
                <td className="px-2 py-1">{row.cdFinal.toFixed(2)}</td>
                <td className="px-2 py-1">{row.cdGalones.toFixed(2)}</td>
                <td className="px-2 py-1">S/ {row.cdSoles.toFixed(2)}</td>
                <td className="px-2 py-1">{row.pecGalones.toFixed(2)}</td>
                <td className="px-2 py-1">S/ {row.pecSoles.toFixed(2)}</td>
                <td className="px-2 py-1">{row.producto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* 📊 Pie Chart por producto (galones) */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔁 Paginación */}
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
