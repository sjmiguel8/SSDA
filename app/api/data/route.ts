import { NextResponse } from "next/server"
import { dataStore } from "@/lib/dataStore"

export async function GET() {
  const data = dataStore.getData()
  const productSales = dataStore.getProductSales()

  return NextResponse.json({
    data,
    productSales,
    totalSales: dataStore.getTotalSales(),
    averageSalesPerDay: dataStore.getAverageSalesPerDay(),
  })
}

