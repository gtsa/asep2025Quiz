async function fetchAndExamineCSV() {
  try {
    console.log("Fetching CSV data...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data_asep-Yg1B6JYgWILSZ5uK5hGtGC7c1buwNL.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV content (first 1000 characters):")
    console.log(csvText.substring(0, 1000))

    // Parse CSV manually to understand structure
    const lines = csvText.split("\n").filter((line) => line.trim())
    console.log(`\nTotal lines: ${lines.length}`)

    if (lines.length > 0) {
      console.log("\nHeader row:")
      console.log(lines[0])

      console.log("\nFirst few data rows:")
      for (let i = 1; i < Math.min(6, lines.length); i++) {
        console.log(`Row ${i}: ${lines[i]}`)
      }

      // Try to identify columns
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      console.log("\nParsed headers:")
      headers.forEach((header, index) => {
        console.log(`${index}: ${header}`)
      })
    }
  } catch (error) {
    console.error("Error fetching CSV:", error)
  }
}

fetchAndExamineCSV()
