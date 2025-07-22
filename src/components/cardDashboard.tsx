import {
  useTotalAmount,
  useTotalHoy,
  useTotalNozzles,
  useTotalVolume,
} from "../hooks/cardHook";
import { formatPrice } from "../lib/utils";
import { iconsMap } from "../styles/iconCard";

export const CardDashboard = () => {
  const {
    totalAmount,
    loading: loadingAmount,
    error: errorAmount,
  } = useTotalAmount();
  const { totalHoy, loading: loadingHoy, error: errorHoy } = useTotalHoy();
  const {
    totalNozzles,
    loading: loadingNozzles,
    error: errorNozzles,
  } = useTotalNozzles();
  const {
    totalVolume,
    loading: loadingVolume,
    error: errorVolume,
  } = useTotalVolume();

  if (loadingAmount || loadingHoy || loadingNozzles || loadingVolume) {
    return <p>Cargando datos...</p>;
  }

  if (errorAmount || errorHoy || errorNozzles || errorVolume) {
    return <p>Error al cargar los datos</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">VENTA DE HOY</h3>
          <p className="text-3xl font-bold text-slate-100">
            S/ {formatPrice(totalHoy?.totalHoy)}
          </p>
        </div>
        <div className="mr-5">{iconsMap["VentaHoy"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">MANGUERAS</h3>
          <p className="text-3xl font-bold text-slate-100">
            {totalNozzles?.totalNozzles}
          </p>
        </div>
        <div className="mr-5">{iconsMap["manguera"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">VOL. VENDIDO</h3>
          <p className="text-3xl font-bold text-slate-100">
            {formatPrice(totalVolume?.totalVolume)}
          </p>
        </div>
        <div className="mr-5">{iconsMap["volume"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">VENTA TOTAL</h3>
          <p className="text-3xl font-bold text-slate-100">
            S/ {formatPrice(totalAmount?.totalAmount)}
          </p>
        </div>
        <div className="mr-5">{iconsMap["VentaTotal"]}</div>
      </div>
    </div>
  );
};
