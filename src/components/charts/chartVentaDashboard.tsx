import { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { formatDate } from "../../utils/functionsGen";
import { Loader } from "../Loader/loader";

import { useVentas } from "../../hooks/chartHook";
import { FilterVentaModal } from "../modal/filterVentaModal";

export const ChartVentaDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtros, setFiltros] = useState<{ anio?: number; mes?: number }>({});
  const { ventas, loading, error } = useVentas(filtros.anio, filtros.mes);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  // Abrir modal
  const handleOpenModal = () => setModalOpen(true);

  // Aplicar filtros desde modal
  const handleApplyFilters = (anio?: number, mes?: number) => {
    setFiltros({ anio, mes });
    setModalOpen(false);
  };

  // Renderizar el gráfico con ECharts
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

    // Colores fijos por producto
    const coloresPorProducto: Record<string, string> = {
      DIESEL: "#3c3a3aff",
      "G-PREMIUM": "#1027aa",
      "G-REGULAR": "#25de18ff",
      GLP: "#f1e90eff",
    };

    const defaultColor = "#888888";

    const series: echarts.LineSeriesOption[] = Object.entries(productos).map(
      ([producto, ventasPorFecha]) => {
        const color = coloresPorProducto[producto] || defaultColor;
        return {
          name: producto,
          type: "line",
          data: fechasOrdenadas.map((f) => ventasPorFecha[f] || 0),
          smooth: false,
          lineStyle: { color, width: 3 },
          itemStyle: { color },
          symbolSize: 5,
        };
      }
    );

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current!);
    }

    const option: echarts.EChartsOption = {
      title: {
        text: "Comparación por Producto",
        left: "center",
        textStyle: { fontSize: 20 },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "10%",
      },
      grid: {
        top: "20%",
        left: "5%",
        right: "5%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: fechasOrdenadas,
        name: "Fecha",
      },
      yAxis: {
        type: "value",
        name: "Total Vendido",
        min: 0,
      },
      series,
      // Animación inicial
      animationDuration: 2000,
      animationEasing: "cubicOut",
      // Animación cuando cambian los datos
      animationDurationUpdate: 500,
      animationEasingUpdate: "cubicOut",
    };

    chartInstanceRef.current.setOption(option);

    //  Resize listener
    const handleResize = () => chartInstanceRef.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ventas, loading, error]);

  const filtrosTexto = filtros.anio
    ? `${filtros.mes ? `Mes ${filtros.mes}` : ""} ${filtros.anio}`
    : "Todos";

  return (
    <div className="bg-background-0 p-2 rounded-lg w-full h-[500px] shadow-2xl mt-5 relative">
      <button
        className="absolute top-2 right-2 z-50 bg-secondary-600 text-text-50 px-4 py-1 hover:bg-secondary-700"
        onClick={handleOpenModal}
      >
        Filtrar: {filtrosTexto}
      </button>

      {loading && <Loader />}
      {error && <p>Error al cargar ventas: {error}</p>}

      {/* Contenedor ECharts */}
      <div ref={chartRef} className="w-full h-full"></div>

      {modalOpen && (
        <FilterVentaModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
};
