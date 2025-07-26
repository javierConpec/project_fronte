export interface Iproduct {
    id:number;
    name:string;
    currentPrice:number;
    internalCode:string;
    active:boolean;
    needsUpdate:boolean;
}

export interface IupdatePriceProduct {
  id: number;
  currentPrice: number;
}