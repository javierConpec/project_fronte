import {
  useDatosMangueras,
  usePuntosDeCombustible,
} from "../../hooks/chartHook";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

export const ChartMangueras = () => {
  const [selectedFuelPoint, setSelectedFuelPoint] = useState<
    number | undefined
  >(undefined);
  const { datosMangueras, loading, error } =
    useDatosMangueras(selectedFuelPoint);
  const { puntosDeCombustible, loadingP, errorP } = usePuntosDeCombustible();

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  const colores = ["#2563eb", "#22c55e", "#facc15"];

  useEffect(() => {
    if (loading || error || datosMangueras.length === 0) return;

    const chartElement = chartRef.current;
    if (!chartElement) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartElement);
    }

    const option: echarts.EChartsOption = {
      title: {
        text: "Volumen por Manguera",
        left: "center",
        textStyle: { fontSize: 25 },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) =>
          `Manguera ${params.name}: ${params.value} L`,
      },
      animation: true, 
      animationEasing: "linear",
      legend: { top: "middle", orient: "vertical", left: "left", itemGap: 30 },
      series: [
        {
          type: "pie",
          radius: ["40%", "100%"],
          center: ["50%", "80%"],
          startAngle: 180,
          endAngle: 360,
          animationDurationUpdate: 1500,
          animationEasingUpdate: "cubicInOut",

          avoidLabelOverlap: false,
          label: { show: false, position: "center" },
          emphasis: {
            label: { show: true, fontSize: "15", fontWeight: "bold" },
          },
          labelLine: { show: false },
          data: datosMangueras.map((m, index) => ({
            name: `Manguera ${m.Manguera} (${m.Producto})`,
            value: parseFloat(m.Volumen),
            itemStyle: { color: colores[index % colores.length] },
          })),
        },
      ],
    };

    chartInstanceRef.current.setOption(option);
  }, [datosMangueras, loading, error]);

  return (
    <div className="bg-white rounded-lg shadow-xl w-1/2 h-[400px] mt-5 p-4">
      <div ref={chartRef} className="w-full h-[300px]"></div>
      {loading && <p className="text-sm text-gray-500">Cargando datos...</p>}
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
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={() => setSelectedFuelPoint(undefined)}
              className={`px-4 py-2 rounded shadow ${
                selectedFuelPoint === undefined
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              General
            </button>

            {puntosDeCombustible.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedFuelPoint(p)}
                className={`px-4 py-2 rounded shadow ${
                  selectedFuelPoint === p
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Punto {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
