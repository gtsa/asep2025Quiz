"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryBadges } from "@/components/categoryBadges"
import { CATEGORIES } from "@/lib/constants"

type QuizStartMenuProps = {
  onStart: (questionCount: number | "max", selectedCategories: string[]) => void
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
}

export const QuizStartMenu: React.FC<QuizStartMenuProps> = ({ onStart, isShuffled, setIsShuffled }) => {
  const [customCount, setCustomCount] = useState("")
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES)

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
        const updated = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
        console.log("Updated quizStartMenu:", updated)
        return updated
    })
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
      <div className="sticky top-0 z-20 bg-white border-b px-4 py-2">
        <CategoryBadges
          selected={selectedCategories}
          onToggle={handleCategoryToggle}
        />
      </div>
      {/* Scrollable main content */}
      <div className="flex flex-col items-center px-4 py-6 space-y-8 flex-1 overflow-y-auto">
        <p className="text-muted-foreground text-center text-sm">Choose how many questions you want to practice with:</p>

        <label className="text-sm text-gray-600 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isShuffled}
            onChange={(e) => setIsShuffled(e.target.checked)}
          />
          Shuffled Answers
        </label>

        <div className="flex flex-wrap gap-4 justify-center">
          {[10, 20, 50].map((count) => (
            <Button
              key={count}
              size="lg"
              onClick={() => onStart(count, selectedCategories)}
            >
              {count} Questions
            </Button>
          ))}
          <Button key="all" size="lg" onClick={() => onStart("max", selectedCategories)}>
            All Questions
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            type="number"
            min={1}
            placeholder="Enter number"
            value={customCount}
            onChange={(e) => setCustomCount(e.target.value)}
            className="w-32"
          />
          <Button onClick={handleCustomStart} disabled={!customCount || parseInt(customCount) <= 0}>
            Start Custom
          </Button>
        </div>
      </div>
    </div>
  )
}
