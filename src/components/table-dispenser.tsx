import React, { useEffect, useState } from "react"
import type { Dispenser } from "../types/dispenser.type"
import { BaseTable, type Column } from "./ui/data-table"
import { dispenserColumns } from "../lib/dispenser-columns"
import { getDispenserData } from "../services/dispenserService"

export default function TableDispenser() {
  const [data, setData] = useState<Dispenser[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDispenserData()
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return <BaseTable data={data} columns={dispenserColumns} />
}
