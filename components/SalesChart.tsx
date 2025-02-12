"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProductSales = {
  product: string
  sales: number
}

export default function SalesChart() {
  const [data, setData] = useState<ProductSales[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data")
      const result = await response.json()
      const productSales = Object.entries(result.productSales).map(([product, sales]) => ({
        product,
        sales: sales as number,
      }))
      setData(productSales)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
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
  )
}

