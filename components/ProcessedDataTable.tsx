import React from "react"
import { Button } from "@/components/ui/button"
import { CSVLink } from "react-csv"
import styles from "./styles/ProcessedDataTable.module.css"

interface ProcessedDataTableProps {
  data: any[]
}

const ProcessedDataTable: React.FC<ProcessedDataTableProps> = ({ data }) => {
  console.log("ProcessedDataTable Props:", data)
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className={styles.tableHeader}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header} className={styles.tableCell}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.downloadButton}>
        <CSVLink data={data} headers={headers} filename="processed_data.csv">
          <Button>Download CSV</Button>
        </CSVLink>
      </div>
    </div>
  )
}

export default ProcessedDataTable
