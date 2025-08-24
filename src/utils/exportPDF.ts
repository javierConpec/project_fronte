// ExportUtils.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { agruparPorSurtidor } from "./functionsGen";
import type { IreporteGeneral } from "../types/reporte.type";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

let downloadNumber = 1;

export const exportToPDF = (data: IreporteGeneral[]) => {
  // Normalizamos los datos
  const normalizedData = data.map(f => ({
    ...f,
    surtidor: String(f.surtidor),
    producto: f.producto ?? "",
    manguera: f.manguera ?? "",
    precio: f.precio ?? 0,
    cantidad: f.cantidad ?? 0,
    valor: f.valor ?? 0,
    contometroInicial: f.contometroInicial ?? 0,
    contometroFinal: f.contometroFinal ?? 0,
    consumoReal: f.consumoReal ?? 0,
  }));

  const tableData = agruparPorSurtidor(normalizedData).flatMap(grupo =>
    grupo.rows.map(f => [
      grupo.surtidor,
      f.producto,
      f.manguera,
      `S/ ${f.precio}`,
      f.cantidad,
      f.valor,
      f.contometroInicial,
      f.contometroFinal,
      f.consumoReal,
    ])
  );

  const tableColumns = [
    "Surtidor",
    "Producto",
    "Manguera",
    "Precio",
    "Cantidad",
    "Valor",
    "Cont. Inicial",
    "Cont. Final",
    "Consumo Real",
  ];

  const doc = new jsPDF("p", "mm", "a4");
  doc.setFontSize(16);
  doc.text("REPORTE CONTOMETRO", 105, 15, { align: "center" });
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 105, 20, { align: "right" });

  autoTable(doc, {
    head: [tableColumns],
    body: tableData,
    startY: 25,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [97, 97, 97], textColor: 255, fontStyle: "bold" },
    bodyStyles: { halign: "center" },
  });

  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const fileName = `reporteContometro_${formattedDate}_${downloadNumber}.pdf`;
  doc.save(fileName);
  downloadNumber++;
};


