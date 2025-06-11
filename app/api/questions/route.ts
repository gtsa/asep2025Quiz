import { NextResponse } from "next/server"
import { parseCSV, convertCSVToQuestions } from "@/lib/csv-parser"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const limitParam = url.searchParams.get("limit")

    const filePath = path.join(process.cwd(), "public", "data", "data_asep.csv")
    const csvBuffer = await fs.readFile(filePath)
    const csvText = csvBuffer.toString("utf-8")

    const csvRows = parseCSV(csvText)
    const allQuestions = convertCSVToQuestions(csvRows)

    let numberOfQuestions: number
    if (limitParam === "max") {
      numberOfQuestions = allQuestions.length
    } else {
      numberOfQuestions = limitParam ? parseInt(limitParam, 10) : allQuestions.length
    }
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
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
