"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { CategoryBadges } from "@/components/CategoryBadges"
import { CATEGORIES } from "@/lib/constants"
import { useTranslation } from "react-i18next"

type QuizStartMenuProps = {
  onStart: (questionCount: number | "max", selectedCategories: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
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

  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "el" ? "en" : "el")
  }

  return (
    <div className="flex flex-col">
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
        <p className="text-muted-foreground text-center text-base pt-6 pb-4">{t("howMany")}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[10, 20, 50].map((count) => (
            <Button
              key={count}
              size="sm"
              onClick={() => onStart(count, selectedCategories)}
            >
              {count} {t("questions")}
            </Button>
          ))}
          <Button key="all" size="sm" onClick={() => onStart("max", selectedCategories)}>
            {t("question")} 
            Όλες
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            type="number"
            min={1}
            placeholder={t("howManyShort")}
            value={customCount}
            onChange={(e) => setCustomCount(e.target.value)}
            className="w-32 text-center"
          />
          <Button onClick={handleCustomStart} disabled={!customCount || parseInt(customCount) <= 0}>
            {t("yourNumber")} 
          </Button>
        </div>
      </div>
    </div>
  )
}
