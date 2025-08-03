import { useEffect, useState } from "react"
import { BaseTable } from "./ui/data-table"
import type { FuelConfig } from "../types/fuel.type"
import { getFuelConfig } from "../services/fuelConfigService"
import { fuelConfigColumns } from "../lib/fuel-config-columns"

export function TableFuelConfig() {
  const [data, setData] = useState<FuelConfig[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFuelConfig()
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return <BaseTable data={data} columns={fuelConfigColumns} />
}
