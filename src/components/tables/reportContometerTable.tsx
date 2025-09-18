import { useReportContometer } from "../../hooks/reporteHook.js";
import {
  useReporteFiltrosStore,
  useTurnoStore,
} from "../../store/reporteFiltros.store.js";
import { FileText, ListFilter } from "lucide-react";
import { SectionTitle } from "../sectionTitle.js";
import { RiFileExcel2Fill, RiFilePdf2Fill } from "react-icons/ri";
import {
  agruparPorSurtidor,
  formatDateString,
} from "../../utils/functionsGen.js";
import { SpinnerClip } from "../Loader/spinner.js";
import { UseLoading } from "../../hooks/loaderHook.js";
import { exportToPDF } from "../../utils/exportPDF.js";
import { exportToExcel } from "../../utils/exportExcel.js";
import { useSidebarStore } from "../../store/sidebar.store";
import { FiltroModal } from "../modal/filterModal.js";
import { useState } from "react";

export const ReportContometerTable = () => {
  const { toggle } = useSidebarStore();
  const { filtros } = useReporteFiltrosStore();
  const { turnosSeleccionados } = useTurnoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useReportContometer(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.horaInicio ?? undefined,
    filtros.horaFin ?? undefined,
    filtros.mangueraId ?? undefined,
    filtros.puntoId ?? undefined,
    turnosSeleccionados.length > 0 ? turnosSeleccionados : undefined
  );

  const showLoader = UseLoading(loading, 1000);
  if (showLoader) return <SpinnerClip />;
  if (error) return <p>Error: {error}</p>;

  const dataWithStringSurtidor = data.map((item) => ({
    ...item,
    surtidor: String(item.FuelPointId),
  }));

  return (
    <div className="p-6 bg-background-0 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={FileText} title="REPORTE CONTOMETRO" />
          <div className="flex gap-2">
            <button
              onClick={() => {
                const columns = [
                  "Surtidor",
                  "Manguera",
                  "Producto",
                  "Precio",
                  "Volume",
                  "Monto",
                  "Cont. Inicial",
                  "Cont. Final",
                  "Diferencia",
                  "No Contabilizado",
                ];

                const rows = data.map((f) => [
                  f.FuelPointId,
                  f.NozzleNumber,
                  f.Name,
                  f.UnitPrice,
                  f.Volume,
                  f.Amount,
                  f.ContometerStart,
                  f.ContometerEnd,
                  f.DifContometer,
                  f.NoContabilizado,
                ]);

                exportToExcel({
                  title: "REPORTE CONTOMETRO",
                  columns,
                  rows: rows.map((fila) => fila.map((cell) => cell ?? "")),
                  fileName: "reporteContometro",
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
                  surtidor: String(f.FuelPointId),
                  manguera: f.NozzleNumber ?? 0,
                  producto: f.Name ?? "",
                  precio: f.UnitPrice ?? "",
                  volume: f.Volume ?? "",
                  valor: f.Amount ?? "",
                  contometroInicial: f.ContometerStart ?? "",
                  contometroFinal: f.ContometerEnd ?? "",
                  Diferencia: f.DifContometer ?? "",
                  NoContabilizado: f.NoContabilizado ?? "",
                }));

                const filtrosResumen = [
                  ["Fecha Inicio", filtros.fechaInicio || "-"],
                  ["Fecha Fin", filtros.fechaFin || "-"],
                  ["Hora Inicio", filtros.horaInicio || "-"],
                  ["Hora Fin", filtros.horaFin || "-"],
                  ["Manguera", filtros.mangueraId || "-"],
                  ["Punto de Venta", filtros.puntoId || "-"],
                  ["Turnos", turnosSeleccionados.join(", ") || "-"],
                ];

                // tabla de datos
                const tableData = agruparPorSurtidor(normalizedData).flatMap(
                  (grupo) =>
                    grupo.rows.map((f, idx) => ({
                      orden: f.orden,
                      data: [
                        idx === 0 ? grupo.surtidor : "",
                        f.manguera,
                        f.producto,
                        `S/ ${f.precio}`,
                        f.volume,
                        f.valor,
                        f.contometroInicial,
                        f.contometroFinal,
                        f.Diferencia,
                        f.NoContabilizado,
                      ],
                    }))
                );

                // pasamos dos bloques: filtros + reporte
                exportToPDF({
                  title: "REPORTE CONTOMETRO",
                  filtros: filtrosResumen, // si tu función exportToPDF soporta una sección extra
                  columns: [
                    "Surtidor",
                    "Manguera",
                    "Producto",
                    "Precio",
                    "Volume",
                    "Monto",
                    "Cont. Inicial",
                    "Cont. Final",
                    "Diferencia",
                    "No Contabilizado",
                  ],
                  rows: tableData,
                  fileName: "reporteContometro",
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

        {/* Tabla de reporte */}
        <div className="overflow-x-auto">
          <table
            id="reporte-table"
            className="min-w-full table-fixed text-accent-800 mt-2"
          >
            <thead className="bg-primary-900 text-text-50 uppercase font-extrabold text-center">
              <tr>
                <th className="w-[5%] px-3 py-3">Lado</th>
                <th className="w-[5%] px-1 py-3">Mang.</th>
                <th className="w-[12%] px-3 py-3">Producto</th>
                <th className="w-[9%] px-3 py-3">Precio</th>
                <th className="w-[10%] px-3 py-3">Cantidad</th>
                <th className="w-[11%] px-3 py-3">Valor</th>
                <th className="w-[12%] px-3 py-3">Contom Inicial</th>
                <th className="w-[12%] px-3 py-3">Contom Final</th>
                <th className="w-[12%] px-3 py-3">Diferencia</th>
                <th className="w-[12%] px-3 py-3">No Cont.</th>
              </tr>
            </thead>
            <tbody>
              {agruparPorSurtidor(dataWithStringSurtidor).map((grupo, gIndex) =>
                grupo.rows.map((f, idx) => (
                  <tr
                    key={`${f.surtidor}-${gIndex}-${idx}`}
                    className={`border-t text-sm text-center
    ${
      f.orden === 2
        ? "bg-accent-100 font-bold"
        : f.orden === 3
        ? "bg-primary-400 text-text-50 font-semibold"
        : "hover:bg-primary-50"
    }`}
                  >
                    {idx === 0 && (
                      <td
                        className={`px-3 py-6 text-center
        ${
          f.orden === 2
            ? "font-extrabold"
            : f.orden === 3
            ? "font-bold text-text-50"
            : "font-normal"
        }`}
                        rowSpan={grupo.rows.length}
                      >
                        {grupo.surtidor}
                      </td>
                    )}
                    <td className="px-3 py-2">{f.NozzleNumber}</td>
                    <td className="px-3 py-2">{f.Name}</td>
                    <td className="px-3 py-2">S/ {f.UnitPrice}</td>
                    <td className="px-3 py-2">{f.Volume}</td>
                    <td className="px-3 py-2">{f.Amount}</td>
                    <td className="px-3 py-2">{f.ContometerStart || 0}</td>
                    <td className="px-3 py-2">{f.ContometerEnd || 0}</td>
                    <td className="px-3 py-2">{f.DifContometer || 0}</td>
                    <td className="px-3 py-2">{f.NoContabilizado || 0}</td>
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
