// src/components/dashboard/FullDashboard.tsx
import { useEffect, useState } from "react";
import { CardDashboard } from "../cards/cardDashboard";
import {ChartVentaDashboard} from "../charts/chartVentaDashboard";
import { ChartPastelProductos } from "../charts/chartVentaProdDashboard";
import { ChartManguerasBar } from "../charts/chartVentaNozzleDashboard";
export function Dashboard() {

 return (
    <>
      <CardDashboard />
      <ChartVentaDashboard />
      <div className="flex gap-3">
        <ChartPastelProductos />
        <ChartManguerasBar />
      </div>
    </>
  );
}
