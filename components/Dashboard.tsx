"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import SalesChart from "@/components/SalesChart"
import SalesTrendChart from "@/components/SalesTrendChart"
import Recommendations from "@/components/Recommendations"

const charts = [
  { id: "productSales", label: "Product Sales", component: SalesChart },
  { id: "salesTrend", label: "Sales Trend", component: SalesTrendChart },
  { id: "recommendations", label: "Recommendations", component: Recommendations },
]

export default function Dashboard() {
  const [selectedCharts, setSelectedCharts] = useState(charts.map((chart) => chart.id))

  const toggleChart = (chartId: string) => {
    setSelectedCharts((prev) => (prev.includes(chartId) ? prev.filter((id) => id !== chartId) : [...prev, chartId]))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {charts.map((chart) => (
          <div key={chart.id} className="flex items-center space-x-2">
            <Checkbox
              id={chart.id}
              checked={selectedCharts.includes(chart.id)}
              onCheckedChange={() => toggleChart(chart.id)}
            />
            <label htmlFor={chart.id}>{chart.label}</label>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {charts
          .filter((chart) => selectedCharts.includes(chart.id))
          .map((chart) => (
            <chart.component key={chart.id} />
          ))}
      </div>
    </div>
  )
}

