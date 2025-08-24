import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


let downloadNumber = 1;
export const exportToExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Reporte");

  // Título
  sheet.mergeCells("A1:I1");
  const titleCell = sheet.getCell("A1");
  titleCell.value = "REPORTE CONTOMETRO";
  titleCell.alignment = { horizontal: "center" };
  titleCell.font = { size: 14, bold: true };

  // Encabezado
  const headers = [
    "Surtidor",
    "Producto",
    "Manguera",
    "Precio",
    "Cantidad",
    "Valor",
    "Contometro Inicial",
    "Contometro Final",
    "Consumo Real"
  ];
  sheet.addRow(headers);

  // Agregar datos
  data.forEach(f => {
    sheet.addRow([
      f.surtidor,
      f.producto,
      f.manguera,
      f.precio,
      f.cantidad,
      f.valor,
      f.contometroInicial,
      f.contometroFinal,
      f.consumoReal
    ]);
  });

  // Estilo encabezado
  sheet.getRow(2).eachCell(cell => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '616161' } };
    cell.alignment = { horizontal: "center" };
  });

  // Ajustar ancho columnas
  sheet.columns.forEach(col => col.width = 15);
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  downloadNumber++;
  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `reporteContometro_${formattedDate}_${downloadNumber}.xlsx`);
  
};
