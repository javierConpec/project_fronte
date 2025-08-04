// src/components/dashboard/FullDashboard.tsx
import { useEffect, useState } from "react";
import { CardDashboard } from "../cards/cardDashboard";
import {ChartVentaDashboard} from "../charts/chartVentaDashboard";
import { ChartBarraProductos } from "../charts/chartVentaProdDashboard";
import { ChartMangueras } from "../charts/chartVentaNozzleDashboard";
export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px] w-full">
        {/* Aquí puedes poner un loader personalizado relacionado al grifo */}
       <img
        src="/gas.gif"
        alt="Cargando..."
        className="w-48 h-48"
      />
      </div>
    );
  }

 return (
    <>
      <CardDashboard />
      <ChartVentaDashboard />
      <div className="flex gap-3">
        <ChartBarraProductos />
        <ChartMangueras />
      </div>
    </>
  );
}
