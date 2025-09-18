import { useReporteFiltrosStore, useTurnoStore } from "../../store/reporteFiltros.store";
import { useSidebarStore } from "../../store/sidebar.store";
import { useReportNozzle } from "../../hooks/reporteHook";
import { UseLoading } from "../../hooks/loaderHook";
import { SpinnerClip } from "../Loader/spinner";
import { SectionTitle } from "../sectionTitle";
import { FileText, ListFilter } from "lucide-react";
import { exportToExcel } from "../../utils/exportExcel";
import { RiFileExcel2Fill, RiFilePdf2Fill } from "react-icons/ri";
import { agruparPorSurtidor, formatDateString } from "../../utils/functionsGen";
import { exportToPDF } from "../../utils/exportPDF";
import { FiltroModal } from "../modal/filterModal";
import { useState } from "react";

export const ReportNozzleTable = () => {
  const { toggle } = useSidebarStore();
  const { filtros } = useReporteFiltrosStore();
  const { turnosSeleccionados } = useTurnoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useReportNozzle(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.horaInicio ?? undefined,
    filtros.horaFin ?? undefined,
    filtros.mangueraId ?? undefined,
    filtros.puntoId ?? undefined
  );

  const showLoader = UseLoading(loading, 1000);
  if (showLoader) return <SpinnerClip />;
  if (error) return <p>Error: {error}</p>;

  // Convertimos el lado a string
  const dataWithStringSurtidor = data.map((item) => ({
    ...item,
    surtidor: String(item.Lado),
  }));

  return (
    <div className="p-6 bg-background-0 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={FileText} title="REPORTE MANGUERAS" />
          <div className="flex gap-2">
            <button
              onClick={() => {
                const columns = [
                  "Lado",
                  "Manguera",
                  "Producto",
                  "Precio",
                  "Total Volume",
                  "Total Monto",
                  "Fecha",
                ];
                const rows = data.map((f) => [
                  f.Lado,
                  f.Manguera,
                  f.Producto,
                  f.Precio,
                  f.Total_Volumen,
                  f.Total_Monto,
                  f.Fecha,
                ]);
                exportToExcel({
                  title: "REPORTE MANGUERAS",
                  columns,
                  rows: rows.map((fila) => fila.map((cell) => cell ?? "")),
                  fileName: "reportNozzle",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-400 shadow-md shadow-accent-500 text-text-50 rounded-md hover:bg-accent-700 mt-1"
            >
              <RiFileExcel2Fill size={18} />
              Descargar Excel
            </button>

            <button
              onClick={() => {
                const normalizedData = data.map((f) => ({
                  ...f,
                  surtidor: String(f.Lado),
                  Manguera: f.Manguera ?? "",
                  Producto: f.Producto ?? "",
                  precio: f.Precio ?? "",
                  Total_Volumen: f.Total_Volumen ?? 0,
                  Total_Monto: f.Total_Monto ?? 0,
                  Fecha: formatDateString(f.Fecha ?? ""),
                }));

                const tableData = agruparPorSurtidor(normalizedData).flatMap(
                  (grupo) =>
                    grupo.rows.map((f) => [
                      grupo.surtidor,
                      f.Manguera,
                      f.Producto,
                      `S/ ${f.Precio ?? ""}`,
                      f.Total_Volumen,
                      f.Total_Monto,
                      f.Fecha,
                    ])
                );

                exportToPDF({
                  title: "REPORTE MANGUERAS",
                  columns: [
                    "Lado",
                    "Manguera",
                    "Producto",
                    "Precio",
                    "Total Volume",
                    "Total Monto",
                    "Fecha",
                  ],
                  rows: tableData,
                  fileName: "reportNozzle",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-600 shadow-md shadow-secondary-500 text-text-50 rounded-md hover:bg-secondary-700 mt-1"
            >
              <RiFilePdf2Fill size={18} />
              Descargar PDF
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full px-2 py-2 ml-3 mt-1 hover:bg-accent-100 transition-colors hover:text-accent-500"
            >
              <ListFilter size={24} />
            </button>

            <FiltroModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              toggleSidebarFiltros={() => toggle("sidebarFiltros")}
              toggleSidebarTurnos={() => toggle("sidebarTurnos")}
            />
          </div>
        </div>

        {/* Tabla de reporte*/}
        <div className="overflow-x-auto">
          <table
            id="reporte-table"
            className="min-w-full m-auto text-accent-800 mt-2"
          >
            <thead className="bg-primary-900 text-text-50 uppercase font-extrabold text-center">
              <tr>
                <th className="px-3 py-3">Lado</th>
                <th className="px-3 py-3">Manguera</th>
                <th className="px-3 py-3">Producto</th>
                <th className="px-3 py-3">Precio</th>
                <th className="px-3 py-3">Total Volume</th>
                <th className="px-3 py-3">Total Monto</th>
                <th className="px-3 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {agruparPorSurtidor(dataWithStringSurtidor).map((grupo, gIndex) =>
                grupo.rows.map((f, idx) => (
                  <tr
                    key={`${f.surtidor}-${gIndex}-${idx}`}
                    className={`border-t text-sm text-center ${
                      f.orden === 2
                        ? "bg-accent-100 font-bold"
                        : "hover:bg-primary-50"
                    }`}
                  >
                    {idx === 0 && (
                      <td
                        className={`px-3 py-6 text-center ${
                          f.orden === 2 ? "font-extrabold" : "font-normal"
                        }`}
                        rowSpan={grupo.rows.length}
                      >
                        {grupo.surtidor}
                      </td>
                    )}
                    <td className="px-3 py-2">{f.Manguera}</td>
                    <td className="px-3 py-2">{f.Producto}</td>
                    <td className="px-3 py-2">{f.Precio}</td>
                    <td className="px-3 py-2">{f.Total_Volumen}</td>
                    <td className="px-3 py-2">{f.Total_Monto || 0}</td>
                    <td className="px-3 py-2">{f.Fecha?.slice(0, 10) || ""}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
