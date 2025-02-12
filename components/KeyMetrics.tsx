import React from "react"
import styles from "./styles/KeyMetrics.module.css"

interface KeyMetricsProps {
  totalSales: number
  averageSalesPerDay: number
  recommendations: string[]
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ totalSales, averageSalesPerDay, recommendations }) => {
  console.log("KeyMetrics Props:", { totalSales, averageSalesPerDay, recommendations })
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Key Metrics</h2>
      <div className={styles.metricsGroup}>
        <p className={styles.metricValue}>Total Sales: {totalSales}</p>
        <p className={styles.metricValue}>Average Sales Per Day: {averageSalesPerDay}</p>
      </div>
      <h3 className={styles.subtitle}>Recommendations</h3>
      <ul className={styles.recommendationsList}>
        {recommendations.map((rec, index) => (
          <li key={index} className={styles.recommendationItem}>{rec}</li>
        ))}
      </ul>
    </div>
  )
}

export default KeyMetrics
