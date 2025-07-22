export interface ItotalAmount {
    totalAmount: number;
}

export interface ItotalVolume {
    totalVolume: number;
}

export interface ItotalHoy {
    totalHoy: number;
}

export interface ItotalNozzles{
    totalNozzles: number;
}

export interface AnimatedCounterProps {
  value: number;
  duration?: number; 
  prefix?: string;
  isMoney?: boolean;
}
