export interface Idispenser {
    id:number;
    logicalNumber:number;
    physicalAddress: number;
    nozzleQuantity:number;
    factorPrice: number;
    factorVolume: number;
    factorAmount : number;
    factorContometer: number;
    factorAmountTotals: number;
    bitCConfigurationId:number;
    ptsControllerId: number;
}

export interface IupdateDispenser {
  id: number;
  logicalNumber?: string | number;
  physicalAddress?: string | number;
  nozzleQuantity?: string | number;
  factorPrice?: string | number;
  factorVolume?: string | number;
  factorAmount?: string | number;
  factorContometer?: string | number;
  factorAmountTotals?: string | number;
  bitCConfigurationId?: string | number;
  ptsControllerId?: string | number;
}
