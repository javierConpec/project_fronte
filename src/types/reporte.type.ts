
export interface IreporteGeneral {
  Nro_Transaccion:  number ;
  Fecha?: string ;
  Surtidor?: number;
  Producto?: string;
  Manguera?: number;
  Precio?: string;
  Cantidad?: string;
  valor?: string;
  Monto_Acumulado?: string;
  Volumen_Acumulado?: string;
  Fecha_Sincronizado?: string;
  Total?: string;
  contometroInicial?: string;
  contometroFinal?: string;
  consumoReal?: string;
}


export interface IreporteContometro{
  FuelPointId:number;
  NozzleNumber:number;
  Name:string;
  UnitPrice:string
  Volume:string
  Amount:string;
  ContometerStart:string;
  ContometerEnd:string;
  DifContometer:string;
  NoContabilizado:string;
  Fecha:string ;
  orden:number;
}


export interface IreporteNozzle{
  Lado:number;
  Manguera: number;
  Producto: string;
  Precio: string;
  Total_Volumen: string;
  Total_Monto:string
  orden?:number
  FuelPointId:number
  Fecha: string;
}


export interface IreporteProducts{
  ID:number;
  Producto:string;
  Precio:string;
  Total_Volumen: string;
  Total_Monto:string;
  orden?:number;
  Fecha:string
}

// Definición de filtros sin turno
export interface Filtros {
  mangueraId: number | null;
  puntoId: number | null;
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string;
  horaFin?: string;
}

// Store principal de filtros
export type FiltroStore = {
  filtros: Filtros;
  setFiltros: (nuevos: Filtros) => void;
  resetFiltros: () => void;
  
};

// Props que usan filtros
export interface PropsFilter {
  onAplicarFiltros: (filtros: Filtros) => void;
}

// types/reporte.type.ts
export interface TurnoStore {
  turnosSeleccionados: string[];
  setTurnos: (seleccionados: string[]) => void;
  resetTurnos: () => void; 
}



//*Interfaces para los filtros
export interface InozzleFilter{
    id:number;
    NozzleNumber:number;
}

export interface IpointFilter{
    Id:number;
    LogicalNumber:number;
}

export interface IproductFilter{
    id:number;
    name:string;
    internalCode:string;
}

export type IDateCloseFilter = string[];