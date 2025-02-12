"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProductSales, generateRecommendations } from "@/lib/dataProcessing"
import "/components/styles/ProcessedDataTable.module.css"

interface SalesData {
  date: string
  product: string
  sales: number
}

interface DataVisualizationProps {
  data: SalesData[]
}

export default function DataVisualization({ data }: DataVisualizationProps) {
  const [chartData, setChartData] = useState<{ product: string; sales: number }[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    const productSales = getProductSales(data)
    setChartData(Object.entries(productSales).map(([product, sales]) => ({ product, sales })))
    setRecommendations(generateRecommendations(data))
  }, [data])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

