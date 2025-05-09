import type { Dispenser } from "../types/dispenser.type"

export async function getDispenserData(): Promise<Dispenser[]> {
  // Future real API fetch:
  // const response = await fetch("http://localhost:5000/api/dispenser");
  // if (!response.ok) throw new Error("Failed to fetch dispenser data");
  // return await response.json();

  // Temporary mock data
  return [
    {
      dispenser: 1,
      status: "INACTIVE",
      hose: 0,
      price: 15.85,
      filledVolume: 1.262,
      filledAmount: 20.0,
      totalVolume: 13228.891,
      totalAmount: 225364.78,
      user: "",
      request: "",
    },
  ]
}
