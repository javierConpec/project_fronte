import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

let downloadNumber = 1;

/**
 * Exporta datos a Excel -- es para los parametros (js no permite interface ts)
 * @param {Object} options
 * @param {string} options.title - Título del reporte
 * @param {string[]} options.columns - Encabezados de la tabla
 * @param {Array<Array<string|number>>} options.rows - Filas de datos
 * @param {string} [options.fileName="reporte"] - Nombre base del archivo
 */
export const exportToExcel = async ({
  title,
  columns,
  rows,
  fileName = "reporte",
}) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Reporte");

  // Título
  sheet.mergeCells(1, 1, 1, columns.length);
  const titleCell = sheet.getCell("A1");
  titleCell.value = title;
  titleCell.alignment = { horizontal: "center" };
  titleCell.font = { size: 14, bold: true };

  // Encabezado
  sheet.addRow(columns);

  // Estilos encabezado
  const headerRow = sheet.getRow(2);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "616161" },
    };
    cell.alignment = { horizontal: "center" };
  });

  // Agregar filas
  rows.forEach((r) => sheet.addRow(r));

  // Ajustar ancho columnas
  sheet.columns.forEach((col) => {
    col.width = 15;
  });

  // Guardar archivo
  const today = new Date().toISOString().slice(0, 10);
  const finalName = `${fileName}_${today}_${downloadNumber}.xlsx`;
  downloadNumber++;

  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), finalName);
};
