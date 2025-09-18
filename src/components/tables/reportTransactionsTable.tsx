import { useEffect, useState } from "react";
import { useReportTransactions } from "../../hooks/reporteHook.js";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store.js";
import { FileText, ListFilter, RefreshCcw } from "lucide-react";
import { SectionTitle } from "../sectionTitle.js";
import { RiFileExcel2Fill } from "react-icons/ri";
import { SpinnerClip } from "../Loader/spinner.js";
import { UseLoading } from "../../hooks/loaderHook.js";
import { exportToExcel } from "../../utils/exportExcel.js";
import { useSidebarStore } from "../../store/sidebar.store.js";
import { FiltroModal } from "../modal/filterModal.js";
import { useTransactionPending } from "../../hooks/trasanctionHook.js";
import { toast } from "react-toastify";
import type { IreporteGeneral } from "../../types/reporte.type.js";

export const ReportTransactionsTable = () => {
  const { toggle } = useSidebarStore();
  const { filtros } = useReporteFiltrosStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [dataLocal, setDataLocal] = useState<IreporteGeneral[]>([]);

  const { reenviarPendientes, loading: reenviando } = useTransactionPending();

  // Renombramos la data del hook
  const { data: dataFetched, loading, error } = useReportTransactions(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.horaInicio ?? undefined,
    filtros.horaFin ?? undefined,
    filtros.mangueraId ?? undefined,
    filtros.puntoId ?? undefined
  );

  
  useEffect(() => {
    if (dataFetched) {
      setDataLocal(dataFetched);
    }
  }, [dataFetched]);

  const showLoader = UseLoading(loading, 1000);
  if (showLoader) return <SpinnerClip />;
  if (error) return <p>Error: {error}</p>;

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleReenviar = async () => {
    if (selectedRows.length === 0) {
      toast.warn("Selecciona al menos una transacción");
      return;
    }
    try {
      const payload = selectedRows.map((id) => ({ id }));
      const resp = await reenviarPendientes(payload);
      toast.success(`Transacciones reenviadas: ${selectedRows.join(", ")}`);
      console.log("Respuesta backend:", resp);

      // Marcar como sincronizadas en dataLocal
      setDataLocal((prev) =>
        prev.map((fila) =>
          selectedRows.includes(fila.Nro_Transaccion)
            ? { ...fila, Fecha_Sincronizado: new Date().toISOString() }
            : fila
        )
      );

      setSelectedRows([]); // limpiar selección
    } catch {
      toast.error("Error al reenviar transacciones");
    }
  };

  return (
    <div className="p-6 bg-background-0 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <div className="flex items-start justify-between px-5 mb-4">
          <SectionTitle icon={FileText} title="REPORTE DE TRANSACCIONES" />
          <div className="flex gap-2">
            {/* Exportar Excel */}
            <button
              onClick={() => {
                const columns = [
                  "N° Transaccion",
                  "Fecha",
                  "Surtidor",
                  "Manguera",
                  "Producto",
                  "Cantidad",
                  "Precio",
                  "Total",
                  "Monto Acumulado",
                  "Volumen Acumulado",
                  "Sincronizacion",
                ];
                const rows = dataLocal.map((t) => [
                  t.Nro_Transaccion,
                  t.Fecha,
                  t.Surtidor,
                  t.Manguera,
                  t.Producto,
                  t.Cantidad,
                  t.Precio,
                  t.Total,
                  t.Monto_Acumulado,
                  t.Volumen_Acumulado,
                  t.Fecha_Sincronizado,
                ]);

                exportToExcel({
                  title: "Reporte General por Transacciones",
                  columns,
                  rows: rows.map((fila) => fila.map((cell) => cell ?? "")),
                  fileName: "reporteTransactions",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-400 shadow-md shadow-accent-500 text-text-50 rounded-md hover:bg-accent-700 mt-1"
            >
              <RiFileExcel2Fill size={18} />
              Descargar Excel
            </button>

            <button
              onClick={handleReenviar}
              disabled={reenviando}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-900 text-text-50 rounded-md shadow hover:bg-secondary-700 mt-1 disabled:opacity-50"
            >
              <RefreshCcw size={18} />
              {reenviando ? "Reenviando..." : "Reenviar Pendientes"}
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

        {/* Tabla */}
        <table
          id="reporte-table"
          className="min-w-full m-auto text-text-800 mt-2"
        >
          <thead className="bg-primary-900 text-text-50 uppercase font-extrabold text-center">
            <tr>
              <th className="px-3 py-3">Sel.</th>
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
            {dataLocal.map((fila) => (
              <tr
                key={fila.Nro_Transaccion}
                className="border-t text-sm text-center"
              >
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(fila.Nro_Transaccion)}
                    onChange={() => handleCheckboxChange(fila.Nro_Transaccion)}
                    disabled={!!fila.Fecha_Sincronizado}
                  />
                </td>
                <td className="px-3 py-2">{fila.Nro_Transaccion}</td>
                <td className="px-3 py-2">
                  {fila.Fecha
                    ? new Date(fila.Fecha)
                        .toISOString()
                        .replace("T", " ")
                        .slice(0, 19)
                    : ""}
                </td>
                <td className="px-3 py-2">{fila.Surtidor}</td>
                <td className="px-3 py-2">{fila.Manguera}</td>
                <td className="px-3 py-2">{fila.Producto}</td>
                <td className="px-3 py-2">{fila.Cantidad}</td>
                <td className="px-3 py-2">S/{fila.Precio}</td>
                <td className="px-3 py-2">S/{fila.Total}</td>
                <td className="px-3 py-2">S/ {fila.Monto_Acumulado}</td>
                <td className="px-3 py-2">{fila.Volumen_Acumulado}</td>
                <td className="px-3 py-2">
                  {fila.Fecha_Sincronizado
                    ? new Date(fila.Fecha_Sincronizado)
                        .toISOString()
                        .replace("T", " ")
                        .slice(0, 19)
                    : " Pendiente..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
