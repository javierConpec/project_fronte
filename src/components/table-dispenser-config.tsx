import { useEffect, useState } from "react"
import { BaseTable } from "./ui/data-table"
import type { DispenserConfig } from "../types/dispenser-config"
import { getDispenserConfig } from "../services/dispenserConfigService"
import { dispenserConfigColumns } from "../lib/dispenser-config-columns"

export function TableDispenserConfig() {
  const [data, setData] = useState<DispenserConfig[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDispenserConfig()
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return <BaseTable data={data} columns={dispenserConfigColumns} />
}
