import { NextResponse } from "next/server"
import { parseCSV, convertCSVToQuestions } from "@/lib/csv-parser"
import { promises as fs } from "fs"
import path from "path"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const limitParam = url.searchParams.get("limit")
    const categoryParams = url.searchParams.getAll("categories")

    const filePath = path.join(process.cwd(), "public", "data", "data_asep.csv")
    const csvBuffer = await fs.readFile(filePath)
    const csvText = csvBuffer.toString("utf-8")

    const csvRows = parseCSV(csvText)
    const allQuestions = convertCSVToQuestions(csvRows)

    // FILTER by selected categories if provided
    const filteredQuestions = categoryParams.length > 0
      ? allQuestions.filter(q => q.category && categoryParams.includes(q.category))
      : allQuestions

    // Shuffle and apply limit
    const numberOfQuestions =
      limitParam === "max"
        ? filteredQuestions.length
        : limitParam
        ? parseInt(limitParam, 10)
        : filteredQuestions.length

    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, numberOfQuestions);

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
