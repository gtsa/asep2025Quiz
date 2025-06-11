import type { Question, CSVRow } from "./types"


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


export function convertCSVToQuestions(csvRows: CSVRow[]): Question[] {
  return csvRows.map((row, index) => {
    const correctLetter = (() => {
      switch (row.correct_answer?.trim()) {
        case "0": return "α"
        case "1": return "β"
        case "2": return "γ"
        case "3": return "δ"
        default: return "a" // or throw an error
      }
    })()

    return {
      id: String(row["#"] ?? index + 1),
      question: row.question?.trim(),
      options: {
        α: row.a?.trim(),
        β: row.b?.trim(),
        γ: row.c?.trim(),
        δ: row.d?.trim(),
      },
      correctAnswer: correctLetter,
      category: row.category?.trim() || "Γενικά",
      indexInCategory: row["#"]
    }
  })
}
