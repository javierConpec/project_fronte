export interface IchartVenta{
    fecha: string;
    producto: string;
    total_vendido: number;
}

export interface IchartVentaProducto {
    producto: string;
    total_vendido: number;
}

export type IchartNozzleData ={ 
    Surtidor?: number;
    Manguera?: number;
    Cara?:number;
    Producto?: string;
    Volumen: string;
}

