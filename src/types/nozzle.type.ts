export interface Inozzle{
    fuelPointId : number;
    idNozzle1: number;
    nozzle1: string;
    idNozzle2: number;
    nozzle2: string;
    idNozzle3: number;
    nozzle3: string;
    idNozzle4: number;
    nozzle4: string;
    idNozzle5: number;
    nozzle5: string;
    idNozzle6: number;
    nozzle6: string;
}


export interface InozzleUpdate{
    id: number;
    fuelPointId:number;
    nozzleNumber:number;
    productId: number;
}