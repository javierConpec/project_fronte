import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { formatDate } from "../../utils/functionsGen";
import { obtenerVentas } from "../../services/chartService";
import { Loader } from "../Loader/loader";
import type { IchartVenta } from "../../types/chart.type";

Chart.register(...registerables);

export const ChartVentaDashboard = () => {
  const [ventas, setVentas] = useState<IchartVenta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromise = obtenerVentas();
        const delayPromise = new Promise((res) => setTimeout(res, 1000));
        const [data] = await Promise.all([fetchPromise, delayPromise]);
        setVentas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || error || ventas.length === 0) return;

    const fechaSet = new Set<string>();
    const productos: Record<string, Record<string, number>> = {};

    ventas.forEach(({ fecha, producto, total_vendido }) => {
      const fechaFormateada = formatDate(new Date(fecha));
      fechaSet.add(fechaFormateada);
      if (!productos[producto]) productos[producto] = {};
      productos[producto][fechaFormateada] = total_vendido;
    });

    const fechasOrdenadas = Array.from(fechaSet).sort();
    const colores = ["#4941b4ff", "#23224eff", "#2518d6ff", "#4137c8", "#666699"];

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

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current!, {
      type: "line",
      data: { labels: fechasOrdenadas, datasets },
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
          title: { display: true, text: "Comparacion por Producto", font: { size: 20 } },
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false },
        },
        interaction: { mode: "nearest", axis: "x", intersect: false },
        scales: {
          x: { title: { display: true, text: "Fecha" } },
          y: { title: { display: true, text: "Total Vendido" }, beginAtZero: true },
        },
      },
    });
  }, [ventas, loading, error]);

  if (loading) return <Loader />;
  if (error) return <p>Error al cargar ventas: {error}</p>;

  return (
    <div className="bg-background-0 p-2 rounded-lg w-full h-[400px] shadow-2xl mt-5">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};
