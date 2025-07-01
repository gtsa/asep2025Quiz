"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { CategoryBadges } from "@/components/CategoryBadges"
import { CATEGORIES } from "@/lib/constants"
import { useTranslation } from "react-i18next"

type PhaseValue = "phase_1" | "phase_2" | "phase_3"

type QuizStartMenuProps = {
  onStart: (
    questionCount: number | "max",
    selectedCategories: string[],
    selectedPhase: PhaseValue | null
  ) => void
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
  lastUsedQuestionCount: number | "max"
}

export const QuizStartMenu: React.FC<QuizStartMenuProps> = ({
  onStart,
  isShuffled,
  setIsShuffled,
  selectedCategories,
  setSelectedCategories,
  lastUsedQuestionCount,
}) => {
  const [customCount, setCustomCount] = useState(
    typeof lastUsedQuestionCount === "number" ? String(lastUsedQuestionCount) : ""
  )

  const [selectedPhase, setSelectedPhase] = useState<PhaseValue | null>(null)

  const { t, i18n } = useTranslation()

  useEffect(() => {
    const stored = localStorage.getItem("selectedPhase") as PhaseValue | null
    if (stored === "phase_1" || stored === "phase_2" || stored === "phase_3") {
      setSelectedPhase(stored)
    }
  }, [])

  useEffect(() => {
    if (selectedPhase) {
      localStorage.setItem("selectedPhase", selectedPhase)
    }
  }, [selectedPhase])

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
      onStart(parsed, selectedCategories, selectedPhase)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Phase Selector */}
      <div className="flex justify-center gap-2 px-3 py-3">
        {(["phase_1", "phase_2", "phase_3"] as PhaseValue[]).map((phase) => (
          <button
            key={phase}
            onClick={() => setSelectedPhase(phase)}
            className={`
              px-3 py-1.5 md:px-4 md:py-2
              text-sm md:text-base
              rounded-full font-semibold border transition
              ${
                selectedPhase === phase
                  ? "bg-blue-600 text-white border-blue-700 shadow-sm dark:bg-blue-500 dark:border-blue-400"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              }
            `}
          >
            {t(phase)}
          </button>
        ))}
      </div>

      {/* Sticky Category Badges at the very top */}
      <div className="sticky top-0 z-20 bg-white border-b px-3 py-2 dark:bg-gray-800 dark:border-gray-800">
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
          {t("shuffled")} 
        </label>

        <p className="text-muted-foreground text-center text-base pt-1.5 pb-3">
          {t("howMany")}
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {[10, 20, 50].map((count) => (
            <Button
              key={count}
              size="sm"
              onClick={() => onStart(count, selectedCategories, selectedPhase)}
            >
              {count} {t("questions")}
            </Button>
          ))}
          <Button key="all" size="sm" onClick={() => onStart("max", selectedCategories, selectedPhase)}>
            {t("question")} Όλες
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            type="number"
            min={1}
            placeholder={t("howManyShort")}
            value={customCount}
            onChange={(e) => setCustomCount(e.target.value)}
            className="w-[5rem] md:w-32 text-center"
          />
          <Button
            onClick={handleCustomStart}
            disabled={!customCount || parseInt(customCount) <= 0}
          >
            {t("yourNumber")} 
          </Button>
        </div>
      </div>
    </div>
  )
}
