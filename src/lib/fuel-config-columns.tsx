/*import { Pencil } from "lucide-react"
import type { Column } from "../components/ui/data-table"
import type { FuelConfig } from "../types/fuel.type"

export const fuelConfigColumns: Column<FuelConfig>[] = [
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
  { header: "No", accessor: "id" },
  { header: "Nombre", accessor: "name" },
  { header: "Precio", accessor: "price" },
  {
    header: "Coeficiente de expansión de temperatura",
    accessor: "tempExpansionCoefficient",
  },
  { header: "Tanque mezclado 1", accessor: "mixedTank1" },
  { header: "Porcentaje de mezcla", accessor: "mixPercentage" },
  { header: "Tanque mezclado 2", accessor: "mixedTank2" },
]
*/