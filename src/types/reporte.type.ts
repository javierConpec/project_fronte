
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
  mangueraId: number | null;
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
}