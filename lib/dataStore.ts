import { z } from "zod"

export const RowSchema = z.object({
  date: z.string(),
  product: z.string(),
  sales: z.number(),
})

export type Row = z.infer<typeof RowSchema>

import { processData } from "@/lib/dataProcessing"

class DataStore {
  private data: Row[] = []

  addData(newData: Row[]) {
    this.data = [...this.data, ...newData]
  }

  getData(): Row[] {
    return this.data
  }

  clear() {
    this.data = []
  }

  // Enhanced data cleaning function
  static cleanData(data: any[]): Row[] {
    return processData(data)
  }

  // Basic statistical calculations
  getProductSales(): Record<string, number> {
    return this.data.reduce(
      (acc, row) => {
        acc[row.product] = (acc[row.product] || 0) + row.sales
        return acc
      },
      {} as Record<string, number>,
    )
  }

  getTotalSales(): number {
    return this.data.reduce((total, row) => total + row.sales, 0)
  }

  getAverageSalesPerDay(): number {
    const uniqueDates = new Set(this.data.map((row) => row.date))
    return this.getTotalSales() / uniqueDates.size
  }

  getRecommendations(): string[] {
    const recommendations: string[] = []
    const productSales = this.getProductSales()
    const totalSales = this.getTotalSales()
    const averageSalesPerDay = this.getAverageSalesPerDay()

    // Identify underperforming products
    Object.entries(productSales).forEach(([product, sales]) => {
      if (sales / totalSales < 0.1) {
        recommendations.push(`Consider running a promotion for ${product} to boost sales.`)
      }
    })

    // Check for overall sales performance
    if (averageSalesPerDay < 1000) {
      recommendations.push("Overall sales are below target. Consider implementing a marketing campaign.")
    }

    // Identify top-performing products
    const topProduct = Object.entries(productSales).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    recommendations.push(`${topProduct} is your best-selling product. Consider expanding its product line.`)

    return recommendations
  }
}

export const dataStore = new DataStore()
