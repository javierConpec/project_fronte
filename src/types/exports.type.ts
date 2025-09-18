import type { RowInput } from "jspdf-autotable";

export interface CustomRow {
  orden: number;
  data: (string | number)[];
}

export type ExportRow = CustomRow | RowInput;

export interface ExportPDFOptions {
  title: string;
  columns: string[];
  rows: ExportRow[];  // ahora acepta ambos
  fileName?: string;
  includeDate?: boolean;
  filtros?: (string | number)[][]; 
}

export interface ExportExcelOptions {
  title: string;
  columns: string[];
  rows: (string | number)[][];
  fileName?: string;
}
