export interface ITank {
  name: string;            // Nombre o ID del tanque
  type: string;            // Tipo de combustible
  capacity: number;        // Capacidad total en litros
  currentVolume: number;   // Volumen actual en litros
  level: number;           // Nivel en porcentaje (0-100)
  location: string;        // Ubicación física del tanque
  status: string; // Estado operativo
  temperature: number;     // Temperatura en °C
  pressure: number;        // Presión interna del tanque (bar o psi)
  minLevel: number;        // Nivel mínimo seguro en %
  maxLevel: number;        // Nivel máximo seguro en %
  dailyConsumption: number;// Consumo diario en litros
  weeklyConsumption: number;// Consumo semanal en litros
  lastRefill: string;      // Fecha de última recarga (ISO string)
  estimatedDepletion: string; // Tiempo estimado para vaciarse (ej: "2 días")
  alert?: string;          // Mensaje de alerta, si existe
}
