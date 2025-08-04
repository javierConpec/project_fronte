import {useTotalAmount,useTotalHoy,useTotalNozzles,useTotalVolume,} from "../../hooks/cardHook";
import { iconsMap } from "../../styles/iconCard";
import { Loader } from "../loader";
import { AnimatedCounter } from "./animateCounter";

export const CardDashboard = () => {
  const {totalAmount,loading: loadingAmount,error: errorAmount,} = useTotalAmount();
  const { totalHoy, loading: loadingHoy, error: errorHoy } = useTotalHoy();
  const {totalNozzles,loading: loadingNozzles,error: errorNozzles,} = useTotalNozzles();
  const {totalVolume,loading: loadingVolume,error: errorVolume,} = useTotalVolume();

  if (loadingAmount || loadingHoy || loadingNozzles || loadingVolume) {
    return <Loader/>;
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
            <AnimatedCounter value={totalHoy?.totalHoy ?? 0} isMoney />
          </p>
        </div>
        <div className="mr-5">{iconsMap["VentaHoy"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">MANGUERAS</h3>
          <p className="text-3xl font-bold text-slate-100">
            <AnimatedCounter value={totalNozzles?.totalNozzles ?? 0} />
          </p>
        </div>
        <div className="mr-5">{iconsMap["manguera"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">VOL. VENDIDO</h3>
          <p className="text-3xl font-bold text-slate-100">
            <AnimatedCounter value={totalVolume?.totalVolume ?? 0}  />
          </p>
        </div>
        <div className="mr-5">{iconsMap["volume"]}</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-row justify-between items-center text-left">
        <div className="flex flex-col mx-4">
          <h3 className="text-lg font-bold text-slate-100">VENTA TOTAL</h3>
          <p className="text-3xl font-bold text-slate-100">
            <AnimatedCounter value={totalAmount?.totalAmount ?? 0} isMoney />
          </p>
        </div>
        <div className="mr-5">{iconsMap["VentaTotal"]}</div>
      </div>
    </div>
  );
};
