import type { Column } from "../components/ui/data-table"
import type { Dispenser } from "../types/dispenser.type"

export const dispenserColumns: Column<Dispenser>[] = [
  { header: "Dispenser", accessor: "dispenser" },
  { header: "Status", accessor: "status" },
  { header: "Hose", accessor: "hose" },
  { header: "Price", accessor: "price" },
  { header: "Filled Volume", accessor: "filledVolume" },
  { header: "Filled Amount", accessor: "filledAmount" },
  { header: "Total Volume", accessor: "totalVolume" },
  { header: "Total Amount", accessor: "totalAmount" },
  { header: "User", accessor: "user" },
  { header: "Request", accessor: "request" },
]
