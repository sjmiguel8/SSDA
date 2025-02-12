"use client"

import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataAnalysisProps {
  data: any[]
}

type AnalysisType = 
  | "descriptive"
  | "inferential"
  | "diagnostic"
  | "predictive"
  | "prescriptive"
  | "exploratory"

const DataAnalysis: React.FC<DataAnalysisProps> = ({ data }) => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>("descriptive")

  const performAnalysis = () => {
    switch (analysisType) {
      case "descriptive":
        return descriptiveAnalysis(data)
      case "inferential":
        return inferentialAnalysis(data)
      case "diagnostic":
        return diagnosticAnalysis(data)
      case "predictive":
        return predictiveAnalysis(data)
      case "prescriptive":
        return prescriptiveAnalysis(data)
      case "exploratory":
        return exploratoryAnalysis(data)
      default:
        return null
    }
  }

  const descriptiveAnalysis = (data: any[]) => {
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === "number"
    )

    const stats = numericColumns.map(column => {
      const values = data.map(row => row[column])
      const sum = values.reduce((a, b) => a + b, 0)
      const mean = sum / values.length
      const sortedValues = [...values].sort((a, b) => a - b)
      const median = sortedValues[Math.floor(values.length / 2)]
      const max = Math.max(...values)
      const min = Math.min(...values)

      return {
        column,
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        max,
        min,
        count: values.length
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Descriptive Statistics</h3>
        {stats.map(stat => (
          <Card key={stat.column}>
            <CardHeader>
              <CardTitle>{stat.column}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div>Mean: {stat.mean}</div>
                <div>Median: {stat.median}</div>
                <div>Max: {stat.max}</div>
                <div>Min: {stat.min}</div>
                <div>Count: {stat.count}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const inferentialAnalysis = (data: any[]) => {
    return (
      <div>
        <h3 className="text-lg font-semibold">Inferential Analysis</h3>
        <p>Coming soon: Statistical tests and confidence intervals</p>
      </div>
    )
  }

  const diagnosticAnalysis = (data: any[]) => {
    return (
      <div>
        <h3 className="text-lg font-semibold">Diagnostic Analysis</h3>
        <p>Coming soon: Root cause analysis and correlations</p>
      </div>
    )
  }

  const predictiveAnalysis = (data: any[]) => {
    return (
      <div>
        <h3 className="text-lg font-semibold">Predictive Analysis</h3>
        <p>Coming soon: Trend analysis and forecasting</p>
      </div>
    )
  }

  const prescriptiveAnalysis = (data: any[]) => {
    return (
      <div>
        <h3 className="text-lg font-semibold">Prescriptive Analysis</h3>
        <p>Coming soon: Optimization recommendations</p>
      </div>
    )
  }

  const exploratoryAnalysis = (data: any[]) => {
    return (
      <div>
        <h3 className="text-lg font-semibold">Exploratory Data Analysis</h3>
        <p>Coming soon: Data patterns and visualizations</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-xl font-bold mb-4">Data Analysis</h2>
      <Select
        value={analysisType}
        onValueChange={(value) => setAnalysisType(value as AnalysisType)}
      >
        <SelectTrigger className="w-[280px] mb-4">
          <SelectValue placeholder="Select analysis type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="descriptive">Descriptive Analysis</SelectItem>
          <SelectItem value="inferential">Inferential Analysis</SelectItem>
          <SelectItem value="diagnostic">Diagnostic Analysis</SelectItem>
          <SelectItem value="predictive">Predictive Analysis</SelectItem>
          <SelectItem value="prescriptive">Prescriptive Analysis</SelectItem>
          <SelectItem value="exploratory">Exploratory Data Analysis</SelectItem>
        </SelectContent>
      </Select>

      <div className="mt-4">
        {performAnalysis()}
      </div>
    </div>
  )
}

export default DataAnalysis
