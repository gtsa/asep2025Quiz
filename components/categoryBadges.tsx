"use client"

import React from "react"
import { categoryColorMap, defaultCategoryColor } from "@/lib/categoryColors"

const CATEGORIES = [
  "Συνταγματικό Δίκαιο",
  "Διοικητικό Δίκαιο",
  "Ευρωπαϊκοί Θεσμοί και Δίκαιο",
  "Οικονομικές Επιστήμες",
  "Δημόσια Διοίκηση και Διαχείριση Ανθρώπινου Δυναμικού",
  "Πληροφορική και Ψηφιακή Διακυβέρνηση",
  "Σύγχρονη Ιστορία της Ελλάδος (1875-σήμερα)"
]

interface Props {
  selected: string[]
  onToggle: (category: string) => void
}

export const CategoryBadges: React.FC<Props> = ({ selected, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <p className="text-muted-foreground text-center">Select the categories you want questions from:</p>
      {CATEGORIES.map((cat) => {
        const isActive = selected.includes(cat)
        const color = categoryColorMap[cat] ?? defaultCategoryColor
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition
              ${isActive
                ? `${color.bg} ${color.text} ${color.border}`
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
