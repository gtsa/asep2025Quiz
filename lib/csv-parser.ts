import type { Question, CSVRow } from "./types"

export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.split("\n").filter((line) => line.trim())
  if (lines.length === 0) return []

  const headers = parseCSVLine(lines[0])
  const rows: CSVRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row: CSVRow = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })
      rows.push(row)
    }
  }

  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function convertCSVToQuestions(csvRows: CSVRow[]): Question[] {
  return csvRows.map((row, index) => {
    // Try to identify question and answer columns
    const questionKeys = Object.keys(row).filter(
      (key) =>
        key.toLowerCase().includes("question") ||
        key.toLowerCase().includes("pregunta") ||
        key.toLowerCase().includes("q"),
    )

    const answerKeys = Object.keys(row).filter(
      (key) =>
        key.toLowerCase().includes("answer") ||
        key.toLowerCase().includes("option") ||
        key.toLowerCase().includes("respuesta") ||
        key.toLowerCase().includes("a") ||
        key.toLowerCase().includes("b") ||
        key.toLowerCase().includes("c") ||
        key.toLowerCase().includes("d"),
    )

    const questionText = questionKeys.length > 0 ? row[questionKeys[0]] : Object.values(row)[0] || ""
    const options = answerKeys.map((key) => row[key]).filter((option) => option.trim() !== "")

    // If no clear answer columns, try to split by common delimiters
    if (options.length === 0) {
      const allValues = Object.values(row).slice(1) // Skip first column (question)
      const possibleOptions = allValues
        .join("|")
        .split(/[|;,]/)
        .map((opt) => opt.trim())
        .filter((opt) => opt !== "")
      options.push(...possibleOptions.slice(0, 4)) // Take up to 4 options
    }

    return {
      id: `q_${index + 1}`,
      question: questionText,
      options: options.length > 0 ? options : ["Option A", "Option B", "Option C", "Option D"],
      category: row.category || row.Category || "General",
      difficulty: row.difficulty || row.Difficulty || "Medium",
    }
  })
}
