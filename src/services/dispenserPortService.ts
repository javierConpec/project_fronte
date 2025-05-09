import type { DispenserPort } from "../types/dispenser-port.type"

export async function getDispenserPorts(): Promise<DispenserPort[]> {
  // Futuro fetch real:
  // const response = await fetch("http://localhost:5000/api/configuracion")
  // if (!response.ok) throw new Error("Error fetching configuration data")
  // return await response.json()

  // Datos de prueba (mock)
  return [
    {
      // icon: "modificar",
      port: 1,
      protocol: "6. Tokheim UDC",
      baudRate: "4. 9600",
    },
    {
      // icon: "modificar",
      port: 2,
      protocol: "3. Wayne DART",
      baudRate: "3. 4800",
    },
  ]
}
