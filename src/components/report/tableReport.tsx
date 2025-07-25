import { useState } from "react";
import { useReporteGeneral } from "../../hooks/reporteHook";
import { formatDate } from "../../lib/utils";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";
import { FileText } from "lucide-react";
import { SectionTitle } from "../../components/sectionTitle";

import { utils, writeFile } from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";

export const ReporteGeneralTable = () => {
  const { filtros } = useReporteFiltrosStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;
  const { data, loading, error } = useReporteGeneral(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.productoId ?? undefined,
    undefined, // manguera
    filtros.puntoId ?? undefined
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Reporte");
    writeFile(workbook, "reporte_ventas.xlsx");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SectionTitle icon={FileText} title="REPORTE DE VENTAS" />
      <div className="overflow-x-auto">
        <div className="flex justify-end mr-9 ">
          <button
          onClick={exportToExcel}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 shadow-md shadow-green-500 text-white rounded-md hover:bg-green-700 "
        >
          <RiFileExcel2Fill size={18} />
          Descargar Excel
        </button>
        </div>
        <table className="min-w-[95%] m-auto  bg-white shadow-xl rounded-xl  text-gray-800 mt-2">
          <thead className="bg-gray-700 text-white uppercase font-extrabold text-center">
            <tr>
              <th className="px-3 py-3">Fecha</th>
              <th className="px-3 py-3">Código</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">Manguera</th>
              <th className="px-3 py-3">Punto Venta</th>
              <th className="px-3 py-3">Precio</th>
              <th className="px-3 py-3">Precio Actual</th>
              <th className="px-3 py-3">Volumen</th>
              <th className="px-3 py-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {paginatedData.map((fila, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-3 py-2">{formatDate(fila.fecha)}</td>
                <td className="px-3 py-2">{fila.cod_producto}</td>
                <td className="px-3 py-2">{fila.producto}</td>
                <td className="px-3 py-2">{fila.manguera}</td>
                <td className="px-3 py-2">{fila.punto_venta}</td>
                <td className="px-3 py-2">{fila.precio}</td>
                <td className="px-3 py-2">{fila.precio_actual}</td>
                <td className="px-3 py-2">{fila.volumen}</td>
                <td className="px-3 py-2">{fila.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center pt-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-900 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-900 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
