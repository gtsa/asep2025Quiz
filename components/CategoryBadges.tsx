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
      <p className="text-muted-foreground text-center">Διάλεξε κατηγορίες για εξάσκηση: </p>
      {CATEGORIES.map((cat) => {
        const isActive = selected.includes(cat)
        const color = categoryColorMap[cat] ?? defaultCategoryColor
        return (
          <button
            key={cat}
            onClick={(e) => {
              onToggle(cat);
              setTimeout(() => {
                (e.currentTarget as HTMLButtonElement).blur();
              }, 50);
            }}      
            className={`px-2 py-2 rounded-full border text-xs font-medium transition no-touch-highlight
              ${isActive
                ? `${color.bg} ${color.text} ${color.border}`
                : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
