"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryBadges } from "@/components/categoryBadges"
import { CATEGORIES } from "@/lib/constants"

type QuizStartMenuProps = {
  onStart: (questionCount: number | "max", selectedCategories: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
}

export const QuizStartMenu: React.FC<QuizStartMenuProps> = ({
    onStart,
    isShuffled,
    setIsShuffled,
    selectedCategories,
    setSelectedCategories
}) => {
  const [customCount, setCustomCount] = useState("")

  const handleCategoryToggle = (category: string) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
  )
}

  const handleCustomStart = () => {
    const parsed = parseInt(customCount, 10)
    if (!isNaN(parsed) && parsed > 0) {
      onStart(parsed, selectedCategories)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Sticky Category Badges at the very top */}
      <div className="sticky top-0 z-20 bg-white border-b px-3 py-2">
        <CategoryBadges
          selected={selectedCategories}
          onToggle={handleCategoryToggle}
        />
      </div>
      {/* Scrollable main content */}
      <div className="flex flex-col items-center px-3 py-6 space-y-2 flex-1 overflow-y-auto">
        <label className="text-sm text-gray-600 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isShuffled}
            onChange={(e) => setIsShuffled(e.target.checked)}
          />
          Ανακατεμένες Απαντήσεις
        </label>
        <p className="text-muted-foreground text-center text-base pt-6 pb-4">Πόσες ερωτήσεις θέλεις για εξάσκηση;</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[10, 20, 50].map((count) => (
            <Button
              key={count}
              size="sm"
              onClick={() => onStart(count, selectedCategories)}
            >
              {count} Ερωτήσεις
            </Button>
          ))}
          <Button key="all" size="sm" onClick={() => onStart("max", selectedCategories)}>
            Όλες
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            type="number"
            min={1}
            placeholder="Πόσες"
            value={customCount}
            onChange={(e) => setCustomCount(e.target.value)}
            className="w-32 text-center"
          />
          <Button onClick={handleCustomStart} disabled={!customCount || parseInt(customCount) <= 0}>
            Ερωτήσεις; (Δικό σου Αριθμός)
          </Button>
        </div>
      </div>
    </div>
  )
}
