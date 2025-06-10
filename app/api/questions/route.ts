import { NextResponse } from "next/server"
import { parseCSV, convertCSVToQuestions } from "@/lib/csv-parser"

export async function GET() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data_asep-Yg1B6JYgWILSZ5uK5hGtGC7c1buwNL.csv",
    )

    if (!response.ok) {
      throw new Error("Failed to fetch CSV data")
    }

    const csvText = await response.text()
    const csvRows = parseCSV(csvText)
    const questions = convertCSVToQuestions(csvRows)

    return NextResponse.json({
      questions,
      total: questions.length,
      message: "Questions loaded successfully",
    })
  } catch (error) {
    console.error("Error processing CSV:", error)
    return NextResponse.json(
      { error: "Failed to load questions", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
