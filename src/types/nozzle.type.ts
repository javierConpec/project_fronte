export interface Inozzle{
    id: number;
    FuelPointId : number;
    ProductId1: number;
    ProductNameN1: string;
    ProductId2: number;
    ProductNameN2: string;
    ProductId3: number;
    ProductNameN3: string;
    ProductId4: number;
    ProductNameN4: string;
    ProductId5: number;
    ProductNameN5: string;
    ProductId6: number;
    ProductNameN6: string;
    idManguera?: number;
}


export interface InozzleUpdate{
    id: number;
    fuelPointId:number;
    nozzleNumber:number;
    productId: number;
}