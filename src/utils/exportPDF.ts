import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ExportPDFOptions } from "../types/exports.type";

let downloadNumber = 1;

export const exportToPDF = ({
  title,
  columns,
  rows,
  fileName = "reporte",
  includeDate = true,
  filtros = [],
}: ExportPDFOptions) => {
  const doc = new jsPDF("p", "mm", "a4");

  // 🔹 Encabezado
  doc.setFontSize(14);
  doc.text(title, 105, 15, { align: "center" });

  // 🔹 Fecha (arriba a la derecha)
  if (includeDate) {
    const today = new Date().toISOString().slice(0, 10);
    doc.setFontSize(9);
    doc.text(`Fecha: ${today}`, 200, 15, { align: "right" });
  }

  // 🔹 Tabla principal
  autoTable(doc, {
    head: [columns],
    body: (rows as any[]).map((row: any) =>
      "data" in row
        ? row.data.map((cell: any) => {
            if (row.orden === 2) {
              return {
                content: cell,
                styles: { fontStyle: "bold", fillColor: [200, 190, 225] },
              };
            }
            if (row.orden === 3) {
              return {
                content: cell,
                styles: {
                  fontStyle: "bold",
                  textColor: [255, 255, 255],
                  fillColor: [0, 64, 128],
                },
              };
            }
            return { content: cell };
          })
        : row
    ),
    startY: 25,
    styles: {
      fontSize: 7,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [10, 15, 41],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: { halign: "center", valign: "middle" },
    margin: { top: 20, left: 5, right: 5 },
    tableLineWidth: 0.1,
  });

  // 🔹 Tabla de filtros (solo si hay filtros aplicados)
  if (filtros.length > 0) {
    autoTable(doc, {
      head: [["Filtro", "Valor"]],
      body: filtros,
      styles: { fontSize: 8, halign: "left", cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185], 
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: { valign: "middle" },
      margin: { left: 120 }, // la mandamos a la derecha
      tableWidth: 80,
      startY: doc.internal.pageSize.height - (filtros.length * 8 + 25), // fijamos abajo
      pageBreak: "avoid",
    });
  }

  // 🔹 Guardar con fecha
  const today = new Date().toISOString().slice(0, 10);
  const finalName = `${fileName}_${today}_${downloadNumber}.pdf`;

  doc.save(finalName);
  downloadNumber++;
};
