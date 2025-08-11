import { useState } from "react";
import { useReporteGeneral } from "../../hooks/reporteHook";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";
import { FileText } from "lucide-react";
import { SectionTitle } from "../sectionTitle";
import { utils, writeFile } from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import { agruparPorSurtidor } from "../../lib/utils";

export const ReporteGeneralTable = () => {
  const { filtros } = useReporteFiltrosStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const { data, loading, error } = useReporteGeneral(
    filtros.fecha,
    filtros.mangueraId ?? undefined,
    filtros.puntoId ?? undefined
  );
 // Paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;// Índice inicial para la página actual
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  // Convertimos el surtidor a string para evitar problemas de agrupación
  const paginatedDataWithStringSurtidor = paginatedData.map((item) => ({
    ...item,
    surtidor: String(item.surtidor),
  }));

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Reporte");
    writeFile(workbook, "reporteContometro.xlsx");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={FileText} title="REPORTE CONTOMETRO" />
          <button
            onClick={exportToExcel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 shadow-md shadow-green-500 text-white rounded-md hover:bg-green-700 mt-1"
          >
            <RiFileExcel2Fill size={18} />
            Descargar Excel
          </button>
        </div>

        <table className="min-w-full m-auto text-gray-800 mt-2">
          <thead className="bg-gray-700 text-white uppercase font-extrabold text-center">
            <tr>
              <th className="px-3 py-3">Surtidor</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">Manguera</th>
              <th className="px-3 py-3">Precio</th>
              <th className="px-3 py-3">Cantidad</th>
              <th className="px-3 py-3">Valor</th>
              <th className="px-3 py-3">Contometro Inicial</th>
              <th className="px-3 py-3">Contometro Final</th>
              <th className="px-3 py-3">Consumo Real</th>
            </tr>
          </thead>
          <tbody>
            {agruparPorSurtidor(paginatedDataWithStringSurtidor).map(
              (grupo, gIndex) =>
                grupo.rows.map((f, idx) => (
                  // Agrupamos por surtidor y mostramos el nombre del surtidor solo una vez
                  // Usamos gIndex para evitar duplicados en el encabezado
                  <tr
                    key={`${f.surtidor}-${gIndex}-${idx}`}
                    className="border-t text-sm text-center hover:bg-gray-100"
                  >
                    {idx === 0 && (
                      <td
                        className="px-3 py-6 font-bold text-center"
                        rowSpan={grupo.rows.length}
                      >
                        {grupo.surtidor}
                      </td>
                    )}
                    <td className="px-3 py-2">{f.producto}</td>
                    <td className="px-3 py-2">{f.manguera}</td>
                    <td className="px-3 py-2">{f.precio}</td>
                    <td className="px-3 py-2">{f.cantidad}</td>
                    <td className="px-3 py-2">{f.valor}</td>
                    <td className="px-3 py-2">{f.contometroInicial}</td>
                    <td className="px-3 py-2">{f.contometroFinal}</td>
                    <td className="px-3 py-2">{f.consumoReal}</td>
                  </tr>
                ))
            )}
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
