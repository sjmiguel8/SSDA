import React from "react"

interface KeyMetricsProps {
  totalSales: number
  averageSalesPerDay: number
  recommendations: string[]
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ totalSales, averageSalesPerDay, recommendations }) => {
  console.log("KeyMetrics Props:", { totalSales, averageSalesPerDay, recommendations })
  return (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
      <div className="mb-4">
        <p>Total Sales: {totalSales}</p>
        <p>Average Sales Per Day: {averageSalesPerDay}</p>
      </div>
      <h3 className="text-lg font-bold mb-2">Recommendations</h3>
      <ul className="list-disc list-inside">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  )
}

export default KeyMetrics
