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
      const values = data.map(row => Number(row[column])).filter(val => !isNaN(val))
      if (values.length === 0) return null

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
        max: max.toFixed(2),
        min: min.toFixed(2),
        count: values.length
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Descriptive Statistics</h3>
        {stats
          .filter((stat): stat is NonNullable<typeof stat> => stat !== null)
          .map(stat => (
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
    // Perform t-test on numeric columns
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === "number"
    )

    const tTests = numericColumns.map(column => {
      const values = data.map(row => Number(row[column])).filter(val => !isNaN(val))
      if (values.length === 0) return null
      const mean = values.reduce((a, b) => a + b, 0) / values.length
      const squaredDiffs = values.map(x => Math.pow(x - mean, 2))
      const variance = squaredDiffs.reduce((a, b) => a + b) / values.length
      const stdError = Math.sqrt(variance / values.length)
      const tStat = mean / stdError

      return {
        column,
        mean: mean.toFixed(2),
        stdError: stdError.toFixed(2),
        tStat: tStat.toFixed(2),
        confidenceInterval: [
          (mean - 1.96 * stdError).toFixed(2),
          (mean + 1.96 * stdError).toFixed(2)
        ]
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Inferential Analysis</h3>
        {tTests
          .filter((test): test is NonNullable<typeof test> => test !== null)
          .map(test => (
          <Card key={test.column}>
            <CardHeader>
              <CardTitle>{test.column}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div>Mean: {test.mean}</div>
                <div>Std Error: {test.stdError}</div>
                <div>T-Statistic: {test.tStat}</div>
                <div>95% CI: [{test.confidenceInterval[0]}, {test.confidenceInterval[1]}]</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const diagnosticAnalysis = (data: any[]) => {
    // Calculate correlations between numeric columns
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === "number"
    )

    const correlations = numericColumns.map(col1 => {
      const correlationsWithOthers = numericColumns.map(col2 => {
      const values1 = data.map(row => Number(row[col1])).filter(val => !isNaN(val))
      const values2 = data.map(row => Number(row[col2])).filter(val => !isNaN(val))
      if (values1.length === 0 || values2.length === 0) return null
        
        const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length
        const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length
        
        const covariance = values1.reduce((sum, _, i) => 
          sum + (values1[i] - mean1) * (values2[i] - mean2), 0
        ) / values1.length
        
        const std1 = Math.sqrt(values1.reduce((sum, x) => 
          sum + Math.pow(x - mean1, 2), 0
        ) / values1.length)
        
        const std2 = Math.sqrt(values2.reduce((sum, x) => 
          sum + Math.pow(x - mean2, 2), 0
        ) / values2.length)
        
        const correlation = covariance / (std1 * std2)
        
        return {
          column: col2,
          correlation: correlation.toFixed(2)
        }
      })

      return {
        column: col1,
        correlations: correlationsWithOthers
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Diagnostic Analysis</h3>
        {correlations.map(corr => {
          const validCorrelations = corr.correlations.filter((c): c is NonNullable<typeof c> => c !== null)
          return (
            <Card key={corr.column}>
              <CardHeader>
                <CardTitle>Correlations with {corr.column}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {validCorrelations.map(c => (
                    <div key={c.column}>
                      {c.column}: {c.correlation}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const predictiveAnalysis = (data: any[]) => {
    // Simple trend analysis
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === "number"
    )

    const trends = numericColumns.map(column => {
      const values = data.map(row => Number(row[column])).filter(val => !isNaN(val))
      if (values.length === 0) return null
      const n = values.length
      const periods = Array.from({length: n}, (_, i) => i + 1)
      
      // Calculate linear regression
      const sumX = periods.reduce((a, b) => a + b, 0)
      const sumY = values.reduce((a, b) => a + b, 0)
      const sumXY = periods.reduce((sum, x, i) => sum + x * values[i], 0)
      const sumXX = periods.reduce((sum, x) => sum + x * x, 0)
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      
      // Predict next value
      const nextValue = slope * (n + 1) + intercept

      return {
        column,
        slope: slope.toFixed(2),
        nextValue: nextValue.toFixed(2),
        trend: slope > 0 ? "Increasing" : slope < 0 ? "Decreasing" : "Stable"
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Predictive Analysis</h3>
        {trends
          .filter((trend): trend is NonNullable<typeof trend> => trend !== null)
          .map(trend => (
            <Card key={trend.column}>
              <CardHeader>
                <CardTitle>{trend.column}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>Trend: {trend.trend}</div>
                  <div>Rate of Change: {trend.slope}</div>
                  <div>Next Predicted Value: {trend.nextValue}</div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  const prescriptiveAnalysis = (data: any[]) => {
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === "number"
    )

    const insights = numericColumns.map(column => {
      const values = data.map(row => Number(row[column])).filter(val => !isNaN(val))
      if (values.length === 0) return null
      const mean = values.reduce((a, b) => a + b, 0) / values.length
      const sortedValues = [...values].sort((a, b) => b - a)
      const topValues = sortedValues.slice(0, 3)
      const bottomValues = sortedValues.slice(-3)

      return {
        column,
        mean: mean.toFixed(2),
        topValues,
        bottomValues,
        recommendation: mean > topValues[2] ? 
          "Consider reallocation of resources" :
          mean < bottomValues[0] ? 
          "Immediate attention required" :
          "Maintain current strategy"
      }
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Prescriptive Analysis</h3>
        {insights
          .filter((insight): insight is NonNullable<typeof insight> => insight !== null)
          .map(insight => (
            <Card key={insight.column}>
              <CardHeader>
                <CardTitle>{insight.column}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <div>Average: {insight.mean}</div>
                  <div>Top 3 Values: {insight.topValues.join(", ")}</div>
                  <div>Bottom 3 Values: {insight.bottomValues.join(", ")}</div>
                  <div className="font-semibold">Recommendation: {insight.recommendation}</div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  const exploratoryAnalysis = (data: any[]) => {
    const columns = Object.keys(data[0])
    interface BaseStats {
      column: string;
      type: string;
      uniqueCount: number;
      missingCount: number;
    }

    interface NumericStats extends BaseStats {
      min: number;
      max: number;
      q1: number;
      q3: number;
    }

    function isNumericStats(stats: BaseStats | NumericStats): stats is NumericStats {
      return stats.type === "Numeric"
    }

    const summary = columns.map(column => {
      const values = data.map(row => row[column])
      const uniqueValues = new Set(values)
      const isNumeric = typeof values[0] === "number"

      let stats: BaseStats | NumericStats = {
        column,
        type: isNumeric ? "Numeric" : "Categorical",
        uniqueCount: uniqueValues.size,
        missingCount: values.filter(v => v === null || v === undefined || v === "").length
      }

      if (isNumeric) {
        const numericValues = values as number[]
        const sortedValues = [...numericValues].sort((a, b) => a - b)
        stats = {
          ...stats,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          q1: sortedValues[Math.floor(sortedValues.length * 0.25)],
          q3: sortedValues[Math.floor(sortedValues.length * 0.75)]
        }
      }

      return stats
    })

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Exploratory Data Analysis</h3>
        {summary.map(stats => (
          <Card key={stats.column}>
            <CardHeader>
              <CardTitle>{stats.column}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div>Type: {stats.type}</div>
                <div>Unique Values: {stats.uniqueCount}</div>
                <div>Missing Values: {stats.missingCount}</div>
                {isNumericStats(stats) && (
                  <>
                    <div>Min: {stats.min}</div>
                    <div>Max: {stats.max}</div>
                    <div>Q1: {stats.q1}</div>
                    <div>Q3: {stats.q3}</div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
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
