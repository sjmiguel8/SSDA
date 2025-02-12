"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Papa from "papaparse"
import { processData } from "@/lib/dataProcessing"
import ProcessedDataTable from "@/components/ProcessedDataTable"
import KeyMetrics from "@/components/KeyMetrics"
import DataAnalysis from "@/components/DataAnalysis"
import { calculateTotalSales, calculateAverageSales, generateRecommendations } from "@/lib/dataProcessing"

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [totalSales, setTotalSales] = useState<number>(0)
  const [averageSalesPerDay, setAverageSalesPerDay] = useState<number>(0)
  const [recommendations, setRecommendations] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    Papa.parse(file, {
      complete: (result) => {
        console.log("Parsed Data:", result.data)
        const processedData = processData(result.data)
        console.log("Processed Data:", processedData)
        setData(processedData)
        const totalSales = calculateTotalSales(processedData)
        const averageSalesPerDay = calculateAverageSales(processedData)
        const recommendations = generateRecommendations(processedData)

        setTotalSales(totalSales)
        setAverageSalesPerDay(averageSalesPerDay)
        setRecommendations(recommendations)
      },
      header: true,
    })
  }

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        <Button type="submit" disabled={!file}>
          Upload and Process CSV
        </Button>
      </form>
      {data.length > 0 && (
        <div className="space-y-8">
          <ProcessedDataTable data={data} />
          <KeyMetrics totalSales={totalSales} averageSalesPerDay={averageSalesPerDay} recommendations={recommendations} />
          <DataAnalysis data={data} />
        </div>
      )}
    </div>
  )
}
