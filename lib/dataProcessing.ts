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

export function processData(rawData: any[]): SalesData[] {
  // Remove rows with missing or invalid data
  const cleanedData = rawData.filter(row => 
    row.date && isValidDate(row.date) && row.product && !isNaN(Number(row.sales))
  )

  // Convert sales to numbers and handle missing values
  const processedData = cleanedData.map(row => ({
    date: row.date,
    product: row.product,
    sales: Number.parseFloat(row.sales) || 0,
  }))

  // Calculate mean and standard deviation for sales
  const salesValues = processedData.map(row => row.sales)
  let mean = 0
  let stdDev = 0

  if (salesValues.length > 0) {
    mean = salesValues.reduce((a, b) => a + b, 0) / salesValues.length
    stdDev = Math.sqrt(salesValues.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (salesValues.length - 1))
  }

  // Remove outliers
  const finalData = processedData.filter(row => !isOutlier(row.sales, mean, stdDev))

  return finalData
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
