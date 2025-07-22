import { useVentasPorProducto } from "../../hooks/chartHook";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { formatPrice } from "../../lib/utils";

Chart.register(...registerables);

export const ChartBarraProductos = () => {
  const { ventasPorProducto, loading, error } = useVentasPorProducto();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (loading || error || ventasPorProducto.length === 0) return;

    //* Preparamos los datos para el grafico :]
    const labels = ventasPorProducto.map((v) => v.producto);
    const data = ventasPorProducto.map((v) => parseFloat(formatPrice(v.total_vendido)));

    const colores = [
      "#2563eb", "#22c55e", "#facc15", "#ef4444", "#8b5cf6",
      
    ];

    

    chartRef.current = new Chart(canvasRef.current!, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Vendido por Producto",
            data,
            backgroundColor: colores.slice(0, data.length),
            borderRadius: 6,
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
            font: { size: 25 },
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `S/ ${formatPrice(context.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Producto",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Vendido (S/.)",
            },
          },
        },
      },
    });
  }, [ventasPorProducto, loading, error]);

  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error al cargar ventas: {error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl w-1/2 h-[400px] mt-5">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};


