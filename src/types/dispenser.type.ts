export interface Idispenser {
    id:number;
    logicalNumber:number;
    physicalAddress: number;
    nozzleQuantity:number;
    factorVolume: number;
    factorAmount : number;
    factorContometer: number;
    bitCConfigurationId:number;
    ptsControllerId: number;
}

export interface IupdateDispenser {
  id: number;
  logicalNumber?: string | number;
  physicalAddress?: string | number;
  nozzleQuantity?: string | number;
  factorVolume?: string | number;
  factorAmount?: string | number;
  factorContometer?: string | number;
  bitCConfigurationId?: string | number;
  ptsControllerId?: string | number;
}
