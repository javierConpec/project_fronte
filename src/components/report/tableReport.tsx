import { useState } from "react";
import { useReporteGeneral } from "../../hooks/reporteHook";
import { formatDate } from "../../lib/utils";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";
import { FileText } from "lucide-react";
import { SectionTitle } from "../../components/sectionTitle";

export const ReporteGeneralTable = () => {
  const { filtros } = useReporteFiltrosStore();
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
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

 
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SectionTitle icon={FileText} title="REPORTE DE VENTAS" />
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-xl text-xs text-gray-800">
      <thead className="bg-gray-700 text-white uppercase font-semibold text-center">
        <tr>
          <th className="px-2 py-1">Fecha</th>
          <th className="px-2 py-1">Código</th>
          <th className="px-2 py-1">Producto</th>
          <th className="px-2 py-1">Manguera</th>
          <th className="px-2 py-1">Punto Venta</th>
          <th className="px-2 py-1">Precio</th>
          <th className="px-2 py-1">Precio Actual</th>
          <th className="px-2 py-1">Volumen</th>
          <th className="px-2 py-1">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-center">
        {paginatedData.map((fila, index) => (
          <tr key={index} className="border-t">
            <td className="px-2 py-1">{formatDate(fila.fecha)}</td>
            <td className="px-2 py-1">{fila.cod_producto}</td>
            <td className="px-2 py-1">{fila.producto}</td>
            <td className="px-2 py-1">{fila.manguera}</td>
            <td className="px-2 py-1">{fila.punto_venta}</td>
            <td className="px-2 py-1">{fila.precio}</td>
            <td className="px-2 py-1">{fila.precio_actual}</td>
            <td className="px-2 py-1">{fila.volumen}</td>
            <td className="px-2 py-1">{fila.total}</td>
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
