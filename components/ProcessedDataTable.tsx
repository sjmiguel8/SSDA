import React from "react"
import { Button } from "@/components/ui/button"
import { CSVLink } from "react-csv"

interface ProcessedDataTableProps {
  data: any[]
}

const ProcessedDataTable: React.FC<ProcessedDataTableProps> = ({ data }) => {
  console.log("ProcessedDataTable Props:", data)
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="w-full max-w-4xl mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <CSVLink data={data} headers={headers} filename="processed_data.csv">
          <Button>Download CSV</Button>
        </CSVLink>
      </div>
    </div>
  )
}

export default ProcessedDataTable
