import { useDatosMangueras,usePuntosDeCombustible,useDatosSurtidores} from "../../hooks/chartHook";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Loader } from "../Loader/loader";

export const ChartMangueras = () => {
  const [selectedFuelPoint, setSelectedFuelPoint] = useState<number | undefined>(undefined);// Estado para el punto de combustible seleccionado
  const {datosSurtidores} = useDatosSurtidores();
  const { datosMangueras, loading, error } =useDatosMangueras(selectedFuelPoint);//capturar el punto de combustible seleccionado
  const { puntosDeCombustible, loadingP, errorP } = usePuntosDeCombustible();//obtener los puntos de combustible
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  const colores = ["#4941b4ff", "#23224eff", "#2518d6ff", "#4137c8", "#666699"];

  useEffect(() => {
    if (loading || error || datosMangueras.length === 0) return;
    

    const chartElement = chartRef.current;
    if (!chartElement) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartElement);
    }

    let option: echarts.EChartsOption ;
    if(selectedFuelPoint !== undefined){
      option ={
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
      }else{
        option ={
 title: {
        text: "Volumen por Surtidor",
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
          data: datosSurtidores.map((s, index) => ({
            name: `Surtidor ${s.Surtidor}`,
            value: parseFloat(s.Volumen),
            itemStyle: { color: colores[index % colores.length] },
          })),
        },
      ],
    };
  }
    chartInstanceRef.current.setOption(option);
}, [datosMangueras, loading, error, selectedFuelPoint]);

  return (
    <div className="bg-background-0 rounded-lg shadow-xl w-1/2 h-[400px] mt-5 p-4">
      <div ref={chartRef} className="w-full h-[300px]"></div>
      {loading && <Loader/>}
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
                  ? "bg-accent-800 text-text-100"
                  : "bg-accent-200"
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
    </div>
  );
};
