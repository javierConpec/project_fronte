import { useVentas } from "../../hooks/chartHook";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { formatDate } from "../../lib/utils";
import { Loader } from "../loader";

//Vamos a regisrtrar los elementos que usaremos (por la version no se registran auto)
Chart.register(...registerables);

export const ChartVentaDashboard = () => {
  const { ventas, loading, error } = useVentas();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (loading || error || ventas.length === 0) return;

    const fechaSet = new Set<string>();
    const productos: Record<string, Record<string, number>> = {};

    ventas.forEach(({ fecha, producto, total_vendido }) => {
      const fechaFormateada = formatDate(fecha);
      fechaSet.add(fechaFormateada);

      if (!productos[producto]) productos[producto] = {};
      productos[producto][fechaFormateada] = total_vendido;
    });

    const fechasOrdenadas = Array.from(fechaSet).sort();

    const colores = ["#2563eb", "#22c55e", "#facc15", "#ef4444", "#8b5cf6"];

    const datasets = Object.entries(productos).map(
      ([producto, ventasPorFecha], idx) => ({
        label: producto,
        data: fechasOrdenadas.map((f) => ventasPorFecha[f] || 0),
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        tension: 0.15,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      })
    );

    // Eliminar gráfico anterior si existe
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current!, {
      type: "line",
      data: {
        labels: fechasOrdenadas,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: "linear",
          delay(ctx) {
            return ctx.dataIndex * 150;
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Comparacion por Producto",
            font: { size: 20 },
          },
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Fecha",
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Vendido",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }, [ventas, loading, error]);

    if (loading) return <Loader />;
  if (error) return <p>Error al cargar ventas: {error}</p>;

  return (
    <div className="bg-white p-2 rounded-lg w-full h-[400px] shadow-2xl mt-5">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};


