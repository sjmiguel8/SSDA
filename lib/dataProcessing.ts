interface SalesData {
  date: string
  product: string
  sales: number
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

function isOutlier(value: number, mean: number, stdDev: number): boolean {
  return Math.abs(value - mean) > 2 * stdDev
}

export function processData(rawData: any[]): any[] {
  // Log the first row to see the data structure
  console.log("First row of raw data:", rawData[0])

  // Keep all columns from the data
  const processedData = rawData.map(row => {
    // Convert any numeric strings to numbers
    const processedRow: any = {}
    Object.entries(row).forEach(([key, value]) => {
      const numValue = Number(value)
      processedRow[key] = !isNaN(numValue) ? numValue : value
    })
    return processedRow
  })

  console.log("First row of processed data:", processedData[0])

  return processedData
}

export function calculateTotalSales(data: SalesData[]): number {
  return data.reduce((total, row) => total + row.sales, 0)
}

export function calculateAverageSales(data: SalesData[]): number {
  const total = calculateTotalSales(data)
  return total / data.length
}

export function getProductSales(data: SalesData[]): Record<string, number> {
  return data.reduce(
    (acc, row) => {
      acc[row.product] = (acc[row.product] || 0) + row.sales
      return acc
    },
    {} as Record<string, number>,
  )
}

export function generateRecommendations(data: SalesData[]): string[] {
  const recommendations: string[] = []
  const totalSales = calculateTotalSales(data)
  const averageSales = calculateAverageSales(data)
  const productSales = getProductSales(data)

  if (totalSales < 10000) {
    recommendations.push("Total sales are below target. Consider implementing a marketing campaign.")
  }

  Object.entries(productSales).forEach(([product, sales]) => {
    if (sales / totalSales < 0.1) {
      recommendations.push(`${product} is underperforming. Consider running a promotion.`)
    }
  })

  if (Object.keys(productSales).length > 0) {
    const topProduct = Object.entries(productSales).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    recommendations.push(`${topProduct} is your best-selling product. Consider expanding its product line.`)
  }

  return recommendations
}
