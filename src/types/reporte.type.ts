
export interface IreporteGeneral {
  fecha: string;
  cod_producto: string;
  producto: string;
  manguera: number;
  punto_venta: number;
  precio: number;
  precio_actual: number;
  volumen: number;
  total: number;
}


 export interface Filtros  {
  productoId: number | null;
  puntoId: number | null;
  fechaInicio: string;
  fechaFin: string;
};

export type FiltroStore = {
  filtros: Filtros;
  setFiltros: (nuevos: Filtros) => void;
};

export interface PropsFilter  {
  onAplicarFiltros: (filtros: Filtros) => void;
};


//*Interfaces para los filtros
export interface Inozzle{
    id:number;
    NozzleNumber:number;
}

export interface Ipoint{
    id:number;
    LogicalNumber:number;
}

export interface Iproduct{
    id:number;
    name:string;
}