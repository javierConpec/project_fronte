
export interface IreporteGeneral {
  Nro_Transaccion?: number;
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

 export interface Filtros  {
  mangueraId: number | null;
  puntoId: number | null;
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string ;
  horaFin?: string;
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
    internalCode:string;
}