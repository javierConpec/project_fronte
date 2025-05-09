import { Pencil } from "lucide-react"
import type { DispenserPort } from "../types/dispenser-port.type"
import type { Column } from "../components/ui/data-table"

export const dispenserPortColumns: Column<DispenserPort>[] = [
  {
    header: "Modificar",
    render: (_, row) => (
      <button
        type="button"
        onClick={(e) => {
          console.log("Editar:", row)
        }}
        className="text-blue-500 hover:text-blue-700"
        title="Editar"
      >
        <Pencil size={18} />
      </button>
    ),
  },
  {
    header: "Puerto",
    accessor: "port",
  },
  {
    header: "Protocolo",
    accessor: "protocol",
  },
  {
    header: "Baudios",
    accessor: "baudRate",
  },
]
