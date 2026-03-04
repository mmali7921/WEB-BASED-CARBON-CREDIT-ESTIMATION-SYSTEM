import { NextRequest, NextResponse } from "next/server"
import { saveCarbonEntry } from "@/app/actions/carbon"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = await saveCarbonEntry({
      energyUsage: Number(body.energyUsage),
      distance: Number(body.distance ?? 0),
      totalCarbon: Number(body.totalCarbon),
      date: body.date,
    })

    if (!result?.success) {
      return NextResponse.json(
        { error: result?.error ?? "Failed to save entry" },
        { status: result?.status ?? 400 }
      )
    }

    return NextResponse.json(result.data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

