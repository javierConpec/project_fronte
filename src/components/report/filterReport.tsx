import { useFiltrosReporte } from "../../hooks/reporteHook";
import type { PropsFilter } from "../../types/reporte.type";
import { CustomDropdown } from "../CustomDropDown";
import { useState } from "react";



export const FiltrosReporte = ({ onAplicarFiltros }: PropsFilter) =>  {
  const { nozzles, points, products, loading, error } = useFiltrosReporte();

  const [productoId, setProductoId] = useState<number | null>(null);
  const [puntoId, setPuntoId] = useState<number | null>(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  if (loading) return <p>Cargando filtros...</p>;
  if (error) return <p>{error}</p>;

  const handleAplicar = () => {
    const filtros = {
      productoId,
      puntoId,
      fechaInicio,
      fechaFin,
    };
    onAplicarFiltros(filtros);
  };
  return (
    <div className="flex flex-col gap-4 ml-10 text-white">
      {/* Producto */}
      <CustomDropdown
        label="Producto"
        options={products.map((p) => ({ id: p.id, label: p.name }))}
        onSelect={(id) => setProductoId(id)}
      />

      {/* Punto de Venta */}
      <CustomDropdown
        label="Punto de Venta"
        options={points.map((p) => ({ id: p.id, label: p.LogicalNumber }))}
        onSelect={(id) => setPuntoId(id)}
      />

      {/* Fechas */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Fecha Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Fecha Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="bg-gray-800 text-white border border-gray-500 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Botón aplicar */}
      <button
        onClick={handleAplicar}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mt-2 self-start"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};