"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DailySales = {
  date: string
  sales: number
}

export default function SalesTrendChart() {
  const [data, setData] = useState<DailySales[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data")
      const result = await response.json()
      const dailySales = result.data.reduce((acc: Record<string, number>, row: any) => {
        acc[row.date] = (acc[row.date] || 0) + row.sales
        return acc
      }, {})
      const chartData = Object.entries(dailySales).map(([date, sales]) => ({
        date,
        sales: sales as number,
      }))
      setData(chartData.sort((a, b) => a.date.localeCompare(b.date)))
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

