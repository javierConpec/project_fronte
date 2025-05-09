import React from "react"

export type Column<T> = {
  header: string
  accessor?: keyof T
  render?: (value: T[keyof T] | null | undefined, row: T) => React.ReactNode
}

type BaseTableProps<T> = {
  data: T[]
  columns: Column<T>[]
}

export function BaseTable<T>({ data, columns }: BaseTableProps<T>) {
  return (
    <div className="min-w-full overflow-hidden rounded border border-gray-300">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 text-center">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-gray-300 border-t">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-2 py-1 text-center">
                  {col.render
                    ? col.render(col.accessor ? row[col.accessor] : null, row)
                    : col.accessor
                      ? String(row[col.accessor])
                      : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
