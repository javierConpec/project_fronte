import {
  useDatosMangueras,
  usePuntosDeCombustible,
  useDatosSurtidores,
} from "../../hooks/chartHook";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { FilterVentaModal } from "../modal/filterVentaModal";

export const ChartManguerasBar = () => {
  const [selectedFuelPoint, setSelectedFuelPoint] = useState<
    number | undefined
  >(undefined);
  const { datosSurtidores } = useDatosSurtidores();
  const [filtros, setFiltros] = useState<{ anio?: number; mes?: number }>({});
  const { datosMangueras, loading, error } = useDatosMangueras(
    selectedFuelPoint,
    filtros.anio,
    filtros.mes
  );
  const { puntosDeCombustible, loadingP, errorP } = usePuntosDeCombustible();
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    if (
      loading ||
      error ||
      (selectedFuelPoint !== undefined && datosMangueras.length === 0)
    )
      return;

    const chartElement = chartRef.current;
    if (!chartElement) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartElement);
    }

    let option: echarts.EChartsOption;

    if (selectedFuelPoint !== undefined) {
      // Gráfico de barras por manguera
      option = {
        title: {
          text: "Volumen por Manguera",
          left: "center",
          textStyle: { fontSize: 25 },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            const p = params[0];
            return `Manguera ${p.name} (${p.data.Producto}): ${p.value} L`;
          },
        },
        xAxis: {
          type: "category",
          data: datosMangueras.map((m) => m.Manguera ?? "N/A"),
          name: "Manguera",
        },
        yAxis: {
          type: "value",
          name: "Volumen (L)",
        },
        series: [
          {
            type: "bar",
            data: datosMangueras.map((m) => ({
              value: parseFloat(m.Volumen),
              Producto: m.Producto,
            })),
            itemStyle: {
              color: (params: any) => {
                const producto = params.data.Producto;
                return coloresPorProducto[producto] || defaultColor;
              },
            },
            barWidth: "70%",
          },
        ],
      };
    } else {
      // Gráfico de barras por surtidor
      option = {
        title: {
          text: "Volumen por Surtidor",
          left: "center",
          textStyle: { fontSize: 20 },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            const p = params[0];
            return `Surtidor ${p.name}: ${p.value} L`;
          },
        },
        xAxis: {
          type: "category",
          data: datosSurtidores.map((s) => s.Surtidor ?? "N/A"),
          name: "Surtidor",
        },
        yAxis: {
          type: "value",
          name: "Volumen (L)",
        },
        series: [
          {
            type: "bar",
            data: datosMangueras.map((m) => ({
              value: parseFloat(m.Volumen),
              Producto: m.Producto,
            })),
            itemStyle: {
              color: (params: any) => {
                const producto = params.data.Producto;
                return coloresPorProducto[producto] || defaultColor;
              },
            },
            barWidth: "70%",
          },
        ],
      };
    }

    chartInstanceRef.current.setOption(option);
  }, [
    datosMangueras,
    datosSurtidores,
    loading,
    error,
    selectedFuelPoint,
    filtros.anio,
    filtros.mes,
  ]);
  const filtrosTexto = filtros.anio
    ? `${filtros.mes ? `Mes ${filtros.mes}` : ""} ${filtros.anio}`
    : "Todos";
  return (
    <div className="bg-background-0 rounded-lg relative shadow-xl w-1/2 h-[400px] mt-5 p-4">
      <button
        className="absolute top-2 right-2 bg-secondary-600 text-text-50 px-4 py-1 hover:bg-secondary-700"
        onClick={() => setModalOpen(true)}
      >
        Filtrar: {filtrosTexto}
      </button>
      <div ref={chartRef} className="w-full h-[300px]"></div>

      {error && (
        <p className="text-sm text-red-500">
          Error al cargar los datos: {error}
        </p>
      )}

      <div className="mb-3">
  {loadingP ? (
    <p className="text-sm text-gray-500">Cargando puntos...</p>
  ) : errorP ? (
    <p className="text-sm text-red-500">Error: {errorP}</p>
  ) : (
    <div className="flex overflow-x-auto scrollbar-hide gap-4 py-2">
      <button
        onClick={() => setSelectedFuelPoint(undefined)}
        className={`flex-shrink-0 px-4 py-2 rounded shadow ${
          selectedFuelPoint === undefined
            ? "bg-accent-800 text-text-100"
            : "bg-accent-200"
        }`}
      >
        General
      </button>

      {puntosDeCombustible.map((p, idx) => (
        <button
          key={`punto-${p ?? idx}`}
          onClick={() => setSelectedFuelPoint(p)}
          className={`flex-shrink-0 px-4 py-2 rounded shadow ${
            selectedFuelPoint === p
              ? "bg-accent-800 text-text-100"
              : "bg-accent-200"
          }`}
        >
          Punto {p}
        </button>
      ))}
    </div>
  )}
</div>

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
    </div>
  );
};
