"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch("/api/recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations)
    }

    fetchRecommendations()
  }, [])

  return (
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
  )
}

