import { type NextRequest, NextResponse } from "next/server"
import { parse } from "csv-parse/sync"
import { dataStore, RowSchema } from "@/lib/dataStore"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const fileContent = await file.text()

  try {
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    })

    // Clean and validate the data
    const cleanedData = dataStore.cleanData(records).map((row) => RowSchema.parse(row))

    // Store the cleaned data
    dataStore.addData(cleanedData)

    return NextResponse.json({
      message: "Data ingested successfully",
      totalRows: cleanedData.length,
      totalSales: dataStore.getTotalSales(),
      averageSalesPerDay: dataStore.getAverageSalesPerDay(),
    })
  } catch (error) {
    console.error("Error processing CSV:", error)
    return NextResponse.json({ error: "Error processing CSV" }, { status: 500 })
  }
}

