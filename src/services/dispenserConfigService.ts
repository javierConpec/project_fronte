import type { DispenserConfig } from "../types/dispensder-config"

export async function getDispenserConfig(): Promise<DispenserConfig[]> {
  // const response = await fetch("/api/dispenser-config")
  // return await response.json()

  return [
    {
      // icon: "modificar",
      dispenser: 1,
      dispenserPort: "1 puerto",
      physicalAddress: "1 direccion",
    },
  ]
}
