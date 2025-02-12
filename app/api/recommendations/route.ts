import { NextResponse } from "next/server"
import { dataStore } from "@/lib/dataStore"

export async function GET() {
  const recommendations = dataStore.getRecommendations()

  return NextResponse.json({ recommendations })
}

