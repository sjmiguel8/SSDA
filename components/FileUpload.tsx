"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Papa from "papaparse"
import { processData } from "@/lib/dataProcessing"
import DataVisualization from "@/components/DataVisualization"

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[] | null>(null)

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
        const processedData = processData(result.data)
        setData(processedData)
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
      {data && <DataVisualization data={data} />}
    </div>
  )
}

