import type { Column } from "../components/ui/data-table"
import type { DispenserConfig } from "../types/dispensder-config"
import { Pencil } from "lucide-react"

export const dispenserConfigColumns: Column<DispenserConfig>[] = [
  {
    header: "Modificar",
    render: (_, row) => (
      <button
        type="button"
        onClick={() => console.log("Editar:", row)}
        className="text-blue-500 hover:text-blue-700"
        title="Editar"
      >
        <Pencil size={18} />
      </button>
    ),
  },
  {
    header: "Surtidor",
    accessor: "dispenser",
  },
  {
    header: "Puerto de Surtidor",
    accessor: "dispenserPort",
  },
  {
    header: "Dirección Física",
    accessor: "physicalAddress",
  },
]
