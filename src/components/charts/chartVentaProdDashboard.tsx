import { useVentasPorProducto } from "../../hooks/chartHook";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../../utils/functionsGen";
import { Loader } from "../Loader/loader";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FilterVentaModal } from "../modal/filterVentaModal";

Chart.register(...registerables, ChartDataLabels);

export const ChartPastelProductos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtros, setFiltros] = useState<{ anio?: number; mes?: number }>({});

  const { ventasPorProducto, loading, error } = useVentasPorProducto(
    filtros.anio,
    filtros.mes
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const colores = ["#15c00f", "#1027aa", "#a09e9b", "#f3cd22", "#9191d6ff"];

  // colores fijos por producto
  const coloresPorProducto: Record<string, string> = {
    DIESEL: "#3c3a3aff",
    "G-PREMIUM": "#1027aa",
    "G-REGULAR": "#25de18ff",
    GLP: "#f1e90eff",
  };

  // Si no existe
  const defaultColor = "#888888";

  useEffect(() => {
    if (loading || error || ventasPorProducto.length === 0) return;

    // Limpiar gráfico anterior si existía
    chartRef.current?.destroy();

    const labels = ventasPorProducto.map((v) => v.producto);
    const data = ventasPorProducto.map((v) =>
      parseFloat(formatPrice(v.total_vendido))
    );

    chartRef.current = new Chart(canvasRef.current!, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map(
              (producto) => coloresPorProducto[producto] || defaultColor
            ),
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Ventas por Producto",
            color: "#000",
            font: { size: 30, weight: "bold" },
          },
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: S/ ${formatPrice(context.parsed)}`,
            },
          },
          datalabels: {
            formatter: (value, context) => {
              const dataset = context.chart.data.datasets[0].data;
              const numericValues = dataset.map((item) =>
                item == null
                  ? 0
                  : typeof item === "number"
                  ? item
                  : (item as any).y ?? 0
              );
              const total = numericValues.reduce((sum, val) => sum + val, 0);
              const current =
                value == null
                  ? 0
                  : typeof value === "number"
                  ? value
                  : (value as any).y ?? 0;
              return total === 0
                ? "0%"
                : ((current / total) * 100).toFixed(1) + "%";
            },
            color: "#fff",
            font: { weight: "bold", size: 14 },
          },
        },
      },
    });
  }, [ventasPorProducto, loading, error, filtros.anio, filtros.mes]);

  // Texto para mostrar los filtros activos
  const filtrosTexto = filtros.anio
    ? `${filtros.mes ? `Mes ${filtros.mes}` : ""} ${filtros.anio}`
    : "Todos";

  return (
    <div className="bg-background-0 p-4 rounded-lg shadow-xl w-1/2 h-[400px] mt-5 relative">
      <button
        className="absolute top-2 right-2 bg-secondary-600 text-text-50 px-4 py-1 hover:bg-secondary-700"
        onClick={() => setModalOpen(true)}
      >
        Filtrar: {filtrosTexto}
      </button>

      <canvas ref={canvasRef} className="w-full h-full"></canvas>

      {modalOpen && (
        <FilterVentaModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onApply={(anio, mes) => {
            setFiltros({ anio, mes });
            setModalOpen(false);
          }}
        />
      )}

      {loading && <Loader />}
      {error && (
        <p className="text-sm text-red-500">Error al cargar ventas: {error}</p>
      )}
    </div>
  );
};
