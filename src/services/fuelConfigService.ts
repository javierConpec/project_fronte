import type { FuelConfig } from "../types/fuel.type"

export async function getFuelConfig(): Promise<FuelConfig[]> {
  // const res = await fetch("/api/product-config");
  // if (!res.ok) throw new Error("Failed to fetch product config");
  // return await res.json();

  // Mock de prueba
  return [
    {
      id: 1,
      name: "",
      price: 0,
      tempExpansionCoefficient: 0,
      mixedTank1: 0,
      mixPercentage: 0,
      mixedTank2: 0,
    },
  ]
}
