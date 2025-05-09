import { useEffect, useState } from "react"
import { BaseTable } from "./ui/data-table"
import type { DispenserPort } from "../types/dispenser-port.type"
import { getDispenserPorts } from "../services/dispenserPortService"
import { dispenserPortColumns } from "../lib/dispenser-port-columns"

export function TableDispenserPorts() {
  const [data, setData] = useState<DispenserPort[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDispenserPorts()
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return <BaseTable data={data} columns={dispenserPortColumns} />
}
