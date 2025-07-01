"use client"

import React from "react"
import { categoryColorMap, defaultCategoryColor } from "@/lib/categoryColors"
import { useTranslation } from "react-i18next"

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

  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-2 dark:bg-gray-800 p-2 rounded-md">
      <p className="text-muted-foreground text-center dark:text-gray-300">
        {t("chooseCategories")}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = selected.includes(cat)
          const color = categoryColorMap[cat] ?? defaultCategoryColor
          return (
            <button
              key={cat}
              onClick={(e) => {
                onToggle(cat)
                setTimeout(() => {
                  (e.currentTarget as HTMLButtonElement).blur()
                }, 50)
              }}
              className={`
                px-2 py-1 md:py-2
                text-[0.7rem] md:text-base
                rounded-full border font-medium transition no-touch-highlight
                ${isActive
                  ? `${color.bg} ${color.text} ${color.border}`
                  : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                }
              `}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
