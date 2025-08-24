import { useState } from "react";
import { useReportTransactions } from "../../hooks/reporteHook.js";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store.js";
import { FileText,ListFilter } from "lucide-react";
import { SectionTitle } from "../sectionTitle.js";
import { RiFileExcel2Fill, RiFilePdf2Fill } from "react-icons/ri";
import { SpinnerClip } from "../Loader/spinner.js";
import { UseLoading } from "../../hooks/loaderHook.js";
import { exportToPDF } from "../../utils/exportPDF.js";
import { exportToExcel } from "../../utils/exportExcel.js";
import { useSidebarStore } from "../../store/sidebar.store.js";
import { format } from "date-fns";

export const ReportTransactionsTable = () => {
  const { toggle } = useSidebarStore();
  const { filtros } = useReporteFiltrosStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data, loading, error } = useReportTransactions(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.horaInicio ?? undefined,
    filtros.horaFin ?? undefined,
    filtros.mangueraId ?? undefined ,
    filtros.puntoId ?? undefined
  );

  const showLoader = UseLoading(loading, 1000);
  if (showLoader) return <SpinnerClip />;
  if (error) return <p>Error: {error}</p>;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);



  return (
    <div className="p-6 bg-background-0 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={FileText} title="REPORTE DE TRANSACCIONES" />
          <div className="flex gap-2">
            <button
              onClick={() => exportToExcel(data)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-400 shadow-md shadow-accent-500 text-text-50 rounded-md hover:bg-accent-700 mt-1"
            >
              <RiFileExcel2Fill size={18} />
              Descargar Excel
            </button>
            <button
              onClick={() => exportToPDF(data)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-600 shadow-md shadow-secondary-500 text-text-50 rounded-md hover:bg-secondary-700 mt-1"
            >
              <RiFilePdf2Fill size={18} />
              Descargar PDF
            </button>
             <button
              onClick={() => toggle("sidebarFiltros")}
              className="rounded-full px-2 py-2 ml-3 mt-1 hover:bg-accent-100 transition-colors hover:text-accent-500"
            >
              <ListFilter size={24} />
            </button>
          </div>
        </div>

        {/* Tabla de reporte*/}
        {/* SE COLOCA EL ID PARA LA EXPORTACION DEL PDF*/}
        <table
          id="reporte-table"
          className="min-w-full m-auto text-text-800 mt-2"
        >
          <thead className="bg-primary-900 text-text-50 uppercase font-extrabold text-center">
            <tr>
              <th className="px-3 py-3">N° Transaccion</th>
              <th className="px-3 py-3">Fecha</th>
              <th className="px-3 py-3">Surtidor</th>
              <th className="px-3 py-3">Manguera</th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">Cantidad</th>
              <th className="px-3 py-3">Precio</th>
              <th className="px-3 py-3">Total</th>
              <th className="px-3 py-3">Monto Acumulado</th>
              <th className="px-3 py-3">Volumen Acumulado</th>
              <th className="px-3 py-3">Sincronizacion</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((fila, index) => (
              <tr key={index} className="border-t text-sm text-center">
                <td className="px-3 py-2">{fila.Nro_Transaccion}</td>
                <td className="px-3 py-2">{fila.Fecha ? format(new Date(fila.Fecha), "yyyy-MM-dd HH:mm:ss") : "-"}</td>
                <td className="px-3 py-2">{fila.Surtidor}</td>
                <td className="px-3 py-2">{fila.Manguera}</td>
                <td className="px-3 py-2">{fila.Producto}</td>
                <td className="px-3 py-2">{(fila.Cantidad)}</td>
                <td className="px-3 py-2">S/{(fila.Precio)}</td>
                <td className="px-3 py-2">S/{(fila.Total)}</td>
                <td className="px-3 py-2">S/ {(fila.Monto_Acumulado)}</td>
                <td className="px-3 py-2">{(fila.Volumen_Acumulado)}</td>
                <td className="px-3 py-2">{fila.Fecha_Sincronizado ? "Sincronizado" : "Pendiente"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center pt-4">
          <button
            className="px-4 py-2 bg-text-700 text-text-50 rounded-xl hover:bg-text-900 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-sm text-accent-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-text-700 text-text-50 rounded-xl hover:bg-text-900 disabled:opacity-50"
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
