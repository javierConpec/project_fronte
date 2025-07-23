import { useReporteGeneral } from "../../hooks/reporteHook";
import { formatDate } from "../../lib/utils";
import { useReporteFiltrosStore } from "../../store/reporteFiltros.store";

export const ReporteGeneralTable = () => {
  const { filtros } = useReporteFiltrosStore();

  const { data, loading, error } = useReporteGeneral(
    filtros.fechaInicio,
    filtros.fechaFin,
    filtros.productoId ?? undefined,
    undefined, // manguera
    filtros.puntoId ?? undefined
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="min-w-full text-sm text-left border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th>Fecha</th>
          <th>Código</th>
          <th>Producto</th>
          <th>Manguera</th>
          <th>Punto Venta</th>
          <th>Precio</th>
          <th>Precio Actual</th>
          <th>Volumen</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((fila, index) => (
          <tr key={index} className="border-t">
            <td>{formatDate(fila.fecha)}</td>
            <td>{fila.cod_producto}</td>
            <td>{fila.producto}</td>
            <td>{fila.manguera}</td>
            <td>{fila.punto_venta}</td>
            <td>{fila.precio}</td>
            <td>{fila.precio_actual}</td>
            <td>{fila.volumen}</td>
            <td>{fila.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
