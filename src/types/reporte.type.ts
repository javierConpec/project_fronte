
export interface IreporteGeneral {
  surtidor: number;
  producto: string;
  manguera: number;
  precio : string;
  cantidad: string;
  valor: string;
  contometroInicial: string;
  contometroFinal: string;
  consumoReal: string;
}


 export interface Filtros  {
  mangueraId: number | null;
  puntoId: number | null;
  fecha: string;
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